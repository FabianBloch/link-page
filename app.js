/*
 * Linkseite Bloch
 * Copyright (c) 2026 Fabian Bloch
 * SPDX-License-Identifier: MIT
 */

/* Läuft komplett lokal (file://) */

const rawJson = document.getElementById("links-data").textContent;
const data = JSON.parse(rawJson);

const tabsEl = document.getElementById("tabs");
const gridEl = document.getElementById("grid");
const searchInput = document.getElementById("searchInput");

let activeTab = 0;
let search = "";

buildTabs();
render();

searchInput.addEventListener("input", () => {
  search = searchInput.value.toLowerCase();
  render();
});

function buildTabs() {
  tabsEl.innerHTML = "";

  data.forEach((t, idx) => {
    const btn = document.createElement("button");
    btn.className = "tab";
    btn.textContent = t.tab;

    if (idx === activeTab) {
      btn.classList.add("is-active");
    }

    btn.addEventListener("click", () => {
      activeTab = idx;

      // alle Tabs zurücksetzen
      document.querySelectorAll(".tab").forEach(tab => {
        tab.classList.remove("is-active");
      });

      // aktiven Tab markieren
      btn.classList.add("is-active");

      render();
    });

    tabsEl.appendChild(btn);
  });
}

function render() {
  gridEl.innerHTML = "";

  let links = [];

  if (search.trim() !== "") {
    // Suche über alle Tabs
    // Bei Suche: keine Färbung der Tabs, da Suche über alle Tabs hinweg erfolgt
    btns = document.querySelectorAll(".tab");
    btns.forEach(btn => btn.classList.remove("is-active"));
    links = data.flatMap(tab => tab.links);
  } else {
    // Normaler Tab-Modus
    links = data[activeTab].links;
  }

  links
    .filter(l =>
      l.title.toLowerCase().includes(search) ||
      l.desc.toLowerCase().includes(search) ||
      (l.tag || "").toLowerCase().includes(search)
    )
    .forEach(link => {
      gridEl.appendChild(card(link));
    });
}

function card(l) {
  const a = document.createElement("a");
  a.className = `card ${l.color}`;
  a.href = l.url || "#";
  a.target = "_blank";

  const badge = document.createElement("div");
  badge.className = "badge";

  // 🖼️ Bild ODER Emoji
  if (l.image) {
    const img = document.createElement("img");
    img.src = l.image;
    img.alt = l.title || "";
    img.loading = "lazy";
    img.className = "badge__img";
    badge.appendChild(img);
  } else {
    badge.textContent = l.icon || "🔗";
  }

  const text = document.createElement("div");

  const title = document.createElement("div");
  title.className = "card__title";
  title.textContent = l.title;

  const desc = document.createElement("div");
  desc.className = "card__desc";
  desc.textContent = l.desc;

  text.appendChild(title);
  text.appendChild(desc);

  a.appendChild(badge);
  a.appendChild(text);

  return a;
}

// Suchleiste springen
document.addEventListener("keydown", function (event) {
  // Strg + S (Windows/Linux) oder Cmd + S (Mac)
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "s") {
    event.preventDefault(); // verhindert "Seite speichern"
    
    const searchInput = document.getElementById("searchInput");
    if (searchInput) {
      searchInput.focus();
      searchInput.select(); // optional: markiert vorhandenen Text
    }
  }
});

// ESC-Taste löscht die Suche und springt zurück zum aktiven Tab
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    searchInput.value = "";
    search = "";
    render();

    // Aktiven Tab markieren
    const btns = document.querySelectorAll(".tab");
    btns.forEach((btn, idx) => {
      if (idx === activeTab) {
        btn.classList.add("is-active");
      } else {
        btn.classList.remove("is-active");
      }
    });
  }
});

// Enter-Taste auf Suchleiste: erster Link wird geöffnet, bei keinem Suchergebnis Begriff in google suchen
searchInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    const visibleLinks = Array.from(gridEl.querySelectorAll(".card"));
    if (visibleLinks.length > 0) {
      const firstLink = visibleLinks[0].href;
      window.open(firstLink, "_blank");
    } else if (search.trim() !== "") {
      const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(search)}`;
      window.open(googleSearchUrl, "_blank");
    }
  }
});

// Dark Mode Toggle
const themeToggle = document.getElementById("themeToggle");

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  const darkMode = document.body.classList.contains("dark");

  themeToggle.textContent = darkMode ? "☀️" : "🌙";

  localStorage.setItem("theme", darkMode ? "dark" : "light");
});

// Beim Laden der Seite: Theme aus localStorage anwenden
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
  document.body.classList.add("dark");
  document.getElementById("themeToggle").textContent = "☀️";
}