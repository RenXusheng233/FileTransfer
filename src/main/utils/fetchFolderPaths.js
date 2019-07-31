import Store from 'electron-store'

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
    this.folders = folders
    return this.saveFolders()
  }
}

export default DataStore
