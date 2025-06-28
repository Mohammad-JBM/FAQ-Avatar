# 🌐 Multilingual 3D Avatar FAQ Panel

A responsive and multilingual interactive FAQ system powered by a **3D animated avatar**, built using **A-Frame**, **JavaScript**, and **CSS**.

> Designed and developed with ❤️ by **Mohammad JBM**

---

## 🎯 Features

- 🧠 **3D animated avatar** with realistic talking/idle transitions  
- 🎧 **Audio responses** for each question per language  
- 🌍 **Supports multiple languages** (Farsi, English, Arabic — easily extendable)  
- 📱 **Responsive and mobile-friendly** layout  
- 🔁 **RTL/LTR direction switching** with correct fonts per language  
- 🎨 Clean and modern UI with hover effects and scrollable panel  

---

## 📁 Project Structure

```

📦 3D-Avatar-FAQ-Panel
├── index.html
├── css/
│   └── faq.css
├── js/
│   └── faq.js
├── lang/
│   ├── fa.json
│   ├── en.json
│   └── ar.json
├── audio/
│   ├── fa/
│   ├── en/
│   └── ar/
├── fonts/
│   ├── Yekan.woff
│   └── RobotoCondensed-Bold.ttf
├── models/
│   └── Avatar.glb
└── README.md

````


## 🔤 Add a New Language

1. Create a new translation file in `/lang/xx.json`:
   ```json
   {
     "faqTitle": "Frequently Asked Questions",
     "close": "Close"
   }


2. Extend the `faq` object in `avatarsData` in `main.js`:

   ```js
   faq: {
     fa: [...],
     en: [...],
     ar: [...],
     xx: [
       { question: "Sample Question", sound: "./audio/xx/sample.mp3" }
     ]
   }
   ```

3. Add a button to the language selector:

   ```html
   <button data-lang="xx">
     <img src="./flags/xx.png" alt="XX" />
     XX Language
   </button>
   ```

4. Add audio files under `/audio/xx/`

---

## 🚀 How to Run

1. Download or clone the project:

   ```bash
   git clone https://github.com/MohammadJBM/3D-Avatar-FAQ.git
   ```

2. Open `index.html` in any modern browser (Chrome, Firefox, Edge).

> No server or build tools needed. Everything works 100% static.

---

## 📸 Screenshots

| Persian (RTL) | English (LTR)|
| ------------- | -------------|
|      [fa]     |     [en]     |

---

## ✨ Credits

* 👤 Author: [**Mohammad JBM**](https://github.com/Mohammad-JBM)
* 🎮 Built with [**A-Frame**](https://aframe.io)
* 🔤 Fonts:

  * [Yekan](https://fontcdn.ir/) for RTL languages
  * [Roboto Condensed](https://fonts.google.com/specimen/Roboto+Condensed) for English

> ⭐ If you like this project, give it a star and follow for more creative web3/metaverse experiments by Mohammad JBM!
