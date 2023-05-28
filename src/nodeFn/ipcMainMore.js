/*
* 注册ipcMain，便于渲染进程直接调用
*/
import { ipcMain} from 'electron'

export default (win)=>{
    // 窗口最小化
    ipcMain.on('window-minimize', function () {
      // 收到渲染进程的窗口最小化操作的通知，并调用窗口最小化函数，执行该操作
      win.minimize();
    });
  
    // 窗口最大化
    ipcMain.on('window-maximize', function () {
      if (win.isMaximized()) {
        win.restore();
      } else {
        win.maximize();
      }
    });
  
    // 关闭窗口
    ipcMain.on('window-close', function () {
      win.hide();
      win.close();
    });
}