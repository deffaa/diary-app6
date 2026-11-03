-Diary App

Aplikasi pencatatan harian berbasis React Native dan Expo Router.

-Identitas
- Nama: Deffa Haidar Darmansyah
- NIM: 2430511035

-Cara Menjalankan Project
1. Buka terminal di folder proyek.
2. Jalankan `npm install` untuk mengunduh dependensi.
3. Jalankan `npx expo start` untuk memulai server lokal.
4. Scan QR Code menggunakan aplikasi Expo Go di smartphone Anda.

-Penjelasan Hooks

| Hook | Input | Output | Dependency | Fungsi Utama |
| :--- | :--- | :--- | :--- | :--- |
| **`useState`** | Nilai awal state | `[state, setState]` | - | Mengelola data lokal yang berubah secara reaktif (contoh: teks pencarian, filter mood). |
| **`useMemo`** | Fungsi kalkulasi | Nilai yang di-*cache* | `[entries, query, mood]` | Memori hasil filter array agar tidak memproses ulang saat render jika data tidak berubah. |
| **`useEffect`** | Fungsi efek | Fungsi *cleanup* | `[query]` | Menangani efek samping, digunakan untuk membuat jeda (*debounce*) 350ms pada fitur pencarian. |
| **`useContext`** | Objek Context | Data global dari Provider | - | Mengakses state global (seperti *entries* dan *likedIds*) ke semua halaman tanpa *prop drilling*. |
| **`useCallback`**| Definisi fungsi | Fungsi yang di-*cache* | `[router]` | Menjaga referensi fungsi tetap sama antar render untuk mengoptimalkan performa `FlatList`. |
