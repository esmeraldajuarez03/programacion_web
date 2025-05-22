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
  }document.getElementById("submitBtn").addEventListener("click", async () => {
    const name = document.getElementById("name").value;
    const message = document.getElementById("message").value;

    if (name && message) {
        await fetch("/api/comments", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, message })
        });

        loadComments();
        document.getElementById("name").value = "";
        document.getElementById("message").value = "";
    }
});

    // Cargar comentarios al iniciar
fetch('/comentarios')
  .then(res => res.json())
  .then(data => {
    data.forEach(c => mostrarComentario(c.nombre, c.mensaje));
  });

// Evento al enviar
document.getElementById('submitBtn').addEventListener('click', () => {
  const nombre = document.getElementById('name').value.trim();
  const mensaje = document.getElementById('message').value.trim();

  if (!nombre || !mensaje) return;

  const comentario = { nombre, mensaje };

  fetch('/comentarios', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(comentario)
  })
  .then(res => res.json())
  .then(() => {
    mostrarComentario(nombre, mensaje);
    document.getElementById('name').value = '';
    document.getElementById('message').value = '';
  });
});

function mostrarComentario(nombre, mensaje) {
  const div = document.createElement('div');
  div.classList.add('comentario');
  div.innerHTML = `<strong>${nombre}:</strong> ${mensaje}`;
  document.getElementById('commentsList').appendChild(div);
}
