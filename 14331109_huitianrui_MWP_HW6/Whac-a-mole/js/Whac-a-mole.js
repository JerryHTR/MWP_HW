window.onload = function() {
    var time = 30;
    var score = 0;
    var begin = false;
    var timer;
    var first = true;
    var choice;

    var wrapper = document.getElementById('wrapper');
    for (var i = 0; i < 6; i++) {
        for (var j = 0; j < 10; j++) {
            var box = document.createElement("div");
            box.className = "noMole";
            box.addEventListener("click", hit);
            wrapper.appendChild(box);
        }
    }

    var start = document.getElementById('start_and_over');
    start.addEventListener("click", startOrStop);

    var boxes = document.getElementById('wrapper').getElementsByTagName('div');

    function startOrStop() {
        begin = begin === true ? false : true;
        if (begin) {
            time = 30;
            score = 0;
            var scoreInput = document.getElementById('score').getElementsByTagName('input');
            scoreInput[0].value = score;
            var timeInput = document.getElementById('time').getElementsByTagName('input');
            timeInput[0].value = time;
            randomMole();
            timer = setInterval(minus, 1000);
        } else {
            clearInterval(timer);
            alert("Game Over.\nYour score is : " + score);
            boxes[choice].className = "noMole";
            begin = false;
        }
    }

    function randomMole() {
        choice = Math.floor(Math.random() * 60);
        boxes[choice].className = "mole";
    }

    function minus() {
        var timeInput = document.getElementById('time').getElementsByTagName('input');
        timeInput[0].value = time;
        if (time === 0) {
            clearInterval(timer);
            alert("Game Over.\nYour score is : " + score);
            boxes[choice].className = "noMole";
            begin = false;
            return;
        }
        time--;
    }

    function hit() {
        if (begin && time) {
            if (this.className === "mole") {
                score += 1;
                var scoreInput = document.getElementById('score').getElementsByTagName('input');
                scoreInput[0].value = score;
                this.className = "noMole";
                randomMole();
            } else {
                score -= 1;
                var scoreInput = document.getElementById('score').getElementsByTagName('input');
                scoreInput[0].value = score;
            }
        }
    }
}
