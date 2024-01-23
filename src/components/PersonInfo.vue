<template>
  <div>
    <router-link class="btn-back" to="/">На главную</router-link>
    <div class="personinfo w-100">
      <div class="card" v-if="currentClient != null">
        <div class="card-title">
          Информация о клиенте: {{ currentClient.fullname }} ({{ currentClient.status }})
        </div>
        <div class="card-text">
          <div class="info">
            <div>Создан:</div>
            <div>{{ currentClient.created_at }}</div>
            <div>Телефон:</div>
            <div>{{ currentClient.phone }}</div>
            <div>Регион:</div>
            <div>{{ currentClient.region }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import moment from 'moment';

  export default {
    name: 'PersonInfo',
    data() {
      return {
        currentClient: null
      }
    },
    watch: {},
    methods: {
      getData(id) {
        if (this.$store.getters.clients != null && this.$store.getters.clients != undefined) {
          this.currentClient = this.$store.getters.clients.find((i) => i.id == id);
          this.currentClient.created_at = moment(this.currentClient.created_at).format('DD/MM/yyyy')
        }
      }
    },
    async mounted() {
      const id = this.$route.params.id;
      if (this.$store.getters.clients == null || this.$store.getters.clients == undefined) {
        await this.$store.dispatch('getClients');
      }
      
      this.getData(id);
    }
  }
</script>

<style scoped>
  .personinfo {
    display: flex;
    justify-content: center;
  }
  .btn-back {
    background-color: rgb(157, 214, 157);
    border: 1px solid rgb(110, 144, 110);
    border-radius: 10px;
    padding: 4px;
    text-decoration: none;
    color: black;
  }
  .btn-back:hover {
    background-color: rgb(145, 197, 145);
    cursor: pointer;
  }
  .btn-back:active {
    background-color: rgb(179, 241, 179);
    border-color: rgb(179, 241, 179);
  }
  .card {
    width: 50%;
    border: 1px solid gray;
    border-radius: 10px;
    padding: 10px;
  }
  .card-title {
    font-weight: bold;
    font-size: 20px;
  }
  .card-text {
    font-size: 16px;
  }
  .info {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(3, 1fr);
    grid-column-gap: 0px;
    grid-row-gap: 0px;
  }
</style>