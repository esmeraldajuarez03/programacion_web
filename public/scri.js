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
    // Cargar comentarios al iniciar
    loadComments();

    // Evento para enviar comentarios
    document.getElementById('submitBtn').addEventListener('click', async () => {
        const name = document.getElementById('name').value.trim();
        const message = document.getElementById('message').value.trim();

        if (!name || !message) {
            alert('Por favor completa ambos campos');
            return;
        }

        try {
            const response = await fetch('/api/comentarios', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nombre: name, mensaje: message })
            });

            if (!response.ok) throw new Error('Error al enviar comentario');
            
            loadComments(); // Recargar los comentarios
            document.getElementById('name').value = '';
            document.getElementById('message').value = '';
        } catch (error) {
            console.error('Error:', error);
            alert('Error al enviar comentario');
        }
    });

    // Función para cargar comentarios
    async function loadComments() {
        try {
            const response = await fetch('/api/comentarios');
            if (!response.ok) throw new Error('Error al cargar comentarios');
            
            const comments = await response.json();
            renderComments(comments);
        } catch (error) {
            console.error('Error:', error);
            document.getElementById('commentsList').innerHTML = '<p>Error al cargar comentarios</p>';
        }
    }

    // Función para mostrar comentarios
    function renderComments(comments) {
        const container = document.getElementById('commentsList');
        container.innerHTML = ''; // Limpiar contenedor
        
        if (comments.length === 0) {
            container.innerHTML = '<p>No hay comentarios aún</p>';
            return;
        }

        comments.forEach(comment => {
            const commentDiv = document.createElement('div');
            commentDiv.className = 'comentario';
            commentDiv.innerHTML = `
                <p><strong>${comment.nombre}</strong></p>
                <p>${comment.mensaje}</p>
                <small>${new Date(comment.fecha).toLocaleString()}</small>
            `;
            container.appendChild(commentDiv);
        });
    }
});

        
      