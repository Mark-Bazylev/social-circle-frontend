<template>
  <q-page class="column justify-center">
    <q-card>
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
          <template #append>
            <q-btn
              @click="isPasswordVisible = !isPasswordVisible"
              :icon="isPasswordVisible ? 'visibility_off' : 'visibility'"
              unelevated
              rounded
              dense
            ></q-btn>
          </template>
        </q-input>
        <Transition>
          <q-card
            flat
            v-if="errorMsg"
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

<script setup lang="ts">
import { ref } from 'vue';
import { RouteNames } from '../../router/routes';
import axios from 'axios';
import { httpService } from '../../services/http-services/http.service';
import { useRouter } from 'vue-router';
import { useAuthStore } from 'stores/auth-store';

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
  } catch (error:any) {
    // errorMsg.value = error.response.msg;
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
