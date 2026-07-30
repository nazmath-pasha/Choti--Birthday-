document.addEventListener('DOMContentLoaded', () => {
    // State Management
    let currentScreen = 1;
    const audio = document.getElementById('birthday-audio');
    const startBtn = document.getElementById('start-btn');

    // 1. Navigation Controller
    function nextScreen(target) {
        document.querySelector(`#screen-${currentScreen}`).classList.remove('active');
        setTimeout(() => {
            document.querySelector(`#screen-${currentScreen}`).classList.add('hidden');
            currentScreen = target;
            const next = document.getElementById(target === 'final' ? 'final-screen' : `screen-${target}`);
            next.classList.remove('hidden');
            setTimeout(() => next.classList.add('active'), 50);
            
            // Screen specific triggers
            if(target === 2) startChat();
            if(target === 4) startHeartCollage();
            if(target === 6) startTyping();
            if(target === 7) startCountdown();
            if(target === 'final') startCelebration();
        }, 1200);
    }

    // 2. Start Project
    startBtn.addEventListener('click', () => {
        audio.play().catch(() => console.log("User interaction required for audio"));
        document.getElementById('music-control').classList.remove('hidden');
        nextScreen(2);
    });

    // 3. Chat Logic
    const chatMessages = [
        "Hey Choti ❤️",
        "Today isn't just another day...",
        "Today the world became more beautiful.",
        "I have something special for you...",
        "Keep tapping..."
    ];

    function startChat() {
        const chatBox = document.getElementById('chat-box');
        const nextBtn = document.getElementById('chat-next');
        let index = 0;

        function showNextMessage() {
            if (index < chatMessages.length) {
                const msg = document.createElement('div');
                msg.className = 'message';
                msg.innerText = chatMessages[index];
                chatBox.appendChild(msg);
                chatBox.scrollTop = chatBox.scrollHeight;
                index++;
                setTimeout(showNextMessage, 1500);
            } else {
                nextBtn.classList.remove('hidden');
            }
        }
        showNextMessage();
    }

    document.getElementById('chat-next').addEventListener('click', () => nextScreen(3));

    // 4. Gift Box Logic
    const gift = document.getElementById('main-gift');
    gift.addEventListener('click', () => {
        gift.classList.add('open');
        // Simple Fireworks trigger
        createConfetti();
        setTimeout(() => nextScreen(4), 2500);
    });

    // 5. Heart Collage Logic (Math-based)
    function startHeartCollage() {
        const container = document.getElementById('heart-collage-container');
        const totalPhotos = 30;
        const photos = [];

        for (let i = 0; i < totalPhotos; i++) {
            const img = document.createElement('img');
            // Using local placeholders as requested
            img.src = `photo${(i % 15) + 1}.jpg`; 
            img.className = 'collage-photo';
            
            // Random start positions (flying in)
            img.style.left = Math.random() * 100 + '%';
            img.style.top = Math.random() * 100 + '%';
            img.style.opacity = '0';
            
            container.appendChild(img);
            photos.push(img);
        }

        // Heart Shape Formula: 
        // x = 16 sin^3(t)
        // y = 13 cos(t) - 5 cos(2t) - 2 cos(3t) - cos(4t)
        setTimeout(() => {
            photos.forEach((img, i) => {
                const t = (i / totalPhotos) * Math.PI * 2;
                const x = 16 * Math.pow(Math.sin(t), 3);
                const y = -(13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t));
                
                const centerX = window.innerWidth / 2;
                const centerY = window.innerHeight / 2;
                const scale = window.innerWidth < 500 ? 8 : 15;

                img.style.left = `${centerX + x * scale}px`;
                img.style.top = `${centerY + y * scale}px`;
                img.style.opacity = '1';
                img.style.transform = `translate(-50%, -50%) rotate(${Math.random() * 20 - 10}deg)`;
            });
            container.classList.add('heart-beating');
        }, 500);

        // Transition to Gallery after 8 seconds
        setTimeout(() => nextScreen(5), 8500);
    }

    // 6. Slideshow Logic
    let slideIndex = 0;
    const slides = document.querySelectorAll('.slide');
    function showSlide(n) {
        slides.forEach(s => s.classList.remove('active'));
        slideIndex = (n + slides.length) % slides.length;
        slides[slideIndex].classList.add('active');
    }

    document.getElementById('next-slide').addEventListener('click', () => showSlide(slideIndex + 1));
    document.getElementById('prev-slide').addEventListener('click', () => showSlide(slideIndex - 1));
    
    // Auto transition to letter after seeing slides
    setTimeout(() => {
        if(currentScreen === 5) nextScreen(6);
    }, 15000);

    // 7. Typing Animation
    const letterText = `Dear Choti ❤️

Some people say family is only connected by blood.
I don't believe that anymore.

On 22 March 2025, inside a Nazm Instagram GC, I met someone who slowly became one of the most precious people in my life.

You became my little sister. My unblooded sister. My best friend. My comfort person.

No matter how far we are, distance has never weakened our bond. Instead, every conversation made us closer.

Thank you for trusting me. Thank you for always making me smile.

May Allah bless you with happiness, good health, success, peace, and endless beautiful memories.

No matter what happens, you'll always have a brother standing beside you.

Happy Birthday Choti. Love you forever ❤️`;

    function startTyping() {
        const target = document.getElementById('typing-text');
        const btn = document.getElementById('letter-next');
        let i = 0;
        
        function type() {
            if (i < letterText.length) {
                target.innerText += letterText.charAt(i);
                i++;
                // Speed adjustment: spaces take longer
                let speed = letterText.charAt(i-1) === '.' ? 500 : 40;
                setTimeout(type, speed);
            } else {
                btn.classList.remove('hidden');
            }
        }
        type();
    }

    document.getElementById('letter-next').addEventListener('click', () => nextScreen(7));

    // 8. Countdown Timer
    function startCountdown() {
        const startDate = new Date("March 22, 2025 00:00:00").getTime();
        
        const timer = setInterval(() => {
            const now = new Date().getTime();
            const diff = now - startDate;

            const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
            const months = Math.floor((diff % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30));
            const days = Math.floor((diff % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const secs = Math.floor((diff % (1000 * 60)) / 1000);

            document.getElementById('years').innerText = String(years).padStart(2, '0');
            document.getElementById('months').innerText = String(months).padStart(2, '0');
            document.getElementById('days').innerText = String(days).padStart(2, '0');
            document.getElementById('hours').innerText = String(hours).padStart(2, '0');
            document.getElementById('mins').innerText = String(mins).padStart(2, '0');
            document.getElementById('secs').innerText = String(secs).padStart(2, '0');
        }, 1000);
    }

    document.getElementById('final-trigger').addEventListener('click', () => nextScreen('final'));

    // 9. Final Celebration
    function startCelebration() {
        createConfetti();
        createBalloons();
        // Particle Rain
        setInterval(createFloatingHeart, 300);
    }

    function createConfetti() {
        for(let i=0; i<100; i++) {
            const conf = document.createElement('div');
            conf.style.cssText = `
                position: fixed;
                width: 10px;
                height: 10px;
                background: ${Math.random() > 0.5 ? 'var(--primary-pink)' : 'var(--primary-purple)'};
                top: -10px;
                left: ${Math.random() * 100}vw;
                z-index: 1000;
                border-radius: 50%;
                animation: fall ${Math.random() * 3 + 2}s linear forwards;
            `;
            document.body.appendChild(conf);
            setTimeout(() => conf.remove(), 5000);
        }
    }

    function createFloatingHeart() {
        const heart = document.createElement('div');
        heart.innerHTML = '❤️';
        heart.style.cssText = `
            position: fixed;
            bottom: -20px;
            left: ${Math.random() * 100}vw;
            font-size: ${Math.random() * 20 + 10}px;
            opacity: ${Math.random()};
            z-index: 5;
            pointer-events: none;
            animation: floatUp ${Math.random() * 4 + 4}s linear forwards;
        `;
        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 8000);
    }

    function createBalloons() {
        const container = document.getElementById('balloon-container');
        for(let i=0; i<15; i++) {
            const b = document.createElement('div');
            b.className = 'balloon';
            b.style.left = `${Math.random() * 90}%`;
            b.style.animationDelay = `${Math.random() * 2}s`;
            b.style.backgroundColor = `hsla(${Math.random() * 360}, 70%, 60%, 0.8)`;
            container.appendChild(b);
        }
    }

    // Replay
    document.getElementById('replay-btn').addEventListener('click', () => location.reload());

    // Music Toggle
    document.getElementById('toggle-music').addEventListener('click', () => {
        if(audio.paused) audio.play();
        else audio.pause();
    });
});

// Extra CSS for dynamic elements injected via JS
const style = document.createElement('style');
style.textContent = `
    @keyframes fall {
        to { transform: translateY(110vh) rotate(360deg); }
    }
    @keyframes floatUp {
        to { transform: translateY(-110vh) translateX(${Math.random() * 100 - 50}px); opacity: 0; }
    }
    .balloon {
        position: fixed;
        bottom: -150px;
        width: 60px;
        height: 80px;
        border-radius: 50%;
        animation: balloonFloat 10s infinite ease-in;
    }
    @keyframes balloonFloat {
        0% { transform: translateY(0); }
        100% { transform: translateY(-120vh); }
    }
`;
document.head.appendChild(style);