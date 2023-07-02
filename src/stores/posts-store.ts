import { defineStore } from 'pinia';
import { httpService } from 'src/services/http-services/http.service';
import { computed, ref } from 'vue';
import { postsService } from 'src/services/http-services/posts-service/posts.service';
import {Post} from "src/services/http-services/posts-service/models";

export const usePostsStore = defineStore('posts', () => {
  const posts = ref<Post[]>([]);
  async function getFriendsPosts() {
    const res = await postsService.getFriendsPosts();
    posts.value=res.data
    return res.data;
  }

  async function getPosts() {
    const res = await postsService.getPosts();
    posts.value = res.data.posts;
    return res.data.posts;
  }
  async function getPost(postId: string) {
    const res = await postsService.getPost(postId);
  }

  async function createPost(content: string) {
    const res = await postsService.createPost(content);
    posts.value?.push(res.data);
    console.log(posts.value);
  }

  async function likePost(postId: string) {
    console.log(postId);
    const res = await postsService.likePost(postId);
    console.log(res);
    return res;
  }

  async function unlikePost(postId: string) {
    console.log(postId);
    const res = await postsService.unlikePost(postId);
    console.log(res);
    return res;
  }
  async function getLikes(id: string) {
    const res = await postsService.getLikes(id);
    console.log(res);
    return res;
  }
  return {
    posts,
    getPosts,
    getPost,
    getFriendsPosts,
    createPost,
    likePost,
    unlikePost,
    getLikes,
  };
});
