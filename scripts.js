// Firebase Setup
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-firestore.js";

// Initialize Firebase with the config object from your Firebase console
const firebaseConfig = {
    apiKey: "AIzaSyBlXZNWPzUgXxmasXgu1NxDziaXqgEzQAM",
    authDomain: "portfolio-ac49b.firebaseapp.com",
    projectId: "portfolio-ac49b",
    storageBucket: "portfolio-ac49b.firebasestorage.app",
    messagingSenderId: "985692475457",
    appId: "1:985692475457:web:325d96d8a7c0285f8bf6c0"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Smooth Scroll for Navbar Links
document.querySelectorAll('nav ul li a').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    // Get the target section from the href attribute
    const targetId = this.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);

    // Scroll to the target element smoothly
    targetElement.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });

    // Add 'active' class to the clicked link
    document.querySelectorAll('nav ul li a').forEach(link => {
      link.classList.remove('active');
    });
    this.classList.add('active');
  });
});

// Form Submission to Firestore
const form = document.getElementById("contact-form");

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  // Get form data
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  // Simple validation
  if (name === "" || email === "" || message === "") {
    alert("Please fill out all fields.");
    return;
  }

  // Send the form data to Firestore
  try {
    await addDoc(collection(db, "contacts"), {
      name: name,
      email: email,
      message: message,
      timestamp: serverTimestamp(), // Add a timestamp
    });

    // Clear the form after successful submission
    form.reset();
    alert("Thank you for your message! I'll get back to you soon.");
  } catch (error) {
    console.error("Error writing document: ", error);
    alert("Something went wrong. Please try again later.");
  }
});
