const state = () => ({
  register: {
    enabled: false,
    currentStep: 1,
    step1: {
      email: '',
      username: '',
      password: '',
      passwordConfirm: ''
    },
    step2: {
      bio: '',
      avatar: undefined
    },
    step3: {}
  },
  login: {
    enabled: false
  }
})

const getters = {
  avatarURL(state) {
    return window && state.register.step2.avatar ? window.URL.createObjectURL(state.register.step2.avatar) : ''
  }
}

const mutations = {
  setRegisterEnabled(state, val) {
    state.register.enabled = val
  },
  setRegisterCurrentStep(state, val) {
    state.register.currentStep = val
  },
  setRegisterEmail(state, val) {
    state.register.step1.email = val
  },
  setRegisterUsername(state, val) {
    state.register.step1.username = val
  },
  setRegisterPassword(state, val) {
    state.register.step1.password = val
  },
  setRegisterPasswordConfirm(state, val) {
    state.register.step1.passwordConfirm = val
  },
  setRegisterBio(state, val) {
    state.register.step2.bio = val
  },
  setRegisterAvatar(state, val) {
    state.register.step2.avatar = val
  },
  setLoginEnabled(state, val) {
    state.login.enabled = val
  }
}

const actions = {}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
