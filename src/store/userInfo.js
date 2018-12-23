import { storage } from 'util/storage'

export default {
  state: {
    userInfo: storage.get('userInfo') || {},
    isMask: false
  },
  getters: {
    token: state => state.userInfo.token,
    userId: state => state.userInfo.userId,
    uerType: state => state.userInfo.uerType,
    userName: state => state.userInfo.userName,
    isMask: state => state.isMask
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
