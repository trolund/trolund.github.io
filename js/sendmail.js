$(document).ready(function () {
    $('#sendBtn').click(function () {
        var data = serializeFormJSON()
        var myJSON = JSON.stringify(data);
        console.log(myJSON);
        $.ajax({
            type: 'POST',
            url: 'http://localhost:8080/api/mail/send',
            data: myJSON,
            dataType: 'application/json',
            success: function (data) {
                $.each(data, function (index, element) {
                    $('body').append($('<div>', {
                        text: element.name
                    }));
                });
            }
        });

    })

})

function serializeFormJSON() {
    var o = {};
    var a = $('#mailForm').serializeArray();
    $.each(a, function () {
        if (o[this.name]) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};
