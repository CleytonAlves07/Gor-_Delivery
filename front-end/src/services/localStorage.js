export function getUserLogged() {
  const userLogged = JSON.parse(localStorage.getItem('user'));
  return userLogged;
}

export const setLocalCart = (obj) => localStorage
  . setItem('deliveryCart', JSON.stringify(obj)) || [];
