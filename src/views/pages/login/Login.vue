<template>
  <b-container fluid>
    <b-col cols="12">
      <div class="form-login">
        <h1>WELCOME!</h1>
        <div>
          <h3>Email</h3>
          <input v-model="email" type="text">
        </div>
        <div>
          <h3>Password</h3>
          <input v-model="password" type="password">
        </div>
        <button class="btn-submit" v-on:click="onClick" >Login</button>
        <a class="btn-submit" href="/register" >Sign in</a>
        <div class="links">
          <a href="/forgot-password">Forgot Password?</a>
        </div>
      </div>
    </b-col>
  </b-container>
</template>

<script>
  export default{
    name: 'loginPage',
    data(){
      return {
        email: '',
        password: '',
        error: false,
        errorMsg: `An Error occurred, please try again`
      }
    },
    methods:{
      onClick(e){
        e.preventDefault()
        var body = JSON.stringify({
          identifier: this.email,
          password: this.password
        })
        var config = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: body
        }
        fetch(process.env.VUE_APP_STRAPI_URL + `/api/auth/local`,config)
        .then(function (response) {
          return response.json()
        })
        .then(function(data){
          localStorage.setItem("token" , data.jwt)
        })
      }
    }
  }
</script>

<style leng="scss">
    .form-login{
      background-color: #fff;
      padding: 30px;
      border-radius: 20px;
      margin: 0 auto;
      max-width: 600px;
      align-items: center;
      color: #531bdb;
    }
    .form-login h1{
        font-size: 24px;
        font-weight: bold;
        text-align: center;
        margin: 0 0 30px;    
      }
    .form-login h3{
      font-weight: bold;
      font-size: 14px;
      color: #000;
    }
    .form-login input{
      border: 1px solid #531bdb;
      border-radius: 3px;
      font-weight: regular;
      font-size: 14px;
      color: #000;
      width: 100%;
      height: 40px;
      margin:0 0 15px 0;
      padding: 0px 10px;
    }
    .form-login button,
    .form-login a.btn-submit {
      border: none;
      cursor: pointer;
      background: #531bdb;
      color: #fff;
      width: 100%;
      padding: 5px;
      border-radius: 3px;
      text-transform: uppercase;
      font-weight: bold;
      height: 40px;
      margin: 0 0 10px;
    }
    .form-login a.btn-submit {
      align-items: center;
      justify-content: center;
      display: flex;
      text-decoration: none;
    }
    .form-login a{
     font-size: 14px;
    }
  </style>
