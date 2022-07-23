<template>
  <Layout :viewmodel="viewmodel">
    <main class="post">
      <div class="post-content">
        <h1>Venezuela and Cryptocurrency</h1>
        <p>In December 2017, pursuant to Decree 3196, the Venezuelan government announced that it would create its own cryptocurrency—the petro—that could be issued, mined, and traded in Venezuela. The petro officially launched in February 2018, and the government intended for it to be backed by Venezuela’s oil and mineral reserves. However, in March 2018, the Asamblea Nacional (the Venezuelan legislature) declared the petro illegal and constitutional. Notwithstanding, President Nicolas Maduro declared that the petro would be used as legal tender in Venezuela; however, to date, no one appears to hold, trade, or accept the petro.[1]</p>
        <p>In April 2018, Official Gazette Numbers 6370 and 6371 published the following government instruments/initiatives: (1) Constituent Decree on Cryptoassets and the Petro Sovereign Cryptocurrency, issued by the National Constituent Assembly; (2) the creation and regulation of the Office of the Venezuelan Superintendent on Cryptoassets of Venezuela and Ancillary Activities (“SUPCACVEN”); and (3) the creation of the Treasury of Cryptoassets of Venezuela.[2]</p>
        <p>Venezuela’s first attempt at establishing a regulatory framework/institution for cryptocurrency was replaced by the National Superintendence of Cryptocurrencies (“SUNACRIP”) in early 2019.[3] By presidential decree, Venezuela established a new legal framework for cryptocurrencies and related activities. In part, the decree stated that SUNACRIP would exercise the broadest powers within the legal framework to regulate the creation, issuance, organization, operation, and use of cryptoassets.[4]</p>
        <p>On September 21, 2020, Venezuela legalized bitcoin mining and announced that it would grant mining licenses by utilizing the Integral Miners Registry (“RIM”). In effect, all mining activities must be exercised through the National Mining Pool (“NMP”) whereby the government will oversee and distribute the rewards obtained from mining activities. Those who operate outside the NMP will be penalized.[5]</p>
        <h2>P.S. Insights on Cryptocurrency Legal Issues</h2>
        <p>Most jurisdictions and authorities have yet to enact laws governing cryptocurrencies, meaning that, for most countries, the legality of crypto mining remains unclear.</p>
        <p>Under the Financial Crimes Enforcement Network (FinCEN), crypto miners are considered money transmitters, so they may be subject to the laws that govern that activity. In Israel, for instance, crypto mining is treated as a business and is subject to corporate income tax. In India and elsewhere, regulatory uncertainty persists, although Canada and the United States are relatively friendly to crypto mining.</p>
        <p>However, apart from jurisdictions that have specifically banned cryptocurrency-related activities, very few countries prohibit crypto mining.</p>
        <p>Our Freeman Law Cryptocurrency Law Resource page provides a summary of the legal status of cryptocurrency for each country across the globe with statutory or regulatory provisions governing cryptocurrency.  The globe below provides links to country-by-country summaries:</p>
        <div id="disqus_thread"></div>
      </div>
      <div class="post-meta">
        <div class="post-actions">
          <app-button>Editar articulo</app-button>
        </div>
        <div class="post-help">
          <p>Este post no tiene version en Ingles</p>
          <p>La version en Ingles es bastante mas vieja que su ultima actualizacion es Espanol.</p>
        </div>
        <nav class="post-versions">
          <h1>Historial de cambios</h1>
          <p class="no-versions">No han habido cambios a este artículo desde su creación. Haz click en “Editar artículo” para agregar una nueva versión.</p>
          <ul>
            <li>
              <p>📅 2022-05-20 - Version #5</p>
              <p>Creada por Agustina Perez Comenale</p>
              <a>Ver version</a>
            </li>
            <li>
              <p>📅 2022-05-20 - Version #5</p>
              <p>Creada por Agustina Perez Comenale</p>
              <a>Ver version</a>
            </li>
            <li>
              <p>📅 2022-05-20 - Version #5</p>
              <p>Creada por Agustina Perez Comenale</p>
              <a>Ver version</a>
            </li>
          </ul>
        </nav>
      </div>
    </main>
  </Layout>
</template>

<script>
import Layout from '@/views/layout/Layout';
import PostViewmodel from '@/viewmodels/post.js';

export default {
  components: {
    Layout,
  },

  data () {
    return { viewmodel: {} };
  },

  mounted () {
    this.viewmodel = new PostViewmodel();
    this.viewmodel.observe(this.onViewmodelUpdated);
    this.injectDisqus();
  },

  methods: {
    onViewmodelUpdated (newVm) {
      this.viewmodel = newVm;
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
  main.post {
    display: flex;
    gap: 50px;
    padding: 30px 50px;

    div.post-content {
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
    div.post-meta {
      max-width: 230px;
      min-width: 230px;
      display: flex;
      flex-direction: column;
      gap: 30px;

      div.post-actions,
      div.post-help {
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
      div.post-help {
        p {
          padding: 10px 15px;
          background: $init-alert-bg;
          color: $init-text-color;
          font-size: 14px;
          line-height: 20px;
          margin: 0;
        }
      }
      nav.post-versions {
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
