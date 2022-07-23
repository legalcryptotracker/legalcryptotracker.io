<template>
  <b-container fluid>
      <b-col class="m-b-16 parent" cols="12" xxl="10">
        <div class="reset-password-container">
          <form v-if="!showButton">
            <h1 class="title">Reset your password</h1>
            <input
              v-model="password"
              placeholder="Enter your password"
              type="password"
              class="reset-password-input">
            </input>
            <input
              v-model="confirmation"
              placeholder="Confirm your password"
              type="password"
              class="reset-password-input">
            </input>
            <button class="btn-submit" v-on:click="onClick">Send</button>
          </form>
          <button class="btn-login" v-if="showButton" v-on:click="onGoToLogin">Go to Login</button>
        </div>
      </b-col>
  </b-container fluid>
</template>

<style lang="scss">
  .parent {
    margin: 0 auto !important;
  }
  .reset-password-container {
    background: #fff;
    padding: 30px;
    border-radius: 20px;
    margin: 0 auto;
    display: flex;
    flex-flow: column;
  }

  .reset-password-container form {
    display: flex;
    flex-flow: column;
    gap: 10px;
    max-width: 600px;
    margin: 0 auto;
  }

  .reset-password-container form h1.title {
    font-weight: bold;
    font-size: 24px;
    color: #531bdb;
    text-transform: uppercase;
    text-align: center;
  }

  .reset-password-container form input {
    border: 1px solid #531bdb;
    border-radius: 3px;
    font-size: 14px;
    color: #000;
    width: 100%;
    height: 40px;
    padding: 10px;
  }

  .reset-password-container button.btn-login,
  .reset-password-container button.btn-submit {
    border: none;
    background: #531bdb;
    color: #fff;
    padding: 5px;
    border-radius: 3px;
    text-transform: uppercase;
    font-weight: bold;
    height: 40px;
  }
</style>

<script>

export default {
  data () {
    return {
      password: '',
      confirmation: '',
      showButton: false
    }
  },
  methods: {
    onClick(e) {
      e.preventDefault();
      var self = this;
      var code = location.href.split('code=')[1];
      var config = {
        method: 'POST',
        headers: { 'Content-Type': "application/json" },
        body: JSON.stringify({
          password: this.password,
          passwordConfirmation: this.confirmation,
          code: code
        })
      };
      fetch(process.env.VUE_APP_STRAPI_URL + `/api/auth/reset-password`, config)
        .then(function (response) {
          if (response.status != 200)
            return alert('There was an error. Contact your administrator');

          self.email = '';
          self.showButton = true;
          return alert('Password changed successfully.');
        })
    },
    onGoToLogin() {
      location.replace('/');
    }
  }
}
</script>
