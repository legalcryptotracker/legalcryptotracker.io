<template>
  <Layout :viewmodel="viewmodel">
    <MainBlock :viewmodel="viewmodel"></MainBlock>
  </Layout>
</template>

<script>
import DashboardViewmodel from '@/viewmodels/dashboard.js';
import Layout from '@/views/layout/Layout.vue'
import MainBlock from './main/Block.vue'
import FiltersCard from './filters/Card'
import NewsBlock from './news/Block'
import AboutBlock from './about/Block'
import ContributingOrganizations from './contributingOrganizations/Block'
import { SEO_DASHBOARD } from '@/constants/seo'

export default {
  components: {
    Layout,
    MainBlock,
    FiltersCard,
    NewsBlock,
    AboutBlock,
    ContributingOrganizations
  },

  metaInfo: {
    title: SEO_DASHBOARD.TITLE,
    meta: [
      {
        name: 'description',
        content: SEO_DASHBOARD.DESCRIPTION
      },
      {
        name: 'keywords',
        content: SEO_DASHBOARD.KEYWORDS
      }
    ]
  },

  data () {
    return { viewmodel: null };
  },

  created () {
    this.viewmodel = new DashboardViewmodel();
  },
}
</script>
