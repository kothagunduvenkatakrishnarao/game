n = 0;
$(document).ready(function () {
    start_time = new Date();
    score = 0;
    var score_disp = $("#score");
    var belt = [];
    var word = [];
    manpos = -1;
    function makeid() {
        var text = "";
        var d = 8;
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

        for (var i = 0; i < d; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }
    /*$("lll.txt",{},function(){
        
    })*/
    var reset = function () {
        score_disp.text("00");
        score = 0;
        start_time = new Date();
    }
    /*setInterval(function () {
        console.log(score_disp.val());
        var current_time = new Date();
        score = Math.floor((current_time - start_time) / 1000);
        score_disp.text(score);
    }, 700);*/
    belt.push(alphabet_belt("abcdmakan", "belt1", "400px", "0px", "belts", 1500));
    belt.push(alphabet_belt("aksncajkn", "belt2", "200px", "0px", "belts", 1500));
    belt.push(alphabet_belt("kdsvlkgrn", "belt3", "0px", "0px", "belts", 1500));
    var onbelt = -1;
    var words = [];
    $.get('words.txt', {}, function (data) {
        words = data.split('\n');
    });
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
        texti = "";
        for (var member in word) {
            texti += word[member];
            console.log(texti)
        }
        var cardRules = new Array();
        $.get('words.txt', function (data) {
            cardRules = data.split('\n');
            console.log(cardRules);
        });
        b="\\r"
        if (n ==4) {
            texti += b;
            console.log(texti)
            if (jQuery.inArray( texti , cardRules ) != -1) {
                alert("YOU WIN");
            } else {
                alert("YOU LOOSE");
            }
        }
    })
})