<template>
  <div class="row justify-center">
    <transition
      appear
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
    >
      <div v-if="showPosts">
        <PostsComponent
          :posts="sortedPosts"
          :accountsMap="{ [posts?.[0]?.createdBy.toString()]: account }"
        />
      </div>
      <div v-else>
        <PostsSkeleton />
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  async beforeRouteEnter() {
    try {
      showTextLoading();
    } catch (error) {}
  },
});
const showPosts = ref(false);

function showTextLoading() {
  showPosts.value = false;
  setTimeout(() => {
    showPosts.value = true;
  }, 1000);
}
</script>
<script setup lang="ts">
import { computed } from 'vue';
import PostsComponent from 'components/PostsComponent.vue';
import PostsSkeleton from 'components/PostsSkeleton.vue';

const props = defineProps(['posts', 'account']);
</script>

<style scoped></style>
