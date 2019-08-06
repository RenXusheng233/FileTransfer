import Vue from 'vue'
import Vuex from 'vuex'

// 本地持久化? - 有点坑呀, 不注释掉的话会导致 vuex 产生问题
// 这里的 createPersistedState 并没有将数据存到 localStorage 中, 可能存到本地文件中?
// import { createPersistedState, createSharedMutations } from 'vuex-electron'

import modules from './modules'

Vue.use(Vuex)

export default new Vuex.Store({
  modules,
  // plugins: [
  //   createPersistedState(),
  //   createSharedMutations()
  // ],
  strict: process.env.NODE_ENV !== 'production'
})
