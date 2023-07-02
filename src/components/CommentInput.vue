<template>
  <q-list>
    <q-item>
      <q-item-section side>
        <q-avatar size="64px">
          <img :src="currentAccount?.avatarUrl" />
        </q-avatar>
      </q-item-section>
      <q-item-section>
        <q-input type="text" v-model="commentInput" />
      </q-item-section>
      <q-item-section side>
        <q-btn @click="sendComment">Send</q-btn>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script setup lang="ts">
import { useAccountStore } from 'stores/account-store';
import { storeToRefs } from 'pinia';
import { computed, ref } from 'vue';
import { useCommentsStore } from 'stores/comments-store';

const accountStore = useAccountStore();
const { currentAccount } = storeToRefs(accountStore);
const commentInput = ref('');
const commentsStore = useCommentsStore();
const { createComment } = commentsStore;
const props = defineProps(['postId']);
const sendComment = async () => {
  try {
    const res = await createComment(commentInput.value, props.postId);
    if (res) commentInput.value = '';
  } catch (e) {
    console.log(e);
  }
};
</script>

<style scoped></style>
