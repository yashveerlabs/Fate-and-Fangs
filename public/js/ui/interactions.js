export function contactHandler() {
  const btn = document.getElementById("contactBtn");
  if (btn) {
    btn.addEventListener("click", () => {
      window.open("https://instagram.com/yashveerlabs", "_blank");
    });
  }
}
