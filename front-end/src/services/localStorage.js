export default function getUserLogged() {
  const userLogged = JSON.parse(localStorage.getItem('user'));
  return userLogged;
}
