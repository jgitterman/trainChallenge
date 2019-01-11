// Steps to complete:

// 1. Initialize Firebase
// 2. Create button for adding new employees - then update the html + update the database
// 3. Create a way to retrieve employees from the employee database.
// 4. Create a way to calculate the months worked. Using difference between start and current time.
//    Then use moment.js formatting to set difference in months.
// 5. Calculate Total billed

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyA7W8wzqncq8-nlJgwU6TpNPzy9QOH_LUQ",
    authDomain: "classwork-b701d.firebaseapp.com",
    databaseURL: "https://classwork-b701d.firebaseio.com",
    projectId: "classwork-b701d",
    storageBucket: "classwork-b701d.appspot.com",
    messagingSenderId: "1003766635121"
  };

  firebase.initializeApp(config);

var database = firebase.database();

// 2. Button for adding Trains
$("#trainBTN").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#trainNameInput").val().trim();
  var trainDest = $("#destInput").val().trim();
  var trainStart = $("#startInput").val().trim();
  var trainFreq = $("#freqInput").val().trim();

  // Creates local "temporary" object for holding train data
  var newTrain = {
    name: trainName,
    dest: trainDest,
    start: trainStart,
    freq: trainFreq
  };

  // Uploads train data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.dest);
  console.log(newTrain.start);
  console.log(newTrain.freq);

  alert("Train successfully added");

  // Clears all of the text-boxes
  $("#trainNameInput").val("");
  $("#destInput").val("");
  $("#startInput").val("");
  $("#freqInput").val("");
});

// 3. Create Firebase event for adding trains to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var trainDest = childSnapshot.val().dest;
  var trainStart = childSnapshot.val().start;
  var trainFreq = childSnapshot.val().freq;

  // Train Info
  console.log(trainName);
  console.log(trainDest);
  console.log(trainStart);
  console.log(trainFreq);

  // Prettify the train start
  var firstTrainConverted = moment(trainStart, "HH:mm").subtract(1, "years");
  var trainStartPretty = firstTrainConverted.format("hh:mm");
  console.log(trainStartPretty)

  // INSERT MATH HERE
    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTrainConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % trainFreq;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = trainFreq - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

  // Create the new row
  var newRow = $("<tr>").append(
    $("<td>").append(trainName),
    $("<td>").append(trainDest),
    $("<td>").append(trainStartPretty),
    $("<td>").append(trainFreq),
    $("<td>").append(nextTrain.format("hh:mm")),
    $("<td>").append(tMinutesTillTrain),
  );

  // Append the new row to the table
  $("#trainTable > tbody").append(newRow);
});
