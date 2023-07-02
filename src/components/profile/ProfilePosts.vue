<template>
  <div class="row justify-center">
    <PostsComponent :posts="sortedPosts" :accountsMap="{[posts?.[0]?.createdBy.toString()]:account}"/>

  </div>

</template>

<script setup lang="ts">
import {computed} from "vue";
import PostsComponent from "components/PostsComponent.vue";

const props = defineProps(['posts','account'])
const sortedPosts=computed(()=>props.posts?.slice().reverse())

</script>

<style scoped>

</style>
