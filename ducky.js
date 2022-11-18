$(document).ready(startUp);

function startUp() {
    $(".corndog").on({
        "click": function() {
            var ducky = new Ducky(getRandomInt(100, 200));
           
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

function killDuckies() {
    $(".ducky").each(function(i, duck) {
        if (isSmashed($(".corndog"), $(duck))) {
            $(duck).remove();
        }
    });
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

function isSmashed ($div1, $div2) {
	// Div 1 data
	var d1_offset             = $div1.offset();
	var d1_height             = $div1.outerHeight( true );
	var d1_width              = $div1.outerWidth( true );
	var d1_distance_from_top  = d1_offset.top + d1_height;
	var d1_distance_from_left = d1_offset.left + d1_width;

	// Div 2 data
	var d2_offset             = $div2.offset();
	var d2_height             = $div2.outerHeight( true );
	var d2_width              = $div2.outerWidth( true );
	var d2_distance_from_top  = d2_offset.top + d2_height;
	var d2_distance_from_left = d2_offset.left + d2_width;

	var not_colliding = ( d1_distance_from_top < d2_offset.top || d1_offset.top > d2_distance_from_top || d1_distance_from_left < d2_offset.left || d1_offset.left > d2_distance_from_left );

	// Return whether it IS colliding
	return ! not_colliding;
};

class Ducky {
    constructor(w) {
        this.dir = 1;
        this.x = getRandomInt(0, window.innerWidth - w);
        this.y = getRandomInt(15, window.innerHeight - w);
        this.acc = .6;
        this.friction = .99;
        this.moveNum = 0;
        this.duck = $('<div>', {
            class: 'ducky',
        }).appendTo('.background');

        $(this.duck).css("left", this.x + "px");
        $(this.duck).css("top", this.y + "px");
        $(this.duck).css("width", w + "px");
        $(this.duck).css("height", w + "px");
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

        this.x += this.dir*2;
        $(this.duck).css("left", this.x + "px");

        if (parseInt($(this.duck).css("left")) >= window.innerWidth - $(this.duck).width()) {
            this.dir = -this.dir;
            $(this.duck).css("background-image", "url('Assets/DuckSprites/duckLeft.gif')");
        }
        else if (parseInt($(this.duck).css("left")) <= 0) {
            this.dir = -this.dir;
            $(this.duck).css("background-image", "url('Assets/DuckSprites/duckRight.gif')");
        }

        if (isSmashed($(".corndog"), $(this.duck))) {
            $(this.duck).remove();
        }
    }
}