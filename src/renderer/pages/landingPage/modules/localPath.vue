<template>
  <div class="local-path-wrapper">
    <el-input placeholder="输入关键字进行过滤" v-model="filterText"></el-input>

    <el-tree
      class="filter-tree"
      :data="localPaths"
      :props="defaultProps"
      :filter-node-method="filterNode"
      @node-click="handleNodeClick"
      ref="tree"
    ></el-tree>
  </div>
</template>

<script>
export default {
  name: 'localPath',
  props: {
    pathsInfoTree: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {
      filterText: '', // 节点过滤文本
      localPaths: [],
      defaultProps: {
        children: 'children',
        label: 'path',
      },
    }
  },
  mounted() {
    this.localPaths = this.pathsInfoTree
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
    },
    pathsInfoTree(val) {
      /**
       * 先将数据置为空
       * 然后通过延时赋值强制重新渲染
       * 如果不做此操作路径树的渲染有问题
       */
      this.localPaths = []
      setTimeout(() => {
        this.localPaths = val
      }, 20)
    },
  },
  methods: {
    // 本地路径 - 节点过滤
    filterNode(value, data) {
      if (!value) return true
      return data.path.indexOf(value) !== -1
    },

    // 点击节点事件
    handleNodeClick(data) {
      const localPath = data.path
      // 提交本地路径到 vuex
      // mutation, 不直接改变状态 异步
      this.$store.dispatch('sendLocalPath', localPath)
    },
  },
}
</script>

<style lang="less" scoped>
.local-path-wrapper {
  margin-top: 10px;
  .el-input {
    width: 80%;
    padding: 5px 0 10px 10px;
    
  }
}
</style>
