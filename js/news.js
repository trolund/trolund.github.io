var fileList = null;
var newsIndex = 0;
$(document).ready(function (e) {


    // load json with files and load first page.
    $.getJSON("../News/News.json", function (result) {

        fileList = result;
        newsIndex = result.newsFiles.length - 1;

        $.ajax({
            async: true,
            url: "../News/" + result.newsFiles[result.newsFiles.length - 1],
            success: function (data) {
                $(".newsContent").html(data);
                $(".btnpos").prepend("<button class='btn btn-info' id='backbtn'>Tidligere</button");
                setLis();
            }
        });
    });
});

function getbtn() {

    $(".btnpos").empty();

    if (newsIndex == fileList.newsFiles.length-1) {
        $(".btnpos").prepend("<button class='btn btn-info' id='backbtn'>Tidligere</button");
    } else if (newsIndex == 0) {
        $(".btnpos").prepend("<button class='btn btn-info' id='forbtn'>Næste</button");
    } else {
        $(".btnpos").prepend("<button class='btn btn-info' id='backbtn'>Tidligere</button");
        $(".btnpos").prepend("<button class='btn btn-info' id='forbtn'>Næste</button");
    }
    setLis();
}

function setLis() {

    $("#backbtn").unbind("click");
    $("#forbtn").unbind("click");

    $('#backbtn').click(function () {
        $(".newsContent").css('opacity', 0);
        $.ajax({
            async: true,
            url: "../News/" + fileList.newsFiles[newsIndex - 1],
            success: function (data) {
                $(".newsContent").html(data);
                newsIndex--;
                getbtn();
                setLis();
                $(".newsContent").css('opacity', 1);
            }
        });

    });


    $('#forbtn').click(function () {
        $(".newsContent").css('opacity', 0);
        $.ajax({
            async: true,
            url: "../News/" + fileList.newsFiles[newsIndex + 1],
            success: function (data) {
                $(".newsContent").html(data);
                newsIndex++;
                getbtn();
                setLis();
                $(".newsContent").css('opacity', 1);
            }
        });

    });
}
