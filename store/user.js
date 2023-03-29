export const state = () => ({
  sessionToken: '',
  house_rules: [],
  isLoading: false,
})

export const getters = {
  loggedIn: (state) => {
    return !!state.sessionToken
  },
  houseRules: (state) => state.house_rules,
  isLoading: (state) => state.isLoading,
}

export const mutations = {
  SET_LOADING: (state, payload) => {
    state.isLoading = payload
  },
  SET_SESSION_TOKEN: (state, token) => {
    state.sessionToken = token
  },
  SET_HOUSE_RULES: (state, payload) => {
    state.house_rules = payload
  },
}

export const actions = {
  async login({ commit, dispatch }, credentials) {
    try {
      commit('SET_LOADING', true)
      const { data } = await this.$api.post('login_json', credentials)
      this.$api.setHeader(
        'Authorization',
        'Bearer ' + data.data.result.access_token
      )
      commit('SET_SESSION_TOKEN', data.data.result.access_token)
      dispatch('getHouseRules')
      return true
    } catch (error) {
      console.log('error', error)
      return false
    } finally {
      commit('SET_LOADING', false)
    }
  },

  async getHouseRules({ commit }) {
    const { data } = await this.$api.get('house_rules')
    commit('SET_HOUSE_RULES', data.data.entities)
  },
  async createHouseRule({ commit, dispatch }, payload) {
    try {
      commit('SET_LOADING', true)
      const response = await this.$api.post('/house_rules', payload)
      console.log('from store', response)
    } catch (error) {
      console.log(error)
    } finally {
      commit('SET_LOADING', false)
    }

    dispatch('getHouseRules')
  },
  async deleteItem({ commit, dispatch }, item) {
    try {
      commit('SET_LOADING', true)
      await this.$api.delete(`house_rules/${item.id}`)
      dispatch('getHouseRules')
    } catch (error) {
      console.log('error', error)
    } finally {
      commit('SET_LOADING', false)
    }
  },
  async updateItem({ commit, dispatch }, { id, payload }) {
    try {
      commit('SET_LOADING', true)
      await this.$api.put(`house_rules/${id}`, payload)
      dispatch('getHouseRules')
    } catch (error) {
      console.log('error', error)
    } finally {
      commit('SET_LOADING', false)
    }
  },
}
