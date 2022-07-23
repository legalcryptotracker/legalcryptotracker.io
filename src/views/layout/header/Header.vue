<template>
</template>

<script>
import Logo from './Logo'
import LoginModal from '@/components/modal/LoginModal.vue'
import RegisterModal from '@/components/modal/RegisterModal.vue'
import ForgotPasswordModal from '@/components/modal/ForgotPasswordModal.vue'
import { screenSizeMixin } from '@/mixins/screenSize.mixin'

export default {
  mixins: [screenSizeMixin],

  components: {
    Logo,
    LoginModal,
    ForgotPasswordModal,
    RegisterModal
  },

  data () {
    return {
      locale: localStorage.getItem('locale') || 'es',
      isNavbarExpanded: false,
      loginModalVisible: false,
      registerModalVisible: false,
      forgotPasswordModalVisible: false,
    }
  },

  props: ['viewmodel'],

  mounted: function() {
    localStorage.setItem('locale', this.locale.match(/\w\w/g)[0].toLowerCase())
  },

  methods: {
  }
}
</script>

<style lang="scss">
  div.ui-layout-header {
    display: flex;
  }
</style>
