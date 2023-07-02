<template>
  <q-scroll-area class="fit" :horizontal-thumb-style="{ opacity: 0 }">
    <q-list padding>
      <q-item :to="{name:RouteNames.home}"  clickable v-ripple>
        <q-item-section avatar>
          <q-icon name="home" />
        </q-item-section>

        <q-item-section> Home </q-item-section>
      </q-item>
      <q-item :to="{name:RouteNames.profile}" clickable v-ripple>
        <q-item-section avatar>
          <q-icon name="account_circle" />
        </q-item-section>

        <q-item-section> Profile </q-item-section>
      </q-item>

      <q-item :to="{name:RouteNames.friends}" clickable v-ripple>
        <q-item-section avatar>
          <q-icon name="group" />
        </q-item-section>

        <q-item-section> Friends </q-item-section>
      </q-item>
      <q-item :to="{name:RouteNames.settings}" clickable v-ripple>
        <q-item-section avatar>
          <q-icon name="settings" />
        </q-item-section>

        <q-item-section> Settings </q-item-section>
      </q-item>
    </q-list>
  </q-scroll-area>
</template>
<script setup lang="ts">
import {RouteNames} from "src/router/routes";
import {useRouter} from "vue-router";
const router=useRouter()

</script>
