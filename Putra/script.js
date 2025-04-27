function tambahKeKeranjang(namaProduk, hargaProduk) {
  alert(`Produk "${namaProduk}" seharga Rp ${hargaProduk.toLocaleString()} ditambahkan ke keranjang!`);
  // Nanti kita tambahkan ke array keranjang di sini
}

// Fungsi untuk menambahkan produk ke keranjang =================
function tambahKeKeranjang(namaProduk, hargaProduk) {
  let keranjang = JSON.parse(localStorage.getItem('keranjang')) || [];
  keranjang.push({ nama: namaProduk, harga: hargaProduk });
  localStorage.setItem('keranjang', JSON.stringify(keranjang));
  alert(`"${namaProduk}" ditambahkan ke keranjang.`);
}

// Fungsi untuk menampilkan isi keranjang ======================
function tampilkanKeranjang() {
  const container = document.getElementById("keranjang-container");
  container.innerHTML = ""; // Bersihkan kontainer

  const keranjang = JSON.parse(localStorage.getItem("keranjang")) || [];

  if (keranjang.length === 0) {
    container.innerHTML = "<p>Keranjang kosong.</p>";
    return;
  }

  let total = 0;

  // CODINGAN BARU KERANJANG
  // Buat elemen tabel =================================
  const table = document.createElement("table");
  table.style.margin = "0 auto";
  table.style.borderCollapse = "collapse";

  // Header tabel =======================================
  table.innerHTML = `
    <thead>
      <tr>
        <th style="border:1px solid #000; padding:8px;">Produk</th>
        <th style="border:1px solid #000; padding:8px;">Harga</th>
        <th style="border:1px solid #000; padding:8px;">Aksi</th>
      </tr>
    </thead>
  `;

  const tbody = document.createElement("tbody");

  keranjang.forEach((item, index) => {
    total += item.harga;

    const row = document.createElement("tr");

    row.innerHTML = `
      <td style="border:1px solid #000; padding:8px;">${item.nama}</td>
      <td style="border:1px solid #000; padding:8px;">Rp. ${item.harga.toLocaleString()}</td>
      <td style="border:1px solid #000; padding:8px;">
        <button onclick="hapusItem(${index})">Hapus</button>
      </td>
    `;

    tbody.appendChild(row);
  });

  table.appendChild(tbody);
  container.appendChild(table);

  // Total ========================================================
  const totalEl = document.createElement("p");
  totalEl.style.textAlign = "center";
  totalEl.style.marginTop = "20px";
  totalEl.textContent = `Total: Rp ${total.toLocaleString()}`;
  container.appendChild(totalEl);
}


// Hapus item tertentu ============================================
function hapusItem(index) {
  let keranjang = JSON.parse(localStorage.getItem('keranjang')) || [];
  keranjang.splice(index, 1);
  localStorage.setItem('keranjang', JSON.stringify(keranjang));
  tampilkanKeranjang();
}

// Hapus semua item =================================================
function hapusSemua() {
  localStorage.removeItem('keranjang');
  tampilkanKeranjang();
}

// Panggil saat halaman keranjang dibuka ================================
if (window.location.pathname.includes("keranjang.html")) {
  window.onload = tampilkanKeranjang;
}


function checkoutWhatsApp() {
  const keranjang = JSON.parse(localStorage.getItem('keranjang')) || [];
  if (keranjang.length === 0) {
    alert("Keranjang kosong!");
    return;
  }

  let pesan = "Halo! Saya ingin memesan produk kerajinan raja:\n";
  keranjang.forEach(item => {
    pesan += `- ${item.nama}: Rp ${item.harga.toLocaleString()}\n`;
  });

  const total = keranjang.reduce((sum, item) => sum + item.harga, 0);
  pesan += `\nTotal: Rp ${total.toLocaleString()}`;

  const nomorWhatsApp = "6281935161001"; // ← Ganti dengan nomor WA kamu!
  const url = `https://wa.me/${nomorWhatsApp}?text=${encodeURIComponent(pesan)}`;
  window.open(url, '_blank');
}

function tambahKeKeranjang(namaProduk, hargaProduk, idProduk) {
  let sisa = stokProduk[idProduk];
  if (sisa <= 0) {
    alert(`Stok "${namaProduk}" habis!`);
    return;
  }

  //================ Kurangi stok ================================================
  stokProduk[idProduk]--;

  let keranjang = JSON.parse(localStorage.getItem('keranjang')) || [];
  keranjang.push({ nama: namaProduk, harga: hargaProduk, id: idProduk });
  localStorage.setItem('keranjang', JSON.stringify(keranjang));
  alert(`"${namaProduk}" ditambahkan ke keranjang.`);
  updateJumlahKeranjang();
}

function updateJumlahKeranjang() {
  const el = document.getElementById('jumlah-keranjang');
  const keranjang = JSON.parse(localStorage.getItem('keranjang')) || [];
  if (el) el.textContent = keranjang.length;
}


// ==============Data stok produk (gunakan ID unik) ====================
const stokProduk = {
  'Box Tisu': 3,
  'Tas Rotan': 2,
  'Toples': 3,
  'Nampan': 3,
  'Piring Ingke': 4,
  'Keranjang' : 3,
  'Tudung saji': 3,
  'Tas Batik Rotan': 4,
  'Asbak': 3,
  'Nampan Bulat' : 5,

  // Tambah produk lain di sini
};

window.onload = function() {
  if (typeof tampilkanKeranjang === 'function') tampilkanKeranjang();
  updateJumlahKeranjang();
};

// =================Codingan halaman kontak ====================
document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");

  form.addEventListener("submit", function (e) {
    e.preventDefault(); // Hindari refresh halaman

    const nama = document.getElementById("nama").value;
    const email = document.getElementById("email").value;
    const pesan = document.getElementById("pesan").value;

    if (!nama || !email || !pesan) {
      alert("Harap lengkapi semua data sebelum mengirim!");
      return;
    }

    alert("Terima kasih, pesanmu telah dikirim!");

    form.reset(); // Kosongkan form setelah submit
  });
});

