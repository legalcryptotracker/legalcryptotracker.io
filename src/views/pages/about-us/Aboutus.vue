<template>
  <b-container fluid class="about-us">
    <div class="container m-b-16 parent col-xxl-10 col-12">
      <h1>About us</h1>
      <div class="ui-card-line m-t-16 m-b-20"></div>
      <div class="content">
        <p>A group of Law professionals passionate about Technologies. Our main objective is to generate community and facilitate access to crypto-information for all users and companies in the market. This is why it came up with the idea of ​​a regulatory map in real time where we can share information as well as inform ourselves of the latest movements. The information provided has the authorship of its creators, facilitating the display of references professionals  in the area in each jurisdiction, as well as facilitating communication with them. We want to improve this ecosystem, and this is the way we take to make our contribution.</p>
        <div class="container-cards">
          <div class="card hasContent m-b-16">
            <div class="img-container col-12 col-xxl-2 col-md-3">
              <img src="@/assets/scss/images/agustina-perez-profile.png" alt="Agustina Pèrez Comenale">
            </div>
            <div>
              <h3>Agustina Pèrez Comenale</h3>
              <p>Doctor of Law and Public Notary graduated from the University of Montevideo. He completed Postgraduate courses (Postgraduate in Notarial Update) and Magister (L.L.M with Thesis on Smart Legal Contracts) at the University of Montevideo, as well as a Postgraduate in Multidisciplinary Artificial Intelligence Training UBA-Argentina. He was part of the Fellowship program researching on Smart Legal Contract of the Blockchain-based ADR/ODR platform: Kleros. He is a member of the Commercial Law Commission and the Computer Law and New Technologies Commission of the Association of Notaries of Uruguay. He is part of the group of Legal Hackers Montevideo and Metalaw. Professor at the University of Montevideo in undergraduate and postgraduate courses. Consultant for technology companies and current position in the Cryptocurrency Exchange platform. Consultant of the parliamentary commissions on the projects of Law on Virtual Assets in Uruguay. Event organizer: Legaltech Summit 2021. Speaker and author of several books and events on Legal & Technology. She is part of the Blockchain and Artificial Intelligence Room (BIA) of the Catholic University of Córdoba and Professor in the Metaverse & Gaming Diploma - IALAB UBA. Currently with a position in the Legal Department of one of the largest Exchange platforms in cryptocurrencies.</p>
            </div>
          </div>
          <div class="card hasContent m-b-16">
            <div class="img-container col-12 col-xxl-2 col-md-3">
              <img src="@/assets/scss/images/mercedes-aramendia-profile.png" alt="Mercedes Aramendía Falco">
            </div>
            <div>
              <h3>Mercedes Aramendía Falco</h3>
              <p>Doctor (PhD) in Legal Sciences from the University of Granada, Spain; Master of Law (LLM) in Law, Technology and Entrepreneurship from Cornell University, United States; Master's Degree for Access to the Legal Profession from the University of Nebrija, Spain; Master's Degree in Business Administration, Management and Organization from the Camilo José Cela University, Spain; MBA from EAE Business School, Spain; Master in Economic Administrative Law from the University of Montevideo, Uruguay; Postgraduate Title of Specialization in Fundamental Rights and Constitutional Guarantees in the perspective of the 21st century by the University of Castilla - La Mancha, Spain; Degree in Law from the University of Nebrija, Spain; Doctor of Law from the University of Montevideo, Uruguay. She is currently Director of the Postgraduate course in Digital Transformation and Law at the University of Montevideo and Professor at the same University.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </b-container>
</template>

<script>
  export default {
    name: 'about-us',
  }
</script>

<style leng="scss">
  
  .about-us .container {
    background-color: #fff;
    padding: 30px;
    border-radius: 8px;
    margin: 0 auto;
    align-items: center;
    color: #531bdb;
    font-family: 'IBM Plex Sans', sans-serif;
  }
  
  .about-us h1 {
    font-weight: bold;
    font-size: 18px;
  }
  
  .about-us .content p {
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 14px;
    font-style: normal;
    font-weight: normal;
    color: #0B2041;
  }
  
  .about-us .container-cards .card {
    padding: 10px;
    display: flex;
    flex-direction: column;
    gap: 30px;
    align-items: center;
    border-radius: 8px;
  }
  
  .about-us .container-cards .card .img-container {
    padding: 0;
  }
  
  .about-us .container-cards .card .img-container img {
    width: 100%;  
    height: 100%;
    border-radius: 8px;
  }
  
  .about-us .container-cards .card h3{
    font-weight: bold;
    font-size: 18px;  
  }
  
  @media (min-width: 800px) {
    .about-us .container-cards .card {
      flex-direction: row;
    }
  }

</style>