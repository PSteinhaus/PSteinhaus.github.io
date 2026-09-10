const musik = document.getElementById("musik");

const linkesBild = document.querySelector(".corner-image-left");
const rechtesBild = document.querySelector(".corner-image-right");


// =========================
// BILDANIMATION
// =========================

let state = false;

function animationWechseln() {
    state = !state;

    if (state) {
        linkesBild.classList.remove("state-a");
        linkesBild.classList.add("state-b");

        rechtesBild.classList.remove("state-a");
        rechtesBild.classList.add("state-b");
    } else {
        linkesBild.classList.remove("state-b");
        linkesBild.classList.add("state-a");

        rechtesBild.classList.remove("state-b");
        rechtesBild.classList.add("state-a");
    }
}


// Ausgangszustand
linkesBild.classList.add("state-a");
rechtesBild.classList.add("state-a");


// Alle 0,6 Sekunden zwischen den beiden
// Animationszuständen wechseln.
setInterval(animationWechseln, 600);


// =========================
// MUSIK
// =========================

let musikGestartet = false;

function musikStarten() {
    if (musikGestartet) return;

    musik.play()
        .then(() => {
            musikGestartet = true;
        })
        .catch(() => {
            // Playback was rejected; another interaction can try again.
        });
}

// Desktop / browsers that allow autoplay
musikStarten();

// Mobile fallback
document.addEventListener("pointerdown", musikStarten);
