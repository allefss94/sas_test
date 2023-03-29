export default function ({ $axios, store, env }, inject) {
  const api = $axios.create({
    baseURL: 'https://sys-dev.searchandstay.com/api/admin/',
  })

  inject('api', api)
}
