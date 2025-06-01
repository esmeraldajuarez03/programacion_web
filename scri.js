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

function mostrarContenido() {
    document.querySelector('.entrada').style.display = 'none';
    document.getElementById('contenido').style.display = 'block';
}

function girarAlbum(album) {
    album.classList.toggle("girar");
}

function mostrarUnidad(unidad) {
    const tarjetas = document.querySelectorAll(".tarjetas_unid");
    tarjetas.forEach(tarjeta => tarjeta.classList.remove("show"));

    const tarjetaSeleccionada = document.querySelector(`.tarjetas_unid[data-unidad='${unidad}']`);
    if (tarjetaSeleccionada) {
        tarjetaSeleccionada.classList.add("show");
    }
}

document.addEventListener('DOMContentLoaded', () => {
  const nameInput = document.getElementById('name');
  const messageInput = document.getElementById('message');
  const submitBtn = document.getElementById('submitBtn');
  const commentsList = document.getElementById('commentsList');

  let comentarios = JSON.parse(localStorage.getItem('comentarios')) || [];

  comentarios.forEach(com => mostrarComentario(com));

  submitBtn.addEventListener('click', () => {
    const nombre = nameInput.value.trim();
    const mensaje = messageInput.value.trim();

    if (!nombre || !mensaje) {
      alert("Completa ambos campos.");
      return;
    }

    const nuevoComentario = {
      nombre,
      mensaje,
      fecha: new Date().toLocaleString()
    };

    comentarios.push(nuevoComentario);
    localStorage.setItem('comentarios', JSON.stringify(comentarios));
    mostrarComentario(nuevoComentario);

    nameInput.value = '';
    messageInput.value = '';
  });

  function mostrarComentario({ nombre, mensaje, fecha }) {
    const div = document.createElement('div');
    div.classList.add('comentario');
    div.innerHTML = `
      <p><strong>${nombre}</strong> dijo:</p>
      <p>${mensaje}</p>
      <small>${fecha}</small>
      <hr>
    `;
    commentsList.appendChild(div);
  }
});
