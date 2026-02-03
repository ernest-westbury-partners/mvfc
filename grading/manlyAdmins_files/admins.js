function grading() {
    updateGradingCount();
    console.log("called grading");
    $('input[type=radio]').off('change');
    $('input[type=radio]').on('change', function () {
        console.log("called store");
        console.log(this);
        $.post("/ajax/storeGrade", {'val': $(this).val(), 'name': $(this).prop("name")})
                .done(function (data) {
                    updateGradingCount();
                    //post something if errored! ...
                });
    });
}

function updateGradingCount() {
    $('#graded').html($('tr.playerLine:visible input[type="radio"]:checked').length);
    $('#total').html($('tr.playerLine:visible').length);
}
function registerGrader() {
    updateContents("/ajax/registerGrader");
}

function getNewGradingGroup() {
    updateContents("/ajax/getNewGradingGroup");
}

function saveNewGradingGroup() {
    $.post("/ajax/saveNewGradingGroup", {'valAgeGroup': $('#valAgeGroup').val()})
            .done(function (data) {
                //post something if errored! ...
                var obj = jQuery.parseJSON(data);
                if (obj.error) {
                    setToastMsg(obj.error);
                } else {
                    if (obj.contents) {
                        setToastMsg(obj.contents);
                    }
                    document.location.href = obj.url;
                }
            });
}

function saveGrader() {
    $.post("/ajax/saveGrader", {'valName': $('#valName').val(), 'valAgeGroup': $('#valAgeGroup').val(),'valMobile': $('#valMobile').val()})
            .done(function (data) {
                //post something if errored! ...
                var obj = jQuery.parseJSON(data);
                if (obj.error) {
                    setToastMsg(obj.error);
                } else {
                    if (obj.contents) {
                        setToastMsg(obj.contents);
                    }
                    document.location.href = obj.url
                }
            });
}

var oldDate = '';
var group_id = 0;
var coordinator = 0;
function doPoll() {
    var ts = '';
    if (oldDate !== '') {
        ts = oldDate;
        oldDate = new Date().getTime();
    } else {
        ts = new Date().getTime();
        oldDate = new Date().getTime();
    }
    if (valAgeGroup != '') {
        $.post('/ajax/getNotification?ts=' + ts + "&valAgeGroup=" + valAgeGroup+"&coordinator="+coordinator, function (data) {
            // alert(data);  // process results here
            try {
                var obj = jQuery.parseJSON(data);
                var i;
                var updated = false;
                for (i = 0; i < obj.results.length; ++i) {
                    if (coordinator == "0") {
                        if (obj.results[i].valLookup) {
                            $('#' + obj.results[i].valLookup).show();
                            updated = true;
                        }
                        if (obj.results[i].txtMessage) {
                            setToastMsg(obj.results[i].txtMessage);
                        }
                        if (obj.results[i].txtHtml) {
                            $('#' + obj.results[i].valLookup).html(obj.results[i].txtHtml);
                        }
                        updateGradingCount();
                    } else {
                        if (obj.results[i].bolRegistration && obj.results[i].bolRegistration == "1") {
                            // new player 
                            $('#playerTable_group'+obj.results[i].group_id+' tr:last').after("<tr>"+obj.results[i].txtHtml+"</tr>");
                            if (obj.results[i].txtMessage) {
                                setToastMsg(obj.results[i].txtMessage);
                            }
                        } else {
                            // checked in 
                            if (obj.results[i].player_id) {
                                if ($('#checkIn_' + obj.results[i].player_id).html() != "Checked In") {
                                    $('#checkIn_' + obj.results[i].player_id).html("Checked In");

                                    if (obj.results[i].txtMessage) {
                                        setToastMsg(obj.results[i].txtMessage);
                                    }
                                }
                            }
                        }


                    }

                }
                if (updated) {
                    grading();
                }
            } catch (e) {
            }
            setTimeout(doPoll, 5000);
        });
    }
}


//document.location.href

