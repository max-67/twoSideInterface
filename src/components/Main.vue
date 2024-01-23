<template>
  <div style="display: flex;">
    <SideBar></SideBar>
    <Clients></Clients>
  </div>
</template>

<script>
import Clients from './Clients.vue';
import SideBar from './SideBar.vue';

export default {
  name: 'Main',
  components: {
    Clients,
    SideBar
  }
}
</script>