function register(params) {
  var config = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      password: params.password,
      email: params.email,
      username: params.name
    })
  };
  var url = `${process.env.VUE_APP_STRAPI_URL}/api/auth/local/register`;
  return fetch(url, config)
    .then(function (response) {
      return response.json();
    })
    .then(function(data) {
      if (data.error && data.error.status != 200) {
        if (data.error.details.errors) {
          var errors = data.error.details.errors.map(function (error) {
            return error.message;
          });
          return Promise.reject(errors);
        }

        if (data.error.message == 'Email is already taken') {
          return Promise.reject(['email is taken']);
        }

        // NOTE: Trial and error.
        if (data.error.name == 'ApplicationError') {
          return Promise.reject(['username is taken']);
        }
      }
      return data;
    })
    .then(function (data) {
      localStorage.setItem("jwt" , data.jwt)
      return { user: data.user };
    });
}

export default register;
