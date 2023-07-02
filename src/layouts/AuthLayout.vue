<template>
  <q-layout>
  <div class="row justify-center page-container">





         <q-page-container>
           <router-view/>
         </q-page-container>









  </div>
  </q-layout>
</template>

<script setup>
import LoginCard from '../pages/auth/LoginCard.vue'
import {ref} from "vue";
const tab=ref('login')
</script>

<style scoped>
.page-container{
  height: 100vh;
  align-items: center;
}
</style>
