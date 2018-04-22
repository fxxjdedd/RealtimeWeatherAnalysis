<template>
  <div id="app">
    <nav-bar>
      <time-filter></time-filter>      
    </nav-bar>
    <side-bar></side-bar>
    <router-view></router-view>
  </div>
</template>

<script>
import {NavBar, SideBar, TimeFilter} from '@/components/commons'
export default {
  name: 'App',
  components: {
    NavBar,
    SideBar,
    TimeFilter
  }
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
  @import './styles/index.css';
</style>
