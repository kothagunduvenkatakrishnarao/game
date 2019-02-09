var alphabet_belt = function (chars, beltid, top1, left1, parentid, speed) {
    var movingbelt = new Object();
    movingbelt.elements = [];
    movingbelt.speed = speed;
    movingbelt.chars = chars;
    var belt = $('<div id="' + beltid + '" class="belt">')
        .css({ top: top1, left: left1 })
        .appendTo($('#' + parentid));
    var timer;

    $(function () {
        for (i = 0; i < chars.length; i++) {
            var elem = $('<div class="child">').html(chars[i]);
            elem.appendTo(belt);
            movingbelt.elements.push(elem);
        }
    });

    movingbelt.belt = belt;

    movingbelt.move = function () {
        timer = setInterval(function () {
            belt.animate({ left: "-=100" }, speed, "linear", function () {
                movingbelt.elements[0].remove();
                movingbelt.elements[0].appendTo(belt);
                belt.css({ left: left1 });
                //manpos--
                manpos--;
                if(manpos==-1) alert("GAME OVER");
                //if manpos == -1 then game over
                //move first element in chars array and elements array to last
                movingbelt.chars = movingbelt.chars.slice(1,)+movingbelt.chars[0];
                
                var z=movingbelt.elements.shift();
                movingbelt.elements.push(z);
            })
        }, speed);
    }

    movingbelt.stop = function() {
        clearInterval(timer);
    }
    
    return movingbelt;
}