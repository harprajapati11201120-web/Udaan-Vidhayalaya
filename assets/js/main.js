// Main JS for Udaan Vidhyalaya

document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS Animation
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });

    // Loader
    const loader = document.getElementById('loader');
    if (loader) {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }, 1500); // Show loader for 1.5 seconds
    }

    // Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    const logoText = document.querySelector('.font-heading');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('nav-scrolled');
            navbar.classList.remove('py-4');
            navbar.classList.add('py-2');
        } else {
            navbar.classList.remove('nav-scrolled');
            navbar.classList.add('py-4');
            navbar.classList.remove('py-2');
        }
    });

    // Counter Animation
    const counters = document.querySelectorAll('.counter');
    let hasCounted = false;

    const startCounters = () => {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const speed = 200;
            const increment = target / speed;

            const updateCount = () => {
                const count = +counter.innerText;
                if (count < target) {
                    counter.innerText = Math.ceil(count + increment);
                    setTimeout(updateCount, 20);
                } else {
                    counter.innerText = target + "+";
                }
            };
            updateCount();
        });
    };

    // Scroll Observer for Counters
    const aboutSection = document.querySelector('#about');
    if (aboutSection) {
        window.addEventListener('scroll', () => {
            const position = aboutSection.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            if (position < screenPosition && !hasCounted) {
                startCounters();
                hasCounted = true;
            }
        });
    }

    // Scroll to Top Button
    const scrollToTopBtn = document.getElementById('scroll-to-top');
    if (scrollToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollToTopBtn.classList.remove('opacity-0', 'translate-y-20');
            } else {
                scrollToTopBtn.classList.add('opacity-0', 'translate-y-20');
            }
        });

        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Mobile Menu Toggle logic (kept from previous version)
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const closeMenuBtn = document.getElementById('close-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.remove('translate-x-full');
        });

        closeMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.add('translate-x-full');
        });

        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('translate-x-full');
            });
        });
    }
    // Dark Mode Toggle
    const darkModeBtn = document.getElementById('dark-mode-toggle');
    const html = document.documentElement;

    // Check saved preference
    if (localStorage.getItem('theme') === 'dark') {
        html.classList.add('dark');
        if (darkModeBtn) darkModeBtn.innerHTML = '<i class="fas fa-sun"></i>';
    }

    if (darkModeBtn) {
        darkModeBtn.addEventListener('click', () => {
            html.classList.toggle('dark');
            if (html.classList.contains('dark')) {
                localStorage.setItem('theme', 'dark');
                darkModeBtn.innerHTML = '<i class="fas fa-sun"></i>';
            } else {
                localStorage.setItem('theme', 'light');
                darkModeBtn.innerHTML = '<i class="fas fa-moon"></i>';
            }
        });
    }

    // Live Chat Widget
    const chatToggleBtn = document.getElementById('chat-toggle-btn');
    const chatWidget = document.getElementById('chat-widget');
    const closeChatBtn = document.getElementById('close-chat-btn');
    const chatInput = document.getElementById('chat-input');
    const chatSendBtn = document.getElementById('chat-send-btn');
    const chatBody = document.querySelector('.chat-body');

    if (chatToggleBtn && chatWidget) {
        chatToggleBtn.addEventListener('click', () => {
            chatWidget.classList.toggle('active');
            chatToggleBtn.classList.toggle('hidden');
        });

        if (closeChatBtn) {
            closeChatBtn.addEventListener('click', () => {
                chatWidget.classList.remove('active');
                setTimeout(() => {
                    chatToggleBtn.classList.remove('hidden');
                }, 300);
            });
        }

        const sendMessage = () => {
            const msg = chatInput.value.trim();
            if (msg) {
                // Add user message
                const userDiv = document.createElement('div');
                userDiv.className = 'chat-msg sent';
                userDiv.innerText = msg;
                chatBody.appendChild(userDiv);

                chatInput.value = '';
                chatBody.scrollTop = chatBody.scrollHeight;

                // Simulate reply
                setTimeout(() => {
                    const botDiv = document.createElement('div');
                    botDiv.className = 'chat-msg received';
                    botDiv.innerText = "Thanks for your message! Our admissions team will get back to you shortly.";
                    chatBody.appendChild(botDiv);
                    chatBody.scrollTop = chatBody.scrollHeight;
                }, 1000);
            }
        };

        if (chatSendBtn) {
            chatSendBtn.addEventListener('click', sendMessage);
        }

        if (chatInput) {
            chatInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') sendMessage();
            });
        }
    }
});
