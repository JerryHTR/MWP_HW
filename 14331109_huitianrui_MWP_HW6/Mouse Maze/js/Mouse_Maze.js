window.onload = function() {
    var flag = false;

    var S = document.getElementById("S");
    S.addEventListener("mouseover", changeCursorToCross);
    S.addEventListener("mouseout", changeCursorToDefault);

    var E = document.getElementById("E");
    E.addEventListener("mouseover", win);
    E.addEventListener("mouseout", changeCursorToDefault);

    var content = document.getElementById("content");
    content.addEventListener("mousemove", changeCursorToCross);

    var walls = document.getElementsByClassName('wall');
    for (var i = 0; i < walls.length; i++) {
        walls[i].addEventListener("mouseover", lose);
    }

    var helpers = document.getElementsByClassName('help');
    for (var i = 0; i < 4; i++) {
        helpers[i].addEventListener("mouseover", colorReturn);
        helpers[i].addEventListener("mouseout", colorReturn);
    }

    function win() {
        var content = document.getElementById("content");
        var conceal = document.getElementById('conceal');
        if (content.style.cursor === "pointer" && conceal.innerHTML != "You Lose"
            && conceal.className != "conceal" && flag) {
            conceal.innerHTML = "You Win";
            conceal.className = "conceal";
            this.style.cursor = "pointer";
        }
        else if (content.style.cursor === "default" && conceal.className != "conceal") {
            conceal.innerHTML = "Don't cheat, you should start form the 'S' and move to the 'E' inside the maze!";
            conceal.className = "conceal";
            this.style.cursor = "pointer";
        }
    }

    function lose() {
        var conceal = document.getElementById('conceal');
        if (conceal.className != "conceal" && flag) {
            this.style.backgroundImage = "url('static/redwall.jpg')";
            conceal.innerHTML = "You Lose";
            conceal.className = "conceal";
        }
    }

    function colorReturn() {
        var walls = document.getElementsByClassName('wall');
        for (var i = 0; i < walls.length; i++) {
            walls[i].style.backgroundImage = "url('static/wall.gif')";
        }
    }

    function changeCursorToCross() {
        this.style.cursor = "pointer";
        if (this.id === "S") {
            flag = true;
            var conceal = document.getElementById('conceal');
            conceal.innerHTML = "";
            conceal.removeAttribute("class");
            var content = document.getElementById("content");
            content.style.cursor = "default";
        }
    }

    function changeCursorToDefault() {
        this.style.cursor = "default";
    }
}
