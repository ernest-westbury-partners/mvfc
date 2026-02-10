function registerNewPlayer() {
    updateContents("/ajax/registerNewPlayer");
}

function saveNewPlayer() {
    //newPlayer
    var data = $("#newPlayer").serialize();
        $.post("/ajax/saveNewPlayer", data).done(function (data) {
            contentsOrError(data);
        });
}

function playerLookupCheckIn() {
    updateContents("/ajax/playerLookupCheckIn");
}

function getPlayers() {
    $.post("/ajax/getPlayers", {'valLastName': $('#valLastName').val(), 'intYr': $('#intYr').val()})
            .done(function (data) {
                contentsOrError(data);
                //post something if errored! ...
            });
}

function checkIn(id) {
    $.post("/ajax/checkIn", {'id': id})
            .done(function (data) {
                //post something if errored! ...
                var obj = jQuery.parseJSON(data);
                if (obj.error) {
                    setToastMsg(obj.error);
                } else {
                    $('#checkIn_' + id).html("Checked In");
                    setToastMsg("Thank you checked in.");
                }
            });
}
function updateContents(ajaxUrl) {
    $.ajax({
        url: ajaxUrl,
        context: document.body
    }).done(function (res) {
        contentsOrError(res);
    });
}

function contentsOrError(res) {
    try {
        var obj = jQuery.parseJSON(res);
        if (obj.error) {
            setToastMsg(obj.error);
        } else {
            $('#content').html(obj.contents);
        }
    } catch (e) {
        console.log("error: " + e);
    }
}
function setToastMsg(msg) {
    $('#snackbar').html(msg);
    snackbar();
}
function snackbar() {
    // Get the snackbar DIV
    var x = document.getElementById("snackbar");
    if (x && x.innerHTML !== '') {
        // Add the "show" class to DIV
        x.className = "show";

        // After 3 seconds, remove the show class from DIV
        setTimeout(function () {
            x.className = x.className.replace("show", "");
        }, 3000);
    }
}