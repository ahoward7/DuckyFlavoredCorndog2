$(document).ready(startUp);

function startUp() {
    $(".ducky").on({
        "click": function() {
            smashDucky(this)
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

$(function() {
    var x = 0;
    var h = 1;
    setInterval(function(){
        x+=h;
        $(".ducky").css("left", x + "px");

        if (parseInt($(".ducky").css("left")) >= window.innerWidth - $(".ducky").width()) {
            h = -h
            $(".ducky").css("background-image", "url('Assets/DuckSprites/duckLeft.gif')");
        }
        else if (parseInt($(".ducky").css("left")) <= 0) {
            h = -h
            $(".ducky").css("background-image", "url('Assets/DuckSprites/duckRight.gif')");
        }
    }, 1);
})

function smashDucky(ducky) {

    if ($(".corndog").position().left <= $(".ducky").position().left) {
        $(".corndog").css({
            "left": $(ducky).position().left - 500,
            "top": parseInt($(".corndog").css("top")) + 180 + "px",
            "transform-origin": "bottom center",
            "transform": "rotate(100deg)"
        });
    }
    else {
        $(".corndog").css({
            "left": $(ducky).position().left + 500,
            "top": parseInt($(".corndog").css("top")) + 180 + "px",
            "transform-origin": "bottom center",
            "transform": "rotate(-100deg)"
        });
    }

    setTimeout(returnCorndog, 400);
}

function returnCorndog() {
    $(".corndog").css({
        "left": "calc(50vw - 7.2vh)",
        "top": "8vh",
        "transform-origin": "middle center",
        "transform": "scale(1)"
    });
}