const avatarsData = [
  {
    model: "#avatarModel1",
    position: "-0.434 0.193 -2.384",
    rotation: "0 0 0",
    scale: "1.2 1.2 1.2",
    faq: {
      en: [
        { question: "Please introduce yourself.", sound: "./audio/en/Q5.mp3" },
        { question: "What is a supplement?", sound: "./audio/en/Q6.mp3" },
      ],
      fa: [
        {
          question: "لطفاً خودتان را معرفی بفرمایید",
          sound: "./audio/fa/Q1.mp3",
        },
        {
          question: "مکمل چیست و چه کاربردی دارد؟",
          sound: "./audio/fa/Q2.mp3",
        },
      ],
      ar: [
        { question: "من فضلك قدم نفسك", sound: "./audio/ar/Q1.mp3" },
        { question: "ما هو المكمل؟", sound: "./audio/ar/Q2.mp3" },
      ],
    },
  },
];

let currentLang = localStorage.getItem("lang") || "fa";
let currentSound = null;
let translations = {};
let activeAvatar = null;
let activeAvatarData = null;

const avatarsContainer = document.getElementById("avatarsContainer");
const faqPanel = document.getElementById("faqPanel");
const questionsContainer = document.getElementById("questionsContainer");
const closeButton = document.getElementById("closeButton");
const faqTitle = document.getElementById("faqTitle");

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem("lang", lang);
  document.body.classList.remove("lang-fa", "lang-en");
  document.body.classList.add(`lang-${lang}`);
  loadTranslations(lang);
  if (faqPanel.style.display === "block" && activeAvatar && activeAvatarData) {
    renderQuestionsForAvatar(activeAvatarData, activeAvatar);
  }
}

function loadTranslations(lang) {
  fetch(`./lang/${lang}.json`)
    .then((res) => res.json())
    .then((data) => {
      translations = data;
      faqTitle.textContent = data.faqTitle || "FAQ";
      closeButton.textContent = data.close || "Close";
    })
    .catch(() => {
      faqTitle.textContent = lang === "fa" ? "سوالات" : "FAQ";
      closeButton.textContent = lang === "fa" ? "خروج" : "Close";
    });
}

function renderQuestionsForAvatar(avatarData, avatar) {
  questionsContainer.innerHTML = "";
  const langFaq = avatarData.faq[currentLang] || [];

  langFaq.forEach((item) => {
    const questionButton = document.createElement("button");
    questionButton.classList.add("question");
    questionButton.textContent = item.question;
    questionButton.dataset.sound = item.sound;
    questionsContainer.appendChild(questionButton);

    questionButton.addEventListener("click", function () {
      if (currentSound) currentSound.components.sound.stopSound();
      const sound = avatar.querySelector(`[src="${this.dataset.sound}"]`);
      avatar.setAttribute(
        "animation-mixer",
        "clip: talking; loop: repeat; crossFadeDuration: 0.5"
      );
      sound.components.sound.playSound();
      currentSound = sound;
      sound.addEventListener("sound-ended", () => {
        avatar.setAttribute(
          "animation-mixer",
          "clip: idle; loop: repeat; crossFadeDuration: 0.5"
        );
        currentSound = null;
      });
    });
  });

  faqPanel.style.display = "block";
}

// Load avatars and sounds
avatarsData.forEach((avatarData) => {
  const avatar = document.createElement("a-entity");
  avatar.setAttribute("gltf-model", avatarData.model);
  avatar.setAttribute("position", avatarData.position);
  avatar.setAttribute("rotation", avatarData.rotation);
  avatar.setAttribute("scale", avatarData.scale);
  avatar.setAttribute(
    "animation-mixer",
    "clip: idle; loop: repeat; crossFadeDuration: 0.5"
  );

  Object.values(avatarData.faq)
    .flat()
    .forEach((item) => {
      const sound = document.createElement("a-sound");
      sound.setAttribute("src", item.sound);
      sound.setAttribute("autoplay", "false");
      sound.setAttribute("position", "0 0 0");
      sound.setAttribute("distanceModel", "inverse");
      sound.setAttribute("maxDistance", "50");
      sound.setAttribute("refDistance", "50");
      sound.setAttribute("rolloffFactor", "1");
      sound.setAttribute("volume", "2.5");
      avatar.appendChild(sound);
    });

  avatarsContainer.appendChild(avatar);

  avatar.addEventListener("click", () => {
    activeAvatar = avatar;
    activeAvatarData = avatarData;
    renderQuestionsForAvatar(avatarData, avatar);
  });
});

closeButton.addEventListener("click", () => {
  faqPanel.style.display = "none";
});

document.getElementById("langText").addEventListener("click", () => {
  document.getElementById("langMenu").classList.toggle("hidden");
});

document.querySelectorAll("#langMenu button").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const lang = e.currentTarget.dataset.lang;
    setLanguage(lang);
    document.getElementById("langMenu").classList.add("hidden");
  });
});

window.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add(`lang-${currentLang}`);
  loadTranslations(currentLang);
});

