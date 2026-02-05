const BASE_URL = "http://192.168.1.5";

let allState = false;

const lamps = ["dapur", "kamar", "tamu", "toilet", "teras", "gudang"];

function toggleAll() {
  allState = !allState;

  // kirim ke ESP
  lamps.forEach(lamp => postTo(lamp));

  // update UI lampu
  lamps.forEach(lamp => {
    const btn = document.getElementById(`btn-${lamp}`);
    const img = document.getElementById(`img-${lamp}`);

    if (!btn || !img) return;

    btn.textContent = allState ? "HIDUP" : "MATI";
    btn.style.backgroundColor = allState ? "red" : "#5e5ce0";
    img.src = allState ? "assets/led-on.png" : "assets/led-off.png";
  });

  // update tombol ALL
  const btnAll = document.getElementById("btn-all");
  btnAll.textContent = allState ? "Matikan Semua" : "Hidupkan Semua";
  btnAll.style.backgroundColor = allState ? "red" : "#5e5ce0";
  btnAll.style.color = "white";
}

function postTo(path) {
  fetch(`${BASE_URL}/${path}`, { method: "POST" });
}

function postTo(path) {
  return fetch(`${BASE_URL}/${path}`, { method: "POST" })
    .then(res => res.text());
}

function toggle(btnId, imgId, path) {
  const btn = document.getElementById(btnId);
  const img = document.getElementById(imgId);

  postTo(path).then(result => {
    if (result.trim() === "ON") {
      btn.textContent = "HIDUP";
      btn.style.backgroundColor = "red";
      img.src = "assets/led-on.png";
    } else {
      btn.textContent = "MATI";
      btn.style.backgroundColor = "#5e5ce0";
      img.src = "assets/led-off.png";
    }
  });
}

function setDapurLed()  { toggle("btn-dapur",  "img-dapur",  "dapur"); }
function setKamarLed()  { toggle("btn-kamar",  "img-kamar",  "kamar"); }
function setTamuLed()   { toggle("btn-tamu",   "img-tamu",   "tamu"); }
function setToiletLed() { toggle("btn-toilet", "img-toilet", "toilet"); }
function setTerasLed()  { toggle("btn-teras",  "img-teras",  "teras"); }
function setGudangLed() { toggle("btn-gudang", "img-gudang", "gudang"); }

