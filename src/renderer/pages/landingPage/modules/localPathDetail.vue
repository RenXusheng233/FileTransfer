<template>
  <div class="local-path-detail-wrapper">
    <el-table :data="detailTable" stripe style="width: 100%">
      <el-table-column align="center" prop="fileName" label="文件名"></el-table-column>
      <el-table-column align="center" prop="fileSize" label="文件大小"></el-table-column>
      <el-table-column align="center" prop="fileType" label="文件类型"></el-table-column>
      <el-table-column align="center" prop="modifyTime" label="修改时间"></el-table-column>
    </el-table>
    <div>local path is {{localPath}}</div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
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
}
</script>

<style lang="less" scoped>
.local-path-detail-wrapper {
  margin-top: 5px;
}
</style>
