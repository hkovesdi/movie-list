const state = () => ({
  register: {
    enabled: false,
    currentStep: 1,
    errors: [],
    step1: {
      email: '',
      username: '',
      password: '',
      passwordConfirm: ''
    },
    step2: {
      bio: '',
      avatarFile: undefined
    }
  },
  login: {
    enabled: false,
    errors: []
  }
})

const getters = {
  avatarURL(state) {
    return window && state.register.step2.avatarFile instanceof File ? window.URL.createObjectURL(state.register.step2.avatarFile) : ''
  }
}

const mutations = {
  setRegisterEnabled(state, val) {
    state.register.enabled = val
  },
  setRegisterCurrentStep(state, val) {
    state.register.currentStep = val
  },
  setRegisterErrors(state, val) {
    state.register.errors = val
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
    state.register.step2.avatarFile = val
  },
  setLoginEnabled(state, val) {
    state.login.enabled = val
  },
  setLoginErrors(state, val) {
    state.login.errors = val
  }
}

const actions = {
  resetRegisterState({ commit }) {
    commit('setRegisterEmail', '')
    commit('setRegisterUsername', '')
    commit('setRegisterPassword', '')
    commit('setRegisterPasswordConfirm', '')
    commit('setRegisterBio', '')
    commit('setRegisterAvatar', undefined)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
