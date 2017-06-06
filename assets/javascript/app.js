$(document).ready(function(){
    var right=0;
    var wrong=0;
    var unanswered=0;
    var timeUp=0;
    var q1={question:"A female fox is called a.. ",
        wrong1:"Ewe",
        wrong2:"Diva",
        wrong3:"Meer", 
        right:"Vixen"};
    var q2={question:" A male fox is called a..  ",
        wrong1:"Dob",
        wrong2:"Kiper",
        wrong3:"Tom", 
        right:"Dog"};
     var q3={question:" To hunt a fox uses the help of  ",
        wrong1:"Heightened heat sensing",
        wrong2:"gravitational fields",
        wrong3:"echo location", 
        right:"The Earth's magnetic field"};
     var q4={question:"What does the fox say? ",
        wrong1:"bark",
        wrong2:"scream",
        wrong3:"gecker", 
        right:"All of the others"};


    var questionObjArray=[q1,q2,q3,q4];
    //var questionObjArray=[q1];

    var timeToAnswer=10;
    
    var startImage="<img src='assets/images/fox.jpg' id='foxStartImage' />";
    var startButton="<button id='startButt' class='start-button'>START</button>";
    $('#controls').append(startButton);
    $("#controls").append(startImage);

    
    $('#startButt').click(function(){
        start();
    });
    
    var startButton;
    $("#title").html("TRIVIA GAME");
   

function reset(){
    right=0;
    wrong=0;
    unanswered=0;
        
	questionObjArray=[q1,q2,q3,q4];
    
    $("#controls").empty();
    $("#controls").append(startButton);
    $("#controls").append(startImage);
    $("#border-image").css("padding",'0px');
    $("#questionArea").css("padding",'0px');

	$('#startButt').click(function(){start();});
    $('#newGameButton').remove();
    $('#options').empty();
    $("#title").html("TRIVIA GAME");
   
}

function start(){
    
    timer.startTime(timeToAnswer);
    $("#controls").empty();
    $("#options").empty();
    $('#options').css('text-align', 'left');
    $("#title").empty();
    SVGImage = $("#foxSVG").detach();
    $("#questionArea").addClass('fox-background');
    $("#border-image").css("padding",'20px');
    $("#questionArea").css("padding",'20px');
    $("#controls").html("<div id='timer'>"+timeToAnswer+"</div>");
	chosenQ=questionObjArray[Math.floor(Math.random()*questionObjArray.length)];
    
    var answerArray=[chosenQ.wrong1,chosenQ.wrong2,chosenQ.wrong3,chosenQ.right];
    questionObjArray.splice(questionObjArray.indexOf(chosenQ), 1);
    //var answerArray=[wrong1,wrong2,wrong3,right];
	$("#title").html("<p>"+chosenQ.question+"</p>");
    var answerArrayShuffle=shuffle(answerArray);


    function shuffle(array){
        var newArray=[];
        for(var i=0; array.length>0; i++){
            var j=Math.floor(Math.random()*array.length);
            var item=array[j];
            newArray.push(item);
            array.splice(j, 1);
        }
        return newArray;
    }

    console.log(answerArrayShuffle);

    for(var i=0; i<answerArrayShuffle.length; i++){
        var id="optButt"+i;
        var optButton="<p><button class='option-button' id="+id+">"+answerArrayShuffle[i]+"</button></p>";
        $("#options").append(optButton);
        
        if(answerArrayShuffle[i]==chosenQ.right){
            $("#optButt"+i).click(function(){
                right ++;
                timeOut("right","CORRECT!");
            });
        }
        else{
            $("#optButt"+i).click(function(){
                wrong ++;
                timeOut("wrong","WRONG!");
                
            });
        }
        //class='option-button'>"+chosenQ.answerArrayShuffle[i]+"</button>";
        
        
    }
}


function timeOut(rightWrong, message){
    
    clearInterval(intervalId);
    
    $("#options").empty();
    $("#title").empty();
    $("#controls").empty();
    //$("#timer").remove();
    $("#title").html(message);
    $("#questionArea").removeClass('fox-background');
    $('#options').css('text-align', 'center');

    var newDiv=$("<div id='answerDiv'></div>");
    newDiv.append("<p id='correctAnswer'>The Correct Answer Was: "+chosenQ.right+"</p>");
    newDiv.appendTo("#options");
    var newDiv2=$("<div id=right-wrong-img-div></div>");
    $("#controls").append(newDiv2);
    if(rightWrong==="right"){
        $("#correctAnswer").css("color","green");
        $("#right-wrong-img-div").append("<img id='sadFox' class='right-wrong-img' src='assets/images/happyFox.jpg' />");
        // var newWidth=$("#happyFox").css("width");
        // right-wrong-img-div.css("width",newWidth);
    }
    else{
        $("#correctAnswer").css("color","red");
        $("#right-wrong-img-div").append("<img id='happyFox' class='right-wrong-img' src='assets/images/sadFox.jpg' />");
        // var newWidth=$("#happyFox").css("width");
        // right-wrong-img-div.css("width",newWidth);
    }
   
    if(questionObjArray.length==0){
        goodbye();
    }
    else{
        setTimeout(start,5000);
    }
}
function goodbye(){
   // $('#controls').empty();
   $("#answerDiv").append("<p class=>YOU HAVE ANSWERED ALL THE QUESTIONS</p>");
   $("#answerDiv").append("<p>YOU HAVE "+right+ " RIGHT ANSWERS</p>");
   $("#answerDiv").append("<p>YOU HAVE "+wrong+ " WRONG ANSWERS</p>");
   $("#answerDiv").append("<p>YOU HAVE "+unanswered+ " UNANSWERED QUESTIONS</p>");

   $("#startButt").remove();
   $('#right-wrong-img-div').append("<button id='newGameButton' class='new-button'>New Game</button>");
   $('#newGameButton').click(function(){reset();})
}
var timeLeft;
var intervalId;
var timer={
    startTime: function(startSeconds){
        timeLeft=startSeconds;
        $('#timer').html(startSeconds);
        intervalId = setInterval(timer.countDown, 1000);
    },
    countDown: function() {
    timeLeft--;
    //var currentTime=stopwatch.timeConverter(timeLeft);
    $('#timer').html(timeLeft);
    if(timeLeft==0){
        unanswered ++;
        timeOut("wrong", "TIME'S UP!");
    }
    
  }
}
});



    


    