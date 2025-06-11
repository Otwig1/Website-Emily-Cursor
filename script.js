document.addEventListener('DOMContentLoaded', function() {
    // Form submission handling
    const appointmentForm = document.getElementById('appointment-form');
    
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const email = document.getElementById('email').value;
            const date = document.getElementById('date').value;
            const message = document.getElementById('message').value;
            
            // Simple validation
            if (!name || !phone || !email || !date) {
                alert('אנא מלא את כל השדות הנדרשים');
                return;
            }
            
            // In a real website, here you would send the data to a server
            // For demo purposes, we'll just show a success message
            alert('הבקשה לתור נשלחה בהצלחה! נציגנו יצרו איתך קשר בהקדם.');
            
            // Reset form
            appointmentForm.reset();
        });
    }
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // Offset for the fixed header
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Mobile navigation toggle
    const createMobileNav = () => {
        if (window.innerWidth <= 768 && !document.querySelector('.mobile-nav-toggle')) {
            const nav = document.querySelector('nav');
            const navList = nav.querySelector('ul');
            
            // Create toggle button
            const toggleButton = document.createElement('button');
            toggleButton.classList.add('mobile-nav-toggle');
            toggleButton.innerHTML = '☰';
            toggleButton.setAttribute('aria-label', 'Toggle navigation');
            
            // Insert before the nav list
            nav.insertBefore(toggleButton, navList);
            
            // Toggle navigation on click
            toggleButton.addEventListener('click', function() {
                navList.classList.toggle('show');
                
                // Change button text based on state
                this.innerHTML = navList.classList.contains('show') ? '✕' : '☰';
            });
            
            // Style for mobile navigation
            const style = document.createElement('style');
            style.textContent = `
                nav ul {
                    display: none;
                }
                nav ul.show {
                    display: flex;
                }
                .mobile-nav-toggle {
                    display: block;
                    background: none;
                    border: none;
                    font-size: 1.5rem;
                    cursor: pointer;
                    padding: 0.5rem;
                    margin: 0 auto;
                    color: var(--primary-color);
                }
            `;
            document.head.appendChild(style);
        }
    };
    
    // Check for mobile view on load and resize
    if (window.innerWidth <= 768) {
        createMobileNav();
    }
    
    window.addEventListener('resize', function() {
        if (window.innerWidth <= 768 && !document.querySelector('.mobile-nav-toggle')) {
            createMobileNav();
        }
    });
    
    // Add current year to the footer copyright
    const currentYear = new Date().getFullYear();
    const footerYear = document.querySelector('footer p');
    if (footerYear) {
        footerYear.innerHTML = footerYear.innerHTML.replace('2023', currentYear);
    }
});

// Media Carousel functionality
let currentMediaIndex = 0;
const totalMediaItems = 2;

function showMedia(index) {
    const mediaItems = document.querySelectorAll('.media-item');
    
    // Remove active class from all items
    mediaItems.forEach(item => item.classList.remove('active'));
    
    // Add active class to current item
    if (mediaItems[index]) {
        mediaItems[index].classList.add('active');
        
        // Pause any videos that are not currently showing
        mediaItems.forEach((item, i) => {
            const video = item.querySelector('video');
            if (video && i !== index) {
                video.pause();
            }
        });
    }
}

function nextMedia() {
    currentMediaIndex = (currentMediaIndex + 1) % totalMediaItems;
    showMedia(currentMediaIndex);
}

function prevMedia() {
    currentMediaIndex = (currentMediaIndex - 1 + totalMediaItems) % totalMediaItems;
    showMedia(currentMediaIndex);
} 