<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'App',
  }
  </script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    display: flex;
  }

  .w-100 {
    width: 100%;
  }
</style>
