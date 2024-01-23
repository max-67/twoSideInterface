<template>
  <div class="sidebar">
    <div v-for="item in items" :key="item.id" class="sidebar-item">
      {{ item.value }}
    </div>
  </div>
</template>

<script>
  export default {
    name: 'SideBar',
    data() {
      return {
        items: [
          {
            id: 0,
            value: 'Главная'
          },
          {
            id: 1,
            value: 'О нас'
          },
          {
            id: 2,
            value: 'Клиенты'
          },
          {
            id: 3,
            value: 'Магазин'
          },
          {
            id: 4,
            value: 'Информация'
          },
          {
            id: 5,
            value: 'Контакты'
          }

        ]
      }
    },
    methods: {

    },
    mounted() {
    }
  }
</script>

<style scoped>
.sidebar {
  width: 20%;
  /* background-color: rgb(167, 216, 200); */
}
.sidebar-item {
  height: 70px;
  margin: 4px 0 4px 0;
  background-color: antiquewhite;
}
.sidebar-item:first-child {
  margin-top: 0;
}
.sidebar-item:last-child {
  margin-bottom: 0;
}
</style>