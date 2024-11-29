const video = document.getElementById("hoverVideo");

// Play the video from the beginning when hovering
video.addEventListener("mouseenter", function() {
  video.currentTime = 0;  // Reset to the start
  video.play();
});

// Pause the video when hover ends
video.addEventListener("mouseleave", function() {
  video.pause();
});
