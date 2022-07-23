<template>
  <section class="dashboard-main-block">
    <div class="dashboard-main-block-header">
      <h1>{{activeLocale.mapTitle}}</h1>
      <div class="dashboard-main-block-header-actions">
        <div class="field">
          <select @change="onCountryChanged">
            <option value="">{{activeLocale.countrySelectCountry}}</option>
            <option
              v-for="country in countries"
              :value="country.slug"
              :key="country.id">
                {{country.name}} {{getRegulationStateTag(country)}}
            </option>
          </select>
        </div>
        <!--<MapLegend :viewmodel="viewmodel" />-->
      </div>
    </div>
    <div class="dashboard-main-block-map">
      <Map :viewmodel="viewmodel"></Map>
    </div>
  </section>
</template>

<script>
import Header from './Header'
import Map from './map/Map'
import MapLegend from '@/views/pages/dashboard/main/MapLegend'

export default {
  components: {
    Map,
    MapLegend,
  },

  props: ['viewmodel'],

  data () {
    return {
      countries: [],
      activeLocale: {}
    };
  },

  mounted () {
    this.viewmodel.observe(this.onViewmodelUpdated);
  },

  methods: {
    onViewmodelUpdated (vm) {
      this.activeLocale = vm.getActiveLocale();
      this.countries = vm.getAllCountries();
      this.$forceUpdate();
    },

    getCountryUrl: function (country) {
      return `/country/${country.slug}`;
    },

    getRegulationStateTag: function (country) {
      if (!country.regulation_state.data) return;
      if (!this.activeLocale) return;
      var stateValue = country.regulation_state.data.attributes.value;
      var stateLocalized = this.activeLocale[stateValue];
      return `(${stateLocalized})`;
    },

    onCountryChanged: function (e) {
      this.viewmodel.goToCountry(e.target.value);
    },
  }
}
</script>

<style lang="scss">
  .dashboard-main-block-header {
    padding: 20px 30px;
    border-bottom: 1px solid #f0f0f0;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    align-items: center;
    gap: 20px;

    h1 {
      font-weight: bold;
      font-size: 18px;
      color: $site-primary-color;
      margin: 0;
      line-height: 20px;
    }

    .dashboard-main-block-header-actions {
      select {
        max-width: 100%;
      }
    }
  }

  .dashboard-main-block-map {
    padding: 30px;
  }

  @media (min-width: 750px) {
    .dashboard-main-block-header {
      flex-direction: row;
    }
  }
</style>
