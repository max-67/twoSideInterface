<template>
  <div class="container">
    <ClientsFilter 
      :filterList="filterList" 
      @updateFilter="updateFilter"
    ></ClientsFilter>
  <div class="clients">
    <table style="width: 100%;">
      <thead>
        <th>id</th>
        <th>ФИО</th>
        <th>Создан</th>
        <th>Телефон</th>
        <th>Регион</th>
        <th>Статус</th>
      </thead>
      <tbody>
        <tr v-for="client in FilteredClients" :key="client.id">
          <td style="width: 3%;">{{ client.id }}</td>
          <td style="width: 47%;" class="person-name" @click="toPersonInfo(client.id)">{{ client.fullname }}</td>
          <td style="width: 10%;">{{ getDateText(client.created_at) }}</td>
          <td style="width: 10%;">{{ client.phone }}</td>
          <td style="width: 15%;">{{ client.region }}</td>
          <td style="width: 13%;">{{ client.status }}</td>
          <td style="width: 2%">
            <div class="btn-delete" @click="removeClient(client.id)">
              <svg-icon class="btn-delete-icon" type="mdi" :path="iconDelete"></svg-icon>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div>
    <AddClient></AddClient>
  </div>
</div>
</template>


<script>
  import moment from 'moment';
  import AddClient from './AddClient.vue';
  import ClientsFilter from './ClientsFilter.vue';

  import SvgIcon from '@jamescoyle/vue-icon'
  import { mdiClose } from '@mdi/js';

  export default {
    name: 'Clients',
    components: {
      ClientsFilter,
      AddClient,
      SvgIcon
    },
    data() {
      return {
        clients: null,
        filters: null,
        iconDelete: mdiClose
      }
    },
    computed: {
      filterList() {
        return [
          {
            name: 'fullname',
            text: 'ФИО',
            type: 'text'
          },
          {
            name: 'status',
            text: 'Статус',
            type: 'list',
            data: ['Активен', 'Неактивен', 'Приостановлен']
          }
        ]
      },
      FilteredClients() {
        if (this.clients == null) return [];
        if (this.filters == null) return this.clients;
        // eslint-disable-next-line no-prototype-builtins
        if (!this.filters.hasOwnProperty('fullname') && !this.filters.hasOwnProperty('status')) return this.clients;
        
        return this.clients.filter((i) => {
          if (this.filters.status == '') {
            return i.fullname.toLowerCase().includes(this.filters.fullname.toLowerCase())
          }
          return i.fullname.toLowerCase().includes(this.filters.fullname.toLowerCase()) && i.status == this.filters.status;
        })
      }
    },
    watch: {
      "$store.getters.clients"(v) {
        this.clients = v;
      }
    },
    methods: {
      removeClient(id) {
        const res = confirm('Вы точно хотите безвозвратно удалить клиента?');
        if (res) this.$store.dispatch('removeClient', id);
      },
      toPersonInfo(id) {
        this.$router.push({ path: `/person/${id}` });
      },
      updateFilter(v) {
        this.filters = v;
      },
      getDateText(date) {
        const dateParsed = moment(date).format('DD/MM/yyyy');
        return dateParsed;
      },
    },
    async mounted() {
      await this.$store.dispatch('getClients');
      this.clients = this.$store.getters.clients;
    }
  }
</script>

<style scoped>
  table {
    border-collapse: collapse;
  }
  table thead {
    text-align: left;
  }
  table tbody tr:hover {
    background-color: rgb(240, 240, 240);
  }
  .container {
    width: 80%;
  }
  .clients {
    height: 85vh;
    overflow: auto;
  }
  .person-name {
    cursor: pointer;
  }
  .person-name:hover {
    text-decoration: underline;
  }
  .btn-delete {
    height: 24px;
    width: 24px;
    border-radius: 50%;
  }
  .btn-delete:hover {
    background-color: rgb(251, 203, 203);
  }
  .btn-delete-icon {
    cursor: pointer;
    color: rgb(255, 76, 76);
  }
</style>
