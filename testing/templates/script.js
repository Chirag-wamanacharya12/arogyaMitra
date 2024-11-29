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
