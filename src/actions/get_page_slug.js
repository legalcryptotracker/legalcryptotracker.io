function getPageSlug() {
  var slug = window.location.pathname;
  slug = slug.split('/')[1];
  slug = slug.split('/')[0];
  return slug;
}

export default getPageSlug;
