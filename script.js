document.addEventListener("DOMContentLoaded", () => {
  // Mobile Navigation Toggle
  const checkbox = document.getElementById("check");
  const navMenu = document.querySelector(".nav__menu");
  const navLinks = document.querySelectorAll(".nav__menu a");

  // Toggle mobile menu
  checkbox.addEventListener("change", () => {
    navMenu.classList.toggle("active");
  });

  // Close mobile menu when a link is clicked
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active");
      checkbox.checked = false;
    });
  });

  // Smooth Scrolling for Navigation Links
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: "smooth",
        });
      }
    });
  });

  // Contact Form Submission
  const contactForm = document.querySelector(".contact__form");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      // Basic form validation
      const name = contactForm.querySelector('input[type="text"]');
      const email = contactForm.querySelector('input[type="email"]');
      const message = contactForm.querySelector("textarea");

      if (
        name.value.trim() === "" ||
        email.value.trim() === "" ||
        message.value.trim() === ""
      ) {
        alert("Please fill in all fields");
        return;
      }

      // In a real-world scenario, you would send this to a backend service
      alert("Thank you for your message! I will get back to you soon.");
      contactForm.reset();
    });
  }

  // Typing Effect for Home Title
  const typedTextSpan = document.querySelector(".typed-text");
  const titles = ["Web Developer", "AI Enthusiast", "Problem Solver"];
  let titleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function type() {
    const currentTitle = titles[titleIndex];

    if (isDeleting) {
      typedTextSpan.textContent = currentTitle.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typedTextSpan.textContent = currentTitle.substring(0, charIndex + 1);
      charIndex++;
    }

    if (!isDeleting && charIndex === currentTitle.length) {
      isDeleting = true;
      setTimeout(type, 2000); // Wait before starting to delete
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      titleIndex = (titleIndex + 1) % titles.length;
      setTimeout(type, 500); // Wait before typing next word
    } else {
      setTimeout(type, isDeleting ? 100 : 200);
    }
  }

  type(); // Start the typing effect

  // Active Navigation Link Highlighting
  const sections = document.querySelectorAll(".section");
  const navMenuLinks = document.querySelectorAll(".nav__menu a");

  window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (window.scrollY >= sectionTop - sectionHeight / 3) {
        current = section.getAttribute("id");
      }
    });

    navMenuLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href").substring(1) === current) {
        link.classList.add("active");
      }
    });
  });

  // Simple Project Hover Effects
  const portfolioItems = document.querySelectorAll(".portfolio__item");
  portfolioItems.forEach((item) => {
    item.addEventListener("mouseenter", () => {
      item.style.transform = "scale(1.05)";
      item.style.transition = "transform 0.3s ease";
    });

    item.addEventListener("mouseleave", () => {
      item.style.transform = "scale(1)";
    });
  });
});

// Scroll Progress Bar
window.addEventListener("scroll", () => {
  const scrollProgress = document.querySelector(".scroll-progress");
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const scrolled = window.scrollY;

  const progressWidth = `${(scrolled / scrollable) * 100}%`;
  scrollProgress.style.width = progressWidth;
});

// Lazy Loading Images
document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll("img[data-src]");

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute("data-src");
        observer.unobserve(img);
      }
    });
  });

  images.forEach((img) => imageObserver.observe(img));
});

// Smooth Reveal Animation for Sections
const revealElements = document.querySelectorAll(".section");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
      }
    });
  },
  {
    threshold: 0.1,
  },
);

// Back to Top Button Functionality
const backToTopButton = document.querySelector(".back-to-top");

backToTopButton.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

revealElements.forEach((element) => revealObserver.observe(element));
