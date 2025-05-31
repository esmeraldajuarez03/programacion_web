function mostrarContenido() {
    document.querySelector('.entrada').style.display = 'none';
    document.getElementById('contenido').style.display = 'block';
  }

function girarAlbum(album) {
    album.classList.toggle("girar");
}

function mostrarUnidad(unidad) {
    // Oculta todas las tarjetas primero
    const tarjetas = document.querySelectorAll(".tarjetas_unid");
    tarjetas.forEach(tarjeta => tarjeta.classList.remove("show"));

    const tarjetaSeleccionada = document.querySelector(`.tarjetas_unid[data-unidad='${unidad}']`);
    if (tarjetaSeleccionada) {
        tarjetaSeleccionada.classList.add("show");
    }
}

const backendURL = 'https://programacion-web-rgyh.onrender.com'; // URL de tu backend en Render

const formulario = document.getElementById('formulario');
const lista = document.getElementById('lista-comentarios');

formulario.addEventListener('submit', function (e) {
  e.preventDefault();

  const autor = document.getElementById('autor').value;
  const texto = document.getElementById('texto').value;

  fetch(`${backendURL}/comentarios`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ autor, texto })
  })
  .then(res => res.json())
  .then(() => {
    formulario.reset();
    obtenerComentarios(); // refresca la lista
  });
});

function obtenerComentarios() {
  fetch(`${backendURL}/comentarios`)
    .then(res => res.json())
    .then(comentarios => {
      lista.innerHTML = '';
      comentarios.forEach(comentario => {
        const li = document.createElement('li');
        li.textContent = `${comentario.autor}: ${comentario.texto}`;
        lista.appendChild(li);
      });
    });
}

// Cargar comentarios al entrar
obtenerComentarios();
