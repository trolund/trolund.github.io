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
                $(".newsContent").append("<button class='btn btn-info' id='backbtn'>Tidligere</button");
                setLis();
            }
        });
    });
});

function getbtn() {
    if (newsIndex == fileList.newsFiles.length-1) {
        $(".newsContent").append("<button class='btn btn-info' id='backbtn'>Tidligere</button");
    } else if (newsIndex == 0) {
        $(".newsContent").append("<button class='btn btn-info' id='forbtn'>Næste</button");
    } else {
        $(".newsContent").append("<button class='btn btn-info' id='backbtn'>Tidligere</button");
        $(".newsContent").append("<button class='btn btn-info' id='forbtn'>Næste</button");
    }
    setLis();
}

function setLis() {

    $("#backbtn").unbind("click");
    $("#forbtn").unbind("click");

    $('#backbtn').click(function () {
        $.ajax({
            async: true,
            url: "../News/" + fileList.newsFiles[newsIndex - 1],
            success: function (data) {
                $(".newsContent").empty()
                $(".newsContent").html(data);
                newsIndex--;
                getbtn();
                setLis();
            }
        });

    });


    $('#forbtn').click(function () {
        $.ajax({
            async: true,
            url: "../News/" + fileList.newsFiles[newsIndex + 1],
            success: function (data) {
                $(".newsContent").empty()
                $(".newsContent").html(data);
                newsIndex++;
                getbtn();
                setLis();
            }
        });

    });
}
