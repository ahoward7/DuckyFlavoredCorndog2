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
    })
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

class Ducky {
    constructor(x, y, friction) {
        console.log(x, y, friction);
        this.dir = 2;
        this.x = x;
        this.y = y;
        this.acc = .6;
        this.friction = friction;
        this.duck = $('<div>', {
            class: 'ducky',
        }).appendTo('.background');
    }

    move() {
        this.x+=this.dir;
        $(this.duck).css("left", this.x + "px");

        if (parseInt($(this.duck).css("left")) >= window.innerWidth - $(this.duck).width()) {
            this.dir = -this.dir
            $(this.duck).css("background-image", "url('Assets/DuckSprites/duckLeft.gif')");
        }
        else if (parseInt($(this.duck).css("left")) <= 0) {
            this.dir = -this.dir
            $(this.duck).css("background-image", "url('Assets/DuckSprites/duckRight.gif')");
        }
    }
}