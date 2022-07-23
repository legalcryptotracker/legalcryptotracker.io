<template>
  <Layout :viewmodel="viewmodel">
    <Country :viewmodel="viewmodel" :actions="actions">
      <!-- TODO: This should be markdown, not HTML -->
      <h1>{{country.name}}</h1>
      <p v-if="!latestVersion && country">{{activeLocale.countryNoVersions}}</p>
      <div v-if="latestVersion" v-html="latestVersion.content"></div>
      <div id="disqus_thread"></div>
    </Country>
  </Layout>
</template>

<script>
import Layout from '@/views/layout/Layout';
import Country from './Country';
import CountryDetailsViewmodel from '@/viewmodels/country_details.js';

export default {
  components: {
    Layout,
    Country,
  },

  metaInfo: function () {
    var title = this.country ? this.country.name : 'Country'
    return { title: `Cryptotracker | ${title}` }
  },

  data () {
    return {
      activeLocale: {},
      actions: [],
      country: null,
      latestVersion: null,
      viewmodel: null,
    };
  },

  created () {
    this.viewmodel = new CountryDetailsViewmodel();
  },

  mounted () {
    this.viewmodel.observe(this.onViewmodelUpdated);
    this.injectDisqus();
  },

  methods: {
    onViewmodelUpdated (vm) {
      this.country = vm.getCountry();
      this.latestVersion = vm.getLatestVersion();
      this.activeLocale = vm.getActiveLocale();
      this.actions = [];

      if (!!this.country) {
        var text = !this.latestVersion
          ? this.activeLocale.createArticle
          : this.activeLocale.countryAddVersionAction;
        this.actions.push({
          href: `/country/${this.country.slug}/add`,
          type: 'primary',
          text: text,
        });
      }

      this.$forceUpdate();
    },
    injectDisqus () {
      var d = document, s = d.createElement('script');
      s.src = 'https://legalcryptotracker.disqus.com/embed.js';
      s.setAttribute('data-timestamp', +new Date());
      (d.head || d.body).appendChild(s);
    }
  }
}
</script>

<style lang="scss">
  main.country {
    display: flex;
    gap: 50px;
    padding: 30px 50px;

    div.country-meta {
      max-width: 230px;
      min-width: 230px;
      display: flex;
      flex-direction: column;
      gap: 30px;

      div.country-actions,
      div.country-help {
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
      div.country-help {
        p {
          padding: 10px 15px;
          background: $init-alert-bg;
          color: $init-text-color;
          font-size: 14px;
          line-height: 20px;
          margin: 0;
        }
      }
      nav.country-versions {
        h1 {
          font-weight: 700;
          font-size: 18px;
          line-height: 22px;
          color: $site-primary-color;
          margin: 0 0 15px;
        }
        p.no-versions {
          font-size: 14px;
          line-height: 20px;
          color: $init-highlight-color;
        }
        ul {
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 15px;

          li {
            list-style: none;
            font-size: 14px;
            line-height: 22px;
            color: $init-text-color;
          }
          p {
            margin: 0;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          a {
            text-decoration: underline;
            cursor: pointer;
            color: $init-highlight-color;
          }
        }
      }
    }
  }
</style>
