<template>
  <div class="clients-filter">
    Фильтры:
    <div v-for="(filter, index) in filterList" :key="`filter_${index}`" class="filter-list">
      <div v-if="filter.type == 'text'">
        <input type="text" v-model="filters[filter.name]" :placeholder="filter.text">
      </div>
      <div v-if="filter.type == 'list'">
        <select v-model="filters[filter.name]">
          <option value="" disabled>{{ filter.text }}</option>
          <option v-for="(opt, index) in filter.data" :key="`option_${index}`" :value="opt">{{ opt }}</option>
        </select>
      </div>
    </div>
    <button class="btn-clear" @click="clear()">Очистить</button>
  </div>
</template>

<script>
  export default {
    name: 'ClientsFilter',
    props: {
      filterList: Array
    },
    data() {
      return {}
    },
    computed: {
      filters() {
        const filterObj = {};
        for (const filter of this.filterList) {
          filterObj[filter.name] = '';
        }
        return filterObj
      }
    },
    watch: {
      filters: {
        handler(v) {
          this.$emit('updateFilter', v);
        },
        deep: true,
        immediate: true
      }
    },
    methods: {
      clear() {
        for (const key in this.filters) {
          this.filters[key] = '';
        }
      }
    },
    mounted() {
    }
  }
</script>

<style scoped>
  .clients-filter {
    text-align: left;
  }
  .filter-list {
    display: inline-block;
    margin: 0 4px;
  }
  .filter-list:first-child {
    margin-left: 0;
  }
  .filter-list:last-child {
    margin-right: 0;
  }
  input[type=text] {
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
    padding: 4px;
    border: 0;
    border-bottom: 1px solid #eee;
    box-shadow:0 0 15px 4px rgba(0,0,0,0.06);
    border-radius:10px;
    height: 24.5px;
  }
  .btn-clear {
    box-sizing: border-box;
    padding: 4px;
    border: 1px solid rgb(110, 144, 110);
    background-color: rgb(157, 214, 157);
    border-radius:10px;
  }
  .btn-clear:hover {
    background-color: rgb(145, 197, 145);
    cursor: pointer;
  }
  .btn-clear:active {
    background-color: rgb(179, 241, 179);
    border-color: rgb(179, 241, 179);
  }
</style>
