# For You pi 🌸

> Cantik seperti seorang putri, lucu dengan caranya sendiri, dan punya aura seperti seorang ratu.

Website tribute personal bergaya **Bento Grid**: galeri foto, kutipan, hitung hari kenal, playlist, pesan kejutan, dan pemutar musik.

## Isi folder

- `index.html` : struktur halaman dan teks
- `style.css` : tampilan (warna, grid, animasi, mode gelap)
- `script.js` : interaksi (hitung hari, pesan kejutan, pemutar musik, form)
- `foto1.jpeg`, `foto2.jpeg`, `foto3.jpeg` : foto di galeri
- `vercel.json` : pengaturan deploy ke Vercel

## Cara ubah isi

- **Teks, sifat, momen, inside joke:** edit langsung di `index.html`.
- **Tanggal kenal:** ubah `START` di bagian atas `script.js` (format `YYYY-MM-DD`).
- **Pesan kejutan:** ubah daftar `MSGS` di `script.js`.
- **Foto:** ganti file `foto1-3.jpeg` dengan nama yang sama. Atur posisi wajah lewat `background-position` di `index.html`.
- **Musik:** taruh file `musik.mp3` di folder yang sama dengan `index.html`, tombol putar akan langsung bekerja.

## Menjalankan

Buka `index.html` di browser, atau deploy folder ini ke Vercel.

Catatan: pemutar musik hanya menampilkan ceritanya di halaman, belum tersimpan ke server.
