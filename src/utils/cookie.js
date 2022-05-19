function saveTokenToCookie(value) {
  document.cookie = `token=${value}`
}

function saveUserToCookie(value) {
  document.cookie = `user=${value}`
}

function getTokenFromCookie() {
  return document.cookie.replace(
    /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
    '$1'
  )
}

function getUserFromCookie() {
  return document.cookie.replace(
    /(?:(?:^|.*;\s*)user\s*=\s*([^;]*).*$)|^.*$/,
    '$1'
  )
}

function deleteCookie(value) {
  document.cookie = `${value}=; expires=Thu, 01 Jan 1970 00:00:01 GMT;`
}

export {
  saveTokenToCookie,
  saveUserToCookie,
  getTokenFromCookie,
  getUserFromCookie,
  deleteCookie,
}
