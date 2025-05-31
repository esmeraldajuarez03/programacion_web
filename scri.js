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
   const API_URL = 'http://localhost:3000/api/comentarios'; // ← URL local

async function loadComments() {
    try {
    const response = await fetch(API_URL); // GET
    if (!response.ok) throw new Error('Error al cargar comentarios');
    const comments = await response.json();
    renderComments(comments);
    } catch (error) {
    console.error('Error:', error);
    document.getElementById('commentsList').innerHTML = 
    '<p>No se pudieron cargar los comentarios. ¿El servidor está corriendo?</p>';
}
}

// Ejemplo de POST corregido:
document.getElementById('submitBtn').addEventListener('click', async () => {
    const name = document.getElementById('name').value.trim();
    const message = document.getElementById('message').value.trim();

    try {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre: name, mensaje: message }),
    });
    if (!response.ok) throw new Error('Error al enviar');
    loadComments(); // Recarga los comentarios
    } catch (error) {
    console.error('Error:', error);
    alert('Error al enviar. Verifica la consola para más detalles.');
}
});

        
      