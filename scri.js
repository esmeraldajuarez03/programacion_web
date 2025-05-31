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
   

    // Manejar comentarios generales
    const generalCommentForm = document.getElementById("generalCommentForm");
    const generalCommentText = document.getElementById("generalCommentText");
    const generalCommentsList = document.getElementById("generalCommentsList");

    // Guardar comentarios generales en localStorage
    const saveGeneralComments = (comments) => {
        localStorage.setItem("generalComments", JSON.stringify(comments));
    };

    // Obtener comentarios generales de localStorage
    const getGeneralComments = () => {
        return JSON.parse(localStorage.getItem("generalComments")) || [];
    };

    // Mostrar comentarios generales
    const displayGeneralComments = () => {
        generalCommentsList.innerHTML = ""; // Limpiar comentarios previos
        const comments = getGeneralComments();
        comments.forEach((comment, index) => {
            const li = document.createElement("li");
            li.textContent = comment;
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Eliminar";
            deleteButton.classList.add("delete-comment-button");
            deleteButton.addEventListener("click", () => {
                comments.splice(index, 1);
                saveGeneralComments(comments);
                displayGeneralComments();
            });
            li.appendChild(deleteButton);
            generalCommentsList.appendChild(li);
        });
    };

    // Manejar envío de comentarios generales
    generalCommentForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const comment = generalCommentText.value.trim();
        if (comment) {
            const comments = getGeneralComments();
            comments.push(comment);
            saveGeneralComments(comments);
            generalCommentText.value = ""; // Limpiar campo de texto
            displayGeneralComments();
        } else {
            alert("El comentario no puede estar vacío.");
        }
    });

    // Mostrar comentarios generales al cargar la página
    displayGeneralComments();

    const logoutBtnModal = document.getElementById("logoutBtnModal");
    if (logoutBtnModal) {
        logoutBtnModal.addEventListener("click", () => {
            removeUser();
            alert("Sesión cerrada.");
            userModal.style.display = "none";
            updateUIForUser();
        });
    }