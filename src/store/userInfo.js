import { storage } from './../utils/storage'

export default {
  state: {
    userInfo: storage.get('userInfo') || {},
    privilege: 1,
    isMask: false
  },
  getters: {
    token: state => state.userInfo.token,
    userId: state => state.userInfo.userId,
    uerType: state => state.userInfo.uerType,
    userName: state => state.userInfo.userName,
    isMask: state => state.isMask,
    privilege: state => state.privilege
  },
  actions: {

  },
  mutations: {
    setUserInfo (state, payload = {}) {
      storage.set('userInfo', payload)
      state.userInfo = payload
    }
  }
}
