function getLocales() {
  var config = {};
  var url = `${process.env.VUE_APP_STRAPI_URL}/api/custom-locales`;
  return fetch(url, config)
    .then(function (response) { return response.json(); })
    .then(function (response) {
      return {
        locales: response.data.map(function (item) {
          return { id: item.id, ...item.attributes };
        })
      };
    });
}

export default getLocales;
