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
      console.log(snap.val());

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
        + "next arrival"
        + "</td>"
        + "<td>"
        + "minutes away"
        + "</td>"
        + "</tr>"
    )

  })