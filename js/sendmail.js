/*
function send() {

    var name = $("#nameMail").val();
    var msg = $("#msgMail").val();
    var email = $("#emailMail").val();
    var emne = $("#emneMail").val();

    var url = "https://outlook.office.com/api/v2.0/me/sendmail";

    var data = {
        "Message": {
            "Subject": emne,
            "Body": {
                "ContentType": "Text",
                "Content": "Navn" + name + "\n" + "email" + email + "\n" + msg
            },
            "ToRecipients": [
                {
                    "EmailAddress": {
                        "Address": "trolund@gmail.com"
                    }
      }
    ],
            "Attachments": [
                {
                    "@odata.type": "#Microsoft.OutlookServices.FileAttachment",
                    "Name": "menu.txt",
                    "ContentBytes": "bWFjIGFuZCBjaGVlc2UgdG9kYXk="
      }
    ]
        },
        "SaveToSentItems": "false"
    };

    $.ajax({
        type: "POST",
        url: url,
        data: data,
        success: function () {
            console.log("mail sendt!");
        },
        dataType: "application/json"
    });
}
*/

$(document).ready(function () {


    $('#submit').click(function () {

        var url = "tchkajak.dk/mail.php";

        console.log('mail send! v3');

        var name = $('#nameMail').val();
        var email = $('#emailMail').val();

        var varData = 'name=' + name + '&email=' + email;
        console.log(varData);

        $.ajax({
            type: "POST",
            url: url,
            data: varData,
            success: function () {
                alert("It was a success");
            }

        });

    });


});
