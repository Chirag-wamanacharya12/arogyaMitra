
const videos = document.querySelectorAll('.hoverVideo');

// Loop through each video element
videos.forEach(video => {
    // Store the original source to reset later
    const originalSrc = video.src;


    video.addEventListener('mouseenter', () => {
        video.currentTime = 0; 
        video.play();          
    });

    video.addEventListener('mouseleave', () => {
        video.pause();         
        video.src = originalSrc; 
        video.load();        
    });
});

document.getElementById('appointment-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const doctor = document.getElementById('doctor').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;

    if (doctor && date && time) {
        document.getElementById('appointment-confirmation').textContent = 
            `Appointment confirmed with ${doctor} on ${date} at ${time}.`;
    } else {
        document.getElementById('appointment-confirmation').textContent = 
            'Please fill out all the fields.';
    }
});



function changeLanguage() {
    const selectedLanguage = document.getElementById('language').value;
    const contents = document.querySelectorAll('[data-lang]');

    contents.forEach(content => {
        if (content.getAttribute('data-lang') === selectedLanguage) {
            content.style.display = 'block'; // Show the selected language content
        } else {
            content.style.display = 'none'; // Hide other language content
        }
    });
}
