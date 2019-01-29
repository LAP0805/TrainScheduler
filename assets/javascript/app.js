$( document ).ready(function() {
    var config = {
        apiKey: "AIzaSyCTNQMQD_8aOQNhJTwqUrqjBa6LOAj5Jio",
        authDomain: "train-scheduler-47646.firebaseapp.com",
        databaseURL: "https://train-scheduler-47646.firebaseio.com",
        projectId: "train-scheduler-47646",
        storageBucket: "train-scheduler-47646.appspot.com",
        messagingSenderId: "782545949663"
      };
firebase.initializeApp(config);


var database = firebase.database();

count=0;
//update count to count of last child. This lets me refresh the page and not have count start over, so that user can append next train in order//
database.ref().orderByKey().limitToLast(1).on("child_added",function(child){
    console.log(child.val())
    count = child.val().count;
    console.log(count);
});


database.ref().on("child_added", function(child){
   
    var trainNumber=child.val().count;
    var initialTime= child.val().initalTime;
    var initialTimeMoment = new moment(initialTime, "HH:mm").subtract(1, "years");
    var frequency = child.val().frequency;
    var now = moment();
    var difference = now.diff(initialTimeMoment, "minutes");
    var remainder = difference % frequency ;
    var minutesAway= frequency - remainder;
    var nextTrainTime = now.add(minutesAway, "m").format("HH:mm");
            
    $('#myTable tr:last').after("<tr><td>"+child.val().train+"</td><td>"+child.val().destination+"</td><td>"+child.val().frequency+"</td><td class='nextTrain"+trainNumber+"'>"+nextTrainTime+"</td><td class='minsAway"+trainNumber+"'>"+minutesAway+"</td>");
   setInterval(function(){
    var now = moment();
    var difference = now.diff(initialTimeMoment, "minutes");
    var remainder = difference % frequency ;
    var minutesAway= frequency - remainder;
    var nextTrainTime = now.add(minutesAway, "m").format("HH:mm");
    $(".nextTrain"+trainNumber).text(nextTrainTime);
    $(".minsAway"+trainNumber).text(minutesAway);
   },3000);
   
});
 
$("#submit").on("click", function(e){
    e.preventDefault();
    count++
    var train=$("#train-name").val();
    var destination=$("#train-destination").val();
    var frequency = $("#train-frequency").val();
    var initialTime=$("#train-time").val();
    
    
    ///set database info//
    database.ref().push({
        count:count,
        train:train,
        destination:destination,
        frequency:frequency,
        initalTime:initialTime
    });
    $("#train-name").val("");
    $("#train-destination").val("");
    $("#train-frequency").val("");
    $("#train-time").val("");
});


//get current time and add zeros//
function getTime(){

    var date = new Date();
        function addZero(i) {
             if (i < 10) {
            i = "0" + i;
        }
            return i;
        }
    var hours = addZero(date.getHours());
    var minutes = addZero(date.getMinutes());
    $("#timeHere").text(hours +":" + minutes);
    setInterval(function(){
        function addZero(i) {
            if (i < 10) {
           i = "0" + i;
       }
           return i;
       }
    var date = new Date();
    var hours = addZero(date.getHours());
    var minutes = addZero(date.getMinutes());
    $("#timeHere").text(hours +":" + minutes);
    }, 3000);

   
   
}
getTime();




///document ready closing tag//
});