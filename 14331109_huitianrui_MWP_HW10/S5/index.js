$(function() {
    $("li").attr("status", "active");
    $("li").click(function() {getRandomAjax(this);});
    $("li").mouseover(function() {
        if ($(this).attr("status") != "active") {
            this.style.cursor = "crosshair";
        } else {
            this.style.cursor = "pointer";
        }
    })
    $("li").each(function() {
        if ($(this).attr("status") === "inactive"
            || $(this).attr("status") === "numgot") {
            $(this).addClass("inactive");
        } else {
            $(this).addClass("active");
        }
    });

    $(".info").attr("status", "bubble_inactive");
    $(".info").click(function() {bubble_click(this);});

    $(".icon-wrap").mouseleave(function() {resetCal();});
    $(".icon-wrap").mouseenter(function() {restartCal();});

    var circles = $("li");
    $(".icon").click(function() {robotFun4(circles, bubbleHandler);});
});

//循环设置回调函数
//随机调用并处理异常
function robotFun4(circles, bubbleHandler) {
    var sequence = [0, 1, 2, 3, 4];
    var handlers = [aHandler, bHandler, cHandler, dHandler, eHandler];
    sequence.sort(function(){
        return Math.random()-0.5;
    });
    var callbacks = [];
    for (var i = 0; i < 4; i++) {
        (function(i) {
            callbacks[i] = function(err, currentSum) {
                if (err) {
                    $("#random").html(err);
                }
                handlers[sequence[i + 1]](circles[sequence[i + 1]], currentSum, callbacks[i + 1]);
            }
        })(i);
    }
    callbacks[4] = bubbleHandler;
    handlers[sequence[0]](circles[sequence[0]], 0, callbacks[0]);
}

function aHandler(obj, currentSum, callback) {
    if ($(obj).attr("status") === "active") {
        changeButtonStyle(obj);
        $.get("hhh.txt", function(data) {
            // 随机决定请求是否成功
            if (Math.random() > 0.5) {
                $("#random").html("A：这是个天大的秘密");
                activateOtherButtons(obj, data);
                callback(null, currentSum + parseInt(data));
            } else { // 不成功则传递错误信息
                var err = "A：这不是个天大的秘密";
                activateOtherButtons(obj, data);
                callback(err, currentSum + parseInt(data));
            }
        });
    }
}

function bHandler(obj, currentSum, callback) {
    if ($(obj).attr("status") === "active") {
        changeButtonStyle(obj);
        $.get("hhh.txt", function(data) {
            if (Math.random() > 0.5) {
                $("#random").html("B: 我不知道");
                activateOtherButtons(obj, data);
                callback(null, currentSum + parseInt(data));
            } else {
                var err = "B：我知道";
                activateOtherButtons(obj, data);
                callback(err, currentSum + parseInt(data));
            }
        });
    }
}

function cHandler(obj, currentSum, callback) {
    if ($(obj).attr("status") === "active") {
        changeButtonStyle(obj);
        $.get("hhh.txt", function(data) {
            if (Math.random() > 0.5) {
                $("#random").html("C: 你不知道");
                activateOtherButtons(obj, data);
                callback(null, currentSum + parseInt(data));
            } else {
                var err = "C：你知道";
                activateOtherButtons(obj, data);
                callback(err, currentSum + parseInt(data));
            }
        });
    }
}

function dHandler(obj, currentSum, callback) {
    if ($(obj).attr("status") === "active") {
        changeButtonStyle(obj);
        $.get("hhh.txt", function(data) {
            if (Math.random() > 0.5) {
                $("#random").html("D: 他不知道");
                activateOtherButtons(obj, data);
                callback(null, currentSum + parseInt(data));
            } else {
                var err = "D：他知道";
                activateOtherButtons(obj, data);
                callback(err, currentSum + parseInt(data));
            }
        });
    }
}

function eHandler(obj, currentSum, callback) {
    if ($(obj).attr("status") === "active") {
        changeButtonStyle(obj);
        $.get("hhh.txt", function(data) {
            if (Math.random() > 0.5) {
                $("#random").html("E：才怪");
                activateOtherButtons(obj, data);
                callback(null, currentSum + parseInt(data));
            } else {
                var err = "E：不怪不怪";
                activateOtherButtons(obj, data);
                callback(err, currentSum + parseInt(data));
            }
        });
    }
}

function bubbleHandler(err, currentSum) {
    $(".info").addClass("bubbleactive");
    if (err) {
        $("#random").html(err);
    }
    setTimeout(function() {
        var text = $(".info").children();
        $(text[0]).html(currentSum);
        $("#random").html("大气泡：楼主异步调用战斗力感人，目测不超过" + currentSum);
        $(".info").removeClass("bubbleactive");
    }, 2000);
}

function activateOtherButtons(obj, data) {
    var num = $(obj).children("span");
    $(num[0]).html(data);
    $(obj).attr("status", "numgot");
    $(obj).attr("class", "button numgot");
    $("li").each(function() {
        if ($(this).attr("status") != "numgot") {
            $(this).attr("status", "active");
            $(this).attr("class", "button active");
        }
    });
}

function changeButtonStyle(obj) {
    var circles = $("li");
    for (var i = 0; i < circles.length; i++) {
        if (circles[i] != obj && $(circles[i]).attr("status") != "numgot") {
            $(circles[i]).attr("status", "inactive");
            $(circles[i]).attr("class", "button inactive");
        }
    }
    var num = $(obj).children("span");
    $(num[0]).addClass("clicked");
    $(num[0]).html("...");
}

function getRandomAjax(obj, callback) {
    if ($(obj).attr("status") === "active") {
        changeButtonStyle(obj);
        $.get("hhh.txt", function(data) {
            $(num[0]).html(data);
            $(obj).attr("status", "numgot");
            $(obj).attr("class", "button numgot");
            $("li").each(function() {
                if ($(this).attr("status") != "numgot") {
                    $(this).attr("status", "active");
                    $(this).attr("class", "button active");
                }
            });
            callback();
        });
    }
}

function bubble_click(obj) {
    var all_circle_gotnum = true;
    $("li").each(function() {
        if ($(this).attr("status") != "numgot") {
            all_circle_gotnum = false;
        }
    });
    if (all_circle_gotnum) $(obj).attr("status", "bubble_active");
    if ($(obj).attr("status") === "bubble_active") {
        var sum = 0;
        $("li span").each(function() {
            sum += parseInt($(this).html());
        });
        var text = $(obj).children();
        $(text[0]).html(sum);
    }
    $(obj).attr("status", "bubble_inactive");
    all_circle_gotnum = true;
}

function resetCal() {
    $("li span").each(function() {
        $(this).removeClass("clicked");
        $(this).html("");
    });
    $("li").each(function() {
        $(this).attr("status", "inactive");
        $(this).attr("class", "button inactive");
    });
    $(".info p").html("");
    $("#random").html("");
}

function restartCal() {
    $("li").each(function() {
        $(this).attr("status", "active");
        $(this).attr("class", "button active");
    });
}
