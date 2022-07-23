<template>
  <nav class="locale-picker">
    <p @click="toggle">{{activeLocale.flag}} {{activeLocale.name}}</p>
    <ul v-if="opened">
      <li v-for="(locale, index) in locales">
        <a @click="setLocale(locale.id)">{{locale.flag}} {{locale.name}}</a>
      </li>
    </ul>
  </nav>
</template>

<script>
  export default {
    props: ['viewmodel'],

    data () {
      return {
        activeLocale: {},
        locales: [],
        opened: false
      };
    },

    mounted () {
      this.viewmodel.observe(this.onViewmodelUpdated);
    },

    methods: {
      onViewmodelUpdated (vm) {
        this.activeLocale = vm.getActiveLocale();
        this.locales = vm.getLocales();
        this.$forceUpdate();
      },
      open: function () {
        this.opened = true;
      },
      close: function () {
        this.opened = false;
      },
      toggle: function () {
        this.opened = !this.opened;
      },
      setLocale: function (localeId) {
        this.viewmodel.setActiveLocale(localeId);
        this.close();
      },
    }
  }
</script>

<style lang="scss">
  nav.locale-picker {
    position: relative;
    height: 37px;
    margin-left: -10px;
    cursor: pointer;

    p, a {
      height: 100%;
      padding: 0 20px;
      color: #000;
      display: flex;
      align-items: center;
      font-weight: normal;
      white-space: nowrap;
    }
    p {
      border-radius: 10px;
      background: #fff;
    }
    ul {
      position: absolute;
      z-index: 2;
      right: 0;
      top: 40px;
      background: #fff;
      border-radius: 10px;
      padding: 10px 0;
      list-style: none;
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
      flex-direction: column;
      gap: 10px;
      display: flex;
    }
    li {
      margin: 0;
      padding: 0;
      line-height: 20px;
    }
  }
</style>
