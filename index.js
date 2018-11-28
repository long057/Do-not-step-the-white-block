
var main = document.getElementsByClassName('main')[0];
var goBtn = document.getElementsByClassName('go')[0];
var colorList = ['blue', 'red', 'green', 'yellow'];
var timer = null;
var speed = 5;
var score = 0;
var flag = true;

function cDiv() {
    var rDiv = document.createElement('div');
    rDiv.setAttribute('class', 'row');
    for (var i = 0; i < 4; i++) {
        var oDiv = document.createElement('div');
        rDiv.appendChild(oDiv);
    }
    var index = Math.floor(Math.random() * 4);
    var len = main.childNodes.length;
    if (len === 0) {
        main.appendChild(rDiv);
    } else {
        main.insertBefore(rDiv, main.childNodes[0]);
    }
    var clickDiv = main.childNodes[0].childNodes[index];
    clickDiv.setAttribute('class', 'i');
    clickDiv.style.backgroundColor = colorList[index];

}

function bindEvent() {
    goBtn.addEventListener('click', function () {
        this.style.display = 'none';
        move();
    })
    main.addEventListener('click', function (e) {
        if (flag) {
            if (e.target.classList.contains('i')) {
                e.target.style.backgroundColor = 'gray';
                e.target.classList.remove('i');
                score++;
            } else {
                clearInterval(timer);
                alert('GAME OVER 得分：' + score);
                flag = false;
                window.location.reload();
            }
            if(score % 10 == 0) {
                speed ++;
            }
        }
    })
}
bindEvent();

function move() {
    cDiv();
    clearInterval(timer);
    timer = setInterval(function () {
        var step = main.offsetTop + speed;
        console.log(step);
        main.style.top = step + 'px';
        if (main.offsetTop > 0) {
            main.style.top = '-150px';
            cDiv();
        }
        var len = main.childNodes.length;
        if (len == 6) {
            for (var i = 0; i < 4; i++) {
                if (main.childNodes[len - 1].childNodes[i].classList.contains('i')) {
                    clearInterval(timer);
                    alert('GAME OVER 得分：' + score);
                    flag = false;
                    window.location.reload();
                }
            }
            main.removeChild(main.childNodes[len - 1]);
        }
    }, 20)
}