const { app, BrowserWindow, Menu } = require('electron')
const url = require('url')
const path = require('path')

if (process.env.NODE_ENV !== 'production') {
    require('electron-reload')(__dirname, {
        electron: path.join(__dirname, '../node_modules/', '.bin', 'electron')
    })
}

let mainWindow, newTaskWindow

app.on('ready', () => {
    mainWindow = new BrowserWindow({})
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'views/index.html'),
        protocol: 'file',
        slashes: true
    }))

    const mainMenu = Menu.buildFromTemplate(templateMenu)

    Menu.setApplicationMenu(mainMenu)

    mainWindow.on('closed'), () => {
        app.quit()
    }
})

const createNewTask = () => {
    new BrowserWindow({
        width: 400,
        height: 400,
        title: 'Add a new task'
    })
    //newTaskWindow.setMenu(null)
    newTaskWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'views/new-task.html'),
        protocol: 'file',
        slashes: true
    }))
}

const templateMenu = [
    {
        label: 'File',
        submenu: [
            {
                label: 'New task',
                accelerator: process.platform == 'darwin' ? 'command+Q' : 'Ctrl+Enter',
                click() {
                    createNewTask()
                }
            },
            {
                label: 'Delete all tasks',
                click() {
                    
                }
            },
            {
                label: 'Exit',
                click() {
                    app.quit()
                }
            }
        ]
    }
]

if (process.platform == 'darwin') {
    templateMenu.unshift({
        label: app.getName()
    })
}

if (process.env.NODE_ENV !== 'production') {
    templateMenu.push({
        label: 'DevTools',
        submenu: [
            {
                label: 'Show/Hide Dev Tools',
                accelerator: 'Ctrl+D',
                click(item, focusedWindow) {
                    focusedWindow.toggleDevTools()
                }
            },
            {
                role: 'reload'
            }
        ]
    })
}