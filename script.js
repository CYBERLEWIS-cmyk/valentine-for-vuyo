const hero = document.getElementById("hero");
const story = document.getElementById("story");
const startBtn = document.getElementById("startBtn");

const title = document.getElementById("title");
const text = document.getElementById("text");
const scene = document.getElementById("scene");

/* HERO → STORY */
startBtn.addEventListener("click", () => {
    hero.style.display = "none";
    story.classList.remove("hidden");

    // Ensure initial state
    scene.style.opacity = "0";
    scene.style.transform = "translateY(20px)";

    setTimeout(() => {
        showPage(0);
    }, 100);
});

/* STORY PAGES */
const pages = [
    { title: "", text: "Not a long time 💭\n\nBut somehow… it’s felt easy 💕" },
    { title: "", text: "Monday happened 📅\n\nThen Tuesday happened 🎱" },
    { title: "", text: "Somewhere between pool shots 🎱\nand random conversations 💬" },
    { title: "", text: "When you laughed… 😌\n\nIt just felt easy being around you 💖" },
    {
        title: "So Vuyo 💌",
        text: `Would you be my Valentine this year? 💘
      <br><br>
      <button class="choice yes-btn" onclick="yes()">Yes ❤️</button>
      <button class="choice no-btn" onclick="noClicked()" id="noBtn">No 🙈</button>
      <div id="errorMsg" style="margin-top:10px;"></div>`
    }
];

let current = 0;
let locked = false;

/* SMOOTH FADE FUNCTION */
function showPage(index) {

    // Fade out first
    scene.style.transition = "opacity 0.5s ease, transform 0.5s ease";
    scene.style.opacity = "0";
    scene.style.transform = "translateY(20px)";

    setTimeout(() => {

        title.innerHTML = pages[index].title;
        text.innerHTML = pages[index].text.replace(/\n/g, "<br><br>");

        // Fade back in
        scene.style.opacity = "1";
        scene.style.transform = "translateY(0)";

    }, 500);
}

/* TAP TO NEXT */
scene.addEventListener("click", () => {
    if (locked) return;
    if (current >= pages.length - 1) return;

    locked = true;
    current++;
    showPage(current);

    setTimeout(() => locked = false, 600);
});

/* YES */
function yes() {
    title.innerHTML = "That makes me smile 💗";
    text.innerHTML = `
    Looks like that rematch is officially a date 🎱✨
    <br><br>
    I'm really glad I asked.
  `;
    launchConfetti();
}

/* NO */
function noClicked() {
    const error = document.getElementById("errorMsg");
    const noBtn = document.getElementById("noBtn");

    const messages = [
        "Nice try 😌",
        "I think you misclicked 🙈",
        "That option seems unavailable 😅"
    ];

    error.innerHTML = messages[Math.floor(Math.random() * messages.length)];

    noBtn.style.transform =
        "translateX(" + (Math.random()*60 - 30) + "px)";
}

/* HEART CONFETTI */
function launchConfetti() {

    const container = document.createElement("div");
    container.style.position = "fixed";
    container.style.inset = "0";
    container.style.pointerEvents = "none";
    document.body.appendChild(container);

    for (let i = 0; i < 60; i++) {
        const heart = document.createElement("div");
        heart.innerHTML = "💖";
        heart.style.position = "absolute";
        heart.style.left = "50%";
        heart.style.top = "50%";
        heart.style.fontSize = Math.random()*20 + 15 + "px";
        heart.style.transition = "all 1.2s ease-out";

        container.appendChild(heart);

        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 250 + 80;

        setTimeout(() => {
            heart.style.left = 50 + Math.cos(angle) * distance + "%";
            heart.style.top = 50 + Math.sin(angle) * distance + "%";
            heart.style.opacity = "0";
        }, 50);
    }

    setTimeout(() => container.remove(), 1500);
}
