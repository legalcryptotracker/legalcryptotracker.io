<template>
  <modal :show="showModal" @close="close">
    <template #whole>
      <form class="form-reset-password form-auth" @submit="onSubmit">
        <h1 class="title">{{activeLocale.resetPassword}}</h1>

        <section v-if="error" class="errors">
          <p>{{activeLocale.resetPasswordError}}</p>
        </section>

        <div class="fields">
          <div class="field">
            <label>{{activeLocale.password}}</label>
            <input v-model="password" type="password" />
          </div>
          <div class="field">
            <label>{{activeLocale.passwordConfirmation}}</label>
            <input v-model="passwordConfirmation" type="password" />
          </div>
        </div>

        <button class="btn-submit">{{activeLocale.resetPasswordSubmit}}</button>
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
    'login',
  ],

  data: function () {
    return {
      activeLocale: {},
      password: '',
      passwordConfirmation: '',
      error: 'fede',
      isLoading: false
    }
  },

  mounted () {
    this.viewmodel.observe(this.onViewmodelUpdated);
  },

  methods: {
    onViewmodelUpdated (vm) {
      this.activeLocale = vm.getActiveLocale();
      this.error = vm.didResetPasswordError();
      this.$forceUpdate();
    },

    onSubmit (e) {
      e.preventDefault();
      this.viewmodel.doResetPassword({
        password: this.password,
        passwordConfirmation: this.passwordConfirmation,
      });
    },
  },
}
</script>

<style leng="scss">
</style>
