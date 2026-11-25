const search = document.querySelector("#search");
const input = search.querySelector("input");
const hits = search.querySelector("ul");
let index;

function fill() {
  const terms = input.value.trim().toLowerCase().split(/\s+/).filter(Boolean);
  const results = terms.length
    ? index.filter(({ title, summary, section }) => terms.every((term) => (title + " " + summary + " " + section).toLowerCase().includes(term)))
    : index.filter(({ url }) => !url.includes("#"));
  const links = results.slice(0, 10).map(({ title, section, url }) => {
    const row = document.createElement("li");
    const link = document.createElement("a");
    const meta = document.createElement("small");
    link.href = url;
    link.textContent = title;
    meta.textContent = section;
    link.append(meta);
    row.append(link);
    return row;
  });
  if (!links.length) {
    const row = document.createElement("li");
    row.textContent = "No matching guides.";
    links.push(row);
  }
  hits.replaceChildren(...links);
}

async function openSearch() {
  search.showModal();
  input.focus();
  try {
    index ??= await fetch("./search.json").then((res) => {
      if (!res.ok) throw new Error("Search could not load");
      return res.json();
    });
    fill();
  } catch {
    hits.textContent = "Search is unavailable. Browse the guide links on this page.";
  }
}
document.querySelector(".search-open").addEventListener("click", openSearch);
input.addEventListener("input", () => { if (index) fill(); });
search.addEventListener("click", (event) => {
  if (event.target === search || event.target.closest("a")) search.close();
});
document.addEventListener("keydown", (event) => {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
    event.preventDefault();
    if (!search.open) openSearch();
  }
});
document.querySelectorAll(".code button").forEach((button) => {
  button.addEventListener("click", async () => {
    try {
      const code = button.closest(".code").querySelector("code").textContent;
      await navigator.clipboard.writeText(code);
      button.textContent = "Copied";
    } catch {
      button.textContent = "Select to copy";
    }
    setTimeout(() => { button.textContent = "Copy"; }, 1500);
  });
});
