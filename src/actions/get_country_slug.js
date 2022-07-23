function getCountrySlug() {
  var slug = window.location.pathname;
  slug = slug.split('/country/')[1];
  slug = slug.split('/')[0];
  return slug;
}

export default getCountrySlug;
