<template>
  <div>
    <el-input placeholder="输入关键字进行过滤" v-model="filterText"></el-input>

    <el-tree
      class="filter-tree"
      :data="pathsInfoTree"
      :props="defaultProps"
      :filter-node-method="filterNode"
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
      defaultProps: {
        children: 'children',
        label: 'path',
      },
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
    },
  },
  methods: {
    // 本地路径 - 节点过滤
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
  },
}
</script>
