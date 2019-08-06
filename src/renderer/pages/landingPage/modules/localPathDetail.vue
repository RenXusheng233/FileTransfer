<template>
  <div class="local-path-detail-wrapper">
    <el-table :data="detailTable" stripe style="width: 100%">
      <el-table-column align="center" prop="fileName" label="文件名"></el-table-column>
      <el-table-column align="center" prop="fileSize" label="文件大小"></el-table-column>
      <el-table-column align="center" prop="fileType" label="文件类型"></el-table-column>
      <el-table-column align="center" prop="modifyTime" label="修改时间"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import fs from 'fs'
import path from 'path'
export default {
  data() {
    return {
      detailTable: [
        {
          fileName: 'hello',
          fileSize: '1kb',
          fileType: 'txt',
          modifyTime: 'xxx.xxx',
        },
        {
          fileName: 'world',
          fileSize: '2kb',
          fileType: 'txt',
          modifyTime: 'ccc.ccc',
        },
      ],
    }
  },
  computed: {
    // vuex 中获取选中的本地路径 [Path模块]
    ...mapState({
      localPath: (state) => state.Path.localPath,
    }),
  },
  watch: {
    localPath() {
      this.ergodicFile(this.localPath)
    },
  },
  methods: {
    // 根据路径遍历
    ergodicFile(localPath) {
      fs.readdir(localPath, (err, files) => {
        if (err) {
          console.warn(err)
        } else {
          files.forEach((filename) => {
            let filedir = path.join(localPath, filename)
            fs.stat(filedir, (err, stats) => {
              if (err) {
                console.warn(err)
              } else {
                let isDerectory = stats.isDirectory() // 是文件夹
                let isFile = stats.isFile() // 是文件

                // 如果是文件夹, 则获取该文件夹名, 文件夹大小, 修改时间
                if (isDerectory) {
                  console.log('Folder =====', filedir)
                }

                // 如果是文件, 则需获取文件名, 文件大小, 文件类型, 修改时间
                if (isFile) {
                  console.log('File *****', filedir)
                }
              }
            })
          })
        }
      })
    },
  },
}
</script>

<style lang="less" scoped>
.local-path-detail-wrapper {
  margin-top: 5px;
}
</style>
