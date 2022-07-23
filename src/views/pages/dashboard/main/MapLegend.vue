<template>
  <div class="ui-dashboard-map-legend">
    <app-status-checkbox
      ref="statuses"
      class="ui-dashboard-map-legend_item"
      v-for="(state) in regulationStates"
      :key="activeLocale[state.value]"
      :status-name="activeLocale[state.value]"
      :value="state.value"
      @changeValue="onStatusChanged({state, value: $event})">
    </app-status-checkbox>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapState } from 'vuex'
import { MODULE_NAMES } from '@/store'
import { DASHBOARD_MUTATION_TYPES } from '@/store/modules/dashboard/mutations'
import { CURRENCY_FIELD_NAMES } from '@/constants/currencies'
import { STATUS_FILTER_POSSIBLE_VALUES } from '@/utils/getCurrencyFiltersConfig'
import { STATUS_NAMES } from '@/constants/statuses'
import gql from 'graphql-tag'

export default {
  props: ['viewmodel'],

  mounted () {
    this.viewmodel.observe(this.onViewmodelUpdated);
  },

  data () {
    return {
      activeLocale: {},
      regulationStates: []
    };
  },

  computed: {
    ...mapState(MODULE_NAMES.DASHBOARD, {
      filters: (state) => {
        return state.filters
      }
    }),

    ...mapGetters(MODULE_NAMES.DASHBOARD, {
      countriesWithCurrencies: 'countriesWithCurrencies',
      currencyNames: 'currencyNames',
      technologiesWithCurrencies: 'technologiesWithCurrencies',
      technologyNameWithCurrencies: 'technologyNameWithCurrencies'
    }),

    statuses () {
      const statusNames = Object.keys(STATUS_NAMES).map((name) => {
        return STATUS_NAMES[name];
      });

      statusNames.sort();

      return statusNames.map(function (name) {
        return {
          name: name,
          value: false,
        };
      });

      // const statusNames = STATUS_FILTER_POSSIBLE_VALUES

      // const statusFilter = this.filters.find((filter) => {
      //   return (filter.name === CURRENCY_FIELD_NAMES.STATUS)
      // })

      // const v = statusNames.map((name) => {
      //   const hasFilter = !!statusFilter.value

      //   const value = hasFilter && !!statusFilter.value.find((selectedStatuesName) => {
      //     return (selectedStatuesName === name)
      //   })

      //   return {
      //     name,
      //     value
      //   }
      // })
      // console.log(v);
      // return v
    }
  },

  methods: {

    onViewmodelUpdated: function (vm) {
      this.activeLocale = vm.getActiveLocale();
      this.regulationStates = vm.getRegulationStates();
      this.$forceUpdate();
    },

    onStatusChanged ({ status, value }) {
      const statusFilter = this.filters.find((filter) => {
        return (filter.name === CURRENCY_FIELD_NAMES.STATUS)
      })

      const oldValue = statusFilter.value || []

      let newValue = null

      if (value) {
        newValue = [status.name, ...oldValue]
      } else {
        newValue = oldValue.filter((selectedStatusName) => {
          return (status.name !== selectedStatusName)
        })
      }

      newValue = newValue.length ? newValue : null

      this.changeStateFilters({
        filters: this.filters.map((filter) => {
          const value = (filter.name === CURRENCY_FIELD_NAMES.STATUS) ? newValue : filter.value

          return {
            ...filter,
            value
          }
        })
      })
    },
  }
}
</script>

<style lang="scss">
.ui-dashboard-map-legend {
  display: flex;
  padding: 8px 12px;
  border-radius: 6px;
  border: $card-line-border;
}

.ui-dashboard-map-legend_item {
  margin-right: 24px;
}
</style>
