<template>
  <b-container fluid>
      <b-col class="m-b-16 parent" cols="12" xxl="10">
        <div class="post-container" :key="locale">
          <div v-if="post.data.attributes.locale == locale" class="main">
            <h1 class="title">{{ post.data.attributes.Title }}</h1>
            <p class="content-body">Pais: {{ post.data.attributes.Country }}</p>
            <p v-html="post.data.attributes.Content.replace(/\n/g, '<br>')" class="content-body"></p>
            <div id="disqus_thread"></div>
            <noscript>Please enable JavaScript to view the <a href="https://disqus.com/?ref_noscript">comments powered by Disqus.</a></noscript>
          </div>
          <div v-for="loc in post.data.attributes.localizations.data" v-if="loc.attributes.locale == locale" class="main">
            <h1 class="title">{{ loc.attributes.Title }}</h1>
            <p class="content-body">Pais: {{ loc.attributes.Country}}</p>
            <p v-html="loc.attributes.Content.replace(/\n/g, '<br>')" class="content-body"></p>
            <div id="disqus_thread"></div>
            <noscript>Please enable JavaScript to view the <a href="https://disqus.com/?ref_noscript">comments powered by Disqus.</a></noscript>
          </div>
          <!--
          <div class="versioning"> 
            <b-button class="btn-primary edit-btn" @click="editFunction"> Edit article</b-button>
            <h1 class="title historial"> Historial de cambios </h1>
            <p class="changes"> No han habido cambios a este artículo desde su creación. Haz click en “Editar artículo” para agregar una nueva versión.</p>
            <p class="version"> {{ post.data.attributes.createdAt.slice(0, 10) }} - Version #{{ post.data.attributes.versionNumber }} </p>
            <p class="author">Creada por <a class="user">{{ post.data.attributes.Author }}</a> </p>
          </div>
          --> 
        </div>
      </b-col>
  </b-container fluid>
</template>

<style lang="scss">
  .parent {
    margin: 0 auto !important;
  }
  .post-container {
    background: #fff;
    padding: 35px 55px;
    border-radius: 20px;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .main{
    display: flex;
    flex-direction: column;
    flex-basis: 100%;
  }
  .versioning{
    display: flex;
    flex-direction: column;
    width: 230px;
  }
  .edit-btn{
    margin: 0 0 30px;
    width: 125px;
    height: 40px;
    color: white;
    background-color: #0F4698;
    border-radius: 10px;
    font-weight: 700;
    font-size: 14px;
    line-height: 18px;
    font-family: 'IBM Plex Sans';
  }
  .title{
    font-weight: 700;
    font-size: 22px;
    line-height: 29px;
    margin: 0 0 20px;
    color: #531DBD;
    font-family: 'IBM Plex Sans';
  }
  .historial{
    font-size: 18px;
  }
  .changes{
    font-family: 'IBM Plex Sans';
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    color: #7997C4;
  }
  .user{
    text-decoration: underline;
    color: #7997C4
  }
  .content-body{
    font-family: 'IBM Plex Sans';
    font-size: 16px;
    font-weight: 700px;
    line-height: 21px;
  }
</style>

<script>
  import CountryDetailsViewmodel from '@/viewmodels/country_details.js';
  import gql from 'graphql-tag'

  var id = new URLSearchParams(window.location.search).get('id');

  export default {
    name: 'postPage',

    data() {
      return {
        post: {},
        locale: localStorage.getItem('locale'),
      };
    },

    created() {
      this.vm = new CountryDetailsViewmodel();
      this.vm.observe(this.onViewmodelUpdated);
    },

    updated () {
      (function() { // DON'T EDIT BELOW THIS LINE
      var d = document, s = d.createElement('script');
      s.src = 'https://legalcryptotracker.disqus.com/embed.js';
      s.setAttribute('data-timestamp', +new Date());
      (d.head || d.body).appendChild(s);
      })();
    },

    methods: {
      onViewmodelUpdated: function (newVm) {
        this.vm = newVm;
        this.$forceUpdate();
      }
    },

    apollo: {
      post: gql`query {
        post(id:${id}){
          data{
            id
            attributes{
              Title
              Author
              Content
              Country
              createdAt
              locale
              localizations{
                data{
                  id
                  attributes{
                    Title
                    Content
                    Country
                    locale
                  }
                }
              }
              Image{
                data{
                  attributes{
                    formats
                  }
                }
              }
            }
          }
        }
      }`
    },
  }
</script>
