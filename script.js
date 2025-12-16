const openFileInput = document.querySelector("#openFile");
const openFileBtn = document.querySelector("#openFileBtn");
const vidPlayer = document.querySelector("#main");
const toast = document.querySelector("#toast");

function toastHandler(text) {
  toast.innerHTML = text;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 1000);
}

openFileBtn.addEventListener("click", () => openFileInput.click());

openFileInput.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (!file) return;

  vidPlayer.innerHTML = '<div class="toast" id="toast"></div>';
  const link = URL.createObjectURL(file);
  const video = document.createElement("video");
  video.id = "video";
  video.src = link;
  video.controls = true;
  video.autoplay = true;
  video.classList.add("video");
  vidPlayer.appendChild(video);
  vidPlayer.appendChild(toast);
});

document.querySelector("#reload").addEventListener("click", () => location.reload());

document.querySelector("#exit").addEventListener("click", () => window.close());

document.querySelector("#playPause").addEventListener("click", () => {
  const video = document.querySelector("#video");
  if (!video) return;
  if (video.paused) {
    video.play();
    toastHandler("Play");
  } else {
    video.pause();
    toastHandler("Pause");
  }
});

document.querySelector("#restart").addEventListener("click", () => {
  const video = document.querySelector("#video");
  if (!video) return;
  video.currentTime = 0;
  video.play();
  toastHandler("Restarted");
});

document.querySelector("#speedUp").addEventListener("click", () => {
  const video = document.querySelector("#video");
  if (!video) return;
  video.playbackRate = Math.min(video.playbackRate + 0.25, 4);
  toastHandler(video.playbackRate.toFixed(2) + "x");
});

document.querySelector("#speedDown").addEventListener("click", () => {
  const video = document.querySelector("#video");
  if (!video) return;
  video.playbackRate = Math.max(video.playbackRate - 0.25, 0.25);
  toastHandler(video.playbackRate.toFixed(2) + "x");
});

document.querySelector("#volumeUp").addEventListener("click", () => {
  const video = document.querySelector("#video");
  if (!video) return;
  video.volume = Math.min(video.volume + 0.1, 1);
  toastHandler(Math.round(video.volume * 100) + "%");
});

document.querySelector("#volumeDown").addEventListener("click", () => {
  const video = document.querySelector("#video");
  if (!video) return;
  video.volume = Math.max(video.volume - 0.1, 0);
  toastHandler(Math.round(video.volume * 100) + "%");
});

document.querySelector("#mute").addEventListener("click", () => {
  const video = document.querySelector("#video");
  if (!video) return;
  video.muted = !video.muted;
  toastHandler(video.muted ? "Muted" : "Unmuted");
});

document.querySelector("#fullscreen").addEventListener("click", () => {
  const video = document.querySelector("#video");
  if (video && video.requestFullscreen) video.requestFullscreen();
});

document.querySelector("#exitFullscreen").addEventListener("click", () => {
  if (document.fullscreenElement) document.exitFullscreen();
});

document.querySelector("#about").addEventListener("click", () => {
  alert("🎬 VLC Media Player Clone\nMade with HTML, CSS, JS\nBy Ajit 🚀");
});
