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

database.ref().on("child_added", function(child){
    var initialTime= child.val().initalTime;
    initialTimeMoment = new moment(initialTime, "HH:mm")
    console.log(initialTimeMoment);
    var frequency = child.val().frequency;
    frequencyMoment= new moment(frequency, "mm")
    console.log(frequencyMoment);
 var now = moment();
 var difference = now.diff(initialTimeMoment, "minutes");
 var remainder = difference % frequency ;
 console.log(remainder);
 minutesAway= frequency - remainder;
 console.log(minutesAway);
 nextTrainTime = now.add(minutesAway, "m").format("HH:mm");
 console.log(nextTrainTime);

 

    $('#myTable tr:last').after("<tr><td>"+child.val().train+"</td><td>"+child.val().destination+"</td><td>"+child.val().frequency+"</td><td>"+nextTrainTime+"</td><td>"+minutesAway+"</td>");
    

   
});
 
$("#submit").on("click", function(e){
    e.preventDefault();
    var train=$("#train-name").val();
    var destination=$("#train-destination").val();
    var frequency = $("#train-frequency").val();
    var initialTime=$("#train-time").val();
    
    
    ///set database info//
    database.ref().push({
        train:train,
        destination:destination,
        frequency:frequency,
        initalTime:initialTime
    });
});



function getTime(){

    var date = new Date();
        var hours = date.getHours();
        var minutes = date.getMinutes();
        $("#timeHere").text(hours +":" + minutes)
    setInterval(function(){ 
        var date = new Date();
        var hours = date.getHours();
        var minutes = date.getMinutes();
    }, 3000);
   
}
getTime();











///document ready closing tag//
});