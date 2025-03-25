const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld("electron", {
    apiUrl: "http://localhost:3000",
    ipcRenderer: {
        invoke: (channel, data) => ipcRenderer.invoke(channel, data),
        send: (channel, data) => ipcRenderer.send(channel, data),
        on: (channel, callback) => ipcRenderer.on(channel, (event, ...args) => callback(...args))
    }
});
