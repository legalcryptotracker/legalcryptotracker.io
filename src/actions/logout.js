function logout() {
  localStorage.removeItem('jwt');
  return Promise.resolve();
}

export default logout;
