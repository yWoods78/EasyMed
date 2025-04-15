document.querySelectorAll('nav .buttons button').forEach(button => {
    button.addEventListener('click', () => {
        // Remove "active" class from all buttons
        document.querySelectorAll('nav .buttons button').forEach(btn => btn.classList.remove('active'));
        // Add "active" class to the clicked button
        button.classList.add('active');
    });
});

document.querySelectorAll('nav .togglenav').forEach(button => {
    button.addEventListener('click', () => {
        document.querySelector("nav").classList.toggle('active');
    });
});