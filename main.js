// Set current year in footer
const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// Simple dark-mode toggle using localStorage
const root = document.documentElement;
const toggleBtn = document.querySelector(".theme-toggle");

// Load saved theme
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
  root.setAttribute("data-theme", "dark");
}

// Update button icon based on theme
function updateIcon() {
  if (!toggleBtn) return;
  const isDark = root.getAttribute("data-theme") === "dark";
  toggleBtn.textContent = isDark ? "??" : "??";
}

if (toggleBtn) {
  updateIcon();
  toggleBtn.addEventListener("click", () => {
    const isDark = root.getAttribute("data-theme") === "dark";
    if (isDark) {
      root.removeAttribute("data-theme");
      localStorage.setItem("theme", "light");
    } else {
      root.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    }
    updateIcon();
  });
}

// Add publication number blocks on the left
document.querySelectorAll("ol.pub-list").forEach((list) => {
  const items = Array.from(list.querySelectorAll("li"));
  const reversed = list.hasAttribute("reversed");
  const total = items.length;

  items.forEach((li, idx) => {
    const flex = li.firstElementChild;
    if (!flex || flex.querySelector(".pub-num")) return;

    const num = reversed ? total - idx : idx + 1;
    const numDiv = document.createElement("div");
    numDiv.className = "pub-num";
    numDiv.textContent = num;

    flex.prepend(numDiv);
  });
});

// Fetch visitor continent and country using a free API
async function setGeo() {
  const geoSpan = document.getElementById("geo-info");
  if (!geoSpan) return;

  try {
    const res = await fetch("https://ipapi.co/json/");
    if (!res.ok) throw new Error("geo fetch failed");
    const data = await res.json();
    const continent = data.continent_code || data.continent || "";
    const country = data.country_name || data.country || "";
    if (continent || country) {
      geoSpan.textContent = `Visitor: ${continent}${continent && country ? " ? " : ""}${country}`;
    }
  } catch (err) {
    const geoSpan = document.getElementById("geo-info");
    if (geoSpan) geoSpan.textContent = "";
  }
}

setGeo();
