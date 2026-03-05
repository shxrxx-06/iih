// Scroll Progress
        window.addEventListener('scroll', () => {
            const scrollPx = document.documentElement.scrollTop;
            const winHeightPx = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (scrollPx / winHeightPx) * 100;
            document.getElementById('scroll-progress').style.width = scrolled + '%';
        });

        // Navbar Scroll Effect
        const navbar = document.getElementById('navbar');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) navbar.classList.add('scrolled');
            else navbar.classList.remove('scrolled');
        });

        // Typewriter Effect
        const words = ["Smart Manufacturing", "Electric Vehicles", "Industrial IoT", "Supply Chain AI", "Green Tech"];
        let i = 0; let j = 0; let currentWord = ""; let isDeleting = false;
        const typewriterEl = document.getElementById('typewriter');

        function type() {
            currentWord = words[i];
            if (isDeleting) {
                typewriterEl.textContent = currentWord.substring(0, j - 1);
                j--;
            } else {
                typewriterEl.textContent = currentWord.substring(0, j + 1);
                j++;
            }

            let typeSpeed = 100;
            if (isDeleting) typeSpeed /= 2;

            if (!isDeleting && j === currentWord.length) {
                typeSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && j === 0) {
                isDeleting = false;
                i = (i + 1) % words.length;
                typeSpeed = 500;
            }
            setTimeout(type, typeSpeed);
        }
        document.addEventListener("DOMContentLoaded", () => { setTimeout(type, 1000); });

        // Intersection Observer for Reveal Animations & Counter
        const observerOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };

     const runCounter = (el) => {
    const target = +el.getAttribute('data-target');
    const duration = 1500;
    const step = target / (duration / 16);

    let current = 0;

    const update = () => {
        current += step;

        if (current < target) {
            el.innerText = formatNumber(Math.floor(current));
            requestAnimationFrame(update);
        } else {
            el.innerText = formatNumber(target);
        }
    };

    update();
};

/* FORMAT 2 DIGITS */
function formatNumber(num) {
    return num.toString().padStart(2, '0');
}

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');

                    // Trigger counters if it's the about section
                   if (entry.target.id === 'about') {
    document.querySelectorAll('.counter').forEach(counter => {
        if (!counter.classList.contains('counted')) {
            runCounter(counter);
            counter.classList.add('counted');
        }
    });
}
                }
            });
        }, observerOptions);

        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
        observer.observe(document.getElementById('about'));


        // Active Nav Link Highlighting
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');

        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                if (pageYOffset >= (sectionTop - 300)) current = section.getAttribute('id');
            });

            navLinks.forEach(link => {
                link.classList.remove('active-link');
                if (link.getAttribute('href').includes(current) && current !== '') {
                    link.classList.add('active-link');
                }
            });
        });

const canvas = document.getElementById("network-bg");
const ctx = canvas.getContext("2d");

let particles = [];
const COUNT = 70;
const DIST = 120;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// create particles
for (let i = 0; i < COUNT; i++) {
    particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5
    });
}

function animateNetwork() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // background gradient
    let gradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        canvas.width
    );
    gradient.addColorStop(0, "#0a0a12");
    gradient.addColorStop(1, "#020204");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // particles
    particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,255,255,0.7)";
        ctx.fill();
    });

    // lines
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {

            let dx = particles[i].x - particles[j].x;
            let dy = particles[i].y - particles[j].y;
            let dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < DIST) {
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);

                ctx.strokeStyle = `rgba(180,180,255,${1 - dist / DIST})`;
                ctx.lineWidth = 0.5;
                ctx.stroke();
            }
        }
    }

    requestAnimationFrame(animateNetwork);
}

animateNetwork();
const ca = document.querySelectorAll(".track-card");

ca.forEach(card => {
  card.addEventListener("click", () => {
    cards.forEach(c => c.classList.remove("active"));
    card.classList.add("active");
  });
});
document.querySelectorAll('.track').forEach(card => {
    card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty('--x', `${e.clientX - rect.left}px`);
        card.style.setProperty('--y', `${e.clientY - rect.top}px`);
    });
});
const targetDate = new Date("March 17, 2026 09:00:00 GMT+0530").getTime();

function animateChange(el, newVal) {
    if (el.innerText !== newVal) {
        el.style.transform = "translateY(-8px)";
        el.style.opacity = "0.4";

        setTimeout(() => {
            el.innerText = newVal;
            el.style.transform = "translateY(0)";
            el.style.opacity = "1";
        }, 120);
    }
}
function updateCountdown() {
    const now = new Date().getTime();
    const diff = targetDate - now;

    if (diff <= 0) {
        document.querySelector(".countdown-ultra").innerHTML = "🚀 Event Started";
        return;
    }

    const d = String(Math.floor(diff / (1000 * 60 * 60 * 24))).padStart(2, '0');
    const h = String(Math.floor((diff / (1000 * 60 * 60)) % 24)).padStart(2, '0');
    const m = String(Math.floor((diff / (1000 * 60)) % 60)).padStart(2, '0');
    const s = String(Math.floor((diff / 1000) % 60)).padStart(2, '0');

    animateChange(document.getElementById("days"), d);
    animateChange(document.getElementById("hours"), h);
    animateChange(document.getElementById("minutes"), m);
    animateChange(document.getElementById("seconds"), s);
}

setInterval(updateCountdown, 1000);
updateCountdown();
const items = document.querySelectorAll(".item");
const prevBtn = document.querySelector(".nav.left");
const nextBtn = document.querySelector(".nav.right");

let index = 0;

function updateCarousel() {
    items.forEach((el, i) => {
        el.className = "item"; // reset

        let pos = (i - index + items.length) % items.length;

        if (pos === 0) el.classList.add("active");
        else if (pos === 1) el.classList.add("next");
        else if (pos === 2) el.classList.add("next2");
        else if (pos === items.length - 1) el.classList.add("prev");
        else if (pos === items.length - 2) el.classList.add("prev2");
    });
}

nextBtn.onclick = () => {
    index = (index + 1) % items.length;
    updateCarousel();
};

prevBtn.onclick = () => {
    index = (index - 1 + items.length) % items.length;
    updateCarousel();
};

updateCarousel();
function copyLink() {
    const link = "https://forms.gle/fbmGwviynyVmDxWX9";
    navigator.clipboard.writeText(link);
    alert("Registration link copied!");

}
/* ================= MOBILE TRACK ACCORDION ================= */

if (window.innerWidth <= 768) {

const tracks = document.querySelectorAll(".track");

tracks.forEach(track => {

    track.addEventListener("click", () => {

        tracks.forEach(t => {
            if(t !== track){
                t.classList.remove("active");
            }
        });

        track.classList.toggle("active");

    });

});

}
