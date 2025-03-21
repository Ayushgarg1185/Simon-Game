var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

function nextSequence(){
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    level++;
    $("#level-title").text("Level " + level);
}

$(".btn").click(function(){
    
    var userChosenColour = this.id;
    $("#" + userChosenColour).fadeOut(100).fadeIn(100);
    playSound(userChosenColour);
    if(!started){
        setTimeout(nextSequence, 1000);
        started=true;
    }
    else{
        userClickedPattern.push(userChosenColour); 
        checkAnswer(userClickedPattern.length - 1);
    }
   
});

function playSound(name){
    var soundEffect = new Audio("sounds/" + name + ".mp3");
    soundEffect.play();
}

function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

$(document).keypress(function(){
    if(!started){
        nextSequence();
        started = true;
        $("level-title").text("Level "+level);
    }
})

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        if(gamePattern.length === userClickedPattern.length){
            setTimeout(function(){
                nextSequence();
            }, 1000);
            userClickedPattern = [];
        }
    }
    else{
        $("#level-title").text("Game Over, Press Any Key to Restart");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
        playSound("wrong");
        startOver();
    }
}


function startOver(){
    gamePattern = [];
    userClickedPattern = [];
    started = false;
    level = 0;
}
