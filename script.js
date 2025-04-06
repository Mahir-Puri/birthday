document.addEventListener('DOMContentLoaded', function() {
    // Hide loader after 2 seconds
    setTimeout(function() {
        document.querySelector('.loader').style.opacity = '0';
        setTimeout(function() {
            document.querySelector('.loader').style.display = 'none';
        }, 500);
    }, 2000);

    // Typing effect for the message
    const message = "On this special day, I just wanted to take a moment to tell you how amazing you are. Your smile brightens my day. I may not be the handsome guy you met, but I would definitely be your biggest supporter, and I would like to be around you in every stage of your life. I hope this year brings you all the happiness you deserve. Happy birthday, beautifulll!";
    const typedTextElement = document.querySelector('.typed-text');
    let i = 0;
    
    function typeWriter() {
        if (i < message.length) {
            typedTextElement.innerHTML += message.charAt(i);
            i++;
            setTimeout(typeWriter, 20);
        }
    }
    
    setTimeout(typeWriter, 1500);

    // Surprise button functionality
    const surpriseBtn = document.getElementById('surpriseBtn');
    const audio = document.getElementById('birthdayAudio');
    const confettiContainer = document.querySelector('.confetti-container');
    
    surpriseBtn.addEventListener('click', function() {
        // Play audio
        audio.play();
        
        // Create confetti
        createConfetti();
        
        // Change button text
        surpriseBtn.textContent = "Woo! Happy Birthday!";
        surpriseBtn.style.backgroundColor = "var(--accent)";
        
        // Animate cake candle
        const flame = document.querySelector('.flame');
        flame.style.transform = "scale(1.5)";
        flame.style.background = "linear-gradient(to bottom, #fff, #ff8c00)";
        
        setTimeout(() => {
            flame.style.transform = "scale(1)";
            flame.style.background = "linear-gradient(to bottom, #fff, #ffd166)";
        }, 300);
    });

    // Create confetti function
    function createConfetti() {
        // Clear previous confetti
        confettiContainer.innerHTML = '';
        
        // Create 100 confetti pieces
        for (let i = 0; i < 100; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.backgroundColor = getRandomColor();
            confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
            confetti.style.animation = `fall ${Math.random() * 3 + 2}s linear forwards`;
            
            // Random shape
            if (Math.random() > 0.5) {
                confetti.style.width = '10px';
                confetti.style.height = '10px';
                confetti.style.borderRadius = '50%';
            } else {
                confetti.style.width = '8px';
                confetti.style.height = '15px';
            }
            
            confettiContainer.appendChild(confetti);
        }
        
        // Add CSS for animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fall {
                to {
                    top: 100vh;
                    transform: rotate(360deg);
                    opacity: 0;
                }
            }
            .confetti {
                position: absolute;
                top: -10px;
            }
        `;
        document.head.appendChild(style);
    }

    // Countdown to your planned meeting date
    function updateCountdown() {
        // Set your target date here (YYYY, MM-1, DD)
        const targetDate = new Date(2025, 4, 27); // Example: December 15, 2023
        const now = new Date();
        const diff = targetDate - now;
        
        if (diff > 0) {
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            
            document.getElementById('days').textContent = days.toString().padStart(2, '0');
            document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
            document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        } else {
            document.querySelector('.countdown').innerHTML = `
                <p style="font-size: 1.5rem; color: var(--primary);">
                    The day has finally arrived! Can't wait to see you! 💖
                </p>
            `;
        }
    }

    // Initialize countdown
    updateCountdown();
    setInterval(updateCountdown, 60000); // Update every minute

    // Helper function for random colors
    function getRandomColor() {
        const colors = ['#ff6b6b', '#ffb8b8', '#ffd166', '#06d6a0', '#118ab2', '#073b4c'];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    // Add floating hearts on click anywhere
    document.addEventListener('click', function(e) {
        createHeart(e.clientX, e.clientY);
    });

    function createHeart(x, y) {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.style.left = x + 'px';
        heart.style.top = y + 'px';
        document.body.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 2000);
    }

    // Add CSS for floating hearts
    const heartStyle = document.createElement('style');
    heartStyle.textContent = `
        .floating-heart {
            position: absolute;
            width: 20px;
            height: 20px;
            background-color: var(--primary);
            transform: rotate(45deg);
            animation: float 2s ease-out forwards;
            pointer-events: none;
        }
        .floating-heart:before,
        .floating-heart:after {
            content: '';
            position: absolute;
            width: 20px;
            height: 20px;
            background-color: var(--primary);
            border-radius: 50%;
        }
        .floating-heart:before {
            top: -10px;
            left: 0;
        }
        .floating-heart:after {
            top: 0;
            left: -10px;
        }
        @keyframes float {
            0% {
                transform: rotate(45deg) translateY(0) scale(1);
                opacity: 1;
            }
            100% {
                transform: rotate(45deg) translateY(-100px) scale(0);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(heartStyle);
});
