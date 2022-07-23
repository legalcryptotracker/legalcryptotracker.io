<template>
  <main class="country">
    <div class="country-content">
      <slot />
    </div>
    <div class="country-meta">
      <div class="country-actions" v-if="actions && actions.length">
        <router-link
          v-for="(action, index) in actions"
          v-if="action.href"
          :class="action.type"
          :to="action.href"
          :key="index">
            {{action.text}}
        </router-link>
        <a
          v-for="(action, index) in actions"
          v-if="action.click"
          @click="action.click"
          :class="action.type"
          :key="index">
            {{action.text}}
        </a>
      </div>
      <div class="country-help" v-if="helps && helps.length">
        <p
          v-if="helps"
          v-for="(help, index) in helps"
          :key="index">
            {{help}}
        </p>
      </div>
      <nav class="country-versions">
        <h1>{{activeLocale.countryHistoryTitle}}</h1>
        <p v-if="!country || !country.versions.length" class="no-versions">
          {{activeLocale.countryNoVersions}}
        </p>
        <p v-if="country && country.versions.length == 1" class="no-versions">
          {{activeLocale.countryOneVersion}}
        </p>
        <ul v-if="sortedVersions.length">
          <li v-for="(version, index) in sortedVersions" :key="index">
            <p>📅 {{formatDate(version.date)}} - {{activeLocale.countryVersionLabel}} #{{version.number}}</p>
            <p>{{activeLocale.countryVersionCreatedBy}} {{version.author}}</p>
            <p v-if="version.number == selectedVersion">📌 {{activeLocale.countrySeeingVersion}}</p>
            <a
              v-if="version.number != selectedVersion"
              @click="loadVersion($event, version)"
              :href="versionLink(version)">
                {{activeLocale.countrySeeVersion}}
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </main>
</template>

<script>
import moment from 'moment';

export default {
  props: [
    'viewmodel',
    'actions',
    'helps',
  ],

  data () {
    return {
      activeLocale: {},
      country: null,
      sortedVersions: [],
      selectedVersion: null,
    };
  },

  mounted () {
    this.viewmodel.observe(this.onViewmodelUpdated);
  },

  methods: {
    onViewmodelUpdated: function (vm) {
      this.activeLocale = vm.getActiveLocale();
      this.country = vm.getCountry();
      this.sortedVersions = vm.getSortedVersions();
      this.selectedVersion = vm.getSelectedVersion();
    },

    formatDate: function (date) {
      return moment(date).format('YYYY-MM-DD');
    },

    loadVersion: function (e, version) {
      e.preventDefault();
      this.viewmodel.loadVersion(version);
    },

    versionLink: function (version) {
      if (!this.country) return;
      return `/country/${this.country.slug}/version/${version.number}`;
    },
  },
}
</script>

<style lang="scss">
  main.country {
    display: flex;
    flex-direction: column;
    gap: 50px;
    padding: 30px 30px;

    div.country-content {
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
    }
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
      div.country-actions {
        a {
          border-radius: 10px;
          min-width: 150px;
          max-width: 100%;
          width: 150px;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
          height: 37px;
          display: flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          cursor: pointer;
        }
        a.primary {
          color: #fff;
          background: $site-primary-color;
          font-weight: 700;
        }
        a.cancel {
          background: $init-highlight-color;
          color: #fff;
        }
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

  @media (min-width: 750px) {
    main.country {
      flex-direction: row;
      padding: 30px 50px;
    }
  }
</style>
