---
title: "Parallel støj reducerende algoritme"
excerpt: "Implementering af en simple støj reducerende algoritme på bitmaps, samt parallelisering af selv samme algoritme."
coverImage: "/assets/blog/noise-filtering/figurartifakter.png"
date: "2019-08-06T05:35:07.322Z"
author:
  name: Troels Lund
  picture: "/assets/blog/authors/troels.png"
ogImage:
  url: "/assets/blog/5-semester/datas.png"
tags: ["post"]
technologies: ["C", "OpenMP"]
language: "da"
isDraft: false
---

Dette post er et udsnit af en opgave jeg lavet som en del af kurset 02346 Distribuerede og parallelle systemer på DTU i foråret i 2019. Kurset andvendte _C_ som som det primærer programerings sprog. Derudover bliv blev der anvendt forskilige API'er til parallel programering, en af disse var OpenMP. OpenMP er brugt til shared-memory parallel programming, altså en model hvor flere tråde tilgår samme memory space og individuelt kan udføre sin opgave delvist eller fuldstænding uafhængigt af de andre tråde.

En række billeder med støj var blevet udleveret. Et eksemple på sådan et billede kan blive set neden for.

![Alt text](/assets/blog/noise-filtering/pocket_watch.bmp)

Øvelsen gik ud på at reducer mængden af støj i billede og dernæst parallelisere programmet ved hjælp af OpenMP. Selv samme billede efter filteret var blevet andvendt så dermed sådan ud:

![Alt text](/assets/blog/noise-filtering/pocket_watch-processed.bmp)

Den **ikke** paralleliseret kode kan ses her under:

```c
/*
  This functions calculates the average filter with 
  a parameterizable window specifying N*N for the window
*/
void averagingFilterNaive(PIXEL_ARRAY* img, PIXEL_ARRAY* orig_img, int N) {

  int i, j, n, m;
  int red_avg, blue_avg, green_avg;
  int radius, out_of_bounds, idx, curr_idx;
  int32_t pixel;

  if (N % 2 == 0) {
    printf("ERROR: Please use an odd sized window\n");
    exit(1);
  }

  radius = N / 2;

  for (i = 0; i < img->sizeY; i++) {
    for (j = 0; j < img->sizeX; j++) {
      /* For pixels whose window would extend out of bounds, we need to count
	 the amount of pixels that we miss, since the window size will be smaller */
      out_of_bounds = 0;

      /* We are going to average the rgb values over the window */
      red_avg = 0;
      blue_avg = 0;
      green_avg = 0;

      /* This for loop sums up the rgb values for each pixel in the window */
      for (n = i - radius; n <= i + radius; n++) {
        for (m = j - radius; m <= j + radius; m++) {
          /*  If we have an edge pixel, some of the window pixels will
              be out of bounds. Thus we skip these and note that the
              amount of pixels in the window are less than the window size */
          if (n < 0 || m < 0 || n >= img->sizeY || m >= img->sizeX) {
            out_of_bounds++;
            continue;
          }
          idx = m + n * img->sizeX;
          /* Shift, mask and add */
          red_avg += ((orig_img->data[idx] >> 16) & 0xFF);
          green_avg += ((orig_img->data[idx] >> 8) & 0xFF);
          blue_avg += (orig_img->data[idx] & 0xFF);
        }
      }
      /* Divide the total sum by the amount of pixels in the window */
      red_avg /= (N * N - out_of_bounds);
      green_avg /= (N * N - out_of_bounds);
      blue_avg /= (N * N - out_of_bounds);

      /* Set the average to the current pixel */
      curr_idx = j + i * img->sizeX;
      pixel = (red_avg << 16) + (green_avg << 8) + blue_avg;
      img->data[curr_idx] = pixel;
    }
  }
}
```

Algoritmen håndterer pixels tæt på kanten af billedeområdet, ved at undgå at arbejdede på disse.
Median funktionen står for at finde indekset for den pixel som er vektor-median indenfor vinduet, og som bliver afsøgt på daværende tidspunkt.

Det gør den ved at finde gennemsnitsdistancer mellem hver af farverne, ved at finde den absolutte forskel mellem de enkelte komponenter og lægge dem sammen. Jeg undlader dog at sammenligne den med sig selv, hvor distancen ville være 0. Når alle distancerne er fundet, findes den farve som har den mindste gennemsnitlige distance og derved er medianvektoren for dét vindue. Denne bliver derved vores median pixel og dens indeks bliver returneret, for så at blive skrevet til billede-arrayet på den plads som bliver evalueret på det givende tidspunkt.

En mere detaljeret beskrivelse findes som kommentarer i koden.

Den samme kode er derefter modificeret til at bruge OpenMP. Som det kan ses er det ganske minimale ændringer som er gjort for at splitte arbejdet ud på flere tråde. Jeg anvender:

    \#pragma parallel for

Efter dette angives alle de variable som bør være private, for hver enkelt processor. Hvis programmet køres med 8 tråde fås en speed-up på:

$$6,68807969 = {39,195277 \over 5,860468}$$

Altså næsten 7 gange hurtigere og er derfor et ganske skalerbart program. Udregningen er lavet ud fra den akkumulerede udførselstid af henholdsvis det serielle og parallelle program, og bliver derfor selvfølgelig en speed-up for hele programmets udførsel. 

Et screenshot med kørselstiderne for hver enkelt billede kan ses her under:

![Alt text](/assets/blog/noise-filtering/consol.png)

Den modefiseret kode kan ses her under:

```c
void averagingFilterOpenMP(PIXEL_ARRAY* img, PIXEL_ARRAY* orig_img, int N) {
	  int i, j, n, m;
	  int red_avg, blue_avg, green_avg;
	  int radius, out_of_bounds, idx, curr_idx;
	  int32_t pixel;

	  if (N % 2 == 0) {
	    printf("ERROR: Please use an odd sized window\n");
	    exit(1);
	  }

	  radius = N / 2;

# pragma omp parallel for private(i,j, out_of_bounds, red_avg, blue_avg, green_avg, n,m, pixel, idx, curr_idx)
	  for (i = 0; i < img->sizeY; i++) {
	    for (j = 0; j < img->sizeX; j++) {
	      /* For pixels whose window would extend out of bounds, we need to count
		 the amount of pixels that we miss, since the window size will be smaller */
	      out_of_bounds = 0;

	      /* We are going to average the rgb values over the window */
	      red_avg = 0;
	      blue_avg = 0;
	      green_avg = 0;

	      /* This for loop sums up the rgb values for each pixel in the window */

	      for (n = i - radius; n <= i + radius; n++) {
          for (m = j - radius; m <= j + radius; m++) {
            /*  If we have an edge pixel, some of the window pixels will
                be out of bounds. Thus we skip these and note that the
                amount of pixels in the window are less than the window size */
            if (n < 0 || m < 0 || n >= img->sizeY || m >= img->sizeX) {
              out_of_bounds++;
              continue;
            }
            idx = m + n * img->sizeX;
            /* Shift, mask and add */
            red_avg += ((orig_img->data[idx] >> 16) & 0xFF);
            green_avg += ((orig_img->data[idx] >> 8) & 0xFF);
            blue_avg += (orig_img->data[idx] & 0xFF);
          }
	      }
	      /* Divide the total sum by the amount of pixels in the window */
	      red_avg /= (N * N - out_of_bounds);
	      green_avg /= (N * N - out_of_bounds);
	      blue_avg /= (N * N - out_of_bounds);

	      /* Set the average to the current pixel */
	      curr_idx = j + i * img->sizeX;

	      pixel = (red_avg << 16) + (green_avg << 8) + blue_avg;
	      img->data[curr_idx] = pixel;

	    }
	  }
}
```

Billederne fremstår signifikant skarpere ved brug af vektor medianmetoden, frem for at anvende den metode som benytter sig af den gennemsnitlige. 

Eksempler på de forskelige metoder kan ses her under:

![Alt text](/assets/blog/noise-filtering/figur.png)

Dette er dog også på baggrund af den rette vinduesstørrelse, en vinduesstørrelse på fx 11 giver et meget uskarpt billede, mere lig med det resultat man fik med average filteret. Dette minimere dog artefakterne fra vinduet. Et eksemple på sådan artifakter kan ses her under:

![Alt text](/assets/blog/noise-filtering/figurartifakter.png)





