#README

## 找到的网页如下，即为sicily上的四个表格：

http://soj.sysu.edu.cn/ranklist.php

http://soj.sysu.edu.cn/contests.php

http://soj.sysu.edu.cn/courses.php

http://soj.sysu.edu.cn/status.php?username=mayaka

## 神秘代码为：

    var oHead = document.getElementsByTagName('head').item(0);
    var oScript1 = document.createElement("script");
    oScript1.type = "text/javascript";oScript1.src = "https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.0/jquery.js";
    oHead.appendChild(oScript1);

    var oHead = document.getElementsByTagName('head').item(0);
    var oScript2 = document.createElement("script");
    oScript2.type = "text/javascript";
    oScript2.src="https://cdnjs.cloudflare.com/ajax/libs/jquery.tablesorter/2.24.6/js/jquery.tablesorter.js";
    oHead.appendChild(oScript2);

    $("table").tablesorter();

每段代码缩成一行，分三次输入控制台后可起作用
