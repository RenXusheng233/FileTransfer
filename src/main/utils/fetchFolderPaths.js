import Store from 'electron-store'
import uuidv4 from 'uuid/v4'

// 这里如果使用 extends 会报错
// 内部检查, 继承时无 new 实例则报错
const store = new Store()

class DataStore {
  // 构造函数
  constructor() {
    this.folders = store.get('folders') || []
  }

  saveFolders() {
    store.set('folders', this.folders)
    return this
  }

  getFolders() {
    return store.get('folders') || []
  }

  // 从模态窗口传过来的文件夹路径数组
  addFolders(folders) {
    const foldersWithIds = folders.map((folder) => {
      return {
        id: uuidv4(),
        path: folder.path,
      }
    })
    this.folders = foldersWithIds
    return this.saveFolders()
  }
  deleteFolders(deletedId) {
    this.folders = this.folders.filter((folder) => folder.id !== deletedId)
    return this.saveFolders()
  }
}

export default DataStore
