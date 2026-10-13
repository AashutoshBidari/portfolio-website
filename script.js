// QUICK CUSTOMIZATION: change these values to your own details.
const portfolio = {
  name: "Alchi Dude",
  email: "your.email@example.com",
  github: "https://github.com/",
  linkedin: "https://www.linkedin.com/",
  youtube: "https://www.youtube.com/"
};

document.title = `${portfolio.name} | AI Student & Developer`;

const emailButton = document.querySelector("#emailButton");
if (emailButton) emailButton.href = `mailto:${portfolio.email}`;

const socialLinks = document.querySelectorAll(".social-links a");
const socialUrls = [portfolio.github, portfolio.linkedin, portfolio.youtube];
socialLinks.forEach((link, index) => {
  if (socialUrls[index]) link.href = socialUrls[index];
});

const year = document.querySelector("#year");
if (year) year.textContent = new Date().getFullYear();

const menuToggle = document.querySelector("#menuToggle");
const navLinks = document.querySelector("#navLinks");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
  });

  navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation menu");
    });
  });
}
