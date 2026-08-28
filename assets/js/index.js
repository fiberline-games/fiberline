// List of random texts
const randomTexts = [
    "Fast as Fiber optic on a straight line",
    "it's not a bug it's a feature",
    "gabriel looks like a dog",
    "mitochondria is the powerhouse of the cell",
    "i forgor",
    "new update coming soon i think",
    "did you know? penguins can fly, but only on tuesdays",
    "did you know? if you lick a toad, you'll gain the ability to speak fluent French for exactly 24 hours",
    "did you know? the eiffel tower was originally constructed upside down, but they flipped it over at the last minute because it looked better that way",
    "did you know? if you stare directly at the sun for 10 seconds, you'll gain the ability to see into the future, but only for things that have already happened",
    "did you know? sharks are afraid of rubber ducks and will swim away as soon as they see one",
    "Never gonna give you up, never gonna let you down",
    "did you know? if you eat a whole pizza by yourself, you'll gain the ability to understand the language of cats for exactly 3 hours",
    "games are fun",
    "always attracting new users with the promise of free games",
    "always at school but never in class",
    "what if i told you that this website is actually a front for a secret society of gamers who are trying to take over the world one game at a time",
    "what do we have next period?",
    "when the teacher says 'go to your next class' but you have no idea where it is",
    "5 minutes until the bell rings and you still have no idea where your next class is",
    "remember mr. gee says 'be ready respectful and safe' and follow the westleigh way",
    "that isnt sparx is it",
    "go on to lesson 2, and then lesson 3, and then lesson 4, and then lesson 5, and then lesson 6, and then lesson 7, and then lesson 8, and then lesson 9, and then lesson 10",
    "'stop taking my hat' cried gabriel",
    "let me try your glasses on",
    "can you top up my parentpay?",
    "attendance exrtravaganza next week on friday, make sure to have 100% attendance for the next week",
    "'can i get an on call for gabriel?'",
    "everytime you come into my classroom you are always munching on something, you are always eating",
    "'can i go to the toilet?' 'no, you just had breaktime'",
    "sigma sigma boy",
    "quite frankly i want to build a wall around the school and not let anyone in or out",
    "Wisdom is so sigma"
];

// Function to generate a random number
function getRandomNumber(max) {
    return Math.floor(Math.random() * max);
}

// Function to display random text on page load
function displayRandomText() {
    const randomIndex = getRandomNumber(randomTexts.length);
    const randomText = randomTexts[randomIndex];
    const randomTextElement = document.getElementById("random-text");
    randomTextElement.textContent = randomText;
}

// Display random text on page load
window.addEventListener("load", displayRandomText);



//about blank embedder
let url = window.location.href;
if (url) {
  var win;
  document.getElementById("embed-button").onclick = function () {
    if (win) {
      win.focus();
    } else {
      var features =
        "width=" +
        window.innerWidth +
        ",height=" +
        window.innerHeight +
        ",menubar=no,toolbar=no,location=no,status=no";
      win = window.open("", "_blank", features);
      win.document.body.style.margin = "0";
      win.document.body.style.height = "100%";
      var iframe = win.document.createElement("iframe");
      iframe.style.border = "none";
      iframe.style.width = "100%";
      iframe.style.height = "100%";
      iframe.style.margin = "0";
      iframe.src = url;
      win.document.body.appendChild(iframe);
      window.location.href = localStorage.getItem('redirectURL') || 'https://classroom.google.com/';
    }
  };
}

if (!localStorage.getItem("visited")) {
    const popup = document.createElement('pop-up');
    popup.textContent = 'This site, and its games, use localStorage to save your progress, and your data. By using this site, you agree to this site using your computers storage.';
    const goNowButton = document.createElement('button');
    document.body.appendChild(popup);
    localStorage.setItem("visited", true);
}

const box = document.getElementById('embed-button');

box.addEventListener('mousemove', e => {
    const boundingRect = box.getBoundingClientRect();
    const offsetX = e.clientX - boundingRect.left;
    const offsetY = e.clientY - boundingRect.top;

    const rotateX = (offsetY / boundingRect.height - 0.5) * 30;
    const rotateY = (offsetX / boundingRect.width - 0.5) * 5;

    box.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
});

box.addEventListener('mouseleave', () => {
    // Reset rotation when mouse leaves the element
    box.style.transform = 'rotateX(0deg) rotateY(0deg)';
});

window.onload = function() {
    // Select the image element
    const image = document.getElementById('swlogo');
    PowerGlitch.glitch(image, {
  "playMode": "always",
  "createContainers": true,
  "hideOverflow": false,
  "timing": {
    "duration": 4000,
    "easing": "ease-in-out"
  },
  "glitchTimeSpan": {
    "start": 0,
    "end": 0.5
  },
  "shake": {
    "velocity": 15,
    "amplitudeX": 0.2,
    "amplitudeY": 0.2
  },
  "slice": {
    "count": 6,
    "velocity": 15,
    "minHeight": 0.02,
    "maxHeight": 0.3,
    "hueRotate": true
  },
  "pulse": false
});
};

