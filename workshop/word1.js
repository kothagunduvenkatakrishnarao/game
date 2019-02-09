$(document).ready(function () {
    var belt = [];
    var word = [];
    manpos = -1;
    function makeid() {
        var text = "";
        var d = 8;
        var possible = "abcdefghijklmnopqrstuvwxyz";

        for (var i = 0; i < d; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }
    belt.push(alphabet_belt(makeid(), "belt1", "400px", "0px", "belts", 1500));
    belt.push(alphabet_belt(makeid(), "belt2", "200px", "0px", "belts", 1500));
    belt.push(alphabet_belt(makeid(), "belt3", "0px", "0px", "belts", 1500));
    belt.push(alphabet_belt(makeid(), "belt3", "0px", "0px", "belts", 1500));
    var onbelt = -1;
    var getalphabet = function () {
        var man = $('#man');
        //console.log(manpos, Math.floor((man.position().left + 50) / 100));
        if (manpos == -1) manpos = Math.floor((man.position().left + 50) / 100);
        console.log(manpos);
        //console.log(belt[onbelt].chars[i]);
        man.remove();
        man.appendTo(belt[onbelt].elements[manpos]);
        man.css({ bottom: "1%" });
        return belt[onbelt].chars[manpos];
    }
    $(document).keypress(function (e) {
        if (e.keyCode == 39 && manpos > -1 && manpos < 6) {
            $('audio#step')[0].play();
            var man = $('#man');
            //man.stop();
            //man.css({left:man.position().left()/100+"px"})
            manpos++;
            word[onbelt] = getalphabet();
            $('#word').text(word);
        }
        var n = 0;
        if (e.keyCode == 38) {
            n++;
            console.log(n);
            $('audio#step')[0].play();
            $('#man').animate({ bottom: "+=100" }, 30, function () {
                if (onbelt >= 0) {
                    belt[onbelt].stop();
                }
                onbelt++;
                // put man as child of the div on which it lands
                if (onbelt < belt.length) {
                    word[onbelt] = getalphabet();
                    $('#word').text(word);
                    belt[onbelt].move();
                } else {
                    var man = $('#man');
                    man.remove();
                    man.css({ bottom: "80%" });
                    $('#game').append(man);
                }
            })
        }
        if(score===10){
            alert("GAME OVER");
        }
    }
    )
})