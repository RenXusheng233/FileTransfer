const state = {
  localPath: 'bendi',
}

const mutations = {
  // 更新本地选中的路径
  UPDATE_FILE_PATH(state, localPath) {
    state.localPath = localPath
  },
}

const actions = {
  sendLocalPath({ commit }, localPath) {
    // do something async
    commit('UPDATE_FILE_PATH', localPath)
  },
}

export default {
  state,
  mutations,
  actions,
}
