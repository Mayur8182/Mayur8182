// script.js

// Basic example: Show an alert on form submission
document.getElementById('booking-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission
    alert('Booking form submitted!');
});