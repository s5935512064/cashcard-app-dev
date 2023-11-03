<script setup lang="ts">
import { ref } from "vue";
import { Switch } from "@headlessui/vue";
const enabled = ref(false);

const onChange = async (e: any) => {
  const files = e.target.files;
  const formData = new FormData();
  formData.append("file", files[0]);
  console.log(formData);
  await useFetch("/api/upload", {
    method: "post",
    body: formData,
  });
};
</script>

<template>
  <Navbar />
  <div
    class="w-full flex justify-center items-center px-7 py-2 relative h-full"
  >
    <div class="max-w-3xl w-full z-10 min-h-[90vh] h-full flex justify-center">
      <div class="flex flex-col w-full relative items-center justify-center">
        <form>
          <label for="file">File: </label>
          <input type="file" name="file" @change="onChange" />
        </form>

        <p class="uppercase text-xl text-white font-semibold text-center">
          TOP UP successful
        </p>
        <p class="text-sm text-center text-slate-50 opacity-70">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet at,
          adipisci corrupti enim reiciendis dicta incidunt ea nobis
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
