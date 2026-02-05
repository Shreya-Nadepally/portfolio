document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark')
    } else {
        document.documentElement.classList.remove('dark')
    }
})
const navbar = document.getElementById("navbar");
const navLink = document.getElementById("navLink");
const mobileMenu = document.getElementById("mobileMenu");

function openMenu() {
    mobileMenu.style.transform = 'translateX(-16rem)';
}

function closeMenu() {
    mobileMenu.style.transform = 'translateX(0)';
}

function toggleTheme() {
    document.documentElement.classList.toggle('dark');

    if (document.documentElement.classList.contains('dark')) {
        localStorage.theme = 'dark';
    } else {
        localStorage.theme = 'light';
    }
}

window.addEventListener('scroll', () => {
    if (scrollY > 50) {
        navbar.classList.add('bg-white', 'bg-opacity-50', 'backdrop-blur-lg', 'shadow-sm', 'dark:bg-darkTheme', 'dark:shadow-white/20');
        navLink.classList.remove('bg-white', 'shadow-sm', 'bg-opacity-50', 'dark:border', 'dark:border-white/30', "dark:bg-transparent");
    } else {
        navbar.classList.remove('bg-white', 'bg-opacity-50', 'backdrop-blur-lg', 'shadow-sm', 'dark:bg-darkTheme', 'dark:shadow-white/20');
        navLink.classList.add('bg-white', 'shadow-sm', 'bg-opacity-50', 'dark:border', 'dark:border-white/30', "dark:bg-transparent");
    }
})

function toggleMoreProjects(event) {
    event.preventDefault(); // Prevent page jump
    
    const moreProjects = document.getElementById('moreProjects');
    const showMoreBtn = document.getElementById('showMoreBtn');
    
    if (moreProjects.classList.contains('hidden')) {
        moreProjects.classList.remove('hidden');
        showMoreBtn.innerHTML = 'Show less<img src="./assets/right-arrow-bold.png" alt="" class="w-4 dark:hidden"><img src="./assets/right-arrow-bold-dark.png" alt="" class="w-4 hidden dark:block">';
    } else {
        moreProjects.classList.add('hidden');
        showMoreBtn.innerHTML = 'Show more<img src="./assets/right-arrow-bold.png" alt="" class="w-4 dark:hidden"><img src="./assets/right-arrow-bold-dark.png" alt="" class="w-4 hidden dark:block">';
    }
}

// EmailJS contact form function
function sendEmail(event) {
    event.preventDefault();
    
    const form = event.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.innerHTML = 'Sending... <img src="./assets/right-arrow-white.png" alt="" class="w-4">';
    submitBtn.disabled = true;
    
    // EmailJS send function
    emailjs.sendForm('service_leyogoi', 'template_kd6mcg5', form)
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            
            // Show success message
            submitBtn.innerHTML = 'Message Sent! <img src="./assets/right-arrow-white.png" alt="" class="w-4">';
            submitBtn.style.backgroundColor = '#10b981';
            
            // Reset form
            form.reset();
            
            // Reset button after 3 seconds
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                submitBtn.style.backgroundColor = '';
            }, 3000);
            
        }, function(error) {
            console.log('FAILED...', error);
            
            // Show error message
            submitBtn.innerHTML = 'Failed to send <img src="./assets/right-arrow-white.png" alt="" class="w-4">';
            submitBtn.style.backgroundColor = '#ef4444';
            
            // Reset button after 3 seconds
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                submitBtn.style.backgroundColor = '';
            }, 3000);
        });
}