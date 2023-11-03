<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useAuthStore } from "~/store/auth";
import { useInfo } from "~/store/info";

const { logUserOut } = useAuthStore();
const { authenticated } = storeToRefs(useAuthStore());
const { userInfo } = storeToRefs(useInfo());

const router = useRouter();
const route = useRoute();

const logout = () => {
  logUserOut();
  router.push("/login");
};
</script>

<template>
  <nav
    class="z-30 top-0 px-7 py-4 flex justify-center items-center h-fit w-full"
  >
    <button
      v-if="route.name != 'index' ? true : false"
      @click="$router.back()"
      class="text-white absolute left-7 top-4"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-7 h-7"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
        />
      </svg>
    </button>

    <div class="w-28 h-full relative mt-1">
      <img src="/image/sindhorn_market_w.png" alt="logo_foodmarket" />
    </div>

    <div class="absolute right-7 top-3">
      <NuxtLink @click="logout">
        <img
          class="w-10 h-10 rounded-full"
          src="/image/profile-picture-5.jpg"
          alt="Rounded avatar"
        />
      </NuxtLink>
    </div>
  </nav>
</template>
