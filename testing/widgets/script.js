const videoSlides = document.querySelectorAll('.video-slide video');
const fullscreenVideoContainer = document.getElementById('fullscreenVideoContainer');
const fullscreenVideo = document.getElementById('fullscreenVideo');

// Function to open video in fullscreen
function openFullscreen(videoSrc) {
    // Set video source to the clicked video
    fullscreenVideo.src = videoSrc;
    
    // Show fullscreen container
    fullscreenVideoContainer.style.display = 'flex';
    
    // Play video
    fullscreenVideo.play();
    
    // Add blur effect to background
    document.body.classList.add('blur-background');
}

// Add event listener to each video to open it in fullscreen
videoSlides.forEach(video => {
    video.addEventListener('click', (e) => {
        openFullscreen(e.target.src);
    });
});

// Function to close fullscreen video
function closeFullscreen() {
    // Hide fullscreen container
    fullscreenVideoContainer.style.display = 'none';
    
    // Pause the fullscreen video
    fullscreenVideo.pause();
    
    // Remove the blur effect from background
    document.body.classList.remove('blur-background');
}
