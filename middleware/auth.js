export default function ({ store, redirect }) {
  console.log(store.getters['user/loggedIn'])
  if (!store.getters['user/loggedIn']) {
    return redirect('/')
  }
}
