<template>
  <modal :show="showModal" @close="close">
    <template #whole>
      <form class="form-forgot-password form-auth" @submit="onSubmit">
        <h1 class="title">{{activeLocale.forgotPassword}}</h1>

        <div v-if="error"><h3 class="error">{{activeLocale.forgotPasswordSuccess}}</h3></div>

        <div class="fields">
          <div class="field">
            <label>{{activeLocale.email}}</label>
            <input v-model="email" type="email" />
          </div>
        </div>

        <button class="btn-submit">{{activeLocale.forgotPasswordSubmit}}</button>

        <div class="access">
          <a @click="openLoginModal">{{activeLocale.login}}</a>
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
    'login',
  ],

  data: function () {
    return {
      activeLocale: {},
      email: '',
      password: '',
      error: false,
      errorMsg: `An Error occurred, please try again`,
      isLoading: false
    }
  },

  mounted () {
    this.viewmodel.observe(this.onViewmodelUpdated);
  },

  methods: {
    onViewmodelUpdated (vm) {
      this.activeLocale = vm.getActiveLocale();
    },

    openLoginModal () {
      this.login();
    },

    onSubmit (e) {
      e.preventDefault();
      this.viewmodel.doRecoverPassword({ email: this.email });
    },
  },
}
</script>

<style leng="scss">
</style>
