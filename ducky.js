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