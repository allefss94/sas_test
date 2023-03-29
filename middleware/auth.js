export default function ({ store, redirect, $toast }) {
  console.log($toast)
  console.log(store.getters['user/loggedIn'])
  if (!store.getters['user/loggedIn']) {
    $toast.error('User not Authenticated, please make a login')
    return redirect('/')
  }
}
