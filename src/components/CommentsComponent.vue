<template>
  <CommentInput :postId="props.postId" />
  <q-card class="q-ma-md">
    <q-list :key="comment" v-for="comment in sortedComments">
      <q-item clickable v-ripple>
        <q-item-section side>
          <q-avatar size="64px">
            <img :src="accountsMap[comment?.createdBy]?.avatarUrl" />
          </q-avatar>
        </q-item-section>
        <q-item-section>
          <q-item-label>
            {{ accountsMap[comment?.createdBy]?.name || 'NO FKIN NAME' }}
          </q-item-label>
          <q-item-label caption>
            {{ getDayOfWeek(comment.createdAt) }}
          </q-item-label>
        </q-item-section>
      </q-item>
      <!--          get a cool ass word limiter with show more/less option-->
      <q-item> {{ comment?.content }} </q-item>
      <q-item>
        <q-item-section side>
          <!--          <q-btn @click="setLikeComment(comment)" icon="thumb_up" round flat size="12px">{{comment.likes.length}}</q-btn>-->
          <q-btn
            v-if="!comment.likes.includes(<string>tokenData?.userId)"
            @click="setLikeComment(comment)"
            icon="thumb_up"
            round
            flat
            size="12px"
            >{{ comment.likes.length }}</q-btn
          >
          <q-btn
            v-else
            @click="setUnlikeComment(comment)"
            icon="thumb_up"
            round
            flat
            size="12px"
            color="secondary"
            >{{ comment.likes.length }}</q-btn
          >
        </q-item-section>
      </q-item>
    </q-list>
  </q-card>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useCommentsStore } from 'stores/comments-store';
import { storeToRefs } from 'pinia';
import { getDayOfWeek } from '../utils/dates';
import CommentInput from 'components/CommentInput.vue';
import { useAuthStore } from 'stores/auth-store';

const props = defineProps(['postId']);
const commentsStore = useCommentsStore();
const { getPostComments, likeComment, unlikeComment } = commentsStore;
const { comments, accountsMap } = storeToRefs(commentsStore);
const sortedComments = computed(() => comments.value.slice().reverse());
const authStore = useAuthStore();
const { tokenData } = storeToRefs(authStore);

onMounted(async () => {
  try {
    const res = await getPostComments(props.postId);
  } catch (error) {}
});

async function setLikeComment(comment: any) {
  try {
    const res = await likeComment(comment._id);
    comment.likes.push(tokenData.value?.userId);
  } catch (error) {}
}
async function setUnlikeComment(comment: any) {
  try {
    const res = await unlikeComment(comment._id);
    comment.likes.splice(
      comment.likes.findIndex((id: string) => id === tokenData.value?.userId),
      1
    );
  } catch (error) {}
}
</script>

<style scoped></style>
