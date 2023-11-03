<script setup lang="ts">
import { ref, isProxy, toRaw } from "vue";
import { storeToRefs } from "pinia";
import { useAuthStore } from "~/store/auth";

const { userInfo } = storeToRefs(useAuthStore());

// await fetchUser({ uid: "55555" });

const router = useRouter();
const consent = ref(false);

let userData = ref({
  //@ts-ignore
  card_name: userInfo.value ? userInfo.value.fcard_name : "",
  //@ts-ignore
  card_no: userInfo.value ? userInfo.value.fcard_no : "",
  //@ts-ignore
  card_org: userInfo.value.fcarddata
    ? //@ts-ignore
      userInfo.value.fcarddata.renter_name
    : "",
  //@ts-ignore
  img_profile: userInfo.value ? userInfo.value.pictureUrl : null,
});

// const submitForm = async () => {
//   // await authenticateUser({ uid: "55555" });
//   if (authenticated.value) {
//     router.push("/");
//   }
// };

console.log(userInfo);
</script>

<template>
  <div
    class="w-full h-[100vh] p-7 relative flex flex-col items-center bg-white"
  >
    <div class="max-w-lg w-full h-full flex flex-col items-center gap-7 pb-12">
      <div class="w-32 relative mt-2">
        <img src="/image/sindhorn_market.png" alt="logo_foodmarket" />
      </div>

      <form
        class="flex flex-col items-center justify-center gap-4 w-full h-full"
      >
        <div class="flex-1 flex flex-col items-center gap-2 w-full">
          <div class="w-36 h-36 relative rounded-full overflow-hidden">
            <img src="/image/profile-picture-5.jpg" alt="Rounded avatar" />
          </div>

          <div class="w-full">
            <label for="name" class="text-sm font-medium text-[#161618]"
              >Name:</label
            >
            <input
              type="text"
              name="name"
              id="name"
              :value="userData.card_name"
              disabled
              class="w-full rounded-full border px-4 py-2"
            />
          </div>

          <div class="w-full">
            <label for="name" class="text-sm font-medium text-[#161618]"
              >Card ID:</label
            >
            <input
              type="text"
              name="name"
              id="name"
              :value="userData.card_no"
              disabled
              class="w-full rounded-full border px-4 py-2"
            />
          </div>

          <div class="w-full">
            <label for="name" class="text-sm font-medium text-[#161618]"
              >Company:</label
            >
            <input
              type="text"
              name="name"
              id="name"
              :value="userData.card_org"
              disabled
              class="w-full rounded-full border px-4 py-2"
            />
          </div>

          <div class="w-full flex items-start gap-2 my-2">
            <input
              v-model="consent"
              type="checkbox"
              name="policy"
              id="policy"
              class="rounded-full border px-4 py-2 mt-1 accent-[#FF742F] text-white"
            />
            <label for="policy" class="text-sm text-[#161618]"
              >I have read and agree the
              <NuxtLink
                to="https://siamsindhorn.com/privacy"
                target="_blank"
                class="text-[#FF742F]"
                >Privacy Policy</NuxtLink
              >
            </label>
          </div>
        </div>

        <button
          type="submit"
          @click.prevent="submitForm"
          :disabled="consent == true ? false : true"
          :class="[
            consent == true
              ? 'bg-gradient-to-l from-[#FF742F] to-[#FFC600] text-white'
              : 'bg-gray-300 text-white',
            'w-full px4 py-2  rounded-full text-center outline-none shadow',
          ]"
        >
          SUBMIT
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped></style>
