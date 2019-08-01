<template>
  <ice-split-panes class="landing-page-wrapper" horizontal min-size="10%" initial-size="10%">
    <div slot="top" class="content color-a">连接服务器</div>

    <ice-split-panes slot="bottom" horizontal max-size="90%" initial-size="90%">
      <ice-split-panes slot="top">
        <ice-split-panes slot="left" horizontal>
          <!-- 本地路径模块 -->
          <div slot="top" class="local-path">
            <local-path :paths-info-tree="pathsInfoTree"></local-path>
          </div>
          <div slot="bottom" class="content color-c">本地路径详情</div>
        </ice-split-panes>

        <ice-split-panes slot="right" horizontal>
          <div slot="top" class="content color-d">远程路径</div>
          <div slot="bottom" class="content color-e">远程路径详情</div>
        </ice-split-panes>
      </ice-split-panes>

      <div slot="bottom" class="content color-f">文件传输</div>
    </ice-split-panes>
  </ice-split-panes>
</template>

<script>
const fs = require('fs')
const path = require('path')

import iceSplitPanes from 'icefox/lib/components/SplitPanes'
import localPath from '../../components/localPath'
export default {
  name: 'landingPage',
  components: { iceSplitPanes, localPath },
  data() {
    return {
      pathsInfoTree: [], // 路径信息🌲
    }
  },
  created() {
    this.requestPathsInfo()
  },
  methods: {
    // 请求路径信息
    requestPathsInfo() {
      this.$electron.ipcRenderer.on('folder-info', (event, paths) => {
        paths.forEach((item) => {
          this.ergodicFile(item)
        })
      })
    },

    // 根据路径进行文件遍历
    ergodicFile(oPath) {
      oPath.children = []
      let filePath = oPath.path
      fs.readdir(filePath, (err, files) => {
        if (err) {
          console.warn(err)
        } else {
          // 遍历读取到的文件列表
          files.forEach((filename, index) => {
            // 获取当前文件的绝对路径
            let filedir = path.join(filePath, filename)
            // 根据文件路径获取文件信息，返回一个 fs.Stats 对象
            fs.stat(filedir, (err, stats) => {
              if (err) {
                console.warn('获取文件stats失败!')
              } else {
                let isDir = stats.isDirectory() // 是文件夹
                if (isDir) {
                  let oFile = { path: filedir }
                  oPath.children.push(oFile)
                  this.ergodicFile(oFile)
                }
              }
            })
          })
          this.pathsInfoTree.push(oPath)
        }
      })
    },
  },
}
</script>

<style lang="less" scoped>
.landing-page-wrapper {
  height: 100%;
  width: 100%;

  .content {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
  }

  .color-a {
    background-color: #08979c;
  }
  .color-c {
    background-color: #52c41a;
  }
  .color-d {
    background-color: #1d39c4;
  }
  .color-e {
    background-color: #fa541c;
  }
  .color-f {
    background-color: #ad6800;
  }
}
</style>
