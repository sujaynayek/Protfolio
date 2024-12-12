// Change header background on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    } else {
        header.style.backgroundColor = 'transparent';
    }
});
// Handle form submission
document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    if (name && email && message) {
      document.getElementById('form-message').innerText = `Thank you, ${name}! Your message has been sent.`;
      document.getElementById('contact-form').reset();
    } else {
      document.getElementById('form-message').innerText = 'Please fill out all fields.';
    }
  });
  
// Display a greeting message when the page loads
window.addEventListener('load', () => {
    alert('Welcome to my portfolio website!');
});

// Smooth scrolling for section links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
