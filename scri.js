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
   
const REPO_OWNER = 'esmeraldajuarez03';
const REPO_NAME = 'programacion_web';
const API_URL = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/issues`;
const TOKEN = window.CONFIG?.GITHUB_TOKEN || '';

if (!TOKEN) {
  console.error('❌ No se encontró el token de GitHub');
  document.getElementById('commentsList').innerHTML = `
    <p class="error">Error de configuración. Contacta al administrador.</p>
  `;
}

async function postComment(name, message) {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Authorization': `token ${TOKEN}`,
            'Accept': 'application/vnd.github.v3+json'
        },
        body: JSON.stringify({
            title: `Comentario de ${name}`,
            body: message,
            labels: ['comentarios']
        })
    });
    return response.json();
}