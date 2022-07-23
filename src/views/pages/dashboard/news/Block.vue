<template>
  <div>
    <app-card v-if="!isMobileScreen">
      <template #header>
        <NewsHeader></NewsHeader>
      </template>

      <div class="ui-dashboard-news_content">
        <div v-if="isLoading" class="d-flex justify-content-center align-items-top m-t-32">
          <app-spinner :hint="loaderHint"></app-spinner>
        </div>

        <b-row v-else>
          <b-col cols="6"
                 xxl="3"
                 class="ui-news-item-wrapper"
                 v-for="(post, index) in posts.data" v-bind:key="index">
            <CtCard v-bind:post="post"></CtCard>
          </b-col>
        </b-row>
      </div>
    </app-card>

    <div v-else>
      <NewsHeader class="m-b-16"></NewsHeader>
      <app-card v-if="isLoading" class="m-b-16">
        <app-spinner :hint="loaderHint"></app-spinner>
      </app-card>

      <div class="m-b-16" v-else>
        <app-card :class="'m-b-16'" v-for="(post, index) in posts.data" v-bind:key="index">
          <CtCard v-bind:post="post"></CtCard>
        </app-card>
      </div>

      <app-link href="/news" :isBlock="true">
        <app-button :type="BUTTON_TYPES.PRIMARY" :isBlock="true">
          Go to all news <app-icon class="m-l-8" :name="ICON_NAMES.ARROW_RIGHT_SQUARE"></app-icon>
        </app-button>
      </app-link>
    </div>
  </div>
</template>

<script>
import NewsHeader from './Header'
import NewsItem from '@/components/news/NewsItem'
import gql from 'graphql-tag'
import { NEWS_ITEM_ADAPTIVE_TYPE } from '@/components/news/constants'
import { mapActions, mapGetters, mapState } from 'vuex'
import { MODULE_NAMES } from '@/store'
import { DASHBOARD_ACTION_TYPES } from '@/store/modules/dashboard/actions'
import { screenSizeMixin } from '@/mixins/screenSize.mixin'
import { BUTTON_TYPES } from '@/components/buttons/constants'
import CtCard from '@/components/cards/CtCard.vue'

export default {
  mixins: [screenSizeMixin],
  components: {
    NewsItem,
    NewsHeader,
    CtCard
},
  data () {
    return {
      loaderHint: 'Please wait while news will be loaded',
      NEWS_ITEM_ADAPTIVE_TYPE,
      BUTTON_TYPES
    }
  },
  async created () {
    await this.fetchNews()
  },
  computed: {
    ...mapGetters(MODULE_NAMES.DASHBOARD, {
      newsList: 'newsList'
    }),
    ...mapState(MODULE_NAMES.DASHBOARD, {
      isLoading: (state) => {
        return state.news.isLoading
      }
    })
  },
  methods: {
    ...mapActions(MODULE_NAMES.DASHBOARD, {
      fetchNews: DASHBOARD_ACTION_TYPES.FETCH_NEWS_CURRENT_PAGE
    })
  },
  apollo: {
    posts: gql`query{
      posts{
        data {
          id
          attributes {
            Title
            Author
            Content
            createdAt
            Country
            Image{
              data{
                attributes{
                  formats
                }
              }
            }
          }
        }
      }
    }`
  }
}


</script>

<style lang="scss">
  .ui-dashboard-news_content {
    min-height: 435px;
  }

  .ui-news-item-wrapper {
    margin: 0 0 30px;
    flex: 0 0 50% !important;
    max-width: 50% !important;
  }

  @media (min-width: $min-tablet-width) and (max-width: $max-tablet-width) {
    .ui-dashboard-news_content {
      min-height: 870px;
    }
  }
</style>
