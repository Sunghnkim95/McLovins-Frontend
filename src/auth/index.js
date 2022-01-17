export function getCurrentUserToken() {
  const user = localStorage.getItem('userToken');
  return user;
}
export function removeCurrentUserToken() {
  localStorage.removeItem('userToken')
}
export function getCurrentUsername() {
  const storageUsername = JSON.parse(localStorage.getItem('myUsername'));
  return storageUsername;
}
export function removeCurrentUsername() {
  localStorage.removeItem('myUsername')
}
export function removeIsAdmin() {
  localStorage.removeItem('isAdmin')
}
export function removeUserId() {
  localStorage.removeItem('userId')
}
export function getIsAdmin() {
  const storageUsername = JSON.parse(localStorage.getItem('isAdmin'));
  return storageUsername;
}
export function removeCurrentEmail() {
  localStorage.removeItem('email')
}
export function removeCurrentCartDisplayNumb() {
  localStorage.removeItem('cartDisplayNumb')
}
export function removeCurrentCartItems() {
  localStorage.removeItem('cartItems')
  localStorage.setItem('cartItems', [])
}
export function removeCurrentCart() {
  localStorage.removeItem('Cart')
}
export function removeUserList() {
  localStorage.removeItem('usersList');
}
export function removeHiddenPass(){
  localStorage.removeItem('hiddenPass')
}