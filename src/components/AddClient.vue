<template>
  <div>
    <form class="grid" id="form" @keydown.enter="handler($event)">
      <div>
        <input placeholder="ФИО" type="text" v-model="client.fullname">
      </div>
      <div>
        <input placeholder="Телефон" type="text" v-model="client.phone">
      </div>
      <div>
        <input placeholder="Регион" type="text" v-model="client.region">
      </div>
      <div>
        <select v-model="client.status">
          <option value="" disabled>Статус</option>
          <option value="Активен">Активен</option>
          <option value="Неактивен">Неактивен</option>
          <option value="Приостановлен">Приостановлен</option>
        </select>
      </div>
    </form>
    <button class="w-100 btn-save" @click="saveClient()">Сохранить</button>
  </div>
</template>

<script>
  export default {
    name: 'AddClient',
    data() {
      return {
        client: {
          id: null,
          fullname: '',
          phone: '',
          region: '',
          status: ''
        }
      }
    },
    methods: {
      handler(event) {
        const form = document.getElementById('form');
        const index = [...form].indexOf(event.target);
        console.log([...form].length)
        if (index >= [...form].length - 1) {
          this.saveClient();
          return;
        }
        form.elements[index + 1].focus();
      },
      async saveClient() {
        const client = this.client;
        const isEmpty = this.checkEmptyFields(client);
        if (isEmpty) {
          alert('Заполните все поля.');
          return;
        }
        this.$store.dispatch('saveClient', client);
        this.clear();
      },
      checkEmptyFields(client) {
        for (const field in client) {
          if (field == 'id') continue;
          if (client[field] == '' || client[field] == undefined || client[field] == null) {
            return true;
          }
        }
        return false;
      },
      clear() {
        this.client.id = null;
        this.client.fullname = '';
        this.client.phone = '';
        this.client.region = '';
        this.client.status = '';
      }
    },
    mounted() {

    }
  }
</script>

<style scoped>
  .grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
    grid-column-gap: 30px;
    grid-row-gap: 0px;
  }
  input[type=text] {
    width: 100%;
    padding: 4px;
    border: 0;
    border-bottom:1px solid #eee;
    box-shadow:0 0 15px 4px rgba(0,0,0,0.06);
    border-radius:10px;
  }
  input[type=text]:focus {
    outline: none;
  }
  select {
    width: 100%;
    padding: 4px;
    border: 0;
    border-bottom: 1px solid #eee;
    box-shadow:0 0 15px 4px rgba(0,0,0,0.06);
    border-radius:10px;
    height: 24.5px;
  }
  .btn-save {
    background-color: rgb(157, 214, 157);
    border: 1px solid rgb(110, 144, 110);
    border-radius: 10px;
    min-height: 26px;
  }
  .btn-save:hover {
    background-color: rgb(145, 197, 145);
    cursor: pointer;
  }
  .btn-save:active {
    background-color: rgb(179, 241, 179);
    border-color: rgb(179, 241, 179);
  }
</style>