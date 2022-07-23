<template>
  <b-container fluid>
    <b-col class="m-b-16 parent" cols="12" xxl="10">
      <div class="form-container">
        <form>
          <h1 class="title">Sign Up To Cryptotracker</h1>
          <p v-show="error">{{ errorMsg }}</p>
          <div class="top-row">
            <div class="my-4">
              <h1>Name</h1>
              <input type="text" v-model="name">
            </div>
            <div class="my-4">
              <h1>Email</h1>
              <input type="email" v-model="email">
            </div>
          </div>
          <div class="bottom-row">
            <div class="my-5">
              <h1>Password</h1>
              <input type="password" v-model="password">
            </div>
            <button v-on:click="onClick" type="submit" :disabled="name.length < 6 || password.length < 6">
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </b-col>
  </b-container fluid>
</template>

<script>
  export default {
    name: 'Register',
    data() {
      return {
        name: '',
        email: '',
        password: '',
        error: false,
        errorMsg: `An Error occurred, please try again`
      }
    },
    methods: {
      onClick(e) {
        e.preventDefault()
        var body = JSON.stringify({
          password: this.password,
          email: this.email,
          username: this.name
        })
        var config = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: body
        }
        fetch(process.env.VUE_APP_STRAPI_URL + `/api/auth/local/register`, config)
          .then(function () {
            this.$router.push('login')
          })
          .catch(function(){
            return Promise.reject();
          })
      }
    }
  }
</script>
<style lang="scss">
  .parent {
    margin: 0 auto 0;
  }
  .parent h1.title {
    font-size: 30px;
    font-weight: bold;
    text-align: center;
    margin: 0 0 30px;
    color: #531bdb;
    text-transform: uppercase;
  }
  .form-container form {
    background-color: #fff;
    padding: 30px 30px 70px;
    border-radius: 20px;
    margin: 0 auto;
    max-width: 600px;
    align-items: center;
    color: #531bdb;
  }
  .form-container .top-row {
    display: flex;
    justify-content: space-between;
    margin: 0 0 15px;
  }
  .form-container .bottom-row h1,
  .form-container .top-row h1 {
    font-weight: semi-bold;
    font-size: 14px;
    color: #000;
  }
  .form-container .my-4,
  .form-container .my-5, {
    margin: 0 !important;
    flex-basis: 50%;
  }
  .form-container .my-4:first-child {
    margin: 0 15px 0 0!important;
  }
  .form-container .top-row input, 
  .form-container .bottom-row input {
    border: 1px solid #531bdb;
    border-radius: 3px;
    font-weight: regular;
    font-size: 14px;
    color: #000;
    width: 100%;
    padding: 0 10px;
    height: 40px;
  }
  .form-container .bottom-row button {
    border: none;
    background: #531bdb;
    color: #fff;
    width: 100%;
    padding: 5px;
    border-radius: 3px;
    text-transform: uppercase;
    font-weight: bold;
    height: 40px;
    margin: 30px 0 0;
  }
</style>
