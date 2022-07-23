<template>
  <Layout :viewmodel="viewmodel">
    <div id="page">
      <div id="page-content" v-if="page" v-html="page.html"></div>
    </div>
  </Layout>
</template>

<script>
import Layout from '@/views/layout/Layout';
import PageViewmodel from '@/viewmodels/page';

export default {
  components: {
    Layout,
  },

  data () {
    return {
      page: null,
      viewmodel: {}
    };
  },

  created () {
    this.viewmodel = new PageViewmodel();
  },

  mounted () {
    this.viewmodel.observe(this.onViewmodelUpdated);
  },

  methods: {
    onViewmodelUpdated (vm) {
      this.page = vm.getPage();
      this.$forceUpdate();
    }
  }
}
</script>

<style lang="scss">
  div#page {
    padding: 30px 50px;

    div#page-content {
      flex-basis: 100%;
      width: 100%;

      h1, h2, p {
        margin: 0 0 20px;
      }
      h2, p {
        font-size: 16px;
        line-height: 22px;
      }
      h1 {
        font-weight: 700;
        font-size: 22px;
        line-height: 26px;
        color: $site-primary-color;
      }
      h2 {
        font-weight: 700;
      }
      p {
        color: $init-text-color;
      }

      article.profile {
        padding: 20px 0;

        div {
          img {
            float: left;
            margin: 0 30px 30px 0;
          }
          h1 {
            min-width: 100%;
          }
        }
      }
    }
  }
</style>
