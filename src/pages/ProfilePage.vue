<template>
  <q-page padding class="page">
    <q-card class="profile-card">
      <!--      Thumbnail with profile img-->
      <ProfileThumbnail
        :coverUrl="currentAccount?.coverUrl"
        :avatarUrl="currentAccount?.avatarUrl"
        :name="currentAccount?.name"
      />

      <!--      input and post form-->
      <div v-if="showInput">
        <ProfileInput />
      </div>

      <!--      Posts-->
      <!--      <ProfilePosts :posts="posts" :account="currentAccount" />-->
      <transition
        appear
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut"
      >
        <div v-if="showPosts" class="row justify-center">
          <PostsComponent
            :posts="sortedPosts"
            :accountsMap="{
              [posts?.[0]?.createdBy.toString()]: currentAccount,
            }"
          />
        </div>
        <div v-else class="row justify-center">
          <PostsSkeleton />
        </div>
      </transition>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { storeToRefs } from 'pinia';

import { computed, defineComponent, ref } from 'vue';
import { usePostsStore } from 'stores/posts-store';
import { useAccountStore } from 'stores/account-store';
import { useAuthStore } from 'stores/auth-store';
import { RouteNames } from 'src/router/routes';

const accountStore = useAccountStore();
const { getAccount } = accountStore;
const { currentAccount } = storeToRefs(accountStore);
const postsStore = usePostsStore();
const { getPosts, getUserPosts } = postsStore;
const { posts } = storeToRefs(postsStore);
const { tokenData } = storeToRefs(useAuthStore());
const showInput = ref(false);
async function beforeUpdate(to: any, from: any) {
  try {
    const userId = to.params.id;
    console.log(userId);
    if (userId) {
      // userId='64904bad365b371e4c197bf2'
      await getAccount(userId);
      await getUserPosts(userId);
      showInput.value = false;
    } else {
      await getAccount(tokenData.value?.userId || '');
      await getPosts();
      showInput.value = true;
    }
    showTextLoading();
  } catch (error) {
    console.log(error);
    return { name: RouteNames.profileNotFound };
  }
}
export default defineComponent({
  async beforeRouteEnter(to, from) {
    return await beforeUpdate(to, from);
  },
  async beforeRouteUpdate(to, from) {
    return await beforeUpdate(to, from);
  },
});
const showPosts = ref(false);
const sortedPosts = computed(() => posts.value.slice().reverse());

function showTextLoading() {
  showPosts.value = false;
  setTimeout(() => {
    showPosts.value = true;
  }, 1000);
}
</script>

<script setup lang="ts">
import ProfileThumbnail from 'components/profile/ProfileThumbnail.vue';
import ProfileInput from 'components/profile/ProfileInput.vue';
import ProfilePosts from 'components/profile/ProfilePosts.vue';
import { useAccountStore } from 'stores/account-store';
import { computed, onMounted } from 'vue';
import { usePostsStore } from 'stores/posts-store';
import { storeToRefs } from 'pinia';
import PostsSkeleton from 'components/PostsSkeleton.vue';
import PostsComponent from 'components/PostsComponent.vue';
</script>

<style scoped>
.profile-card {
  max-width: 820px;
}
</style>
