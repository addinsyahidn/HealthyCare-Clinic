// ===== Validasi Form Pendaftaran =====
(function () {
  const form = document.getElementById("formPendaftaran");
  const pesanSukses = document.getElementById("pesanSukses");
  if (!form || !pesanSukses) return; // halaman ini tidak punya form pendaftaran

  const aturan = [
    {
      id: "nama",
      kosong: "Nama lengkap wajib diisi",
      salah: "Nama minimal 3 karakter",
      valid: (v) => v.length >= 3,
    },
    {
      id: "email",
      kosong: "Email wajib diisi",
      salah: "Format email tidak valid (contoh: nama@email.com)",
      valid: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
    },
    {
      id: "telepon",
      kosong: "Nomor telepon wajib diisi",
      salah: "Nomor telepon tidak valid (contoh: 081234567890)",
      valid: (v) => /^(\+62|62|0)8\d{8,12}$/.test(v.replace(/[\s-]/g, "")),
    },
    {
      id: "password",
      kosong: "Password wajib diisi",
      salah: "Password minimal 8 karakter",
      valid: (v) => v.length >= 8,
      trim: false, // spasi pada password tidak boleh dipangkas
    },
  ];

  const ambil = (r) => document.getElementById(r.id);
  const ambilError = (r) => document.getElementById("error-" + r.id);

  function tampilkanError(r, pesan) {
    ambilError(r).textContent = pesan;
    ambil(r).classList.add("input-error");
    ambil(r).setAttribute("aria-invalid", "true");
  }

  function hapusError(r) {
    ambilError(r).textContent = "";
    ambil(r).classList.remove("input-error");
    ambil(r).removeAttribute("aria-invalid");
  }

  // Mengembalikan true jika valid
  function periksa(r) {
    const mentah = ambil(r).value;
    const nilai = r.trim === false ? mentah : mentah.trim();

    if (nilai === "") {
      tampilkanError(r, r.kosong);
      return false;
    }
    if (!r.valid(nilai)) {
      tampilkanError(r, r.salah);
      return false;
    }
    hapusError(r);
    return true;
  }

  aturan.forEach((r) => {
    const input = ambil(r);

    // Hapus error & pesan sukses saat mulai mengetik
    input.addEventListener("input", () => {
      hapusError(r);
      pesanSukses.textContent = "";
    });

    // Periksa saat pindah kolom, hanya jika sudah ada isinya
    input.addEventListener("blur", () => {
      if (input.value.trim() !== "") periksa(r);
    });
  });

  // Tombol lihat / sembunyikan password
  const tombolLihat = document.getElementById("togglePassword");
  if (tombolLihat) {
    tombolLihat.addEventListener("click", () => {
      const input = document.getElementById("password");
      const tampil = input.type === "password";
      input.type = tampil ? "text" : "password";
      tombolLihat.textContent = tampil ? "Sembunyi" : "Lihat";
      tombolLihat.setAttribute("aria-label", tampil ? "Sembunyikan password" : "Tampilkan password");
    });
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    let pertamaBermasalah = null;
    aturan.forEach((r) => {
      if (!periksa(r) && !pertamaBermasalah) pertamaBermasalah = ambil(r);
    });

    if (pertamaBermasalah) {
      pesanSukses.textContent = "";
      pertamaBermasalah.focus();
      return;
    }

    pesanSukses.textContent = "Pendaftaran berhasil.";
    form.reset();
  });
})();

// ===== Data detail dokter =====
const dokterDetail = {
  "dr. Damar langit": {
    hari: [2, 4],
    pengalaman: 10,
    pendidikan: "S1 Kedokteran, Sp. THT-KL",
    tentang: "Berpengalaman menangani gangguan telinga, hidung, dan tenggorokan pada anak maupun dewasa dengan pendekatan yang ramah dan teliti.",
    chips: ["Sinusitis", "Gangguan pendengaran", "Amandel", "Alergi hidung", "Telinga berdengung"],
  },
  "dr. Raditya Reynald": {
    hari: [1, 3],
    pengalaman: 8,
    pendidikan: "S1 Kedokteran, Sp. A",
    tentang: "Fokus pada tumbuh kembang anak, imunisasi, dan penanganan infeksi. Dikenal sabar dan mudah akrab dengan pasien kecil.",
    chips: ["Imunisasi", "Tumbuh kembang", "Demam & infeksi", "Gizi anak", "Alergi anak"],
  },
  "dr. Nadia Elora": {
    hari: [1, 2, 3, 4, 5],
    pengalaman: 12,
    pendidikan: "S1 Kedokteran, Sp. OG",
    tentang: "Mendampingi ibu sejak program hamil, pemeriksaan kehamilan berkala, hingga persalinan dan kesehatan reproduksi wanita.",
    chips: ["Kehamilan", "USG kandungan", "Program hamil", "Kesehatan reproduksi", "Konsultasi KB"],
  },
  "dr. Kenzo Pramudya": {
    hari: [3, 5],
    pengalaman: 9,
    pendidikan: "S1 Kedokteran, Sp. M",
    tentang: "Menangani gangguan penglihatan dan penyakit mata dengan pemeriksaan komprehensif serta pembuatan resep kacamata medis.",
    chips: ["Mata minus/plus", "Mata kering", "Katarak", "Glaukoma", "Resep kacamata"],
  },
  "dr. Raya Sudiro": {
    hari: [2, 6],
    pengalaman: 7,
    pendidikan: "S1 Kedokteran, Sp. KK",
    tentang: "Menangani masalah kulit mulai dari alergi dan infeksi hingga jerawat klinis dan konsultasi kesehatan kulit.",
    chips: ["Jerawat", "Alergi kulit", "Eksim", "Infeksi jamur", "Konsultasi estetika"],
  },
  "dr. Kiara Shafira": {
    hari: [4, 6],
    pengalaman: 11,
    pendidikan: "S1 Kedokteran, Sp. PD",
    tentang: "Mendiagnosis dan mengobati berbagai keluhan organ dalam, serta membantu pasien mengelola penyakit kronis secara berkelanjutan.",
    chips: ["Diabetes", "Hipertensi", "Gangguan lambung", "Kolesterol", "Check-up umum"],
  },
};

const namaHari = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];
const modal = document.getElementById("modal-dokter");
let counterTimer;

// ===== Buka modal =====
function bukaModal(card) {
  const nama = card.querySelector("h3").textContent.trim();
  const d = dokterDetail[nama] || { hari: [], pengalaman: 0, chips: [] };
  const jadwal = card.querySelector(".doctor-schedule").textContent;

  // Isi data dasar (diambil dari kartu)
  const foto = document.getElementById("md-foto");
  foto.src = card.querySelector("img").src;
  foto.alt = nama;
  document.getElementById("md-nama").textContent = nama;
  document.getElementById("md-spesialis").textContent = card.querySelector(".doctor-specialty").textContent;
  document.getElementById("md-jam").textContent = jadwal.split(",")[1]?.trim() || "-";

  // Isi data detail (diambil dari dokterDetail)
  document.getElementById("md-pendidikan").textContent = d.pendidikan || "-";
  document.getElementById("md-tentang").textContent = d.tentang || "Informasi belum tersedia.";
  document.getElementById("md-jumlah-hari").textContent = d.hari.length;
  document.getElementById("md-janji").href = "/janji.html?dokter=" + encodeURIComponent(nama);

  // Hari praktik
  document.getElementById("md-hari").innerHTML = namaHari
    .map((h, i) => {
      const aktif = d.hari.includes(i);
      return `<div class="m-day ${aktif ? "aktif bg-green-600 text-white" : "bg-slate-100 text-slate-400"} rounded-xl py-2.5 text-sm font-semibold" style="--d:${0.9 + i * 0.07}s">${h}</div>`;
    })
    .join("");

  // Bidang penanganan
  document.getElementById("md-chips").innerHTML = d.chips
    .map(
      (c, i) =>
        `<span class="m-chip px-3 py-1 rounded-full bg-sky-50 text-sky-700 text-xs font-medium border border-sky-100" style="--d:${1 + i * 0.1}s">${c}</span>`
    )
    .join("");

  // Counter pengalaman (hitung naik dari 0)
  const el = document.getElementById("md-counter");
  clearInterval(counterTimer);
  el.textContent = 0;
  if (d.pengalaman > 0) {
    let n = 0;
    counterTimer = setInterval(() => {
      n++;
      el.textContent = n;
      if (n >= d.pengalaman) clearInterval(counterTimer);
    }, 900 / d.pengalaman);
  }

  // Tampilkan modal
  modal.classList.remove("hidden", "closing");
  modal.classList.add("flex");
  modal.querySelector(".modal-box").scrollTop = 0;
  document.body.style.overflow = "hidden";
}

// ===== Tutup modal =====
function tutupModal() {
  modal.classList.add("closing");
  setTimeout(() => {
    modal.classList.add("hidden");
    modal.classList.remove("flex", "closing");
    document.body.style.overflow = "";
  }, 250);
}

// ===== Event listener =====
document.querySelectorAll(".doctor-card button").forEach((btn) => {
  btn.addEventListener("click", () => bukaModal(btn.closest(".doctor-card")));
});

document.getElementById("modal-close").addEventListener("click", tutupModal);
document.getElementById("modal-tutup-2").addEventListener("click", tutupModal);

// Klik area gelap di luar kartu
modal.addEventListener("click", (e) => {
  if (e.target === modal) tutupModal();
});

// Tombol Esc
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) tutupModal();
});


//Filter dokter berdasarkan spesialisasi

const filterButtons = document.querySelectorAll(".filter-btn");
const doctorCards = document.querySelectorAll(".doctor-card");

// Dua set class Tailwind: tombol terpilih vs tombol biasa
const kelasAktif = ["bg-sky-600", "text-white", "border-sky-600"];
const kelasNonaktif = ["bg-white", "text-slate-600", "border-slate-300"];

function filterDokter(spesialis) {
  // Tampilkan / sembunyikan kartu
  doctorCards.forEach((card) => {
    const cocok = spesialis === "Semua" || card.dataset.spesialis === spesialis;
    card.style.display = cocok ? "" : "none";
  });

  // Ganti warna tombol
  filterButtons.forEach((btn) => {
    const aktif = btn.dataset.filter === spesialis;
    btn.classList.remove(...(aktif ? kelasNonaktif : kelasAktif));
    btn.classList.add(...(aktif ? kelasAktif : kelasNonaktif));
  });
}

// Klik tombol filter
filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => filterDokter(btn.dataset.filter));
});

// Klik tombol "Cari Dokter" di bagian Layanan
document.querySelectorAll(".btn-layanan-search").forEach((btn) => {
  btn.addEventListener("click", () => filterDokter(btn.dataset.target));
});
