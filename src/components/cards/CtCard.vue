<template>
  <div class="card">
    <a :href="url" class="image-container">
      <img class="image" :src="image" :alt="alt">
    </a>
    <div class="info-container">
      <div class="info">
        <p>📅 {{post.attributes.createdAt.split('T')[0]}}</p>
        <h5>🔗 {{post.attributes.Author}}</h5>
      </div>
      <div class="data">
        <a :href="url" class="title">{{post.attributes.Title}}</a>
        <p>{{post.attributes.Content}}</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['post'],
    data() {
      return {
        image: process.env.VUE_APP_STRAPI_URL + this.post.attributes.Image.data.attributes.formats.thumbnail.url,
        alt: this.post.attributes.Title.toLowerCase(),
        url: process.env.VUE_APP_BASE_URL + this.post.id
      }
    },
  }
</script>

<style lang="scss">
  .card {
    padding: 10px;
    background-color: white;
    overflow: hidden;
    border: none;
    border-radius: 0;
  }
  div.card a.image-container {
    height: 200px;
    margin: 0 0 15px;
    overflow: hidden;
  }
  a.image-container img.image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  div.info-container {
    background-color: white;
  }
  div.info {
    display: flex;
    margin: 0 0 10px;
  }
  div.info p {
    margin: 0 10px 0 0;
    font-size: 13px;
    color: #8760e2;
  }
  div.info h5 {
    font-size: 13px;
    color: #531bdb;
    margin: 0;
    font-weight: 600;
  }

  div.data a.title {
    font-size: 14px;
    color: #531bdb;
    font-weight: 600;
    margin: 0 0 7px 0;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  div.data p {
    margin: 5px 0 0;
    padding: 0;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
</style>
