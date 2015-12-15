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
});

function getRandomAjax(obj) {
    if ($(obj).attr("status") === "active") {
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
            var all_circle_gotnum = true;
            $("li").each(function() {
                if ($(this).attr("status") != "numgot") {
                    all_circle_gotnum = false;
                }
            });
            if (all_circle_gotnum) {
                $(".info").addClass("bubbleactive");
            }
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
    $(".info").removeClass("bubbleactive");
}

// 离开@+时重置
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
}

//重开计算器
function restartCal() {
    $("li").each(function() {
        $(this).attr("status", "active");
        $(this).attr("class", "button active");
    });
}
