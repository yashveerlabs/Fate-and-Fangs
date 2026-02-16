export function updateCircles(total, reduced) {
  const totalEl = document.getElementById("totalNumber");
  const finalEl = document.getElementById("finalNumber");

  if (!totalEl || !finalEl) return;

  totalEl.textContent = total;
  finalEl.textContent = reduced;
}
