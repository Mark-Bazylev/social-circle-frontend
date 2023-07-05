<template>
  <q-page class="column justify-center">
    <q-card>
      <q-btn
        clickable
        v-ripple
        :to="{ name: RouteNames.home }"
        class="bg-primary text-white row"
        v-show="isAlreadyLoggedIn"
      >
        <q-avatar>
          <img :src="currentAccount?.avatarUrl" alt="" />
        </q-avatar>
        <div class="q-ml-md">continue as {{ currentAccount?.name }}</div>
      </q-btn>

      <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md q-pa-md">
        <q-input
          filled
          v-model="email"
          label="Your email"
          hint=""
          lazy-rules
          :rules="[
            (val) => (val && val.length > 0) || 'Please type something',
            (val) =>
              emailRegEx.test(val) || 'Please type a valid email address',
          ]"
        />

        <q-input
          filled
          :type="isPasswordVisible ? 'text' : 'password'"
          v-model="password"
          label="Your password"
          lazy-rules
          :rules="[]"
        >
          <q-btn
            @click="isPasswordVisible = !isPasswordVisible"
            :icon="isPasswordVisible ? 'visibility_off' : 'visibility'"
            unelevated
            rounded
            dense
          ></q-btn>
        </q-input>
        <Transition>
          <q-card
            flat
            v-show="errorMsg"
            class="row bg-red-7 text-white justify-center q-pa-sm"
          >
            {{ errorMsg }}
          </q-card>
        </Transition>

        <q-separator />
        <div class="row justify-around">
          <q-btn class="button" label="Login" type="submit" color="primary" />
          <q-btn
            label="Reset"
            type="reset"
            color="primary"
            flat
            class="q-ml-sm button"
          />
          <q-btn
            flat
            text-color="primary"
            :to="{ name: RouteNames.register }"
            class="button"
          >
            Register
          </q-btn>
        </div>
      </q-form>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useAccountStore } from 'stores/account-store';
import { useAuthStore } from 'stores/auth-store';
import { storeToRefs } from 'pinia';
const accountStore = useAccountStore();
const authStore = useAuthStore();
const { tokenData } = storeToRefs(authStore);
const { getAccount } = accountStore;
const { currentAccount } = storeToRefs(accountStore);
const isAlreadyLoggedIn = ref(false);

export default defineComponent({
  async beforeRouteEnter() {
    try {
      const res = await getAccount(tokenData.value?.userId || '');
      if (res) {
        isAlreadyLoggedIn.value = true;
      }
    } catch (error) {
      isAlreadyLoggedIn.value = false;
      console.log(error);
    }
  },
});
</script>

<script setup lang="ts">
import { ref } from 'vue';
import { RouteNames } from 'src/router/routes';
import { useAccountStore } from 'stores/account-store';
import { useAuthStore } from 'stores/auth-store';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
const router = useRouter();
const { login } = useAuthStore();

const email = ref('');
const password = ref('');
const errorMsg = ref('');

const isPasswordVisible = ref(false);
const emailRegEx =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const onReset = () => {
  email.value = '';
  password.value = '';
  errorMsg.value = '';
};
const onSubmit = async () => {
  try {
    await login({
      email: email.value,
      password: password.value,
    });

    await router.push({ name: RouteNames.home });
    errorMsg.value = '';
  } catch (error: any) {
    console.log('didnt work');
    errorMsg.value = 'Email or Password is invalid';
  }
};
</script>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: all 0.5s ease;

  /*transition: transform 2s ease;*/
}
.v-enter-from,
.v-leave-to {
  opacity: 0;

  transform: translateY(-50px);
}
.v-enter-to,
.v-leave-from {
  opacity: 1;
}

.button {
  margin: 1vh;
}
</style>
