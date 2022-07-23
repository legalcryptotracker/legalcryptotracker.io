<template>
  <b-container fluid>
      <b-col class="m-b-16 parent" cols="12" xxl="10">
        <div class="post-container">
          <div class="main">
            <input class="title" v-model="editorData"></input>
            <ckeditor :editor="editor" v-model="editorData" :config="editorConfig"></ckeditor>
          </div>
          <div class="versioning"> 
            <b-button class="btn-primary edit-btn" @click="clog"> save article </b-button>
            <b-button class="btn-primary edit-btn"> quit article </b-button>
            <h1 class="title historial"> Historial de cambios </h1>
            <p class="changes"> No han habido cambios a este artículo desde su creación. Haz click en “Editar artículo” para agregar una nueva versión.</p>
            <p class="version"> {{ post.data.attributes.createdAt.slice(0, 10) }} - Version #{{ post.data.attributes.versionNumber }} </p>
            <p class="author">Creada por <a class="user">{{ post.data.attributes.author }}</a> </p>
          </div>
        </div>
      </b-col>
  </b-container fluid>
</template>

<script>
    import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
    import gql from 'graphql-tag';
    var id = new URLSearchParams(window.location.search).get('id');
    export default {
        name: 'editor',
        data() {
            return {
                editor: ClassicEditor,
                editorConfig: {
                // The configuration of the editor.
                },
                editorData: '',
                editorTitle: '',
            };
        },
        apollo: {
          post: gql `query {
            post(id:"${id}"){
              data{
                id
                attributes{
                  title
                  content
                  author
                  versionNumber
                  createdAt
                  languages
                  }
                }
              }
            }`
        },
        mounted() {
          editorData = post.data.attributes.content;
        },
        methods:{
          clog(){
            console.log(this);
          }
        }
    }
</script>

<style lang="scss">
  .parent {
    margin: 0 auto !important;
  }
  .post-container {
    background: #fff;
    padding: 30px;
    border-radius: 20px;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .main{
    display: flex;
    flex-direction: column;
    max-width: 1000px;
  }
  .versioning{
    display: flex;
    flex-direction: column;
    width: 230px;
    margin: 0 0 0 20px;
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
  .edit-btn:first-child{
    margin: 0 0 10px;

  }
  .title{
    font-weight: 700;
    font-size: 22px;
    line-height: 29px;
    color: #531DBD;
    font-family: 'IBM Plex Sans';
    margin: 0 0 10px;
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
