$(document).ready(function(){

    var right=0;
    var wrong=0;
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
    var timeToAnswer=10;
	$('#startButt').click(function(){
        start();
    });
    var SVGImage;
    var startButton;
    //$("#title").animate({left: "100vw"},1000)
    //setTimeout(tenSeconds, 10000);
    // setInterval(moveTitle, 1000);
    // function moveTitle(){
    //     $("#title").animate({left: "100vw"},1000)
    //     $("#title").css('left', '0px' );
    // }

function start(){
    
    timer.startTime(timeToAnswer);
    startButton=$("#startButt").detach();
    $("#options").empty();
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
            console.log(j);
            console.log(array);
            var item=array[j];
            console.log(item);
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
        console.log(chosenQ.right);
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
        console.log("ppppp");
        
    }
}
//function checkGuess(value, currentQuestion){ for(var i=0; i<question.length; i+=1{
//if (question[i][currentQuestion].answer===value){return value;}
//} };
//checkGuess('blue','Q1');
//"blue"

function timeOut(message, type){
    
    clearInterval(intervalId);
    

    $("#options").empty();
    $("#title").empty();
    $("#timer").remove();
    $("#title").html(message);
    var newDiv=$("<div id='answerDiv'></div>");
    newDiv.append("<p id='correct'>The Correct Answer Was:"+chosenQ.right+"</p>");
    //SVGImage.appendTo("body");
 
    //var backgroundRem=$("#questionArea").css("background-image");
    $("#questionArea").removeClass('fox-background');
    newDiv.appendTo("#options");
    startButton.appendTo("body");
    $("#startButt").text("Next Question");
    $("#startButt").removeClass('start-css-button');
    $("#startButt").css("position","relative");
    $("#startButt").css("top","100px");
    if(questionObjArray.length==0){
        goodbye();
    };
}
function goodbye(){
   $("#options").append("<p>YOU HAVE ANSWERED ALL THE QUESTIONS</p>");
   $("#options").append("<p>YOU HAVE "+right+ " RIGHT ANSWERS</p>");
   $("#options").append("<p>YOU HAVE "+wrong+ " WRONG ANSWERS</p>")
   $("#startButt").remove();
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
        wrong ++;
        timeOut("TIME'S UP!", wrong);
    }
    
  }
}
});



    


    