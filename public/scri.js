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
  function displayComments(comments) {
        commentsList.innerHTML = comments.map(comment => `
            <div class="comment-card">
                <p><strong>${comment.nombre}</strong></p>
                <p>${comment.mensaje}</p>
                <small>${new Date(comment.fecha).toLocaleString()}</small>
            </div>
        `).join('');
    }

    // Cargar comentarios al iniciar
    async function loadComments() {
        try {
            const response = await fetch('http://localhost:3000/api/comentarios');
            const comments = await response.json();
            displayComments(comments);
        } catch (error) {
            console.error('Error cargando comentarios:', error);
            commentsList.innerHTML = '<p>Error al cargar comentarios</p>';
        }
    }

    // Enviar nuevo comentario
    submitBtn.addEventListener('click', async function() {
        const name = document.getElementById('name').value.trim();
        const message = document.getElementById('message').value.trim();
        
        if (!name || !message) {
            alert('Por favor completa ambos campos');
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/api/comentarios', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    nombre: name, 
                    mensaje: message 
                })
            });
            
            if (!response.ok) throw new Error('Error al enviar');
            
            // Limpiar campos y recargar comentarios
            document.getElementById('name').value = '';
            document.getElementById('message').value = '';
            loadComments();
            
        } catch (error) {
            console.error('Error:', error);
            alert('Error al enviar comentario');
        }
    });

    // Cargar comentarios iniciales
    loadComments();

        
      