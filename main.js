const BASE_URL = "http://192.168.1.5";
const lamps = ["dapur", "kamar", "tamu", "toilet", "teras", "gudang"];

/* =========================
   TOGGLE ALL LAMPU
========================= */
function toggleAll() {
  fetch(`${BASE_URL}/${lamps[0]}`)
    .then(res => res.text())
    .then(state => {
      const turnOn = state.trim() === "OFF";

      lamps.forEach(lamp => {
        fetch(`${BASE_URL}/${lamp}`, { method: "POST" });
      });

      setTimeout(() => {
        syncAllLamps();
        updateAllButtonFromState();
      }, 200);
    });
}

/* =========================
   POST
========================= */
function postTo(path) {
  return fetch(`${BASE_URL}/${path}`, { method: "POST" })
    .then(res => res.text());
}

/* =========================
   TOGGLE SATU LAMPU
========================= */
function toggle(btnId, imgId, path) {
  const btn = document.getElementById(btnId);
  const img = document.getElementById(imgId);

  postTo(path).then(result => {
    const on = result.trim() === "ON";

    btn.textContent = on ? "HIDUP" : "MATI";
    btn.style.backgroundColor = on ? "red" : "#5e5ce0";
    img.src = on ? "assets/led-on.png" : "assets/led-off.png";

    if (on) btn.classList.add("active");
    else btn.classList.remove("active");
  });
}

function setDapurLed()  { toggle("btn-dapur",  "img-dapur",  "dapur"); }
function setKamarLed()  { toggle("btn-kamar",  "img-kamar",  "kamar"); }
function setTamuLed()   { toggle("btn-tamu",   "img-tamu",   "tamu"); }
function setToiletLed() { toggle("btn-toilet", "img-toilet", "toilet"); }
function setTerasLed()  { toggle("btn-teras",  "img-teras",  "teras"); }
function setGudangLed() { toggle("btn-gudang", "img-gudang", "gudang"); }

/* =========================
   LDR
========================= */
function fetchLDR() {
  fetch(`${BASE_URL}/ldr`)
    .then(res => res.text())
    .then(value => {
      document.getElementById("ldrValue").textContent = value;
    });
}
setInterval(fetchLDR, 700);

/* =========================
   SYNC SATU LAMPU
========================= */
function syncLamp(lamp) {
  fetch(`${BASE_URL}/${lamp}`)
    .then(res => res.text())
    .then(state => {
      const btn = document.getElementById(`btn-${lamp}`);
      const img = document.getElementById(`img-${lamp}`);
      const on = state.trim() === "ON";

      btn.textContent = on ? "HIDUP" : "MATI";
      btn.style.backgroundColor = on ? "red" : "#5e5ce0";
      img.src = on ? "assets/led-on.png" : "assets/led-off.png";

      if (on) btn.classList.add("active");
      else btn.classList.remove("active");
    });
}

/* =========================
   UPDATE TOMBOL ALL
   (HANYA DIPANGGIL DARI toggleAll)
========================= */
function updateAllButtonFromState() {
  Promise.all(
    lamps.map(l =>
      fetch(`${BASE_URL}/${l}`)
        .then(r => r.text())
        .then(s => s.trim() === "ON")
    )
  ).then(states => {
    const allOn = states.every(Boolean);
    const btnAll = document.getElementById("btn-all");

    btnAll.textContent = allOn ? "Matikan Semua" : "Hidupkan Semua";
    btnAll.style.backgroundColor = allOn ? "red" : "#5e5ce0";

    if (allOn) btnAll.classList.add("active");
    else btnAll.classList.remove("active");
  });
}

/* =========================
   SYNC SEMUA LAMPU (TANPA ALL)
========================= */
function syncAllLamps() {
  lamps.forEach(syncLamp);
}

setInterval(syncAllLamps, 500);
