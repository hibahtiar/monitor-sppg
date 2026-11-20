# Monitor SPPG · BPJS Ketenagakerjaan KC Pamekasan

Monitoring pembayaran & kepatuhan iuran SPPG, catatan WA ke PIC, dan laporan harian grup.
Versi 1.4.0 · server sinkron 1.3 · aplikasi untuk komputer/tablet · bisa dibuka tanpa sinyal.

**Kode di folder ini publik, tetapi tidak berisi data apa pun.** Data laporan dan catatan hanya tersimpan
di browser tiap gadget dan di Google Sheet milik Anda (bila sinkron dipasang).

## A. Pasang di GitHub Pages (sekali saja)
1. Masuk ke github.com → **New repository** → nama mis. `monitor-sppg` → **Public** → Create.
2. Klik **Add file → Upload files** → tarik SEMUA file di folder ini
   (`index.html`, `sw.js`, `manifest.webmanifest`, `ikon-192.png`, `ikon-512.png`, `README.md`) → **Commit changes**.
   File `.gs` (Monitor_SPPG_Sinkron.gs, LENSA_PK.gs) dikirim terpisah dan TIDAK diunggah ke GitHub.
3. **Settings → Pages** → Source: *Deploy from a branch* → Branch: `main` / `(root)` → Save.
4. Tunggu ±1 menit. Alamat aplikasi: `https://<nama-akun>.github.io/monitor-sppg/`
5. Di Chrome/Edge (komputer/tablet) buka alamat itu → ikon **Pasang/Install** di bilah alamat agar muncul seperti aplikasi.

**Memperbarui versi:** unggah ulang `index.html` yang baru (Add file → Upload files → timpa). Gadget memakai versi baru saat dibuka berikutnya dengan sinyal.

## B. Server sinkron di Google Sheet (oleh pemilik Sheet, bukan admin pelaksana)
**Memperbarui ke 1.3 (akses per gadget):** buka Sheet "Monitor SPPG - Sinkron" → Ekstensi → Apps Script → ganti seluruh isi
dengan `Monitor_SPPG_Sinkron.gs` 1.3 → Simpan → **Terapkan → Kelola deployment → (pensil) → Versi baru → Terapkan** (URL /exec tetap).
Lalu muat ulang Sheet → menu **Monitor SPPG › Kunci admin untuk LENSA PK** → tempel **alamat /exec + kunci admin** itu di
LENSA PK › Perangkat & pengguna › Monitor SPPG (sekali saja). Kunci admin hanya untuk pemilik; admin pelaksana cukup memakai
kode undangan dan bisa dinonaktifkan dari LENSA PK. Gadget yang sudah tersambung terdaftar otomatis saat sinkron berikutnya.

**Pasang baru:** buat Google Sheet baru `Monitor SPPG - Sinkron` → Ekstensi → Apps Script → tempel `Monitor_SPPG_Sinkron.gs` →
jalankan fungsi **siapkan** (izinkan akses) → **Terapkan → Deployment baru → Aplikasi web** (Jalankan sebagai: **Saya** ·
Yang memiliki akses: **Siapa saja**) → lalu langkah "Kunci admin untuk LENSA PK" di atas.

## C. Masuk di gadget: satu gadget = satu akses (sejak 1.4)
- Setiap gadget masuk dengan **kode undangan sekali pakai** dari **LENSA PK › Perangkat & pengguna** (aplikasi Monitor SPPG).
  Di gadget baru: buka aplikasi → tempel pesan / kode (`MSPPG.…`) → **Masuk**. Gadget yang belum terdaftar tidak bisa membuka data.
- Gadget lama (tersambung dengan KUNCI) terdaftar otomatis; KUNCI lama berlaku 14 hari sejak pembaruan server
  (atau sampai dimatikan dari LENSA PK), lalu hanya kode undangan yang bisa dipakai.
- Pengelola LENSA PK bisa memberi nama, hak (**boleh mengubah / hanya melihat**), masa akses, dan **menonaktifkan** gadget:
  *setelah terkirim* (perubahan terakhir diterima dulu) atau *cabut sekarang*. Setelah dicabut, data Monitor di gadget itu dihapus.
- Gadget yang **7 hari tidak sinkron** terkunci (data tetap ada) sampai sinkron berhasil.
- **Keluar:** Data & pengaturan › Sinkron › **Keluar dari gadget ini** (perubahan dikirim dulu, lalu data dihapus).
- **Log:** setiap perubahan dari setiap gadget tercatat di tab **LOG_AKSES** (waktu, pengguna, gadget, jenis data, hasil);
  daftar gadget di tab **PERANGKAT**. Kolom "perangkat" di tab DATA berisi ID gadget + nama pengguna.

## D. Sambungkan dengan LENSA PK (pilihan, sekali saja)
Syarat: Sheet "Monitor SPPG - Sinkron" dan spreadsheet LENSA PK milik **akun Google yang sama**, dan sinkron (langkah B) sudah jalan.
1. **Perbarui server Monitor:** buka Sheet Monitor SPPG → Ekstensi → Apps Script → ganti seluruh isi dengan `Monitor_SPPG_Sinkron.gs` versi baru → Simpan →
   **Terapkan → Kelola deployment → (pensil) Edit → Versi: Versi baru → Terapkan** (URL /exec tetap sama).
2. **Perbarui LENSA PK ke 1.14:** di spreadsheet LENSA PK → Ekstensi → Apps Script → ganti seluruh isi dengan `LENSA_PK.gs` baru → Simpan →
   Terapkan → Kelola deployment → Edit → Versi baru (seperti biasa).
3. Muat ulang (refresh) kedua spreadsheet agar menu baru muncul.
4. Di Sheet **Monitor SPPG**: menu **Monitor SPPG › Sambungkan ke LENSA PK…** → tempel alamat spreadsheet LENSA PK → izinkan akses bila diminta.
5. Di spreadsheet **LENSA PK**: menu **LENSA PK › Monitor SPPG › Sambungkan ke Monitor SPPG…** → tempel alamat Sheet Monitor SPPG.
6. Selesai. Status terlihat di aplikasi: Data & pengaturan → Sinkron → *Sambungan LENSA PK*.

Yang bertukar setiap ±5 menit:
- **Laporan:** ITW/ITB, Monitoring, Data BU yang diimpor di Monitor → baris binaan HA187580 diteruskan ke LENSA lalu dihitung ulang di sana
  (laporan pembina lain tidak pernah masuk LENSA). Laporan yang diimpor di LENSA → baris SPPG-nya masuk ke Monitor.
- **Catatan WA & janji bayar** dari Monitor → LOG_INTERAKSI LENSA (tanda `[Monitor SPPG]`). Catatan kontak SPPG di LENSA → riwayat SPPG di Monitor.
- **PIC SPPG** dua arah. Bila berbeda, yang **terakhir diubah** yang dipakai.
- Menghapus catatan di salah satu aplikasi tidak menghapus di aplikasi lain.
- Memutus: menu yang sama › Putuskan. Data yang sudah masuk tetap ada.

## Cara kerja sinkron
- Setiap perubahan (impor laporan, catatan WA, ubah PIC, pengaturan) masuk antrean, dikirim otomatis saat ada sinyal, dan tiap 2 menit.
- Tanpa sinyal aplikasi tetap jalan; status di menu kiri: "Offline · n menunggu sinyal".
- Bila dua gadget mengubah hal yang sama, yang **terakhir** diubah yang dipakai.
- Menghapus data di satu gadget lewat "Hapus semua data" hanya menghapus di gadget itu, bukan di Google Sheet.

## Keamanan
- Tiap gadget memakai token sendiri (disimpan di Sheet hanya sebagai sidik). Kode undangan sekali pakai dan berbatas waktu.
- Kunci admin (untuk LENSA PK) hanya disimpan di server LENSA PK; ganti bila perlu: menu **Monitor SPPG › Ganti kunci admin LENSA PK**.
- File cadangan (.json) dari aplikasi tidak menyertakan kunci / token.
