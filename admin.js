const formMakeArticle = document.getElementById('form');
const inputCategory = document.getElementById('category');
const inputTitle = document.getElementById('title');
const fileInput = document.getElementById('formFileSm');
const inputTextContent = document.getElementById('content');
const itemsContainer = document.getElementById('itemsContainer');

const images = [
  'img/image1.jpg',
  'img/image2.jpg',
  'img/image3.jpg',
  'img/image4.jpg',
  'img/image5.jpg',
  'img/image6.jpg',
];

// trae el contador de ID desde el localStorage o crea uno nuevo
let idCount = parseInt(localStorage.getItem('idCount')) || 0;

document.addEventListener('DOMContentLoaded', function () {
  const articlesData = JSON.parse(localStorage.getItem('articles')) || [];

  // Recorre los articulos y crea el cuerpo HTML
  articlesData.forEach(function (articleData) {
    createArticleElement(articleData);
  });
});

// Funcion para crear un elemento de articulo y agregarlo al contenedor
function createArticleElement(articleData) {
  const bodyArticleHTML = document.createElement('div');
  bodyArticleHTML.classList.add('col');
  const idArticle = articleData.id;
  bodyArticleHTML.innerHTML = `
    <div class="card">
      <div class="bg-image" style="background-image: url('${
        articleData.image
      }');">
        <div class="card-body">
          <h6 class="card-subtitle mb-2 text-muted">${articleData.category}</h6>
          <h5 class="card-title">${articleData.title.substring(0, 37)}</h5>
          <p class="card-text">${articleData.textContent.substring(0, 100)}</p>
          <button type="button" class="btn btn-primary read-more-button" data-article-id="${idArticle}">Leer más...</button>
          <button type="button" class="btn btn-warning edit-button" data-article-id="${idArticle}"><i class="fa-solid fa-pencil"></i></button>
          <button type="button" class="btn btn-danger delete-button" data-article-id="${idArticle}"><i class="fa-solid fa-trash"></i></button>
        </div>
      </div>
    </div>`;

  // agrega los cuerpos HTML al contenedor del DOM
  itemsContainer.appendChild(bodyArticleHTML);

  // El despliegue de link "Leer más..."
  const readMoreLink = bodyArticleHTML.querySelector('.read-more-button');
  readMoreLink.addEventListener('click', function (e) {
    e.preventDefault();
    const idArticle = readMoreLink.getAttribute('data-article-id');
    window.location.href = `page.html?id=${idArticle}`;
  });
  // Añade un controlador de eventos al botón editar
  const editButton = bodyArticleHTML.querySelector('.edit-button');
  editButton.addEventListener('click', function () {
    const idArticle = editButton.getAttribute('data-article-id');
    const editUrl = `edit.html?id=${idArticle}`;
    window.location.href = editUrl;
  });

  // Añade un controlador de eventos al botón Eliminar
  const deleteButton = bodyArticleHTML.querySelector('.delete-button');
  deleteButton.addEventListener('click', function () {
    const idArticle = deleteButton.getAttribute('data-article-id');
    deleteArticle(idArticle);
  });
}

// Crea cuerpo del artículo
formMakeArticle.addEventListener('submit', function (e) {
  e.preventDefault();
  if (
    !inputCategory.value ||
    !inputTitle.value ||
    !inputTextContent.value ||
    fileInput.files.length === 0
  ) {
    alert('Todos los campos son obligatorios');
  } else {
    // Recoge los datos del articulo
    const dataArticle = {
      // Utiliza el contador como parte del ID
      id: `article-${idCount}`,
      category: inputCategory.value,
      title: inputTitle.value,
      // Obtiene una imagen aleatoria del arreglo
      image: getRandomImage(images),
      textContent: inputTextContent.value,
    };

    // incrementa el contador para el proximo articulo
    idCount++;

    // Guarda el contador en localStorage
    localStorage.setItem('idCount', idCount);

    // Crea el elemento de articulo y lo agrega al contenedor
    createArticleElement(dataArticle);

    // Obtiene los datos de articulos existentes y agrega uno nuevo artículo
    const articlesData = JSON.parse(localStorage.getItem('articles')) || [];
    articlesData.push(dataArticle);

    // Guarda los datos del articulo en localStorage
    localStorage.setItem('articles', JSON.stringify(articlesData));

    // Limpia el formulario despues de crear
    inputCategory.value = '';
    inputTitle.value = '';
    inputTextContent.value = '';
    fileInput.value = '';
  }
});

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

// Eliminar un articulo del dom y del almacenamiento local
function deleteArticle(idArticle) {
  // Eliminar el artículo del DOM
  const articleElement = document.querySelector(
    `[data-article-id="${idArticle}"]`
  );
  if (articleElement) {
    articleElement.parentElement.parentElement.remove();
    // Eliminar la tarjeta completa
  }

  // Eliminar el articulo del almacenamiento local
  const articlesData = JSON.parse(localStorage.getItem('articles')) || [];
  const updatedArticles = articlesData.filter(
    (article) => article.id !== idArticle
  );
  localStorage.setItem('articles', JSON.stringify(updatedArticles));
  location.reload();
}

// Funcion para obtener una imagen aleatoria del arreglo
function getRandomImage(imagesArray) {
  const randomIndex = Math.floor(Math.random() * imagesArray.length);
  return imagesArray[randomIndex];
}
