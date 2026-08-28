function toggleTheme(theme) {
  const body = document.body;
  body.className = theme;
  localStorage.setItem("theme", theme);
  location.reload();
}
function loadTheme(theme) {
  const body = document.body;
  body.className = theme;
  localStorage.setItem("theme", theme);
}

// Check if theme is saved in local storage
const savedTheme = localStorage.getItem("theme");

if (savedTheme) {
  loadTheme(savedTheme);
} else {
  // Default to dark theme if no theme is saved
  toggleTheme("dark");
}

document.addEventListener('DOMContentLoaded', function() {
  const savedTitle = localStorage.getItem('title');

  if (savedTitle) {
      changeTitle(savedTitle);
  }

  // Get the selected font from localStorage or use a default font
  var storedFont = localStorage.getItem('selectedFont') || 'Orbitron';

  // Set the font for the body and specific elements
  document.body.style.fontFamily = storedFont;
  const buttons = document.querySelectorAll("button");
  buttons.forEach(button => {
      button.style.fontFamily = storedFont;
  });
  const gameboxes = document.querySelectorAll("game-box");
  gameboxes.forEach(gamebox => {
      gamebox.style.fontFamily = storedFont;
  });
  const inputs = document.querySelectorAll("input");
  inputs.forEach(input => {
      input.style.fontFamily = storedFont;
  });

  // Add the selected font dynamically to the head of the document
  var styleElement = document.createElement('style');
  styleElement.innerHTML = `
      @import url('https://fonts.googleapis.com/css2?family=${storedFont.replace(/ /g, '+')}&display=swap');
  `;
  document.head.appendChild(styleElement);

});

function changeTitle(title) {
  document.title = title;
}

function redirect(link){
  try {
    window.parent.location.href = link;
  } catch (e) {
    window.location.href = link;
  }
}

function toTitleCase(str) {
  return str.replace(/\b\w+/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}
