<template>
  <div>
    <div v-if="isMobileScreen" class="m-b-16">
      <app-title level="2">Cryptotracker </app-title>
      Current status of Cryptotracker worldwide
    </div>

    <app-card class="ui-about">
      <template v-if="!isMobileScreen" #header>
        <app-title level="2">Cryptotracker </app-title>
        Current status of Cryptotracker worldwide
      </template>

      <b-row>
        <b-col cols="12" xxl="6">
          <div class="m-b-12">
            <strong>Description</strong>
          </div>

          <strong>Cancelled</strong> Countries that cancelled or decommissioned a Cryptotracker.<br>
          <strong>Research</strong> Countries that have conducted first explanatory Cryptotracker research.<br>
          <strong>Proof of Concept</strong> Countries that are in an advanced research stage and have published a Cryptotracker
          proof of concept.<br>
          <strong>Pilot</strong> Countries that have developed a Cryptotracker that is tested in a real environment either with a
          limited number of parties or on a wide scale.<br>
          <strong>Launched</strong> Countries that officially fully launched a Cryptotracker.
        </b-col>

        <b-col cols="12" xxl="6">
          <div class="m-b-12" :class="{'m-t-16': isMobileScreen}">
            <strong>Publications</strong>
          </div>

          <b-row class="m-b-16">
            <b-col class="m-b-16" cols="12" md="8">
              <div class="m-b-8">
                <app-external-link href="https://www.bcg.com/en-nl/publications/2020/get-ready-for-the-future-of-money"
                                   text="Get Ready for the Future of Money"></app-external-link>
              </div>
            </b-col>

            <b-col class="m-b-16" cols="12" md="4">
              <div class="m-b-12">
                <strong>Source</strong>
              </div>

              <app-social-network-link :socialNetwork="SOCIAL_NETWORKS_NAMES.GITHUB"
                                       href=""
                                       text="Github"></app-social-network-link>
            </b-col>
          </b-row>

          <b-row>
            <b-col class="m-b-16" cols="12" md="8">
              <div>
                <strong>Key contributors</strong>
              </div>

              <div class="m-t-4">
                <template v-if="!isMobileScreen">
                  <div class="d-flex justify-content-left">
                    <div class="ui-about_contributors-group">
                      <app-social-network-link
                        class="ui-about_social-network-link"
                        :socialNetwork="SOCIAL_NETWORKS_NAMES.LINKEDIN"
                        href=""
                        text="Lorem Ipsum">
                      </app-social-network-link>
                      <br>
                      <app-social-network-link
                        class="ui-about_social-network-link"
                        :socialNetwork="SOCIAL_NETWORKS_NAMES.LINKEDIN"
                        href=""
                        text="Lorem Ipsum">
                      </app-social-network-link>
                      <br>
                      <app-social-network-link
                        class="ui-about_social-network-link"
                        :socialNetwork="SOCIAL_NETWORKS_NAMES.LINKEDIN"
                        href=""
                        text="Lorem Ipsum">
                      </app-social-network-link>
                    </div>

                    <div class="ui-about_contributors-group">
                      <app-social-network-link
                        class="ui-about_social-network-link"
                        :socialNetwork="SOCIAL_NETWORKS_NAMES.LINKEDIN"
                        href=""
                        text="Lorem Ipsum">
                      </app-social-network-link>
                      <br>
                      <app-social-network-link
                        class="ui-about_social-network-link"
                        :socialNetwork="SOCIAL_NETWORKS_NAMES.LINKEDIN"
                        href=""
                        text="Lorem Ipsum">
                      </app-social-network-link>
                    </div>

                    <div class="ui-about_contributors-group">
                      <app-social-network-link
                        class="ui-about_social-network-link"
                        :socialNetwork="SOCIAL_NETWORKS_NAMES.LINKEDIN"
                        href=""
                        text="Lorem Ipsum">
                      </app-social-network-link>
                      <br>
                      <app-social-network-link
                        class="ui-about_social-network-link"
                        :socialNetwork="SOCIAL_NETWORKS_NAMES.LINKEDIN"
                        href=""
                        text="Lorem Ipsum">
                      </app-social-network-link>
                    </div>
                  </div>
                </template>

                <template v-else>
                  <div class="ui-about_contributors-group">
                    <app-social-network-link
                      class="ui-about_social-network-link"
                      :socialNetwork="SOCIAL_NETWORKS_NAMES.LINKEDIN"
                      href=""
                      text="Lorem Ipsum"></app-social-network-link>
                    <br>
                    <app-social-network-link 
                      class="ui-about_social-network-link"
                      :socialNetwork="SOCIAL_NETWORKS_NAMES.LINKEDIN"
                      href=""
                      text="Lorem Ipsum"></app-social-network-link>
                    <br>
                    <app-social-network-link
                      class="ui-about_social-network-link"
                      :socialNetwork="SOCIAL_NETWORKS_NAMES.LINKEDIN"
                      href=""
                      text="Lorem Ipsum"></app-social-network-link>
                  </div>

                  <div class="ui-about_contributors-group">
                    <app-social-network-link
                      class="ui-about_social-network-link"
                      :socialNetwork="SOCIAL_NETWORKS_NAMES.LINKEDIN"
                      href=""
                      text="Lorem Ipsum"></app-social-network-link>
                    <br>
                    <app-social-network-link
                      class="ui-about_social-network-link"
                      :socialNetwork="SOCIAL_NETWORKS_NAMES.LINKEDIN"
                      href=""
                      text="Lorem Ipsum"></app-social-network-link>
                    <br>
                    <app-social-network-link
                      class="ui-about_social-network-link"
                      :socialNetwork="SOCIAL_NETWORKS_NAMES.LINKEDIN"
                      href=""
                      text="Lorem Ipsum"></app-social-network-link>
                  </div>
                </template>
              </div>
            </b-col>

            <b-col class="m-b-16" cols="12" md="4">
              <div class="m-b-12">
                <strong>Contacts</strong>
              </div>

              <app-email-link :email="''"></app-email-link>
              <app-social-network-link
                class="ui-about_social-network-link"
                :socialNetwork="SOCIAL_NETWORKS_NAMES.TELEGRAM"
                href=""
                text="Telegram chat"></app-social-network-link>
            </b-col>
          </b-row>

          MIT License, free for reproduction and distribution
        </b-col>
      </b-row>
    </app-card>
  </div>
</template>

<script>
import { SOCIAL_NETWORKS_NAMES } from '@/constants/socialNetworks'
import { screenSizeMixin } from '@/mixins/screenSize.mixin'

export default {
  mixins: [screenSizeMixin],
  data () {
    return {
      SOCIAL_NETWORKS_NAMES
    }
  }
}
</script>

<style lang="scss">
  .ui-about {
    strong {
      font-weight: bold;
    }
  }

  .ui-about_social-network-link {
    margin-top: 8px;
    display: inline-block;
  }

  .ui-about_contributors-group {
    display: inline-block;

    &:not(:last-of-type) {
      margin-right: 24px;
    }
  }
</style>
