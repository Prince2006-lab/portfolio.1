// ===============================
// NAVBAR TOGGLE (MOBILE)
// ===============================
const toggleBtn = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

toggleBtn.addEventListener("click", () => {
  const expanded = toggleBtn.getAttribute("aria-expanded") === "true";
  toggleBtn.setAttribute("aria-expanded", !expanded);
  navLinks.classList.toggle("open");
});

// ===============================
// SCROLL ACTIVE LINK
// ===============================
const sections = document.querySelectorAll("section");
const navItems = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navItems.forEach(a => {
    a.classList.remove("active");
    if (a.getAttribute("href") === `#${current}`) {
      a.classList.add("active");
    }
  });
});

// ===============================
// REVEAL ON SCROLL
// ===============================
const reveals = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, { threshold: 0.2 });

reveals.forEach(el => observer.observe(el));

// ===============================
// COUNTER ANIMATION
// ===============================
const counters = document.querySelectorAll(".stat-number");

counters.forEach(counter => {
  const update = () => {
    const target = +counter.getAttribute("data-count");
    const suffix = counter.getAttribute("data-suffix") || "";
    let count = +(counter.innerText.replace(/\D/g, ""));

    const increment = target / 50;

    if (count < target) {
      counter.innerText = Math.ceil(count + increment) + suffix;
      setTimeout(update, 40);
    } else {
      counter.innerText = target + suffix;
    }
  };

  update();
});

// ===============================
// SIMULATE JSON TERMINAL
// ===============================
const btn = document.getElementById("btn-simulate");
const terminal = document.getElementById("json-terminal");
const terminalBody = document.querySelector(".terminal-body");

if (btn) {
  btn.addEventListener("click", () => {
    terminal.classList.add("active");
    terminalBody.innerHTML = "";

    const data = [
      '{',
      '  "ingredients": ["egg", "milk", "spinach"],',
      '  "calories_left": 520,',
      '  "suggested_recipe": "Spinach Omelette",',
      '  "protein": "high",',
      '  "prep_time": "10 mins"',
      '}'
    ];

    let i = 0;

    const typeLine = () => {
      if (i < data.length) {
        terminalBody.innerHTML += data[i] + "<br/>";
        i++;
        setTimeout(typeLine, 300);
      }
    };

    typeLine();
  });
}

// ===============================
// FORM VALIDATION
// ===============================
const form = document.getElementById("contact-form");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let valid = true;

  const errName = document.getElementById("err-name");
  const errEmail = document.getElementById("err-email");
  const errMessage = document.getElementById("err-message");
  const successMsg = document.getElementById("form-success");

  // Reset errors
  errName.style.display = "none";
  errEmail.style.display = "none";
  errMessage.style.display = "none";
  successMsg.style.display = "none";

  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const message = document.getElementById("message");

  if (name.value.trim().length < 2) {
    errName.style.display = "block";
    valid = false;
  }

  // Basic email regex pattern for more robust checking
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.value.trim())) {
    errEmail.style.display = "block";
    valid = false;
  }

  if (message.value.trim().length < 10) {
    errMessage.style.display = "block";
    valid = false;
  }

  if (valid) {
    successMsg.style.display = "block";
    form.reset();
  }
});

// ===============================
// PARTICLE CANVAS (BASIC)
// ===============================
const canvas = document.getElementById("particle-canvas");

if (canvas) {
  const ctx = canvas.getContext("2d");
  
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  let particles = [];

  for (let i = 0; i < 50; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2 + 1,
      dx: Math.random() - 0.5,
      dy: Math.random() - 0.5
    });
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = "#00f0ff";
      ctx.fill();

      p.x += p.dx;
      p.y += p.dy;

      if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
    });

    requestAnimationFrame(draw);
  }

  draw();
}