document.addEventListener("DOMContentLoaded", () => {

    const hero = document.getElementById("hero");
    const story = document.getElementById("story");
    const startBtn = document.getElementById("startBtn");
    const scene = document.getElementById("scene");
    const title = document.getElementById("title");
    const text = document.getElementById("text");
    const music = document.getElementById("bgMusic");
    const particlesContainer = document.getElementById("particles");

    let current = 0;
    let inFinal = false;

    const pages = [
        "Not a long time 💭\n\nBut somehow… it’s felt easy 💕",
        "Monday happened 📅\n\nThen Tuesday happened 🎱",
        "Somewhere between pool shots 🎱\nand random conversations 💬",
        "When you laughed… 😌\n\nIt just felt easy being around you 💖"
    ];

    /* ===============================
       START BUTTON
    ================================= */

    startBtn.addEventListener("click", () => {
        hero.style.display = "none";
        story.classList.remove("hidden");

        if (music) {
            music.volume = 0.3;
            music.play().catch(()=>{});
        }

        showPage(0);
        createParticles();
    });

    /* ===============================
       PAGE DISPLAY WITH FADE
    ================================= */

    function showPage(index) {

        scene.style.opacity = "0";

        setTimeout(() => {

            title.innerHTML = "";
            text.textContent = pages[index];

            // Trigger fade animation
            text.classList.remove("fade-in");
            void text.offsetWidth;
            text.classList.add("fade-in");

            scene.style.opacity = "1";

        }, 300);
    }

    /* ===============================
       TAP HANDLER
    ================================= */

    scene.addEventListener("click", () => {

        if (inFinal) return;

        if (current < pages.length - 1) {
            current++;
            showPage(current);
        } else {
            showFinal();
        }

    });

    /* ===============================
       FINAL QUESTION
    ================================= */

    function showFinal() {

        inFinal = true;

        scene.style.opacity = "0";

        setTimeout(() => {

            title.innerHTML = "So Vuyo 💌";

            text.innerHTML = `
Would you be my Valentine this year? 💘

<button id="yesBtn">Yes ❤️</button>
<button id="noBtn">No 🙈</button>

<div id="errorMsg" style="margin-top:10px;"></div>
    `;

            // Fade animation
            text.classList.remove("fade-in");
            void text.offsetWidth;
            text.classList.add("fade-in");

            scene.style.opacity = "1";

            document.getElementById("yesBtn").addEventListener("click", yes);
            document.getElementById("noBtn").addEventListener("click", noClicked);

        }, 300);
    }

    /* ===============================
       YES
    ================================= */

    function yes() {

        launchConfetti();

        const storySection = document.getElementById("story");

        // Darken background
        storySection.classList.add("darkened");

        scene.classList.add("final-mode");

        scene.style.opacity = "0";

        setTimeout(() => {

            title.innerHTML = "Valentine’s Day 2026 💘";

            text.innerHTML = `
✔ Looks like that rematch is officially a date.🥹

🎱 Best of 3?

Winner buys milkshakes.
    `;

            text.classList.remove("fade-in");
            void text.offsetWidth;
            text.classList.add("fade-in");

            scene.style.opacity = "1";

        }, 600);
    }


    /* ===============================
       NO
    ================================= */

    function noClicked() {

        const error = document.getElementById("errorMsg");
        const noBtn = document.getElementById("noBtn");

        error.textContent = "Are you suuuure? 😌";

        noBtn.classList.add("no-shrink");

        const dx = Math.random()*60 - 30;
        const dy = Math.random()*30 - 15;
        noBtn.style.transform += ` translate(${dx}px, ${dy}px)`;
    }


    /* ===============================
       FLOATING PARTICLES
    ================================= */

    function createParticles() {

        setInterval(() => {

            const p = document.createElement("div");
            p.classList.add("particle");
            p.textContent = "✨";
            p.style.left = Math.random()*100 + "vw";
            p.style.fontSize = Math.random()*10 + 10 + "px";

            particlesContainer.appendChild(p);

            setTimeout(()=>p.remove(),10000);

        }, 600);
    }

    /* ===============================
       CONFETTI
    ================================= */

    function launchConfetti() {

        for (let i=0;i<50;i++) {

            const heart = document.createElement("div");
            heart.textContent="💖";
            heart.style.position="fixed";
            heart.style.left="50%";
            heart.style.top="50%";
            heart.style.fontSize=(Math.random()*15+15)+"px";
            heart.style.transition="all 1.5s ease";

            document.body.appendChild(heart);

            const angle=Math.random()*Math.PI*2;
            const dist=Math.random()*250+100;

            requestAnimationFrame(()=>{
                heart.style.transform=`translate(${Math.cos(angle)*dist}px,${Math.sin(angle)*dist}px)`;
                heart.style.opacity="0";
            });

            setTimeout(()=>heart.remove(),1500);
        }
    }

});
