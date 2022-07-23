function getLoggedInUser() {
  var config = {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem('jwt')}`,
    },
  };
  var url = `${process.env.VUE_APP_STRAPI_URL}/api/users/me`;
  return fetch(url, config)
    .then(function (response) { return response.json(); })
    .then(function (response) {
      if (!response.error) return { user: response };
      return Promise.reject();
    });
}

export default getLoggedInUser;
