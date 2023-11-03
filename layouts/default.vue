<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useAuthStore } from "~/store/auth";
const router = useRouter();
const route = useRoute();
// const { authenticated } = storeToRefs(useAuthStore());

// if (!authenticated.value) {
//   router.push("/login");
// }
</script>

<template>
  <div
    class="bg-gradient-to-t from-[#FF742F] to-[#FFC600] w-full !z-[-99]"
    :class="route.path != '/' ? 'overflow-hidden h-screen' : ''"
  >
    <slot />
  </div>
</template>
