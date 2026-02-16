import { calculateValue } from "./core/calculator.js";
import { updateCircles } from "./ui/circleRenderer.js";
import { handleNavigation } from "./ui/navigation.js";
import { contactHandler } from "./ui/interactions.js";
import { personalData } from "../data/personal-data.js";
import { businessData } from "../data/business-data.js";

/* ================= HOME ================= */

const input = document.getElementById("inputValue");

if (input) {
  input.addEventListener("input", e => {
    const result = calculateValue(e.target.value);

    updateCircles(result.total, result.reduced);
    updateHomeDescription(result.reduced);
  });

  handleNavigation();
  contactHandler();
}

function updateHomeDescription(number) {
  const container = document.getElementById("homeDescription");
  if (!container) return;

  const data = personalData[number];
  if (!data || !data.short) return;

  container.innerHTML = `
    <p>${data.short[0]}</p>
    <p>${data.short[1]}</p>
    <p>${data.short[2]}</p>
  `;
}

/* ================= DETAIL PAGES ================= */

const params = new URLSearchParams(window.location.search);
const number = params.get("n");
const content = document.getElementById("content");
const hero = document.getElementById("heroSection");

if (content && number) {
  const isPersonal = window.location.pathname.includes("personal");
  const dataSource = isPersonal ? personalData : businessData;
  const item = dataSource[number];

  if (!item) {
    content.innerHTML = `<p class="text-black">No data available for this number.</p>`;
  } else {
    renderPremiumDetailPage(item, number);
  }
}

/* ================= PREMIUM RENDERER ================= */

function renderPremiumDetailPage(item, number) {

  /* ---------- HERO SECTION ---------- */

  if (hero) {
    hero.innerHTML = `
      <div class="bg-charcoal border border-soft rounded-3xl p-10 text-center">
        
        <div class="w-24 h-24 mx-auto rounded-full border border-gold flex items-center justify-center mb-6">
          <span class="font-display text-4xl text-gold">${number}</span>
        </div>

        <h2 class="font-display text-3xl text-gold mb-4">
          ${item.title}
        </h2>

        <p class="text-black leading-relaxed">

          ${item.description}
        </p>

      </div>
    `;
  }

  /* ---------- SECTION CARDS ---------- */

  let sectionHTML = "";

  if (item.sections) {
    Object.keys(item.sections).forEach(key => {

      const formattedTitle = formatSectionTitle(key);
      const text = item.sections[key];

      if (!text) return;

      sectionHTML += `
        <div class="bg-charcoal border border-soft rounded-2xl p-6 hover:border-gold transition duration-300">
          <h3 class="text-gold font-medium mb-3 text-lg">
            ${formattedTitle}
          </h3>
          <p class="text-black leading-relaxed">

            ${text}
          </p>
        </div>
      `;
    });
  }

  content.innerHTML = sectionHTML;
}

/* ================= HELPERS ================= */

function formatSectionTitle(key) {
  return key
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, str => str.toUpperCase());
}
