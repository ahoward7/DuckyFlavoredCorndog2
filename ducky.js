$(document).ready(startUp);

function startUp() {
    $(".corndog").on({
        "click": function() {

            var ducky = new Ducky(0, 0, .99);
           
            setInterval(function(){
                ducky.move();
            }, 10);

            $(".ducky").on({
                "click": function() {
                    smashDucky(this)
                }
            });
        }
    });
}

$(function() {
    var x = 0;
    setInterval(function(){
        x+=1;
        $(".background").css("background-position", x + "px 0px");
    }, 50);
})

function smashDucky(ducky) {
    if ($(".corndog").position().left <= $(".ducky").position().left) {
        $(".corndog").css({
            "left": $(ducky).position().left - 525,
            "top": parseInt($(".corndog").css("top")) + 180 + "px",
            "transform-origin": "bottom center",
            "transform": "rotate(100deg)"
        });
    }
    else {
        $(".corndog").css({
            "left": $(ducky).position().left + 525,
            "top": parseInt($(".corndog").css("top")) + 180 + "px",
            "transform-origin": "bottom center",
            "transform": "rotate(-100deg)"
        });
    }

    setTimeout(returnCorndog, 300);
}

function returnCorndog() {
    $(".corndog").css({
        "left": "calc(50vw - 7.2vh)",
        "top": "8vh",
        "transform-origin": "middle center",
        "transform": "scale(1)"
    });
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

class Ducky {
    constructor(x, y, friction) {
        this.dir = 1;
        this.x = x;
        this.y = y;
        this.acc = .6;
        this.friction = friction;
        this.moveNum = 0;
        this.duck = $('<div>', {
            class: 'ducky',
        }).appendTo('.background');
    }

    move() {
        this.moveNum++;
        if (this.moveNum === 200) {
            var dirNum = getRandomInt(1, 4);
            switch (dirNum) {
                case 1:
                    this.dir = -1;
                    $(this.duck).css("background-image", "url('Assets/DuckSprites/duckLeft.gif')");
                    break;
                case 2:
                    if (this.dir == -1) {
                        $(this.duck).css("background-image", "url('Assets/DuckSprites/still-left.png')");
                    }
                    else if (this.dir == 1) {
                        $(this.duck).css("background-image", "url('Assets/DuckSprites/still-right.png')");
                    }

                    this.dir = 0;
                    break;
                case 3:
                    this.dir = 1;
                    $(this.duck).css("background-image", "url('Assets/DuckSprites/duckRight.gif')");
                    break;
            }
            this.moveNum = 0;
        }

        this.x += this.dir;
        this.x += this.dir;
        $(this.duck).css("left", this.x + "px");

        if (parseInt($(this.duck).css("left")) >= window.innerWidth - $(this.duck).width()) {
            this.dir = -this.dir;
            $(this.duck).css("background-image", "url('Assets/DuckSprites/duckLeft.gif')");
        }
        else if (parseInt($(this.duck).css("left")) <= 0) {
            this.dir = -this.dir;
            $(this.duck).css("background-image", "url('Assets/DuckSprites/duckRight.gif')");
        }
    }
}