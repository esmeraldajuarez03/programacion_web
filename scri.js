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
   

const API_URL = 'http://localhost:3000/api/comentarios'; // Cambia esto por tu URL de producción

document.addEventListener('DOMContentLoaded', () => {
  loadComments();

  document.getElementById('submitBtn').addEventListener('click', async () => {
    const name = document.getElementById('name').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !message) {
      alert('Por favor completa ambos campos');
      return;
    }

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre: name, mensaje: message })
      });

      if (!response.ok) throw new Error('Error al enviar');
      
      document.getElementById('name').value = '';
      document.getElementById('message').value = '';
      loadComments();
    } catch (error) {
      console.error('Error:', error);
      alert('Error al enviar. Verifica la consola para más detalles.');
    }
  });

  async function loadComments() {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('Error al cargar');
      
      const comments = await response.json();
      renderComments(comments);
    } catch (error) {
      console.error('Error:', error);
      document.getElementById('commentsList').innerHTML = `
        <p class="error">⚠️ Error al cargar comentarios. ¿El servidor está corriendo?</p>
      `;
    }
  }

  function renderComments(comments) {
    const container = document.getElementById('commentsList');
    container.innerHTML = comments.length === 0 
      ? '<p>No hay comentarios aún</p>'
      : comments.map(comment => `
          <div class="comentario">
            <p><strong>${comment.nombre}</strong></p>
            <p>${comment.mensaje}</p>
            <small>${new Date(comment.fecha).toLocaleString()}</small>
          </div>
        `).join('');
  }
});