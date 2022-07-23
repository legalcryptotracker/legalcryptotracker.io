function getCountryVersionSlug() {
  var country = '/country/';
  var version = '/version/';
  var slug = window.location.pathname;

  slug = slug.split(country)[1];

  if (slug.indexOf(version) < 0) return;

  slug = slug.split(version)[1];
  slug = slug.split('/')[0];

  return slug;
}

export default getCountryVersionSlug;
