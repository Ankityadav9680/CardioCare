window.addEventListener("load", function () {
  setTimeout(function () {
    const loader = document.getElementById("loader");
    loader.classList.add("hide");
  }, 2500);
});
document.addEventListener("DOMContentLoaded", function () {
  const whyCards = document.querySelectorAll(".why-card");

  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.2, // Jaise hi 20% section view mein aayega
  };

  const observer = new IntersectionObserver(function (entries, observer) {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Har card par thoda delay dekar zoom-in animation trigger karenge
        setTimeout(() => {
          entry.target.classList.add("zoom-in");
        }, index * 150); // 150ms ka gap har card ke beech mein

        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  whyCards.forEach((card) => {
    observer.observe(card);
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const testimonials = [
    {
      stars: 5,
      text: `"As a diabetic with heart disease risk, I needed specialized care. Dr. Carter's preventive program has significantly reduced my cardiovascular risk factors. Highly recommend this clinic."`,
      initials: "LP",
      bgClass: "purple-bg",
      name: "Linda Park",
      role: "Preventive Care Patient, 2024",
    },
    {
      stars: 5,
      text: `"I called the emergency line at 3am with symptoms. The response was immediate and professional. Turned out I had an arrhythmia that needed urgent attention. They were lifesavers."`,
      initials: "TW",
      bgClass: "orange-bg",
      name: "Thomas Wilson",
      role: "Emergency Patient, 2024",
    },
    {
      stars: 5,
      text: `"The online booking system is so convenient. I got an appointment within 48 hours. The ECG results were explained clearly and the treatment plan was straightforward. Excellent experience."`,
      initials: "AM",
      bgClass: "teal-bg",
      name: "Amanda Moore",
      role: "Diagnostics Patient, 2024",
    },
    {
      stars: 5,
      text: `"The doctors and staff are extremely caring and professional. From my initial consultation to surgery recovery, everything was handled with utmost precision and care."`,
      initials: "RK",
      bgClass: "purple-bg",
      name: "Robert King",
      role: "Cardiac Surgery Patient, 2024",
    },
    {
      stars: 5,
      text: `"State of the art facilities and expert doctors. I felt very secure throughout my diagnostic tests and follow-up consultations. Truly the best heart care clinic."`,
      initials: "SJ",
      bgClass: "teal-bg",
      name: "Sarah Jenkins",
      role: "Cardiology Patient, 2024",
    },
  ];

  let currentIndex = 0;
  const gridContainer = document.querySelector(".testimonials-grid");
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");
  const dots = document.querySelectorAll(".slider-dots .dot");

  function renderTestimonials() {
    if (!gridContainer) return;

    // Screen size ke mutabiq kitne cards dikhane hain (Desktop par 3)
    const cardsToShow =
      window.innerWidth <= 768 ? 1 : window.innerWidth <= 1024 ? 2 : 3;
    let html = "";

    for (let i = 0; i < cardsToShow; i++) {
      const index = (currentIndex + i) % testimonials.length;
      const item = testimonials[index];

      html += `
        <div class="testimonial-card" style="opacity: 0; transform: translateY(10px); transition: all 0.4s ease;">
          <div class="testimonial-stars">
            ${'<i class="fa-solid fa-star"></i>'.repeat(item.stars)}
          </div>
          <p class="testimonial-text">${item.text}</p>
          <div class="testimonial-author">
            <div class="author-avatar ${item.bgClass}">${item.initials}</div>
            <div class="author-info">
              <h4>${item.name}</h4>
              <span>${item.role}</span>
            </div>
          </div>
        </div>
      `;
    }

    gridContainer.innerHTML = html;

    // Smooth fade-in effect
    setTimeout(() => {
      document.querySelectorAll(".testimonial-card").forEach((card) => {
        card.style.opacity = "1";
        card.style.transform = "translateY(0)";
      });
    }, 50);

    // Update active dot
    dots.forEach((dot, idx) => {
      if (idx === currentIndex % dots.length) {
        dot.classList.add("active-dot");
      } else {
        dot.classList.remove("active-dot");
      }
    });
  }

  // Next Button Click
  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % testimonials.length;
      renderTestimonials();
    });
  }

  // Prev Button Click
  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      currentIndex =
        (currentIndex - 1 + testimonials.length) % testimonials.length;
      renderTestimonials();
    });
  }

  // Dots Click
  dots.forEach((dot, idx) => {
    dot.addEventListener("click", () => {
      currentIndex = idx;
      renderTestimonials();
    });
  });

  // Auto round rotation every 4 seconds
  let autoSlide = setInterval(() => {
    currentIndex = (currentIndex + 1) % testimonials.length;
    (renderTestimonials(), 4000);
  });

  // Mouse hover par auto slide ruk jaye
  const section = document.querySelector(".testimonials-section");
  if (section) {
    section.addEventListener("mouseenter", () => clearInterval(autoSlide));
    section.addEventListener("mouseleave", () => {
      autoSlide = setInterval(() => {
        currentIndex = (currentIndex + 1) % testimonials.length;
        renderTestimonials();
      }, 4000);
    });
  }

  renderTestimonials();
});

document.addEventListener("DOMContentLoaded", function () {
  const viewAllBtn = document.getElementById("viewAllBtn");
  const extraCards = document.querySelectorAll(".extra-card");

  if (viewAllBtn) {
    viewAllBtn.addEventListener("click", function () {
      extraCards.forEach((card) => {
        card.style.display = "flex";
        card.style.opacity = "0";
        card.style.transform = "translateY(20px)";

        // Smooth animation ke sath cards show honge
        setTimeout(() => {
          card.style.transition = "all 0.5s ease";
          card.style.opacity = "1";
          card.style.transform = "translateY(0)";
        }, 50);
      });

      // Button click hone ke baad hide ho jayega
      viewAllBtn.style.display = "none";
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");

    question.addEventListener("click", () => {
      // Baaki sabhi open items ko band kar denge (accordion style)
      faqItems.forEach((otherItem) => {
        if (otherItem !== item && otherItem.classList.contains("active")) {
          otherItem.classList.remove("active");
          otherItem.querySelector(".faq-icon").className =
            "fa-solid fa-plus faq-icon";
          otherItem.querySelector(".faq-answer").style.maxHeight = "0";
        }
      });

      // Current item ko toggle karenge
      item.classList.toggle("active");
      const icon = item.querySelector(".faq-icon");
      const answer = item.querySelector(".faq-answer");

      if (item.classList.contains("active")) {
        icon.className = "fa-solid fa-xmark faq-icon";
        answer.style.maxHeight = answer.scrollHeight + "px";
      } else {
        icon.className = "fa-solid fa-plus faq-icon";
        answer.style.maxHeight = "0";
      }
    });
  });
});
