  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAL4e_XXLvD_2KivvW0GvAzxIY8rsWwUxc",
    authDomain: "trainschedule-fe9da.firebaseapp.com",
    databaseURL: "https://trainschedule-fe9da.firebaseio.com",
    projectId: "trainschedule-fe9da",
    storageBucket: "",
    messagingSenderId: "1076729219884"
  };
  firebase.initializeApp(config);

  var database = firebase.database();
  $("#submit").on("click", function(event){

    event.preventDefault();

      var name = $("#trainName").val().trim();
      var destination = $("#destination").val().trim();
      var firstTrain = $("#firstTrain").val().trim();
      var frequency = $("#frequency").val().trim();

      database.ref().push({
        name: name,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency
      });

  })

  database.ref().on("child_added", function(snap){

      var fTime = snap.val().frequency;

      var sTime = snap.val().firstTrain;

    var tFrequency = 17;

    var firstTime = "03:00";

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(sTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % fTime;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = fTime - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

      $("#tableInfo").append(
        "<tr>"
        + "<td>"
        + snap.val().name
        + "</td>"
        + "<td>"
        + snap.val().destination
        + "</td>"
        + "<td>"
        + snap.val().frequency
        + "</td>"
        + "<td>"
        + moment(nextTrain).format("hh:mm")
        + "</td>"
        + "<td>"
        + tMinutesTillTrain
        + "</td>"
        + "</tr>"
    )

  })