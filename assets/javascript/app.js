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
   
})