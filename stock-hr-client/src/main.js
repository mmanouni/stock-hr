const path = require("path");
const { app, BrowserWindow, session } = require("electron");

let mainWindow;

app.whenReady().then(async () => {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
            contextIsolation: true,
            enableRemoteModule: false,
            nodeIntegration: false,
            sandbox: false, // Prevents renderer isolation issues
            devTools: true // Allows opening DevTools
        }
    });

    console.log("🔍 Checking auth token...");

    try {
        const token = await checkAuthToken();
        if (token) {
            console.log("✅ User is authenticated, loading dashboard...");
            await mainWindow.loadFile(path.join(__dirname, "dashboard.html"));
        } else {
            console.log("🔐 No token found, loading login screen...");
            await mainWindow.loadFile(path.join(__dirname, "index.html"));
        }
    } catch (err) {
        console.error("⚠️ Error checking auth token:", err);
        await mainWindow.loadFile(path.join(__dirname, "index.html"));
    }
});

const { ipcMain } = require("electron");
const axios = require("axios");

// 🛠️ Handle login request from renderer process
ipcMain.handle("login-user", async (event, { username, password }) => {
    try {
        console.log("🔑 Login attempt for:", username);

        // Make a request to the backend API
        const response = await axios.post("http://localhost:3000/api/auth/login", { username, password });

        console.log("✅ Login success. Received Token:", response.data.token);

        // Set authToken as a session cookie in Electron
        return { success: true, token: response.data.token, message: "Login successful" };
        

        return { success: true, token: response.data.token, message: "Login successful" };
    } catch (error) {
        console.error("❌ Login error:", error.response?.data?.message || error.message);
        return { success: false, message: "Invalid username or password" };
    }
});


// 🛑 Ensure app closes properly
app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit();
});

// ✅ Function to check stored authentication token
async function checkAuthToken() {
    return new Promise((resolve) => {
        session.defaultSession.cookies.get({ name: "authToken" })
            .then((cookies) => {
                if (cookies.length > 0) {
                    console.log("🔑 Found auth token:", cookies[0].value);
                    resolve(cookies[0].value);
                } else {
                    console.log("🔍 No auth token found.");
                    resolve(null);
                }
            })
            .catch((err) => {
                console.error("⚠️ Error accessing session storage:", err);
                resolve(null);
            });
    });
}
