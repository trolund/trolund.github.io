import Image from 'next/legacy/image';
import { SiLinkedin } from 'react-icons/si';
import { VscGithubInverted } from 'react-icons/vsc';

export default function ProfileCard() {
  function calculateAge(birthdate) {
    // Parse the birthdate string to create a Date object
    const birthDate = new Date(birthdate);
    const today = new Date();

    // Calculate the age difference in years
    let age = today.getFullYear() - birthDate.getFullYear();

    // Adjust the age if the birthdate hasn't occurred yet this year
    const monthDifference = today.getMonth() - birthDate.getMonth();
    const dayDifference = today.getDate() - birthDate.getDate();

    if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
      age--;
    }

    return age;
  }

  return (
    <figure className="card float-left mr-5 mb-2 h-auto w-full rounded-xl p-5 sm:w-[280px]">
      <div className="rounded-[10%]">
        <Image
          style={{ borderTopLeftRadius: '5px', borderTopRightRadius: '5px' }}
          src="/profil.webp"
          alt="me"
          width={100}
          height={100}
          layout="responsive"
          objectFit="contain"
        />
      </div>
      <div className="space-y-4 pt-6">
        <figcaption>
          <b className="text-2xl">Troels Lund</b>
          <div>
            <ol>
              <li>
                <b>Software Engineer</b>
              </li>
              <li>
                <b>MSc Eng. Computer Science</b>
              </li>
              <li>
                <i>{calculateAge('1994-10-06')} years old</i>
              </li>
              <li>Copenhagen, Denmark</li>
              <li className="m-2 border-t-2"></li>
              <li className="ml-auto mr-auto flex justify-end gap-4">
                <a className="transition-all hover:scale-110" href="https://github.com/trolund">
                  <VscGithubInverted color="var(--content-text)" size={25} />
                </a>
                <a
                  className="transition-all hover:scale-110"
                  href="https://www.linkedin.com/in/trolund/"
                >
                  <SiLinkedin color="var(--content-text)" size={25} />
                </a>
              </li>
            </ol>
          </div>
        </figcaption>
      </div>
    </figure>
  );
}
