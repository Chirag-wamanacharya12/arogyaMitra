// Set the date and time of the meeting
var meetingTime = new Date("sep 04, 2024 16:42:00").getTime(); // Set your meeting date and time here

// Get the "Ask to join" button element
var askToJoinButton = document.querySelector(".askToJoin");

// Initially disable the button
askToJoinButton.disabled = true;

// Update the countdown every 1 second
var countdown = setInterval(function() {
    // Get the current date and time
    var now = new Date().getTime();

    // Calculate the time difference between the meeting time and now
    var timeLeft = meetingTime - now;

    // If timeLeft is greater than zero, calculate and display the countdown
    if (timeLeft > 0) {
        // Calculate the hours, minutes, and seconds left
        var hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        // Display the result in the respective spans
        document.getElementById("hrs").textContent = String(hours).padStart(2, '0');
        document.getElementById("min").textContent = String(minutes).padStart(2, '0');
        document.getElementById("sec").textContent = String(seconds).padStart(2, '0');
    } else {
        // If timeLeft is 0 or less, stop the countdown at 00:00:00
        clearInterval(countdown);
        document.getElementById("hrs").textContent = "00";
        document.getElementById("min").textContent = "00";
        document.getElementById("sec").textContent = "00";

        // Activate the "Ask to join" button
        askToJoinButton.disabled = false;

        // Display the message that the meeting has started
        document.getElementById("count_down").innerHTML = "<p class='meeting-started'>The meeting has started!</p><p class='running-time'>Running for: <span id='runningHrs'>00</span>:<span id='runningMin'>00</span>:<span id='runningSec'>00</span></p>";

        // Start the meeting running timer
        var startTime = new Date().getTime(); // Capture the time the meeting started
        var runningTimer = setInterval(function() {
            // Calculate the time the meeting has been running
            var now = new Date().getTime();
            var runningTime = now - startTime;

            // Calculate the hours, minutes, and seconds of the running time
            var runningHours = Math.floor((runningTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var runningMinutes = Math.floor((runningTime % (1000 * 60 * 60)) / (1000 * 60));
            var runningSeconds = Math.floor((runningTime % (1000 * 60)) / 1000);

            // Display the running time
            document.getElementById("runningHrs").textContent = String(runningHours).padStart(2, '0');
            document.getElementById("runningMin").textContent = String(runningMinutes).padStart(2, '0');
            document.getElementById("runningSec").textContent = String(runningSeconds).padStart(2, '0');
        }, 1000);
    }
}, 1000);

// Event listener to handle the user joining the meeting
askToJoinButton.addEventListener("click", function() {
    // Disable the button after the user clicks to join
    askToJoinButton.disabled = true;
    askToJoinButton.textContent = "Waiting for host approval..."; // Optionally, change the button text
});

const cameraButton = document.getElementById('cameraButton');
const cameraIcon = document.getElementById('cameraIcon');
const webcamElement = document.getElementById('webcam');
let userDiv = document.getElementById('userDiv');
let isCameraOn = false;

cameraButton.addEventListener('click', async () => {
    if (!isCameraOn) {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            webcamElement.srcObject = stream;
            webcamElement.style.display = 'block'; // Show the video element
            userDiv.style.display = 'none'; // Hide the user div
            cameraIcon.classList.remove('bi-camera-video-off');
            cameraIcon.classList.add('bi-camera-video');
            cameraButton.classList.add('active');
            isCameraOn = true;
        } catch (err) {
            console.error('Error accessing webcam: ', err);
        }
    } else {
        const tracks = webcamElement.srcObject.getTracks();
        tracks.forEach(track => track.stop());
        webcamElement.style.display = 'none'; // Hide the video element
        userDiv.style.display = 'block'; // Show the user div again
        cameraIcon.classList.remove('bi-camera-video');
        cameraIcon.classList.add('bi-camera-video-off');
        cameraButton.classList.remove('active');
        isCameraOn = false;
    }
});

const micButton = document.getElementById('micButton');
const micIcon = document.getElementById('micIcon');
let isMicOn = false;

async function toggleMic() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        if (stream) {
            // If microphone access is granted, turn on the mic
            if (!isMicOn) {
                micIcon.classList.remove('bi-mic-mute');
                micIcon.classList.add('bi-mic');
                micButton.classList.add('active');
                isMicOn = true;
            } else {
                // Turn off the mic
                const tracks = stream.getTracks();
                tracks.forEach(track => track.stop());
                micIcon.classList.remove('bi-mic');
                micIcon.classList.add('bi-mic-mute');
                micButton.classList.remove('active');
                isMicOn = false;
            }
        }
    } catch (err) {
        // If no microphone is found or access is denied, show an error icon and background color
        micIcon.classList.remove('bi-mic-mute');
        micIcon.classList.add('bi-exclamation');
        micButton.classList.add('error');
        console.error('Microphone not found or access denied: ', err);
    }
}

micButton.addEventListener('click', toggleMic);
