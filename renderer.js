window.addEventListener('DOMContentLoaded', async () => {
  const query = localStorage.getItem('searchQuery');
  const container = document.getElementById('resultados');

  const results = await window.electronAPI.searchMovies(query);

  if (!results || results.length === 0) {
      container.innerHTML = '<p>No se encontraron resultados.</p>';
      return;
  }

  results.forEach(movie => {
      const div = document.createElement('div');
      div.classList.add('movie-card');
      div.innerHTML = `
          <h3 class="movie-title">${movie.Title} (${movie.Year})</h3>
          <img src="${movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/150'}">
          <button onclick="verDetalles('${movie.imdbID}')">Ver reseña</button>
      `;
      container.appendChild(div);
  });
});

function verDetalles(id) {
  localStorage.setItem('movieId', id);
  window.location.href = 'details.html';
}
