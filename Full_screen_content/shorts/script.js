// Autoplay the visible video and pause others when scrolling
const videos = document.querySelectorAll('video');

function handleVideoPlayback() {
    videos.forEach((video) => {
        const rect = video.getBoundingClientRect();
        if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
            video.play();  // Play the visible video
        } else {
            video.pause(); // Pause the others
        }
    });
}

window.addEventListener('scroll', handleVideoPlayback);

// Like button functionality
const likeBtn = document.getElementById('like-btn');
const dislikeBtn = document.getElementById('dislike-btn');
const shareBtn = document.getElementById('share-btn');

likeBtn.addEventListener('click', function() {
    // Change to filled thumbs up icon
    this.innerHTML = '<i class="bi bi-hand-thumbs-up-fill"></i>';
    // Reset dislike icon if it was pressed
    dislikeBtn.innerHTML = '<i class="bi bi-hand-thumbs-down"></i>';
});

dislikeBtn.addEventListener('click', function() {
    // Change to filled thumbs down icon
    this.innerHTML = '<i class="bi bi-hand-thumbs-down-fill"></i>';
    // Reset like icon if it was pressed
    likeBtn.innerHTML = '<i class="bi bi-hand-thumbs-up"></i>';
});

// Hover effect for share button
shareBtn.addEventListener('mouseenter', function() {
    this.innerHTML = '<i class="bi bi-send-fill"></i>';
});

// Reset icon on hover leave
shareBtn.addEventListener('mouseleave', function() {
    this.innerHTML = '<i class="bi bi-send"></i>';
});
