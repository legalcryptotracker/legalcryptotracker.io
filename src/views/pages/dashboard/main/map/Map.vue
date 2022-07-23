<template>
  <div ref="mapWrapper" class="ui-map-chart-wrapper"></div>
</template>

<script>
import { MapChartService } from './mapChart.service'
import { CountriesDataMapper } from './countriesDataMapper'
import { CountryTooltipContentService } from './tooltip/countryTooltipContent.service'
import { mapGetters, mapState } from 'vuex'
import { MODULE_NAMES } from '@/store'

export default {
  props: ['viewmodel'],

  data () {
    return {
      countriesMap: new Map(),
      countries: [],
    };
  },

  mounted () {
    this.viewmodel.observe(this.onViewmodelUpdated);
    this.countryTooltipContentService = new CountryTooltipContentService()
  },

  beforeDestroy () {
    this.mapChartService && this.mapChartService.destroy()
  },

  methods: {
    onViewmodelUpdated (vm) {
      this.countries = vm.getCountries();
      this.countriesMap = new CountriesDataMapper();
      this.countriesMap = this.countriesMap.map(this.countries);

      if (!!this.countries.length && !this.mapChartService) {
        this.mapChartService = new MapChartService(this.$refs.mapWrapper, {
          countriesDataMap: this.countriesMap,
          getTooltipTemplate: (country) => {
            return this.countryTooltipContentService.getTemplate(country, vm)
          }
        });
      }
    }
  }
}
</script>

<style lang="scss">
  .ui-map-chart-wrapper {
    width: 100%;
    height: 580px;
    max-height: 100vh;
  }

  .ui-map-chart_zoom-button {
    font-size: 14px;
    line-height: 100%;
    color: $site-primary-color;
    width: 16px;
    height: 16px;
    border-radius: 2px;
    border: 1px solid $site-primary-color;
    text-align: center;
  }
</style>
