tailwind.config = {
  theme: {
    extend: {
      colors: { primary: "#3b82f6", secondary: "#10b981" },
      borderRadius: {
        none: "0px",
        sm: "4px",
        DEFAULT: "8px",
        md: "12px",
        lg: "16px",
        xl: "20px",
        "2xl": "24px",
        "3xl": "32px",
        full: "9999px",
        button: "8px",
      },
    },
  },
};



document.addEventListener("DOMContentLoaded", function () {
  const mobileMenuButton = document.getElementById("mobile-menu-button");
  const mobileMenu = document.getElementById("mobile-menu");
  mobileMenuButton.addEventListener("click", function () {
    mobileMenu.classList.toggle("hidden");
  });
  // Close mobile menu when clicking a link
  const mobileLinks = mobileMenu.querySelectorAll("a");
  mobileLinks.forEach((link) => {
    link.addEventListener("click", function () {
      mobileMenu.classList.add("hidden");
    });
  });
  // Smooth scrolling for navigation links
  const navLinks = document.querySelectorAll('a[href^="#"]');
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        });
      }
    });
  });
});



document.addEventListener("DOMContentLoaded", function () {
  // Initialize EmailJS with Public API
  emailjs.init("UoJlgAgqX32bMAaxg"); // Public API

  const contactForm = document.getElementById("contact-form");
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form values
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const subject = document.getElementById("subject").value;
    const message = document.getElementById("message").value;

    // Simple validation
    if (!name || !email || !subject || !message) {
      alert("Please fill in all fields");
      return;
    }

    // Prepare EmailJS parameters
    const templateParams = {
      name: name,
      email: email,
      subject: subject,
      message: message
    };

    // Send email via EmailJS
    emailjs.send("service_8o9ow7p", "template_gp1i54f", templateParams)
      .then(function (response) {
        alert(`Thank you for your message, ${name}! I'll get back to you soon.`);
        contactForm.reset();
      }, function (error) {
        alert("Failed to send message. Please try again later.");
        console.error("EmailJS error:", error);
      });
  });
});


// Tab actions
const tabs = document.querySelectorAll('.tab-button');
const contents = document.querySelectorAll('.tab-content');
let current = 0;
let isHovered = false; // Flag to pause auto-switching

function showTab(index) {
  tabs.forEach((tab, i) => {
    tab.classList.toggle('text-blue-600', i === index);
    tab.classList.toggle('border-blue-600', i === index);
    tab.classList.toggle('border-transparent', i !== index);
  });
  contents.forEach((content, i) => {
    content.classList.toggle('hidden', i !== index);
  });
  current = index;
}

// Tab click event
tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const index = parseInt(tab.dataset.tab);
    showTab(index);
  });

  // Hover detection on tab buttons
  tab.addEventListener('mouseenter', () => {
    isHovered = true;
  });
  tab.addEventListener('mouseleave', () => {
    isHovered = false;
  });
});

// Hover detection on tab contents
contents.forEach(content => {
  content.addEventListener('mouseenter', () => {
    isHovered = true;
  });
  content.addEventListener('mouseleave', () => {
    isHovered = false;
  });
});

// Auto-switch every 5s (3s on mobile < 640px) if not hovered
function getInterval() {
  return window.innerWidth < 640 ? 3000 : 5000; // 3s on mobile, 5s on desktop
}

let intervalId = setInterval(() => {
  if (!isHovered) {
    const next = (current + 1) % contents.length;
    showTab(next);
  }
}, getInterval());

// Update interval on resize
window.addEventListener('resize', () => {
  clearInterval(intervalId);
  intervalId = setInterval(() => {
    if (!isHovered) {
      const next = (current + 1) % contents.length;
      showTab(next);
    }
  }, getInterval());
});

// Show first tab initially
showTab(0);