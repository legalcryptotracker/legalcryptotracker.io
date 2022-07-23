<template>
  <Layout :viewmodel="viewmodel">
    <Country :viewmodel="viewmodel" :actions="actions" :helps="helps">
      <form class="country-add-version">
        <div class="country-content-alerts">
          <div class="country-content-guidelines">
            <div v-html="activeLocale.countryAddVersionGuidelines"></div>
          </div>
          <div class="country-add-version-errors" v-if="errors && errors.length">
            <p>{{activeLocale.countryAddVersionErrorTitle}}</p>
            <ul><li v-for="(error, index) in errors" :key="index">{{error}}</li></ul>
          </div>
        </div>
        <div class="first-section">
          <div class="field" v-if="countries && countries.length">
            <label>{{activeLocale.countryAddVersionCountryLabel}}</label>
            <select
              v-model="versionCountryId"
              :disabled="!!country"
              @change="onCountryChanged">
                <option value="">{{activeLocale.countrySelectCountry}}</option>
                <option
                  v-for="country in countries"
                  :value="country.id"
                  :key="country.id">
                    {{country.name}}
                </option>
            </select>
          </div>
          <div class="field" v-if="regulationStates && regulationStates.length">
            <label>{{activeLocale.countryAddVersionRegulationStateLabel}}</label>
            <select v-model="versionRegulationStateId">
              <option value="">{{activeLocale.countrySelectRegulationState}}</option>
              <option
                v-for="state in regulationStates"
                :value="state.id"
                :key="state.id">
                  {{activeLocale[state.value]}}
              </option>
            </select>
          </div>
        </div>
        <div class="second-section">
          <div class="field" v-for="locale in locales" :key="locale.id">
            <label>{{locale.name}}</label>
            <ckeditor
              :editor="editor"
              :config="editorConfig"
              v-model="newVersionContents[locale.id]" />
          </div>
        </div>
      </form>
    </Country>
  </Layout>
</template>

<script>
import router from '@/router';
import Layout from '@/views/layout/Layout';
import toCamelCase from '@/utils/toCamelCase';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Country from './Country';
import CountryAddVersionViewmodel from '@/viewmodels/country_add_version.js';

export default {
  components: {
    Layout,
    Country,
  },

  metaInfo: {
    title: 'Cryptotracker | Add content'
  },

  data () {
    return {
      editor: ClassicEditor,
      editorConfig: {
        toolbar: ['heading', '|', 'bold', 'italic', '|', 'link', 'blockQuote',
          '|', 'bulletedList', 'numberedList'],
        heading: {
          options: [
            { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
            { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
            { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' }
          ]
        },
      },

      country: {},
      countries: [],
      regulationStates: [],

      locales: [],
      activeLocale: {},
      actions: [],

      helps: [
      //   'Este pais no tiene version en Ingles',
      //   'La version en Ingles es bastante mas vieja que su ultima actualizacion es Espanol.',
      ],

      versionCountryId: '',
      versionRegulationStateId: '',
      versionContent: '',
      versionContents: {},
      newVersionContents: {},

      errors: [],

      viewmodel: {}
    };
  },

  created () {
    this.viewmodel = new CountryAddVersionViewmodel();
  },

  mounted () {
    this.viewmodel.observe(this.onViewmodelUpdated);
  },

  methods: {
    onViewmodelUpdated (vm) {
      var activeLocale = vm.getActiveLocale();
      var countryAndLocales = vm.getCountryAndLocales() || { locales: [] };

      this.activeLocale = activeLocale;
      this.country = vm.getCountry();
      this.countryAndLocales = countryAndLocales;
      this.countries = vm.getCountries();
      this.regulationStates = vm.getRegulationStates();
      this.locales = vm.getLocales();

      this.actions = [
        { text: this.activeLocale.countryAddVersionActionSave,
          type: 'primary',
          click: this.saveChanges },
        { text: this.activeLocale.countryAddVersionActionCancel,
          type: 'cancel',
          click: this.cancel },
      ];

      if (this.country) {
        this.versionCountryId = this.country.id;
        this.versionRegulationStateId = this.country.regulationStateId;
      }

      var latestVersion = vm.getLatestVersion();
      if (latestVersion) {
        this.versionContent = latestVersion.content;
      }

      var versionContents = {};
      var locales = this.locales;
      this.locales.forEach(function (locale) {
        var foundLocale = countryAndLocales.locales.find(function (_) { return _.id == locale.id; });
        if (!foundLocale) return;
        versionContents[locale.id] = foundLocale.latestVersion.content;
      });
      this.versionContents = versionContents;

      var newVersionContents = this.newVersionContents;
      Object.keys(versionContents).forEach(function (localeId) {
        if (!!newVersionContents[localeId]) return;
        newVersionContents[localeId] = versionContents[localeId];
      });
      this.newVersionContents = newVersionContents;

      var errors = vm.getSaveNewVersionErrors();
      this.errors = errors.map(function (error) {
        return activeLocale[toCamelCase(error, 'country')];
      });

      this.$forceUpdate();
    },

    onCountryChanged: function () {
      // this.fillCountryNameInEmptyContent();
    },

    fillCountryNameInEmptyContent: function () {
      var countryId = this.versionCountryId;
      var country = this.countries.find((_) => { return _.id == countryId });
      var contents = this.newVersionContents;
      Object.keys(contents).forEach(function (key) {
        if (!!contents[key]) return;
        contents[key] = `<h1>${country.name}</h1>`;
      });
      this.versionContents = contents;
    },

    saveChanges: function () {
      this.viewmodel.saveNewVersion({
        countryId: this.versionCountryId,
        regulationStateId: this.versionRegulationStateId,
        contents: this.newVersionContents,
      });
    },

    cancel: function () {
      this.viewmodel.cancelNewVersion();
    },
  }
}
</script>

<style lang="scss">
  form.country-add-version {
    div.country-content-alerts {
      display: flex;
      flex-direction: column;
      gap: 10px;
      margin: 0 0 30px;
      padding: 0 0 30px;
      border-bottom: 1px solid #d9d9d9;

      div.country-content-guidelines p,
      div.country-add-version-errors {
        padding: 10px 15px;
        background: $init-alert-bg;
      }
      div.country-content-guidelines,
      div.country-add-version-errors {
        p, ul, li {
          font-size: 14px;
          margin: 0;
        }
      }
      div.country-add-version-errors ul {
        padding: 0 0 0 20px;
      }
    }

    div.first-section {
      display: flex;
      flex-direction: column;
      gap: 10px;
      margin: 0 0 10px;

      div.field {
        width: 100%;
      }
    }
    div.second-section {
      display: flex;
      flex-direction: column;
      gap: 10px;

      .ck-editor label {
        display: none;
      }
      .ck-editor__editable {
        min-height: 300px;
        padding: 0 15px;
      }
    }
  }

  @media (min-width: 750px) {
    form.country-add-version {
      div.first-section {
        flex-direction: row;
      }
    }
  }
</style>
