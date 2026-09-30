let menuIcon = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");
let sections = document.querySelectorAll("section");
let navLinks = document.querySelectorAll("header nav a");

window.onscroll = () => {
  sections.forEach((sec) => {
    let top = window.scrollY;
    let offset = sec.offsetTop - 150;
    let height = sec.offsetHeight;
    let id = sec.getAttribute("id");

    if (top >= offset && top < offset + height) {
      navLinks.forEach((links) => {
        links.classList.remove("active");
      });
      const activeLink = document.querySelector(
        'header nav a[href="#' + id + '"]',
      );
      if (activeLink) activeLink.classList.add("active");
    }
  });
};
function toggleMenu() {
  menuIcon.classList.toggle("bx-x");
  navbar.classList.toggle("active");
}
menuIcon.onclick = toggleMenu;
menuIcon.addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    toggleMenu();
  }
});

document
  .getElementById("project-search")
  .addEventListener("change", function () {
    const selectedTech = this.value.toLowerCase();
    const projects = document.querySelectorAll(".project-box");

    projects.forEach((project) => {
      const techList = project.getAttribute("data-tech").toLowerCase();
      if (selectedTech === "all" || techList.includes(selectedTech)) {
        project.style.display = "block";
      } else {
        project.style.display = "none";
      }
    });
  });

// --- Formulario de contacto (EmailJS) ---
// El destinatario se configura en el panel de EmailJS, dentro de la plantilla.
const EMAILJS_USER_ID = "SqgDa5xuzGLySY5lS";
const EMAILJS_SERVICE_ID = "service_vd2djvq";
const EMAILJS_TEMPLATE_ID = "template_ktfwkym";

const contactForm = document.getElementById("contactForm");
const contactSubmit = document.getElementById("contactSubmit");
const formStatus = document.getElementById("formStatus");

function showStatus(message, type) {
  formStatus.textContent = message;
  formStatus.className = "form-status visible " + type;
}

contactForm.addEventListener("submit", function (event) {
  event.preventDefault();

  if (!contactForm.checkValidity()) {
    showStatus("Por favor, completa todos los campos.", "error");
    return;
  }

  if (typeof emailjs === "undefined") {
    showStatus(
      "No se pudo cargar el servicio de correo. Intenta de nuevo más tarde.",
      "error",
    );
    return;
  }

  const params = {
    fullName: document.getElementById("fullName").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    subject: document.getElementById("subject").value,
    message: document.getElementById("message").value,
  };

  contactSubmit.disabled = true;
  contactSubmit.value = "Enviando...";
  showStatus("", "success");

  emailjs.init(EMAILJS_USER_ID);
  emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, params).then(
    function () {
      contactForm.reset();
      showStatus("¡Mensaje enviado con éxito!", "success");
    },
    function (error) {
      console.error("EmailJS:", error);
      showStatus("No se pudo enviar el mensaje. Intenta de nuevo.", "error");
    },
  ).finally(function () {
    contactSubmit.disabled = false;
    contactSubmit.value = "Enviar mensaje";
  });
});
