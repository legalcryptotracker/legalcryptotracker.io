<template>
  <div class="ui-country-tooltip">
    <div class="ui-country-tooltip_header">
      <a :href="getCountryUrl()">
        {{country.name}} <span>{{activeLocale[country.regulationStateValue]}}</span>
      </a>
    </div>
  </div>
</template>

<script>
import { getCurrencyRoute } from '@/utils/getCurrencyRoute'

export default {
  data () {
    return {
      viewmodel: this.$root.viewmodel,
      activeLocale: this.$root.viewmodel.getActiveLocale(),
      country: this.$root.country,
    }
  },

  methods: {
    getCountryUrl: function () {
      if (!this.country) return '';
      return `/country/${this.country.slug}`;
    },
  }
}
</script>

<style lang="scss">
.ui-country-tooltip {
  width: 330px;

  .ui-country-tooltip_header {
    background-color: $site-secondary-color;
    color: $site-primary-color;
    padding: 12px;
    border-radius: 5px;

    a {
      font-size: 14px;
      display: flex;
      align-items: center;
      gap: 10px;
      text-decoration: none;
      cursor: pointer;

      span {
        display: flex;
        align-items: center;
        font-size: 10px;
        font-weight: 700;
        line-height: 14px;
        padding: 0 3px;
        border: 1px solid #c0c0c0;
        height: 15px;
        text-transform: uppercase;
      }
    }
  }
}
</style>
