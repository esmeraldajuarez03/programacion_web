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

document.addEventListener('DOMContentLoaded', () => {
    const submitBtn = document.getElementById('submitBtn');
    const commentsList = document.getElementById('commentsList');

    // Enviar comentario
    submitBtn.addEventListener('click', async () => {
        const name = document.getElementById('name').value.trim();
        const message = document.getElementById('message').value.trim();

        if (!name || !message) {
            alert('🌸 Completa ambos campos');
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/api/comentarios', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nombre: name, mensaje: message })
            });
            
            if (response.ok) {
                loadComments();
                document.getElementById('name').value = '';
                document.getElementById('message').value = '';
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });

    // Cargar comentarios
    async function loadComments() {
        try {
            const response = await fetch('http://localhost:3000/api/comentarios');
            const comments = await response.json();
            
            commentsList.innerHTML = comments.map(comment => `
                <div class="comment-card">
                    <p><strong>${comment.nombre}</strong> - ${new Date(comment.fecha).toLocaleString()}</p>
                    <p>${comment.mensaje}</p>
                </div>
            `).join('');
        } catch (error) {
            console.error('Error:', error);
        }
    }

    // Cargar comentarios al inicio
    loadComments();
});

