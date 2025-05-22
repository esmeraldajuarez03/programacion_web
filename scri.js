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
async function loadComments() {
    const response = await fetch("/api/comments");
    const comments = await response.json();

    const commentsList = document.getElementById("commentsList");
    commentsList.innerHTML = "";

    comments.forEach(comment => {
        const commentElement = document.createElement("div");
        commentElement.classList.add("comment");
        commentElement.innerHTML = `<strong>${comment.name}:</strong> ${comment.message}`;
        commentsList.appendChild(commentElement);
    });
}

// Llamar al cargar la página
loadComments();


