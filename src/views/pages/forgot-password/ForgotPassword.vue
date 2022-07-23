<template>
  <b-container fluid>
      <b-col class="m-b-16 parent" cols="12" xxl="10">
        <div class="forgot-password-container">
          <form>
            <h1 class="title">Forgot password</h1>
            <input
              v-model="email"
              placeholder="Enter your email"
              type="text"
              class="forgot-password-input">
            </input>
            <button class="btn-submit" v-on:click="onClick">Send</button>
          </form>
        </div>
      </b-col>
  </b-container fluid>
</template>


<style lang="scss">
  .parent {
    margin: 0 auto !important;
  }
  .forgot-password-container {
    form {
      display: flex;
      flex-flow: column;
    }
  }
  .forgot-password-container form {
    background-color: #fff;
    padding: 30px 30px 70px;
    border-radius: 20px;
    margin: 0 auto;
    max-width: 600px;
    align-items: center;
    color: #531bdb;
  }

  .forgot-password-container form h1.title {
    font-weight: bold;
    font-size: 24px;
    color: #531bdb;
    text-transform: uppercase;
    text-align: center;
    margin: 0 0 30px;
  }

  .forgot-password-container form input {
    border: 1px solid #531bdb;
    border-radius: 3px;
    font-size: 14px;
    color: #000;
    width: 100%;
    height: 40px;
    padding: 10px;
  }
  .forgot-password-container button.btn-submit {
    border: none;
    background: #531bdb;
    color: #fff;
    padding: 5px;
    border-radius: 3px;
    text-transform: uppercase;
    font-weight: bold;
    height: 40px;
    margin: 15px 0 0;
    width: 100%;
  }
</style>

<script>

export default {
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    onClick(e) {
      e.preventDefault();
      var self = this;
      var config = {
        method: 'POST',
        headers: { 'Content-Type': "application/json" },
        body: JSON.stringify({ email: this.email })
      };
      fetch(process.env.VUE_APP_STRAPI_URL + '/api/auth/forgot-password', config)
        .then(function (response) {
          if (response.status != 200)
            return alert('There was an error. Contact your administrator');

          self.email = '';
          return alert('Password reset sent. Check your email');
        })
    },
  }
}
</script>
