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
      console.log(data)
    },
  },
}
</script>

<style lang="less" scoped>

</style>
