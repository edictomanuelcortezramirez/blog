document.addEventListener('DOMContentLoaded', function () {
  // Obtiene el ID del artículo de la URL
  const urlParams = new URLSearchParams(window.location.search);
  const idArticle = urlParams.get('id');

  // Obtiene los datos del articulo del almacenamiento local
  const articlesData = JSON.parse(localStorage.getItem('articles')) || [];

  // Busca el articulo por su ID
  const articleData = articlesData.find((article) => article.id === idArticle);

  if (articleData) {
    // Llena los campos del formulario con la informacion del articulo
    document.getElementById('edit-category').value = articleData.category;
    document.getElementById('edit-title').value = articleData.title;
    document.getElementById('edit-content').value = articleData.textContent;
    document.getElementById('edit-article-id').value = idArticle;
  } else {
    // Maneja el caso en que el articulo no se encuentre
    alert('Artículo no encontrado');
    console.log('ID de Artículo:', idArticle);
    console.log('Datos de Artículos:', articlesData);

    // Puedes redirigir a otra pagina o hacer alguna otra accion aqui
  }
});

// Agrega un controlador de eventos para el formulario de edicion
const editForm = document.getElementById('edit-form');
editForm.addEventListener('submit', function (e) {
  e.preventDefault();

  // Obtiene los valores editados del formulario
  const editedCategory = document.getElementById('edit-category').value;
  const editedTitle = document.getElementById('edit-title').value;
  const editedContent = document.getElementById('edit-content').value;
  const idArticle = document.getElementById('edit-article-id').value;

  // obtiene los datos de articulos existentes desde el almacenamiento local
  const articlesData = JSON.parse(localStorage.getItem('articles')) || [];

  // Encuentra el indice del articulo en el arreglo de datos
  const articleIndex = articlesData.findIndex(
    (article) => article.id === idArticle
  );

  if (articleIndex !== -1) {
    // Actualiza los datos del articulo en el almacenamiento local
    articlesData[articleIndex].category = editedCategory;
    articlesData[articleIndex].title = editedTitle;
    articlesData[articleIndex].textContent = editedContent;

    // guarda los datos actualizados en el almacenamiento local
    localStorage.setItem('articles', JSON.stringify(articlesData));

    // redirige de nuevo a la pagina de detalles del articulo
    window.location.href = `page.html?id=${idArticle}`;
  } else {
    // Maneja el caso en que el articulo no se encuentre
    alert('Artículo no encontrado');
    // Puedes redirigir a otra pagina o hacer alguna otra accion aqui
  }
});
