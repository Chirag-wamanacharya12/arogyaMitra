document.getElementById('appointmentForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Display success message
    const refId = Math.floor(Math.random() * 1000000); // Random reference ID
    document.getElementById('refId').textContent = refId;
    document.getElementById('successMessage').style.display = 'block';
});

document.getElementById('appointmentForm').addEventListener('input', function() {
    // Preview confirmation details in real-time
    document.getElementById('confirmName').textContent = document.getElementById('name').value;
    document.getElementById('confirmEmail').textContent = document.getElementById('email').value;
    document.getElementById('confirmMobile').textContent = document.getElementById('mobile').value;
    document.getElementById('confirmAppointmentType').textContent = document.getElementById('appointment-type').value;
    document.getElementById('confirmDoctor').textContent = document.getElementById('doctor').value;
    document.getElementById('confirmDate').textContent = document.getElementById('date').value;
    document.getElementById('confirmTime').textContent = document.getElementById('time').value;
});

// Edit button functionality to make changes
document.getElementById('editBtn').addEventListener('click', function() {
    document.getElementById('successMessage').style.display = 'none';
});
