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
    // Elementos del DOM
    const submitBtn = document.getElementById('submitBtn');
    const nameInput = document.getElementById('name');
    const messageInput = document.getElementById('message');
    const commentsList = document.getElementById('commentsList');
    const API_URL = 'http://localhost:3000/api/comentarios'; // Cambiar por tu URL en producción

    // Verificación crítica de elementos
    if (!submitBtn || !nameInput || !messageInput || !commentsList) {
        showError('Error: Elementos HTML no encontrados');
        return;
    }

    // Cargar comentarios al iniciar
    loadComments();

    // Evento para enviar comentarios
    submitBtn.addEventListener('click', handleSubmit);

    // Función para manejar el envío
    async function handleSubmit() {
        const name = nameInput.value.trim();
        const message = messageInput.value.trim();

        if (!name || !message) {
            showError('Por favor completa ambos campos', false);
            return;
        }

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nombre: name, mensaje: message })
            });

            if (!response.ok) throw new Error('Error en la respuesta del servidor');

            // Limpiar campos y recargar comentarios
            nameInput.value = '';
            messageInput.value = '';
            await loadComments();

        } catch (error) {
            showError(`Error al enviar: ${error.message}`);
            console.error('Detalles del error:', error);
        }
    }

    // Función para cargar comentarios
    async function loadComments() {
        try {
            const response = await fetch(API_URL);
            if (!response.ok) throw new Error('Error al cargar comentarios');

            const comments = await response.json();
            renderComments(comments);

        } catch (error) {
            showError(`Error al cargar: ${error.message}`);
        }
    }

    // Función para mostrar comentarios
    function renderComments(comments) {
        commentsList.innerHTML = comments.length === 0
            ? '<p>No hay comentarios aún. ¡Sé el primero!</p>'
            : comments.map(comment => `
                <div class="comentario">
                    <p><strong>${comment.nombre}</strong></p>
                    <p>${comment.mensaje}</p>
                    <small>${new Date(comment.fecha).toLocaleString()}</small>
                </div>
            `).join('');
    }

    // Función para mostrar errores
    function showError(message, isSevere = true) {
        console.error(message);
        if (isSevere) {
            commentsList.innerHTML = `
                <div class="error">
                    <p>⚠️ ${message}</p>
                    <p>Recarga la página o intenta más tarde.</p>
                </div>
            `;
        } else {
            alert(message);
        }
    }
});