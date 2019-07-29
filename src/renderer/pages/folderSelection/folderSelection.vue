<template>
  <div class="folder-selection-wrapper">
    <div class="folder-selection-title">
      <span>请选择文件夹</span>
    </div>
    <div class="folder-selection-table">
      <el-table
        :data="permissionFolders"
        size="small"
        height="240px"
        :stripe="true"
        style="width: 100%; font-size: 14px;"
      >
        <el-table-column prop="path" align="center" width="400"></el-table-column>
        <el-table-column align="center">
          <template slot-scope="scope">
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="folder-selection-button">
      <el-button type="primary" icon="el-icon-search" size="small" @click="selectFolder">选择</el-button>
      <el-button type="primary" icon="el-icon-check" size="small" @click="confirmSelection">确认</el-button>
    </div>
  </div>
</template>

<script>
const remote = require('electron').remote

export default {
  data() {
    return {
      permissionFolders: [], // 选中的路径
    }
  },
  created() {
    /**
     * 为什么要放在 created 中, 因为
     * 这个ipcRenderer有点像 websocket
     * 一旦运行就一直在监听中, 直到关闭
     */
    this.fetchSelectedPaths()
  },
  // 只会执行一次
  mounted() {
    this.requestStoredPaths()
  },
  methods: {
    // 请求存储在本地的路径
    requestStoredPaths() {
      // 请求
      this.$electron.ipcRenderer.send('get-stored-folder')
      // 获取
      this.$electron.ipcRenderer.on('stored-folder', (event, paths) => {
        this.permissionFolders = paths
      })
    },

    // 获取选择的路径渲染到table中
    fetchSelectedPaths() {
      this.$electron.ipcRenderer.on('selected-folder', (event, paths) => {
        // 当前已选的所有文件夹路径
        let currentSelectedFolders = this.permissionFolders.map(
          (item) => item.path
        )
        // 新传入的文件夹路径
        if (Array.isArray(paths)) {
          const newSelectedFolders = paths
            .map((item) => {
              return { path: item }
            })
            .filter((path) => {
              // 当前已有路径与新传入的路径对比 去重
              // 数组对象的去重
              return currentSelectedFolders.indexOf(path.path) < 0
            })
          // 重新转回对象数组
          currentSelectedFolders = currentSelectedFolders.map((item) => {
            return { path: item }
          })
          // 本身的, 新传入的均保存
          this.permissionFolders = [
            ...currentSelectedFolders,
            ...newSelectedFolders,
          ]
        }
      })
    },

    // 表格内 [删除] 按钮
    handleDelete(index) {
      this.permissionFolders.splice(index, 1)
    },

    // [选择] 按钮 - 选择文件夹
    selectFolder() {
      this.$electron.ipcRenderer.send('select-permission-folder')
    },

    // [确认] 按钮 - 确认选择路径
    confirmSelection() {
      if (this.permissionFolders.length) {
        // 到主进程将选择的目录保存到本地
        this.$electron.ipcRenderer.send(
          'save-permission-folder',
          this.permissionFolders
        )

        // 关闭模态窗口
        let modalWindow = remote.getCurrentWindow()
        modalWindow.close()
      } else {
        // 若表格中没有路径, 弹窗提示
        alert('请至少选择一条路径!')
      }
    },
  },
  beforeDestroy() {
    // remove listener
  },
}
</script>

<style lang="less" scoped>
.folder-selection-wrapper {
  .folder-selection-title {
    margin-top: 30px;
    text-align: center;
    font-size: 18px;
    font-weight: bolder;
  }

  .folder-selection-button {
    position: absolute;
    bottom: 20px;
    left: 37%;
  }
}
</style>
