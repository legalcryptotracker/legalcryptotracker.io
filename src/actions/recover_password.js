function recoverPassword(data) {
  var config = {
    method: 'POST',
    headers: { 'Content-Type': "application/json" },
    body: JSON.stringify({ email: data.email })
  };
  var url = `${process.env.VUE_APP_STRAPI_URL}/api/auth/forgot-password`;
  return fetch(url, config)
    .then(function (response) {
      return response.json();
    })
    .then(function(response) {
      if (response.error && response.error.status != 200)
        return Promise.reject();
    });
}

export default recoverPassword;
