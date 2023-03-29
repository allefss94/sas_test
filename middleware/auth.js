export default function ({ store, redirect, $toast }) {
  if (!store.getters['user/loggedIn']) {
    $toast.error('User not Authenticated, please make a login')
    return redirect('/')
  }
}
