<template>
  <q-layout container view="lHh Lpr lff" class="layout-container">
    <q-header>
      <q-toolbar>
        <q-btn @click="router.go(-1)" round flat icon="arrow_back_ios_new" />
        <q-avatar size="44px">
          <q-img :src="accountsMap[otherUserId]?.avatarUrl" />
        </q-avatar>
        <q-toolbar-title>
          <q-item>
            <q-item-section style="font-size: 16px">
              <q-item-label> {{ accountsMap[otherUserId]?.name }}</q-item-label>
              <q-item-label class="tex">Online</q-item-label>
            </q-item-section>
          </q-item>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <ChatDrawer />
    <q-page-container :style-fn="styleFn" class="page-container">
      <q-page>
        <q-scroll-area ref="scrollAreaRef" class="chat-container">
          <q-infinite-scroll reverse @load="onLoad" :offset="250">
            <div v-for="(messageGroup, index) in groupedMessages" :key="index">
              <q-chat-message
                :name="accountsMap[messageGroup[0].createdBy]?.name"
                :avatar="accountsMap[messageGroup[0].createdBy]?.avatarUrl"
                :sent="currentAccount?.createdBy === messageGroup[0].createdBy"
              >
                <template v-slot:default>
                  <q-item
                    v-for="(messageData, index) in messageGroup"
                    :key="index"
                    class="row q-pa-xs"
                    style="max-width: 100px"
                  >
                    <q-item-section>
                      <q-item-label>
                        {{ messageData.message }}
                      </q-item-label>
                      <q-item-label
                        caption
                        class="row"
                        :class="
                          currentAccount?.createdBy !== messageData.createdBy
                            ? 'justify-start'
                            : 'justify-end'
                        "
                      >
                        {{
                          getFormatedDate(
                            messageGroup[messageGroup.length - 1]?.createdAt ||
                            '2023-09-10T10:15:00.000Z'
                          )
                        }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </template>
              </q-chat-message>
            </div>

            <template v-slot:loading>
              <div class="text-center q-my-md">
                <q-spinner-dots color="primary" size="40px" />
              </div>
            </template>
          </q-infinite-scroll>
        </q-scroll-area>
      </q-page>
      <q-page-sticky position="bottom-right" :offset="[18, 18]">
        <q-btn
          round
          color="accent"
          icon="arrow_downward"
          @click="animateScrollToBottom()"
        /></q-page-sticky>
    </q-page-container>
    <q-footer class="transparent-footer">
      <q-input
        v-model="messageInput"
        @keydown.enter.prevent="sendMessage"
        rounded
        outlined
        class="input"
        placeholder="Message"
        type="text"
        trim
      />
    </q-footer>
  </q-layout>
</template>

<script setup lang="ts">
import ChatDrawer from 'components/chat/ChatDrawer.vue';


import { ref, onMounted, computed, nextTick } from 'vue';
import io from 'socket.io-client';
import { authService } from 'src/services/api-services/auth.service';
import { useRoute, useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useAccountStore } from 'stores/account-store';
import { useAuthStore } from 'stores/auth-store';
import { getFormatedDate, isTimeGapExceeded } from 'src/utils/dates';
import { Message } from 'src/services/api-services/chat-services/models';
import { useChatStore } from 'stores/chat-store';
import { QScrollArea } from 'quasar';
import { useFriendsStore } from 'stores/friends-store';



const accountStore = useAccountStore();
const { getMyAccount, getAccount, addAccounts } = accountStore;
const { accountsMap, currentAccount } = storeToRefs(accountStore);
const route = useRoute();
const messageInput = ref('');
const router = useRouter();
const styleFn = (offset: number, height: number) => {
  const pageHeight = height - offset;
  return `height: ${pageHeight}px`;
};



const socket = io('http://localhost:3000/', {
  auth: {
    token: authService.getAuthToken(),
  },
});
const chatStore = useChatStore();
const { getChatMessagesByPage } = chatStore;
const { chatMessages } = storeToRefs(chatStore);
const authStore = useAuthStore();
const { tokenData } = storeToRefs(authStore);



const userId = tokenData?.value?.userId || '';
const otherUserId = route.params.id as string;
const scrollAreaRef = ref<QScrollArea | null>(null);

const sendMessage = () => {
  if (!messageInput.value) {
    return;
  }
  socket.emit('message', messageInput.value);
  messageInput.value = '';
};



async function onLoad(index: any, done: any) {

  await getChatMessagesByPage(index, userId, otherUserId);

  console.log(chatMessages.value);

  messages.value = [...chatMessages.value.reverse(), ...messages.value];
  chatMessages.value.length === 0 ? done(true) : done();
}

function animateScrollToBottom({ animated = true } = {}) {
  const scrollTarget = scrollAreaRef.value?.getScrollTarget();
  scrollTarget?.scrollTo({
    top: scrollTarget?.scrollHeight,
    behavior: animated ? 'smooth' : 'auto',
  });
}


const messages = ref<Message[]>([]);

const groupedMessages = computed<Message[][]>(() => {
  return messages.value.reduce((result: any, message: any) => {
    const lastGroup = result[result.length - 1];
    const lastMessage = lastGroup?.[lastGroup.length - 1];
    if (
      !lastMessage ||
      lastMessage.createdBy !== message.createdBy ||
      isTimeGapExceeded(lastMessage.createdAt, message.createdAt)
    ) {
      result.push([message]);
    } else {
      lastGroup.push(message);
    }
    return result;
  }, []);
});
socket.on('previousMessages', (messagesData) => {
  messages.value = messagesData;
});

socket.on('message', (message) => {
  messages.value.push(message);
  nextTick(() => {
    animateScrollToBottom({ animated: false });
  });
});

onMounted(async () => {
  const res1 = await getMyAccount();
  const res2 = await getAccount(otherUserId);
  await addAccounts({ [res1.createdBy]: res1, [res2.createdBy]: res2 });
  console.log(res1, ' and ', res2, 'accounts map: ', accountsMap.value);

  socket.on('connect', () => {
    // Socket is connected
    console.log('Socket is connected');
  });
  socket.emit('join', userId, otherUserId);
});

</script>

<style scoped>
.layout-container {
  display: flex;
  flex-direction: column;
  width: 80vw;
  height: 90vh;
}
.transparent-footer {
  background-color: transparent;
  color: white;
}
.chat-container{
    height:620px;
    width:100%;
}
</style>
