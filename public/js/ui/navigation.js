export function handleNavigation() {
  document.querySelectorAll("[data-route]").forEach(btn => {
    btn.addEventListener("click", () => {
      const route = btn.dataset.route;
      const number = document.getElementById("finalNumber").textContent;
      window.location.href = `./${route}.html?n=${number}`;
    });
  });
}
