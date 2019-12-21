var firebaseConfig = {
  apiKey: "AIzaSyDCnsQOwoMuhBC4vj9r1KiqestNczb_Jm0",
  authDomain: "train-scheduler-54e8a.firebaseapp.com",
  databaseURL: "https://train-scheduler-54e8a.firebaseio.com",
  projectId: "train-scheduler-54e8a",
  storageBucket: "train-scheduler-54e8a.appspot.com",
  messagingSenderId: "789933951409",
  appId: "1:789933951409:web:75799bd476706749595590"
};

firebase.initializeApp(firebaseConfig);

var database = firebase.database();

$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  trainName = $("#name-input")
    .val()
    .trim();
  destination = $("#destination-input")
    .val()
    .trim();
  firstArrival = $("#trainTime-input")
    .val()
    .trim();
  arrivalFrequency = $("#frequency-input")
    .val()
    .trim();

  var newTrain = {
    trainName: trainName,
    destination: destination,
    firstArrival: firstArrival,
    arrivalFrequency: arrivalFrequency
  };

  database.ref().push(newTrain);

  alert("Your train has been added");

  $("#name-input").val("");
  $("#destination-input").val("");
  $("#trainTime-input").val("");
  $("#frequency-input").val("");
});

database.ref().on("child_added", function(childSnapshot) {
  var trainName = childSnapshot.val().trainName;
  var destination = childSnapshot.val().destination;
  var firstArrival = childSnapshot.val().firstArrival;
  var arrivalFrequency = childSnapshot.val().arrivalFrequency;

  var tFrequency = arrivalFrequency;

  var firstTime = firstArrival;

  var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");

  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");

  var tRemainder = diffTime % tFrequency;

  var tMinutesTillTrain = tFrequency - tRemainder;

  var nextTrain = moment()
    .add(tMinutesTillTrain, "minutes")
    .format("hh:mm");

  $("#train-table > tbody").append(
    "<tr><td>" +
      trainName +
      "</td><td>" +
      destination +
      "</td><td>" +
      arrivalFrequency +
      "</td><td>" +
      nextTrain +
      "</td><td>" +
      tMinutesTillTrain +
      "</td></tr>"
  );
});
