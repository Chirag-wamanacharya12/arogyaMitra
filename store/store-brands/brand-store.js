let slideIndex = 0;
showSlides();

function showSlides() {
  let i;
  let slides = document.getElementsByClassName("slide-item");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}
  slides[slideIndex-1].style.display = "block";
  setTimeout(showSlides, 2000); // Change image every 2 seconds
}
// ---------------- Drop down menu ---------------------------------
const dropdownBtn = document.querySelector('.dropdown-btn');
const dropdown = document.querySelector('.dropdown');

dropdownBtn.addEventListener('click', () => {
    dropdown.classList.toggle('show');
});

window.addEventListener('click', function(e) {
    if (!dropdown.contains(e.target)) {
        dropdown.classList.remove('show');
    }
});
