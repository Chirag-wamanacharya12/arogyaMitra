function toggleAnswer(element) {
    // Get the next sibling element (the paragraph) and toggle its visibility
    const answer = element.nextElementSibling;
    if (answer.style.display === "block") {
        answer.style.display = "none";
    } else {
        answer.style.display = "block";
    }
}
