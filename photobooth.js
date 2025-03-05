const data = JSON.parse(localStorage.getItem("data"));
const name1 = data ? data.name1 : "Pasangan 1";
const name2 = data ? data.name2 : "Pasangan 2";

const video = document.getElementById("video");
const startBtn = document.getElementById("start");
const countdownEl = document.getElementById("countdown");
const flashEl = document.getElementById("flash");
const cameraContainer = document.getElementById("cameraContainer");
const resultContainer = document.getElementById("resultContainer");
const stripCanvas = document.getElementById("stripCanvas");
const retry = document.getElementById("retry");
const save = document.getElementById("save");
const name1El = document.getElementById("name1");
const name2El = document.getElementById("name2");

name1El.textContent = name1;
name2El.textContent = name2;

let stream;
let photos = [];
const templateImg = new Image();
templateImg.src = "https://raw.githubusercontent.com/cronixty/foto/main/strip_template.png";
templateImg.crossOrigin = "Anonymous";

// Akses kamera
async function initCamera() {
    try {
        console.log("Mencoba akses kamera...");
        stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = stream;
        console.log("Kamera berhasil diakses!");
    } catch (err) {
        console.error("Gagal akses kamera:", err);
        alert("Gagal akses kamera: " + err.message);
    }
}
initCamera();

// Ambil foto
function takePhoto() {
    console.log("Mengambil foto...");
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth || 320;
    canvas.height = video.videoHeight || 240;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    return canvas;
}

// Animasi flash
function flash() {
    console.log("Flash!");
    flashEl.style.animation = "flashEffect 0.2s ease";
    setTimeout(() => {
        flashEl.style.animation = "";
    }, 200);
}

// Load template dengan Promise
function loadTemplate() {
    return new Promise((resolve, reject) => {
        console.log("Memuat template dari:", templateImg.src);
        if (templateImg.complete && templateImg.naturalWidth !== 0) {
            console.log("Template sudah dimuat sebelumnya!");
            resolve(templateImg);
        } else {
            templateImg.onload = () => {
                console.log("Template berhasil dimuat!");
                resolve(templateImg);
            };
            templateImg.onerror = () => {
                console.error("Gagal memuat template!");
                reject(new Error("Gagal memuat template strip! Cek URL: " + templateImg.src));
            };
        }
    });
}

// Hitung mundur dan potret
function countdownAndSnap(count) {
    return new Promise(resolve => {
        console.log(`Mulai hitung mundur untuk foto ${count}...`);
        let timeLeft = 5;
        countdownEl.textContent = timeLeft;
        const timer = setInterval(() => {
            timeLeft--;
            countdownEl.textContent = timeLeft;
            if (timeLeft <= 0) {
                clearInterval(timer);
                flash();
                setTimeout(() => {
                    const photo = takePhoto();
                    photos.push(photo);
                    countdownEl.textContent = "";
                    console.log(`Foto ${count} diambil`);
                    resolve();
                }, 200);
            }
        }, 1000);
    });
}

startBtn.onclick = async () => {
    if (!stream) {
        alert("Kamera belum siap! Tunggu sebentar atau refresh halaman.");
        return;
    }
    photos = [];
    startBtn.disabled = true;
    console.log("Mulai sesi foto...");

    for (let i = 1; i <= 4; i++) {
        await countdownAndSnap(i);
    }

    console.log("Semua foto diambil, mencoba memuat template...");
    try {
        const template = await loadTemplate();
        console.log("Template dimuat, render strip...");
        renderStrip(template);
    } catch (err) {
        console.error("Error saat memuat atau render strip:", err);
        alert(err.message);
        renderStripFallback();
    } finally {
        console.log("Strip dirender, pindah ke hasil...");
        cameraContainer.classList.add("hidden");
        resultContainer.classList.remove("hidden");
        if (stream) stream.getTracks().forEach(track => track.stop());
        startBtn.disabled = false;
        console.log("Sesi foto selesai.");
    }
};

// Render strip dengan template
function renderStrip(template) {
    const ctx = stripCanvas.getContext("2d");
    console.log("Menggambar template...");
    ctx.drawImage(template, 0, 0, 150, 360);
    console.log("Menggambar foto...");
    ctx.drawImage(photos[0], 10, 10, 130, 80);
    ctx.drawImage(photos[1], 10, 95, 130, 80);
    ctx.drawImage(photos[2], 10, 180, 130, 80);
    ctx.drawImage(photos[3], 10, 265, 130, 80);
}

// Render fallback kalau template gagal
function renderStripFallback() {
    const ctx = stripCanvas.getContext("2d");
    console.log("Template gagal, pakai fallback...");
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, 150, 360);
    ctx.drawImage(photos[0], 10, 10, 130, 80);
    ctx.drawImage(photos[1], 10, 95, 130, 80);
    ctx.drawImage(photos[2], 10, 180, 130, 80);
    ctx.drawImage(photos[3], 10, 265, 130, 80);
}

// Ulang foto
retry.onclick = () => {
    console.log("Mengulang sesi foto...");
    cameraContainer.classList.remove("hidden");
    resultContainer.classList.add("hidden");
    initCamera();
};

// Simpan strip
save.onclick = () => {
    console.log("Menyimpan strip...");
    const link = document.createElement("a");
    link.download = `${name1}_${name2}_fotobox.png`;
    link.href = stripCanvas.toDataURL("image/png");
    link.click();
};

// Bintang animasi
const starsContainer = document.getElementById("stars");
for (let i = 0; i < 100; i++) {
    const star = document.createElement("div");
    star.classList.add("star");
    star.style.width = `${Math.random() * 3}px`;
    star.style.height = star.style.width;
    star.style.top = `${Math.random() * 100}%`;
    star.style.left = `${Math.random() * 100}%`;
    star.style.animationDelay = `${Math.random() * 3}s`;
    starsContainer.appendChild(star);
}
