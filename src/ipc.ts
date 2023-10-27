//ipc stuff
import {app, desktopCapturer, ipcMain} from "electron";
import {mainWindow} from "./window";
import {getConfig, getDisplayVersion, getVersion, packageVersion, setConfigBulk} from "./utils";
import {createSettingsWindow} from "./settings/main";
import {decryptMessage, encryptMessage} from "./modules/messageEncryption";
import {flashTitlebar} from "./preload/titlebar";

export function registerIpc() {
    ipcMain.on("win-maximize", () => {
        mainWindow.maximize();
    });
    ipcMain.on("win-isMaximized", (event) => {
        event.returnValue = mainWindow.isMaximized();
    });
    ipcMain.on("win-isNormal", (event) => {
        event.returnValue = mainWindow.isNormal();
    });
    ipcMain.on("win-minimize", () => {
        mainWindow.minimize();
    });
    ipcMain.on("win-unmaximize", () => {
        mainWindow.unmaximize();
    });
    ipcMain.on("win-show", () => {
        mainWindow.show();
    });
    ipcMain.on("win-hide", () => {
        mainWindow.hide();
    });
    ipcMain.on("win-quit", () => {
        app.exit();
    });
    ipcMain.on("get-app-version", (event) => {
        event.returnValue = getVersion();
    });
    ipcMain.on("displayVersion", (event) => {
        event.returnValue = getDisplayVersion();
    });
    ipcMain.on("get-package-version", (event) => {
        event.returnValue = packageVersion;
    });
    ipcMain.on("restart", () => {
        app.relaunch();
        app.exit();
    });
    ipcMain.on("saveSettings", async (_event, args) => {
        await setConfigBulk(args);
    });
    ipcMain.on("minimizeToTray", async (event) => {
        event.returnValue = await getConfig("minimizeToTray");
    });
    ipcMain.on("flashTitlebar", async (_event, color: string) => {
        await mainWindow.webContents.executeJavaScript(`goofcord.titlebar.flashTitlebar("${color}")`);
    });
    ipcMain.on("openSettingsWindow", async () => {
        await createSettingsWindow();
    });
    ipcMain.handle("encryptMessage", async (event, message: string) => {
        return encryptMessage(message);
    });
    ipcMain.on("decryptMessage", async (event, message: string) => {
        event.returnValue = decryptMessage(message);
    });
    ipcMain.on("get-user-data-path", (event) => {
        event.returnValue = app.getPath("userData");
    });
    ipcMain.handle("DESKTOP_CAPTURER_GET_SOURCES", (_event, opts) => desktopCapturer.getSources(opts));
}
