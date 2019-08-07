<template>
  <div class="local-path-detail-wrapper">
    <el-table
      :data="detailTable"
      size="small"
      :highlight-current-row="true"
      style="width: 100%"
    >
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
import moment from 'moment'
export default {
  data() {
    return {
      detailTable: [],
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
      this.detailTable = [] // 点击切换选中文件夹时先清空详情
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
                  const obj = {
                    fileName: filename,
                    fileSize: stats.size,
                    fileType: '文件夹',
                    modifyTime: moment(stats.mtime).format(
                      'YYYY-MM-DD HH:mm:ss'
                    ),
                  }
                  this.detailTable.push(obj)
                }

                // 如果是文件, 则需获取文件名, 文件大小, 文件类型, 修改时间
                if (isFile) {
                  const obj = {
                    fileName: filename,
                    fileSize: stats.size,
                    fileType: path.extname(filename),
                    modifyTime: moment(stats.mtime).format(
                      'YYYY-MM-DD HH:mm:ss'
                    ),
                  }
                  this.detailTable.push(obj)
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
