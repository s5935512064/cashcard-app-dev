<script setup lang="ts">
import liff from "@line/liff";

useSeoMeta({
  title: "E-Service Sindhorn Food Market",
  description: "The Intuitive Vue Framework.",
});

// definePageMeta({
//   middleware: ["auth"],
//   // or middleware: 'auth'
// });

const layout = "default";

// console.log(message, error);
</script>

<template>
  <NuxtLayout :name="layout">
    <NuxtPage />
  </NuxtLayout>
</template>

<style></style>
