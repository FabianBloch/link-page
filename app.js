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
  const tab = data[activeTab];
  gridEl.innerHTML = "";

  tab.links
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