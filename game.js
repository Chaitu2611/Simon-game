buttonColours=["red", "blue", "green", "yellow"];
gamePattern=[];
userClickedPattern=[];

var started=false;
var level=0;
var highScore=0;

$(document).keypress(function(){
    if(!started){
        $("#level-title").text("Level "+level);
        nextSequence();
        started=true;
    }
});

$(".btn").click(function (){

    var userChosenColour=$(this).attr("id");
    userClickedPattern.push(userChosenColour);
    
    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){ 

        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
                nextSequence();
              }, 1000);
        }
    }
    else{
        var audio=new Audio("sounds/wrong.mp3");
        audio.play();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("#level-title").text("Game Over, Press Any Key to Restart")
        startOver();
    }
}

function startOver(){
    highScore=Math.max(highScore,level);
    $("h2").text("High Score: "+highScore);
    level=0;
    gamePattern=[];
    started=false;
}

function nextSequence(){

    userClickedPattern = [];

    level++;
    $("#level-title").text("Level " + level);

    var randNo=Math.floor(Math.random()*4);
    var randColor=buttonColours[randNo];
    gamePattern.push(randColor);

    $("#"+randColor).fadeOut(100).fadeIn(100);
    playSound(randColor);
    
}

function playSound(name){

    var audio_file= "sounds/"+name+".mp3"
    var audio = new Audio(audio_file);
    audio.play();
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    }, 100);
}
