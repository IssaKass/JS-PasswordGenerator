const digits = "0123456789".split("");
const letters = "abcdefghijklmnopqrstuvwxyz".split("");
const symbols = "!@#$%^&*".split("");
let includedCharacters = [];
let length = 0;
let password = "";

const digitsEl = document.getElementById("digits-el");
const lettersEL = document.getElementById("letters-el");
const symbolsEl = document.getElementById("symbols-el");
const lengthEl = document.getElementById("length-el");
const lengthValueEl = document.getElementById("length-value-el");
const passwordEl = document.getElementById("password-el");
const generateBtn = document.getElementById("generate-btn");
const toggles = document.querySelectorAll(".toggle");

function init() {
  length = lengthEl.value;
  digitsEl.click();
}

digitsEl.addEventListener("change", function () {
  updateIncludedCharacters(includedCharacters, digits, this.checked);
  handleTogglesChange(toggles);
});

lettersEL.addEventListener("change", function () {
  updateIncludedCharacters(includedCharacters, letters, this.checked);
  handleTogglesChange(toggles);
});

symbolsEl.addEventListener("change", function () {
  updateIncludedCharacters(includedCharacters, symbols, this.checked);
  handleTogglesChange(toggles);
});

lengthEl.addEventListener("input", function () {
  length = parseInt(lengthEl.value);
  lengthValueEl.textContent = length;
});

generateBtn.addEventListener("click", function () {
  password = generateRandomPassword(includedCharacters, length);
  passwordEl.textContent = password;
  passwordEl.classList.remove("copied");
  passwordEl.classList.add("copy");
});

function updateIncludedCharacters(arr, arrayToInclude, add) {
  if (add) {
    arr.push(...arrayToInclude);
  } else {
    arrayToInclude.forEach((item) => {
      if (arr.includes(item)) {
        let index = arr.indexOf(item);
        arr.splice(index, 1);
      }
    });
  }
}

passwordEl.addEventListener("click", function () {
  copyToClipbaord();
});

function copyToClipbaord() {
  if (passwordEl.classList.contains("copy")) {
    navigator.clipboard.writeText(password);
    passwordEl.classList.replace("copy", "copied");
    setTimeout(() => {
      passwordEl.classList.remove("copied");
      passwordEl.classList.add("copy");
    }, 3000);
  }
}

function generateRandomPassword(arr, length) {
  let password = "";
  for (let i = 0; i < length; i++) {
    let randomIndex = Math.floor(Math.random() * arr.length);
    let element = arr[randomIndex];
    if (letters.includes(element)) {
      element = randomCase(element);
    }
    password += element;
  }
  return password;
}

init();

function handleTogglesChange(toggles) {
  const checkedToggles = [];
  toggles.forEach((t) => {
    if (t.checked) {
      checkedToggles.push(t);
    }
  });

  if (checkedToggles.length === 1) {
    checkedToggles.forEach((t) => {
      if (t.checked) {
        t.disabled = true;
      }
    });
  } else {
    toggles.forEach((t) => (t.disabled = false));
  }
}

function randomCase(char) {
  const randomNum = Math.floor(Math.random() * 2);
  if (randomNum === 0) {
    return char.toUpperCase();
  } else {
    return char.toLowerCase();
  }
}
