<template>
  <modal :show="showModal" @close="close">
    <template #whole>
      <form class="form-login form-auth" @submit="onSubmit">
        <div v-if="isLoading" class="d-flex justify-content-center align-items-top is-loading" >
          <app-spinner :hint="loaderHint"></app-spinner>
        </div>

        <h1>{{activeLocale.loginToCryptotracker}}</h1>

        <section v-if="error" class="errors">
          <p>{{activeLocale.loginError}}</p>
        </section>

        <div class="fields">
          <div class="field">
            <label>{{activeLocale.email}}</label>
            <input v-model="email" type="text">
          </div>
          <div class="field">
            <label>{{activeLocale.password}}</label>
            <input v-model="password" type="password">
          </div>
        </div>

        <button class="btn-submit">{{activeLocale.loginSubmit}}</button>

        <div class="access">
          <a @click="forgotPassword">{{activeLocale.forgotPassword}}</a>
          <a @click="register">{{activeLocale.registerToCryptotracker}}</a>
        </div>
      </form>
    </template>
  </modal>
</template>

<script>
import Modal from './Modal.vue'

export default {
  components: {
    Modal
  },

  props: [
    'viewmodel',
    'showModal',
    'close',
    'register',
    'forgotPassword',
  ],

  data: function () {
    return {
      activeLocale: {},
      email: '',
      password: '',
      error: false,
      isLoading: false
    }
  },

  mounted () {
    this.viewmodel.observe(this.onViewmodelUpdate);
  },

  methods:{
    onViewmodelUpdate (vm) {
      this.activeLocale = vm.getActiveLocale();
      this.error = vm.didLoginError();
    },

    onSubmit (e) {
      e.preventDefault();
      this.viewmodel.doLogin({
        email: this.email,
        password: this.password,
      });
    }
  },
}
</script>
