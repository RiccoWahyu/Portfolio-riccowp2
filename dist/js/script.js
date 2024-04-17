// Navbar Fixed
window.onscroll = function () {
  const header = document.querySelector('header');
  const fixedNav = header.offsetTop;
  const toTop = document.querySelector('#to-top');

  if (window.pageYOffset > fixedNav) {
    header.classList.add('navbar-fixed');
    toTop.classList.remove('hidden');
    toTop.classList.add('flex');
  } else {
    header.classList.remove('navbar-fixed');
    toTop.classList.remove('flex');
    toTop.classList.add('hidden');
  }
};

// Hamburger
const hamburger = document.querySelector('#hamburger');
const navMenu = document.querySelector('#nav-menu');

hamburger.addEventListener('click', function () {
  hamburger.classList.toggle('hamburger-active');
  navMenu.classList.toggle('hidden');
});

// Klik di luar hamburger
window.addEventListener('click', function (e) {
  if (e.target != hamburger && e.target != navMenu) {
    hamburger.classList.remove('hamburger-active');
    navMenu.classList.add('hidden');
  }
});

// Darkmode toggle
const darkToggle = document.querySelector('#dark-toggle');
const html = document.querySelector('html');

darkToggle.addEventListener('click', function () {
  if (darkToggle.checked) {
    html.classList.add('dark');
    localStorage.theme = 'dark';
  } else {
    html.classList.remove('dark');
    localStorage.theme = 'light';
  }
});

// pindahkan posisi toggle sesuai mode
if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
  darkToggle.checked = true;
} else {
  darkToggle.checked = false;
}

// blog mulai sini
document.addEventListener('DOMContentLoaded', function() {
  const postsDiv = document.getElementById('posts');
  const newPostForm = document.getElementById('newPostForm');
  const searchInput = document.getElementById('searchInput');

  // Ambil postingan dari localStorage
  let posts = JSON.parse(localStorage.getItem('posts')) || [];

  // Fungsi untuk menyimpan postingan ke localStorage
  function savePosts() {
      localStorage.setItem('posts', JSON.stringify(posts));
  }

  // Fungsi untuk menampilkan postingan
  function displayPosts(filteredPosts = posts) {
      postsDiv.innerHTML = ''; // Kosongkan konten sebelumnya

      // Loop melalui setiap postingan dan tampilkan di halaman
      filteredPosts.forEach((post, index) => {
          const article = document.createElement('article');

          const titleElement = document.createElement('h3');
          titleElement.textContent = post.title;

          const contentElement = document.createElement('p');
          contentElement.textContent = post.content;

          const dateElement = document.createElement('time');
          dateElement.dateTime = post.date; // Format ISO 8601
          dateElement.textContent = new Date(post.date).toLocaleDateString('id-ID');

          // Tambahkan tombol update dan delete
          const updateButton = document.createElement('button');
          updateButton.textContent = 'Update';
          updateButton.addEventListener('click', () => updatePost(index));

          const deleteButton = document.createElement('button');
          deleteButton.textContent = 'Delete';
          deleteButton.addEventListener('click', () => deletePost(index));

          // Tambahkan elemen ke dalam article
          article.appendChild(titleElement);
          article.appendChild(contentElement);
          article.appendChild(dateElement);
          article.appendChild(updateButton);
          article.appendChild(deleteButton);

          postsDiv.appendChild(article);
      });
  }

  // Fungsi untuk menambah postingan baru
  newPostForm.addEventListener('submit', function(event) {
      event.preventDefault();

      const title = document.getElementById('title').value;
      const content = document.getElementById('content').value;

      // Dapatkan tanggal saat ini
      const date = new Date().toISOString();
      

      // Tambahkan postingan ke array
      posts.push({ title, content, date });

      // Simpan postingan ke localStorage
      savePosts();

      // Tampilkan postingan baru
      displayPosts();

      // Reset form
      newPostForm.reset();
  });

  // Fungsi untuk memperbarui postingan
  function updatePost(index) {
      const newTitle = prompt('Masukkan judul baru:', posts[index].title);
      const newContent = prompt('Masukkan konten baru:', posts[index].content);

      if (newTitle !== null && newContent !== null) {
          posts[index].title = newTitle;
          posts[index].content = newContent;
          posts[index].date = new Date().toISOString(); // Perbarui tanggal

          // Simpan postingan ke localStorage
          savePosts();

          // Perbarui tampilan
          displayPosts();
      }
  }

  // Fungsi untuk menghapus postingan
  function deletePost(index) {
      posts.splice(index, 1); // Hapus postingan dari array

      // Simpan postingan ke localStorage
      savePosts();

      // Perbarui tampilan
      displayPosts();
  }

  // Fungsi untuk mencari postingan
  searchInput.addEventListener('input', function() {
      const searchTerm = searchInput.value.toLowerCase();

      // Filter postingan berdasarkan judul atau konten
      const filteredPosts = posts.filter(post => {
          return post.title.toLowerCase().includes(searchTerm) ||
                 post.content.toLowerCase().includes(searchTerm);
      });

      // Tampilkan postingan yang sesuai
      displayPosts(filteredPosts);
  });

  // Inisialisasi tampilan
  displayPosts();
});
document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.querySelector('.php-email-form');
  const loadingDiv = document.querySelector('.loading');
  const sentMessageDiv = document.querySelector('.sent-message');

  // Fungsi untuk menangani pengiriman formulir
  contactForm.addEventListener('submit', function(event) {
      event.preventDefault();

      // Tampilkan prompt konfirmasi kepada pengguna
      const isConfirmed = confirm('Apakah data yang Anda masukkan sudah benar?');

      // Jika pengguna mengkonfirmasi, lanjutkan pengiriman formulir
      if (isConfirmed) {
          // Tampilkan loading dan sembunyikan pesan yang sudah terkirim
          loadingDiv.style.display = 'block';
          sentMessageDiv.style.display = 'none';

          // Simulasi pengiriman data
          setTimeout(function() {
              // Sembunyikan loading dan tampilkan pesan yang sudah terkirim
              loadingDiv.style.display = 'none';
              sentMessageDiv.style.display = 'block';
          }, 2000);

          // Anda dapat menambahkan tindakan lain di sini, seperti mengirim data formulir ke server
          // atau melakukan validasi data tambahan jika diperlukan.
      }
  });
});