var document;
var letters = "abcdefghijklmnopqrstuvwxyz";
var lettersarray = Array.from(letters);
var letterscontainer = document.querySelector(".letters");
lettersarray.forEach(function (letter) {
    "use strict";
    var span = document.createElement("span");
    var theletter = document.createTextNode(letter);
    span.appendChild(theletter);
    span.className = 'letter-box';
    letterscontainer.appendChild(span);
});

var words = {
    Films: 
    ["infinty war", "enchanto", "deadpool", "frozen", "cinderella", "senior year", "the adam project"],
    Feelings: 
    ["happy", "sad", "dissapointed", "suprised", "shocked", "unwanted", "elated", "nervous"],
    Games: 
    ["minecraft", "fortnite", "chess", "scrabble", "fruit ninja", "maplestory", "mobile legend", "hang man", "sudoku"],
    English:
    ["rumor", "happen", "match", "sail", "sick", "floor", "summit", "shadow", "census", "chorus", "launch", "abbey", "eject", "resist", "guilt", "repeat", "drama", "easy", "morsel"],
    
};

var allkeys = Object.keys(words);
var randompropnumber = Math.floor(Math.random() * allkeys.length);
var randompropname = allkeys[randompropnumber];
var randompropvalue = words[randompropname];
var randomvaluenumber = Math.floor(Math.random() * randompropvalue.length);
var randomvaluevalue = randompropvalue[randomvaluenumber];
document.querySelector(".gameinfo .category span ").innerHTML = randompropname;
var lettersguesscontainer = document.querySelector(".lettersguess");
var lettersandspace = Array.from(randomvaluevalue);
lettersandspace.forEach(function (letter) {
    "use strict";
    var emptyspan = document.createElement("span");
    if (letter === ' ') {
        emptyspan.className = 'with-space';
    }
    lettersguesscontainer.appendChild(emptyspan);
});
var guessspans = document.querySelectorAll(".lettersguess span");
var wrongattempts = 0;
var thedraw = document.querySelector(".hangmandraw");

document.addEventListener("click",  function (e) {
    "use strict";
    var thestates = false;
    if (e.target.className === 'letter-box') {
        e.target.classList.add("clicked");
        var theclickedletter = e.target.innerHTML.toLowerCase();
        var thechosenword = Array.from(randomvaluevalue.toLowerCase());
        
        lettersandspace.forEach(function (wordletter, wordindex) {
            if (theclickedletter === wordletter) {
                thestates = true;
                guessspans.forEach(function (span, spanindex) {
                    if (wordindex === spanindex) {
                        span.innerHTML = theclickedletter;
                    }
                });  
            }
        });
        if (thestates !== true) {
            wrongattempts++;
            thedraw.classList.add('wrong-' + wrongattempts);
            if (wrongattempts === 7) {
                endgame();
                letterscontainer.classList.add(".finished");
            }

        }
    }

});

function endgame() {
    "use strict";
    var div = document.createElement("div");
    var divtext = document.createTextNode('Game over! The answer is ' + randomvaluevalue);
    div.appendChild(divtext);
    div.className = 'poup';
    document.body.appendChild(div);
}


