// JavaScript  document

// *****************************************//
// This simple JS code is applying firebase and moment.js technology to build a train scheduler application.
// ***************************************//

// Document Ready
$(document).ready(function () {
    // Declare global variables
    // Show and Hide Train toggle button display control
    $('#add-train').click(function () {
        if ($(this).text() === "Add Train") {
            $(this).text("Hide Add Train");
        } else {
            $(this).text("Add Train");
        }
    });

    // Declare variables
    let trainName = $("#train-name").val().trim();
    let destination = $("#destination").val().trim();
    let frequency = $("#frequency").val().trim();
    let firstTime = $("#time").val().trim();

    let convertedTime = 


    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyBWc7XnscxX5CEoehemxBI2OGAyYQtDM9E",
        authDomain: "train-scheduler-bc5e7.firebaseapp.com",
        databaseURL: "https://train-scheduler-bc5e7.firebaseio.com",
        projectId: "train-scheduler-bc5e7",
        storageBucket: "",
        messagingSenderId: "597940315002"
    };
    firebase.initializeApp(config);

    // Reference firebase database
    let database = firebase.database();

    // Push values to database
    database.ref().push({
        trainName: trainName,
        destination: destination,
        frequency: frequency,
        time:time,
        mintues: mintues,
    })

})