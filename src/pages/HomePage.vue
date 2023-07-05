<template>
  <div class="q-pa-md q-gutter-md">
    <q-card class="relative-position card-example" flat bordered>
      <q-card-section class="q-pb-none">
        <h2 class="row justify-center">Home Page</h2>
      </q-card-section>

      <q-card-section>
        <transition
          appear
          enter-active-class="animated fadeIn"
          leave-active-class="animated fadeOut"
        >
          <div v-if="showPosts">
            <PostsComponent
              :posts="sortedFriendsPosts"
              :accountsMap="accountsMap"
            />
          </div>
          <div v-else>
            <PostsSkeleton />
          </div>
        </transition>
      </q-card-section>
    </q-card>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { usePostsStore } from 'stores/posts-store';
import { useFriendsStore } from 'stores/friends-store';
import { Loading } from 'quasar';

const postsStore = usePostsStore();
const friendsStore = useFriendsStore();
const { getPosts, getFriendsPosts } = postsStore;
const { getFriendsData } = friendsStore;
const friendsPosts = ref([]);
const sortedFriendsPosts = computed(() => friendsPosts.value.slice().reverse());
async function getData() {
  await getPosts();
  friendsPosts.value = await getFriendsPosts();
  await getFriendsData();
}
export default defineComponent({
  async beforeRouteEnter() {
    try {
      showTextLoading();
      await getData();
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
import { usePostsStore } from 'stores/posts-store';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import { useFriendsStore } from 'stores/friends-store';
import PostsComponent from 'components/PostsComponent.vue';
import ProfileInput from 'components/profile/ProfileInput.vue';
import PostsSkeleton from 'components/PostsSkeleton.vue';

const { accountsMap } = storeToRefs(friendsStore);
</script>
