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

document.addEventListener("DOMContentLoaded", () => {
  const nameInput = document.getElementById("name");
  const messageInput = document.getElementById("message");
  const submitBtn = document.getElementById("submitBtn");
  const commentsList = document.getElementById("commentsList");

  submitBtn.addEventListener("click", () => {
    const name = nameInput.value.trim();
    const message = messageInput.value.trim();

    if (name && message) {
      const commentDiv = document.createElement("div");
      commentDiv.classList.add("comentario");
      commentDiv.innerHTML = `<strong>${name}</strong>: ${message}`;
      commentsList.appendChild(commentDiv);

      // Limpiar campos
      nameInput.value = "";
      messageInput.value = "";
    }
  });
});
