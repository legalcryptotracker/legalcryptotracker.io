function login(params) {
  var config = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      identifier: params.email,
      password: params.password
    })
  };
  var url = `${process.env.VUE_APP_STRAPI_URL}/api/auth/local`;
  return fetch(url, config)
    .then(function (response) {
      return response.json()
    })
    .then(function(data){
      if (data.error && data.error.status !== 200) return Promise.reject();
      return data;
    })
    .then(function (data) {
      localStorage.setItem("jwt" , data.jwt)
      return { user: data.user };
    })
}

export default login;
