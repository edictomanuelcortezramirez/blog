// Obtiene el ID del articulo de la URL
const urlParams = new URLSearchParams(window.location.search);
const idArticle = urlParams.get('id');

// Obtiene los datos de los articulos del almacenamiento local
const articlesData = JSON.parse(localStorage.getItem('articles')) || [];

// Busca el articulo por su ID
const articleData = articlesData.find((article) => article.id === idArticle);

const articleDetail = document.getElementById('article-detail');

if (articleData) {
  const articleDetailHTML = `
    <div class="banner-page" style="background-image: url('${articleData.image}');">
      <h1>${articleData.title}</h1>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-3"></div>
        <div class="col-6"><p class="detailed-text">${articleData.category}</p>
        <p class="detailed-text">${articleData.textContent}</p></div>
        <div class="col-3"></div>
      </div>
    </div>`;
  // inserta el cuerpo en el HTML
  articleDetail.innerHTML = articleDetailHTML;
} else {
  articleDetail.innerHTML = `<p>Artículo no encontrado</p>`;
}

const buttonScroll = document.getElementById('buttonScroll');
window.addEventListener('scroll', function () {
  if (window.scrollY > 200) {
    buttonScroll.style.display = 'inline';
    buttonScroll.style.opacity = 1;
  } else {
    buttonScroll.style.opacity = 0;
  }
});

buttonScroll.addEventListener('click', function () {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
