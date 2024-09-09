<div align="center">
  <h3 align="center">REAL ESTATE APP</h3>
</div>

## <a name="introduction">🤖 Introduction</a>

Real Estate API adalah solusi backend yang dirancang untuk mengelola platform properti secara efisien. Aplikasi ini memungkinkan pengguna untuk mencari, mengelola, dan memesan properti, serta memberikan fungsionalitas penting seperti manajemen pengguna, properti, dan transaksi secara real-time.

## <a name="tech-stack">⚙️ Tech Stack</a>

- **Node.js**: Runtime JavaScript untuk menjalankan server.
- **Express.js**: Framework untuk membangun API backend.
- **Prisma**: ORM untuk interaksi dengan PostgreSQL.
- **PostgreSQL**: Database relasional untuk penyimpanan data.
- **bcrypt**: Untuk hashing password.
- **jsonwebtoken (JWT)**: Untuk autentikasi dan otorisasi.
- **cookie-parser**: Middleware untuk mengelola cookies.
- **cors**: Middleware untuk mengizinkan permintaan dari domain lain.
- **nodemon**: Tool pengembangan untuk otomatis merestart server saat ada perubahan.

## <a name="features">🔋 Features</a>

- **Autentikasi dan Otorisasi**: Menggunakan JWT untuk manajemen sesi dan kontrol akses.
- **Manajemen Pengguna**: Registrasi, login, dan pengelolaan profil pengguna.
- **Manajemen Properti**: CRUD untuk data properti real estate.
- **Pesan dan Chat**: Komunikasi antar pengguna melalui sistem pesan dan chat.
- **Kontrol Akses**: Mengatur hak akses berdasarkan peran pengguna (admin, user, dsb.).

## <a name="quick-start">🤸 Quick Start</a>

Ikuti langkah-langkah berikut untuk mengatur proyek ini secara lokal di mesin Anda.

**Prasyarat**

Pastikan Anda telah menginstal hal-hal berikut di mesin Anda:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/) (Node Package Manager)

**Cloning the Repository**

```bash
git clone https://github.com/xlalurahmatulikhsan/api-real-estate.git
```

**Install Dependencies**

```bash
npm install
```

**Konfigurasi Environment**

Buat file .env berdasarkan .env.example dan sesuaikan konfigurasi database dan variabel lingkungan lainnya, seperti dibawah ini:

```env
DATABASE_URL="postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public"
JWT_SECRET_KEY=ljk&j%ksd@1!mk%avj%re*gs56*&mnsg
```

**Migrasi Database**

```bash
npx prisma migrate dev
```

**Menjalankan Server**

```bash
npm run dev
```

**Buka Prisma Studio**

```bash
prisma studio
```

## <a name="Diagram">🕸️ Diagram Relasi Database</a>

![Diagram Relasi Database](docs/diagram.png)

#
