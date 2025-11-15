async function loadGallery() {
    const res = await fetch('data/gallery.json');
    const items = await res.json();
    renderGallery(items);

    document.getElementById("categoryFilter").addEventListener("change", () => renderGallery(items));
    document.getElementById("colorFilter").addEventListener("change", () => renderGallery(items));
}

function renderGallery(items) {
    const cat = document.getElementById("categoryFilter").value;
    const col = document.getElementById("colorFilter").value;

    const filtered = items.filter(i =>
        (cat === "all" || i.category === cat) &&
        (col === "all" || i.color === col)
    );

    const gallery = document.getElementById("gallery");
    gallery.innerHTML = "";

    filtered.forEach(item => {
        const div = document.createElement("div");
        div.className = "gallery-item";

        div.innerHTML = `<img src="${item.thumb}">`;
        div.onclick = () => openViewer(item);

        gallery.appendChild(div);
    });
}

function openViewer(item) {
    const viewer = document.getElementById("viewer");
    viewer.classList.remove("hidden");

    const img = document.getElementById("viewerImg");
    const video = document.getElementById("viewerVideo");

    img.style.display = "none";
    video.style.display = "none";

    if (item.youtube) {
        video.src = `https://www.youtube.com/embed/${item.youtube}`;
        video.style.display = "block";
    } else {
        img.src = item.full;
        img.style.display = "block";
    }
}

document.getElementById("closeViewer").onclick = () => {
    const viewer = document.getElementById("viewer");
    viewer.classList.add("hidden");
    document.getElementById("viewerVideo").src = "";
};

loadGallery();
