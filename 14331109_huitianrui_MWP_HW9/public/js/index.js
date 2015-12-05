$(function() {
    var ainput = $("input");
    var username = ainput[0];
    var stdid = ainput[1];
    var phone = ainput[2];
    var email = ainput[3];

    var ap = $("p");
    var name_msg = ap[0];
    var stdid_msg = ap[1];
    var phone_msg = ap[2];
    var email_msg = ap[3];

    var myForm = $("#info");

    //首位为英文字母
    //6~18位英文字母、数字或下划线
    var name_re = /^[a-zA-Z][a-zA-Z0-9_]*/;
    var stdid_re = /^[1-9][0-9]*/;
    var email_re = /^[a-zA-Z_\-]+@(([a-zA-Z_\-])+\.)+[a-zA-Z]{2,4}$/;

    $(username).focus(function() {namefocus(name_msg);});
    $(username).blur(function() {nameblur(this, name_msg, name_re);});

    $(stdid).focus(function() {stdidfocus(stdid_msg);});
    $(stdid).blur(function() {stdidblur(this, stdid_msg, stdid_re)});

    $(phone).focus(function() {phonefocus(phone_msg);});
    $(phone).blur(function() {phoneblur(this, phone_msg, stdid_re);});

    $(email).focus(function() {emailfocus(email_msg);});
    $(email).blur(function() {emailblur(this, email_msg, email_re)});

    $(".submit").click(function() {
        if (validate()) {
            $("form").submit();
        } else {
            alert('存在错误\n请完善表单内容后再提交');
        }
    })

    $('.reset').click(function() {
        $("p i").each(function() {
            $(this).attr("class", "");
        });
        name_msg.style.display = "none";
        stdid_msg.style.display = "none";
        phone_msg.style.display = "none";
        email_msg.style.display = "none";
        var ainput = $("input");
        for (var i = 0; i < 4; i++) {
            $(ainput[i]).attr("value", "");
        }
    });
});

function validate() {
    var aimg = $("p i");
    var name_i = aimg[0];
    var stdid_i = aimg[1];
    var phone_i = aimg[2];
    var email_i = aimg[3];
    if ($(name_i).attr("class") == "ok" && $(stdid_i).attr("class") == "ok"
        && $(phone_i).attr("class") == "ok" && $(email_i).attr("class") == "ok") {
        return true;
    } else {
        return false;
    }
}

function namefocus(name_msg) {
    name_msg.style.display = "inline-block";
    $(name_msg).html("<i class='ati'></i> 6~18位英文字母、数字或下划线，必须以英文字母开头");
}

function nameblur(obj, name_msg, name_re) {
    //不能为空
    if (obj.value == "") {
        $(name_msg).html("<i class='err'></i> 不能为空");
    }
    //含有非法字符
    else if (!name_re.test(obj.value)) {
        $(name_msg).html("<i class='err'></i> 含有非法字符");
    }
    //长度超过18位
    else if (obj.value.length > 18) {
        $(name_msg).html("<i class='err'></i> 长度超过18位");
    }
    //长度少于6位
    else if(obj.value.length < 6) {
        $(name_msg).html("<i class='err'></i> 长度少于6位");
    }
    //OK
    else {
        $(name_msg).html("<i class='ok'></i> OK");
    }
}

function stdidfocus(stdid_msg) {
    stdid_msg.style.display = "inline-block";
    $(stdid_msg).html("<i class='ati'></i> 8位数字，不能以0开头");
}

function stdidblur(obj, stdid_msg, stdid_re) {
    //不能为空
    if (obj.value == "") {
        $(stdid_msg).html("<i class='err'></i> 不能为空");
    }
    //非法学号
    else if (!stdid_re.test(obj.value)) {
        $(stdid_msg).html("<i class='err'></i> 非法学号");
    }
    //学号应为8位
    else if (obj.value.length != 8) {
        $(stdid_msg).html("<i class='err'></i> 学号应为8位");
    }
    //OK
    else {
        $(stdid_msg).html("<i class='ok'></i> OK");
    }
}

function phonefocus(phone_msg) {
    phone_msg.style.display = "inline-block";
    $(phone_msg).html("<i class='ati'></i> 11位数字，不能以0开头");
}

function phoneblur(obj, phone_msg, stdid_re) {
    //不能为空
    if (obj.value == "") {
        $(phone_msg).html("<i class='err'></i> 不能为空");
    }
    //非法电话号码
    else if (!stdid_re.test(obj.value)) {
        $(phone_msg).html("<i class='err'></i> 非法电话号码");
    }
    //电话号码应为11位
    else if (obj.value.length != 11) {
        $(phone_msg).html("<i class='err'></i> 电话号码应为11位");
    }
    //OK
    else {
        $(phone_msg).html("<i class='ok'></i> OK");
    }
}

function emailfocus(email_msg) {
    email_msg.style.display = "inline-block";
    $(email_msg).html("<i class='ati'></i> 请填写常用邮箱");
}

function emailblur(obj, email_msg, email_re) {
    //不能为空
    if (obj.value == "") {
        $(email_msg).html("<i class='err'></i> 不能为空");
    }
    //非法邮箱
    else if (!email_re.test(obj.value)) {
        $(email_msg).html("<i class='err'></i> 非法邮箱");
    }
    //OK
    else {
        $(email_msg).html("<i class='ok'></i> OK");
    }
}
