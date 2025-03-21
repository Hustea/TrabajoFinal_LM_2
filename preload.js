const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  searchMovies: (query) => ipcRenderer.invoke('search-movies', query),
});
