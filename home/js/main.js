// Smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Only process internal links
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    // Add offset for fixed header
                    const headerOffset = 80;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    const navbarCollapse = document.querySelector('.navbar-collapse');
                    if (navbarCollapse.classList.contains('show')) {
                        document.querySelector('.navbar-toggler').click();
                    }
                }
            }
        });
    });

    // Add active class to navbar items on scroll
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelector('.navbar-nav a[href="#' + sectionId + '"]')?.classList.add('active');
            } else {
                document.querySelector('.navbar-nav a[href="#' + sectionId + '"]')?.classList.remove('active');
            }
        });
    });

    // Create placeholder images if they don't exist
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', function() {
            this.src = 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_1%20text%20%7B%20fill%3A%23ffffff%3Bfont-weight%3Anormal%3Bfont-family%3A%22Inter%22%2C%20sans-serif%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_1%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%233a86ff%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22285%22%20y%3D%22220%22%3EEthnotary%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E';
            this.alt = 'Placeholder - ' + (this.alt || 'Image');
        });
    });
});

// Handle newsletter form submissions
document.addEventListener('DOMContentLoaded', function() {
    const newsletterForm = document.querySelector('footer form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (email) {
                // For now, just show an alert - in production this would connect to a newsletter service
                alert('Thank you for subscribing with ' + email);
                emailInput.value = '';
            }
        });
    }
});
