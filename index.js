var level = 0;
var gamestarted = false;
var colors = ['green','red','yellow','blue'];
var colorToHighLight = [];
var keyDownNeeded = true;
var userClickedPattern = []
$(document).keydown(function(){

    if(!gamestarted) {
        
        $('#level-title').text("Level "+level);
        
        gameStart();
        gamestarted = true;
    } 
});
function checkAnswer(currentLevel) {
    if(colorToHighLight[currentLevel] == userClickedPattern[currentLevel]) {
        if(colorToHighLight.length === userClickedPattern.length) {
            setTimeout(function(){
                gameStart()
            },1000)
        }
    } else {
        playColourSound("wrong");
        $('body').addClass('game-over')
        $("#level-title").text("Game over, press key to begin again")

        setTimeout(function(){
            $('body').removeClass('game-over')
            startAgain();
        },200)
    }
}
function startAgain() {
    gamestarted = false;
    level = 0 ;
    colorToHighLight =[];
    userClickedPattern = []

}
function gameStart() {
        userClickedPattern = []
        level++;
        $("#level-title").text("Level " + level);
        var generatedColorIndex = Math.floor(Math.random()*4)
        
        colorToHighLight.push(colors[generatedColorIndex]);
        
        $("#" + colors[generatedColorIndex]).fadeIn(100).fadeOut(100).fadeIn(100);
        playColourSound(colors[generatedColorIndex])
        

        
}

$('.btn').click(function(){
   
    var chosenColor = $(this).attr("id");
    userClickedPattern.push(chosenColor)
    
    playColourSound(chosenColor)
    checkAnswer(userClickedPattern.length - 1 )
})

function playColourSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
  }

  function pressedClass(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
      $("#" + currentColor).removeClass("pressed");
    }, 300);
  }