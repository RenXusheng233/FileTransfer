<template>
  <ice-split-panes class="landing-page-wrapper" horizontal min-size="10%" initial-size="10%">
    <div slot="top" class="content color-a">连接服务器</div>

    <ice-split-panes slot="bottom" horizontal max-size="90%" initial-size="90%">
      <ice-split-panes slot="top">
        <ice-split-panes slot="left" horizontal>
          <div slot="top" class="content color-b">本地路径</div>
          <div slot="bottom" class="content color-c">路径详情</div>
        </ice-split-panes>

        <ice-split-panes slot="right" horizontal>
          <div slot="top" class="content color-d">远程路径</div>
          <div slot="bottom" class="content color-e">路径详情</div>
        </ice-split-panes>
      </ice-split-panes>

      <div slot="bottom" class="content color-f">文件传输</div>
    </ice-split-panes>
  </ice-split-panes>
</template>

<script>
import iceSplitPanes from 'icefox/lib/components/SplitPanes'
export default {
  name: 'landingPage',
  components: { iceSplitPanes },
  data() {
    return {}
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
  .color-b {
    background-color: rgba(65, 0, 154, 0.3);
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
