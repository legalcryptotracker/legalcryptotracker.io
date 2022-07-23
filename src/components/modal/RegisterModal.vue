<template>
  <modal :show="showModal" @close="close">
    <template #whole>
      <form class="form-auth" @submit="onSubmit">
        <h1>{{activeLocale.register}}</h1>

        <section class="errors" v-if="errors.length">
          <h2>{{activeLocale.registerErrorsTitle}}</h2>
          <ul>
            <li v-for="error in errors" :key="error">
              {{activeLocale[localeErrorKey(error)]}}
            </li>
          </ul>
        </section>

        <p v-if="success">{{activeLocale.registerSuccess}}</div>

        <div class="fields">
          <div class="field">
            <label>{{activeLocale.nameLabel}}</label>
            <input type="text" v-model="name">
          </div>
          <div class="field">
            <label>{{activeLocale.email}}</label>
            <input type="email" v-model="email">
          </div>
          <div class="field">
            <label>{{activeLocale.password}}</label>
            <input type="password" v-model="password">
          </div>
        </div>

        <button type="submit">
          {{activeLocale.registerSubmit}}
        </button>

        <div class="access">
          <a @click="openLoginModal">{{activeLocale.login}}</a>
        </div>
      </form>
    </template>
  </modal>
</template>

<script>
import Modal from './Modal.vue'
import toCamelCase from '@/utils/toCamelCase';

export default {
  components: {
    Modal,
  },

  props: [
    'viewmodel',
    'showModal',
    'close',
    'login'
  ],

  data: function () {
    return {
      activeLocale: {},
      errors: [],
      name: '',
      email: '',
      password: '',
      error: false,
      success: false,
      isLoading: false
    }
  },

  mounted () {
    this.viewmodel.observe(this.onViewmodelUpdated);
  },

  methods:{
    onViewmodelUpdated (vm) {
      this.activeLocale = vm.getActiveLocale();
      this.errors = vm.getRegisterErrors();
    },

    openLoginModal(){
      this.close();
      this.login();
    },

    onSubmit (e) {
      e.preventDefault();
      this.viewmodel.doRegister({
        name: this.name,
        email: this.email,
        password: this.password,
      })
    },

    localeErrorKey: function (error) {
      return toCamelCase(error, 'register');
    }
  },
}
</script>
