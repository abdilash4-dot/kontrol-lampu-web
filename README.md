# Kontrol Lampu Berbasis Web (IoT Lokal)

Aplikasi web untuk mengontrol beberapa lampu menggunakan ESP (Arduino/ESP8266/ESP32) melalui jaringan lokal (WiFi).  
Kontrol dilakukan lewat browser tanpa aplikasi tambahan.

## Fitur
- Kontrol lampu per ruangan:
  - Dapur
  - Kamar
  - Tamu
  - Toilet
  - Teras
  - Gudang
- Mode **ALL ON / ALL OFF**
- Tampilan UI berubah real-time (ikon & tombol)
- Buzzer dengan nada berbeda (ON / OFF)
- Berjalan di browser (HP / Laptop)

## Teknologi yang Digunakan
- HTML
- CSS
- JavaScript (Fetch API)
- ESP (Web Server lokal)
- GitHub Pages (hosting UI)

## Struktur Folder
/
├── index.html
├── about.html
├── style.css
├── main.js
├── assets/
│ ├── led-on.png
│ └── led-off.png
└── README.md

## Cara Kerja Singkat
1. Web mengirim request POST ke ESP
2. ESP menerima perintah (ON / OFF)
3. ESP mengontrol pin output (relay / LED)
4. ESP mengirim respon ke web
5. UI diperbarui otomatis

## Konfigurasi Penting
Pastikan IP ESP sesuai dengan jaringan lokal:

```javascript
const BASE_URL = "http://192.168.1.5";
