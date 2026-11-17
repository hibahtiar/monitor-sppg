# Monitor SPPG · BPJS Ketenagakerjaan KC Pamekasan

Monitoring pembayaran & kepatuhan iuran SPPG, catatan WA ke PIC, dan laporan harian grup.
Versi 1.1 · aplikasi untuk komputer/tablet · bisa dibuka tanpa sinyal.

**Kode di folder ini publik, tetapi tidak berisi data apa pun.** Data laporan dan catatan hanya tersimpan
di browser tiap gadget dan di Google Sheet milik Anda (bila sinkron dipasang).

## A. Pasang di GitHub Pages (sekali saja)
1. Masuk ke github.com → **New repository** → nama mis. `monitor-sppg` → **Public** → Create.
2. Klik **Add file → Upload files** → tarik SEMUA file di folder ini
   (`index.html`, `sw.js`, `manifest.webmanifest`, `ikon-192.png`, `ikon-512.png`, `README.md`) → **Commit changes**.
   File `Monitor_SPPG_Sinkron.gs` TIDAK perlu diunggah ke GitHub.
3. **Settings → Pages** → Source: *Deploy from a branch* → Branch: `main` / `(root)` → Save.
4. Tunggu ±1 menit. Alamat aplikasi: `https://<nama-akun>.github.io/monitor-sppg/`
5. Di Chrome/Edge (komputer/tablet) buka alamat itu → ikon **Pasang/Install** di bilah alamat agar muncul seperti aplikasi.

**Memperbarui versi:** unggah ulang `index.html` yang baru (Add file → Upload files → timpa). Gadget memakai versi baru saat dibuka berikutnya dengan sinyal.

## B. Pasang server sinkron di Google Sheet (sekali saja)
1. Buat **Google Sheet baru** (terpisah dari LENSA PK), beri nama `Monitor SPPG - Sinkron`.
2. **Ekstensi → Apps Script** → hapus isi `Code.gs` → tempel seluruh isi `Monitor_SPPG_Sinkron.gs` → Simpan.
3. Pilih fungsi **siapkan** → **Jalankan** → izinkan akses. Muncul **KUNCI** — salin.
4. **Terapkan → Deployment baru** → jenis **Aplikasi web** →
   *Jalankan sebagai:* **Saya** · *Yang memiliki akses:* **Siapa saja** → Terapkan → salin **URL** yang berakhiran `/exec`.
5. Di aplikasi: **Data & pengaturan → Sinkron antar-gadget** → tempel URL & KUNCI → **Sambungkan**.

## C. Menyambungkan gadget lain
1. Di gadget yang sudah tersambung: **Data & pengaturan → Salin kode sambung untuk gadget lain**.
2. Kirim kode itu ke diri sendiri (jangan ke grup — kode berisi kunci).
3. Di gadget baru: buka aplikasi → **Data & pengaturan** → tempel di **Kode sambung** → **Sambungkan**.

## Cara kerja sinkron
- Setiap perubahan (impor laporan, catatan WA, ubah PIC, pengaturan) masuk antrean, dikirim otomatis saat ada sinyal, dan tiap 2 menit.
- Tanpa sinyal aplikasi tetap jalan; status di menu kiri: "Offline · n menunggu sinyal".
- Bila dua gadget mengubah hal yang sama, yang **terakhir** diubah yang dipakai.
- Menghapus data di satu gadget lewat "Hapus semua data" hanya menghapus di gadget itu, bukan di Google Sheet.

## Keamanan
- Siapa pun yang tahu URL **dan** KUNCI bisa membaca data sinkron. Simpan kunci hanya di gadget Anda.
- Ganti kunci bila bocor: Apps Script → jalankan **gantiKunci** → sambungkan ulang semua gadget.
- File cadangan (.json) dari aplikasi tidak menyertakan kunci.
