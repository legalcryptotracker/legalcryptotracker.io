<template>
  <div class="ui-layout">
    <div class="ui-layout-header">
      <router-link class="logo" :to="'/'"><Logo /></router-link>

      <div class="ui-layout-header-controls" v-if="loggedInUser">
        <div class="ui-layout-header-user">
          <p><i>👤</i> {{loggedInUser.username}}</p>
          <a class="logout" @click="onLogoutClick">{{activeLocale.logout}}</a>
        </div>
        <div class="ui-layout-header-buttons">
          <router-link :to="{ path: '/country/add' }" class="border-button">{{activeLocale.createArticle}}</router-link>
          <LocalePicker :viewmodel="viewmodel" />
        </div>
      </div>

      <div class="ui-layout-header-controls" v-if="!loggedInUser">
        <div class="ui-layout-header-buttons">
          <a class="border-button" @click="onLoginClick">{{activeLocale.login}}</a>
          <LocalePicker :viewmodel="viewmodel" />
        </div>
      </div>
    </div>

    <div class="ui-layout-content">
      <div class="ui-layout-content-block">
        <slot />
      </div>
    </div>

    <footer class="ui-layout-footer">
      <p>Cryptotracker © 2022</p>
      <nav class="links">
        <a target="_blank" href="/legalcrytptracker-whitepaper.pdf">{{activeLocale.whitepaper}}</a>
        <router-link :to="'/about-us'">{{activeLocale.aboutUs}}</router-link>
      </nav>
      <nav>
        <a href="mailto:info@legalcryptotracker.io" target="_blank">info@legalcryptotracker.io</a>
        <a href="https://linkedin.com/company/legalcryptotracker" target="_blank">LinkedIn</a>
        <a href="https://twitter.com/lcryptotracker" target="_blank">Twitter</a>
        <a href="https://t.me/+dPVlrLM9xV5iM2Rh" target="_blank">Telegram</a>
      </nav>
    </footer>

    <LoginModal
      :viewmodel="viewmodel"
      :showModal="loginModalVisible"
      :close="onClose"
      :register="onRegisterClick" 
      :forgot-password="onForgotPasswordClick">
    </LoginModal>
    <RegisterModal
      :viewmodel="viewmodel"
      :showModal="registerModalVisible"
      :close="onClose"
      :login="onLoginClick">
    </RegisterModal>
    <ForgotPasswordModal
      :viewmodel="viewmodel"
      :showModal="forgotPasswordModalVisible"
      :close="onClose"
      :login="onLoginClick">
    </ForgotPasswordModal>
    <ResetPasswordModal
      :viewmodel="viewmodel"
      :showModal="resetPasswordModalVisible"
      :close="onClose">
    </ResetPasswordModal>
  </div>
</template>

<script>
import LocalePicker from './LocalePicker';
import Logo from './header/Logo';
import LoginModal from '@/components/modal/LoginModal';
import RegisterModal from '@/components/modal/RegisterModal';
import ForgotPasswordModal from '@/components/modal/ForgotPasswordModal';
import ResetPasswordModal from '@/components/modal/ResetPasswordModal';
import { SEO_META_OG, SEO_META_TWITTER } from '@/constants/seo'

export default {
  metaInfo () {
    return {
      meta: [
        ...SEO_META_TWITTER,
        ...SEO_META_OG,
      ]
    }
  },

  props: ['viewmodel'],

  data () {
    return {
      loginModalVisible: false,
      registerModalVisible: false,
      forgotPasswordModalVisible: false,
      resetPasswordModalVisible: false,
      activeLocale: {},
      loggedInUser: {},
    };
  },

  components: {
    Logo,
    LocalePicker,
    LoginModal,
    RegisterModal,
    ForgotPasswordModal,
    ResetPasswordModal,
  },

  mounted () {
    this.viewmodel.observe(this.onViewmodelUpdated);
  },

  methods: {
    onViewmodelUpdated: function (vm) {
      this.activeLocale = vm.getActiveLocale();
      this.loggedInUser = vm.getLoggedInUser();
      this.loginModalVisible = vm.isLoginModalOpen();
      this.registerModalVisible = vm.isRegisterModalOpen();
      this.forgotPasswordModalVisible = vm.isForgotPasswordModalOpen();
      this.resetPasswordModalVisible = vm.isResetPasswordModalOpen();
      this.$forceUpdate();
    },
    onClose: function () {
      this.viewmodel.closeModals();
    },
    onLoginClick: function () {
      this.viewmodel.openLoginModal();
    },
    onRegisterClick: function () {
      this.viewmodel.openRegisterModal();
    },
    onForgotPasswordClick: function () {
      this.viewmodel.openForgotPasswordModal();
    },
    onLogoutClick: function () {
      this.viewmodel.doLogout();
    },
  }
}
</script>

<style lang="scss">
  .ui-layout {
    background-color: #F3F6F9;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  .ui-layout-header,
  .ui-layout-footer,
  .ui-layout-content {
    padding: 0 29px 0 29px;
  }

  .ui-layout-content {
    padding-bottom: 16px;
    margin: -50px 0 20px;

    .ui-layout-content-block {
      background: #fff;
      border-radius: 10px;
    }
  }

  .ui-layout-header {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 20px;
    align-items: center;
    background: #531dbd;
    padding-top: 20px;
    padding-bottom: 70px;

    .ui-layout-header-controls {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 20px;

      .ui-layout-header-user,
      .ui-layout-header-buttons {
        display: flex;
        align-items: center;
        gap: 20px;

        & > p,
        & > a {
          margin: 0;
          font-size: 14px;
          line-height: 18px;
          color: #fff;
        }
        & > p {
          font-weight: bold;

          i {
            font-style: normal;
            margin: 0 5px 0 0;
          }
        }
        & > a {
          cursor: pointer;
        }
        & > a.border-button {
          height: 37px;
          border: 1px solid #fff;
          border-radius: 10px;
          padding: 0 20px;
          display: flex;
          align-items: center;
          font-weight: bold;
        }
      }
    }
  }

  .ui-layout-footer {
    padding: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: $site-primary-color;
    color: #FFFFFF;
    gap: 30px;

    p, a {
      font-size: 14px;
      margin: 0;
      color: #fff;
    }
    a, a:hover {
      color: #fff;
    }
    nav {
      display: flex;
      gap: 20px;
    }
    nav.links {
      font-weight: bold;
    }
  }


  @media (min-width: 750px) {
    .ui-layout {
      .ui-layout-header {
        .ui-layout-header-controls {
          flex-direction: row;
        }
      }
      .ui-layout-footer {
        padding: 0;
        flex-direction: row;
        height: 75px;
        gap: 50px;
      }
    }
  }
  @media (min-width: 820px) {
    .ui-layout {
      .ui-layout-header,
      .ui-layout-footer,
      .ui-layout-content {
        padding: 0 49px 0 49px;
      }
      .ui-layout-header {
        flex-direction: row;
        gap: 0;
        padding-top: 20px;
        padding-bottom: 70px;
      }
    }
  }
</style>
