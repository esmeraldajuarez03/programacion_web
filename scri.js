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

document.addEventListener('DOMContentLoaded', () => {
    const nameInput = document.getElementById('name');
    const messageInput = document.getElementById('message');
    const submitBtn = document.getElementById('submitBtn');
    const commentsList = document.getElementById('commentsList');

  // Obtener comentarios del backend
fetch('/comentarios')
    .then(res => res.json())
    .then(comentarios => {
    comentarios.forEach(mostrarComentario);
    });

submitBtn.addEventListener('click', () => {
    const nombre = nameInput.value.trim();
    const mensaje = messageInput.value.trim();

    if (nombre && mensaje) {
    const nuevoComentario = {
        nombre,
        mensaje,
        fecha: new Date().toLocaleString()
    };

    fetch('/comentarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevoComentario)
    })
        .then(res => res.json())
        .then(() => {
        mostrarComentario(nuevoComentario);
        nameInput.value = '';
        messageInput.value = '';
        });
    } else {
        alert('Por favor completa todos los campos. ✨');
    }
});

function mostrarComentario({ nombre, mensaje, fecha }) {
    const div = document.createElement('div');
    div.classList.add('comentario');
    div.innerHTML = `
        <p><strong>${nombre}</strong> escribió:</p>
        <p>${mensaje}</p>
        <small>${fecha}</small>
        <hr>
    `;
    commentsList.appendChild(div);
}
});
