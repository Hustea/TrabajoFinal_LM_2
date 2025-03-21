const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { searchMovies, getMovieDetails } = require('./api'); // Importamos nuestras funciones

function createWindow(file = 'index.html') {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'), // Conecta el preload
    },
  });

  win.loadFile(file);
}

// Creamos la ventana al iniciar la app
app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Cerramos si no estamos en Mac
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});


// 🧠 Aquí es donde conectamos el proceso principal con el renderer (ipc)
ipcMain.handle('search-movies', async (event, query) => {
  return await searchMovies(query); // Llama a la función del archivo api.js
});
