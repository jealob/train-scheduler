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

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyBWc7XnscxX5CEoehemxBI2OGAyYQtDM9E",
        authDomain: "train-scheduler-bc5e7.firebaseapp.com",
        databaseURL: "https://train-scheduler-bc5e7.firebaseio.com",
        projectId: "train-scheduler-bc5e7",
        storageBucket: "train-scheduler-bc5e7.appspot.com",
        messagingSenderId: "597940315002"
    };
    firebase.initializeApp(config);

    // Reference firebase database
    let database = firebase.database();

    // On Submit get the value, assign to variables then compute Next arrival and mintues away , push to database 
    $("#submit").on("click", function (event) {

        event.preventDefault();
        let name = $("#train-name").val().trim();
        let destination = $("#destination").val().trim();
        let frequency = $("#frequency").val().trim();
        let firstTime = moment($("#time").val().trim(), "HH:mm").subtract(1, "days");
        firstTime = moment(firstTime).format("X");

        // Validation to mkae sure that all field have values
        if (name && destination && frequency && firstTime) {
            let trainItinerary = {
                name: name,
                destination: destination,
                frequency: frequency,
                firstTime: firstTime,
            }

            // Push data to database
            database.ref().push(trainItinerary);
            alert("Employee successfully added");
            $("#train-name").val("");
            $("#destination").val("");
            $("#frequency").val("");
            $("#time").val("");
        }
        else {
            $('#myModal').on();     
        }
    });

    // Firebase watcher + initial loader + order/limit HINT: .on("child_added")
    database.ref().on("child_added", function (childSnapshot, prevChildKey) {
        // debugger;
        let data = childSnapshot.val();

        //  Calculate required parameters 
        let timeDiff = moment().diff(moment(data.firstTime, "X"), "minutes");
        let minutesAway = data.frequency - (timeDiff % data.frequency);
        let nextArrival = moment().add(minutesAway, "minutes");
        nextArrival = moment(nextArrival).format("hh:mm a");

        // Add train Itinerary to table
        $(".table > tbody").append("<tr><td>" + data.name + "</td><td>" + data.destination + "</td><td>" + data.frequency + "</td><td>" + nextArrival + "</td><td>" + ((minutesAway < 2) ? "due" : minutesAway) + "</td></tr>");

    }, function (errorObject) {
        console.log("Errors handled: " + errorObject.code);
    });
})