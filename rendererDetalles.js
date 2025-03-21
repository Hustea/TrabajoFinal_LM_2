window.addEventListener('DOMContentLoaded', async () => {
    const id = localStorage.getItem('movieId');
    console.log("Obteniendo detalles para:", id); // 🟢 Verifica que el ID es correcto

    if (!id) {
        document.getElementById('detalles').innerHTML = '<p>Error: No se encontró la película.</p>';
        return;
    }

    try {
        const API_KEY = '8ae031cc';
        const url = `https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}&plot=full`;
        console.log("URL de la petición:", url); // 🟢 Verifica la URL generada

        const res = await fetch(url);
        const movie = await res.json();
        console.log("Datos recibidos de la API:", movie); // 🟢 Verifica la respuesta

        if (movie.Response === "False") {
            document.getElementById('detalles').innerHTML = `<p>Error en la API: ${movie.Error}</p>`;
            return;
        }

        document.getElementById('detalles').innerHTML = `
            <h2>${movie.Title || 'Sin título'}</h2>
            <p><strong>Año:</strong> ${movie.Year || 'Desconocido'}</p>
            <p><strong>Género:</strong> ${movie.Genre || 'Desconocido'}</p>
            <p><strong>Director:</strong> ${movie.Director || 'Desconocido'}</p>
            <p><strong>Reseña:</strong> ${movie.Plot || 'Sin reseña disponible'}</p>
            <p><strong>Actores:</strong> ${movie.Actors || 'No disponible'}</p>
            <p><strong>Rating IMDb:</strong> ${movie.imdbRating || 'No disponible'}</p>
            <p><strong>Premios:</strong> ${movie.Awards || 'No disponible'}</p>
            <img src="${movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/150'}" width="150">
        `;
    } catch (error) {
        console.error("Error en la petición:", error);
        document.getElementById('detalles').innerHTML = '<p>Error al obtener los detalles.</p>';
    }
});
