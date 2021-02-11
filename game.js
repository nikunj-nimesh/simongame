buttonColors=["red","blue","green","yellow"];
gamePattern=[];
userClickedPattern=[];
var level=0;
var toggleIt=false;
$(document).keypress(function(){
    if(!toggleIt)
    {
        $("#level-title").text("Level "+level);
        toggleIt=true;
        nextSequence();
    }
})
function startOver()
{
    level=0,gamePattern=[],toggleIt=false;
}
function checkAnswer(currentLevel)
{
    if(gamePattern[currentLevel]==userClickedPattern[currentLevel])
    {
       if(gamePattern.length===userClickedPattern.length)
        {
             setTimeout(function(){
                 nextSequence();
             },100);
        }
    }
    else{
        var audi=new Audio("sounds/wrong.mp3");
        audi.play();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("#level-title").text("Game Over, Press any key to restart");
        startOver();
    }
}
$(".btn").on("click",function(){
    var userChosenColor=$(this).attr("id");
    userClickedPattern.push(userChosenColor);
    console.log(userClickedPattern);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
    
});
function playSound(name)
{
    var aud=new Audio("sounds/"+name+".mp3");
    aud.play();
}
function nextSequence()
{
    userClickedPattern=[];
    level++;
    $("#level-title").text("Level "+level);
    var randomNumber=Math.random();
    randomNumber=Math.floor(randomNumber*4);
    console.log(randomNumber);
    randomChosenColor=buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#"+randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
    

}
function animatePress(currentColor)
{
    $("."+currentColor).addClass("pressed");
    setTimeout(function(){
        $("."+currentColor).removeClass("pressed");
    },100);
}
