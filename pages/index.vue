<script setup lang="ts">
import { ref } from "vue";
import { Switch } from "@headlessui/vue";
import { useInfo } from "~/store/info";
import dayjs from "dayjs";
import "dayjs/locale/th";
import buddhistEra from "dayjs/plugin/buddhistEra";
dayjs.extend(buddhistEra);
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/vue";

const { fetchUser } = useInfo();
// await fetchUser({ uid: "55555" });
const { userInfo } = storeToRefs(useInfo());

//@ts-ignore
let userData = ref<userInfo>(userInfo.value);
//@ts-ignore
const cardActive = ref(userData.value.fcarddata.is_void == "0" ? true : false);
const enabled = ref(true);
const voidMsg = ref("");
const isOpen = ref(false);

function closeModal() {
  isOpen.value = false;
}
function openModal() {
  isOpen.value = true;
}

async function voidCard() {
  const runtimeConfig = useRuntimeConfig();
  const { data, pending }: any = await useFetch(
    `${runtimeConfig.public.apiBase}api/sfm/status`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer 6b61f17657d209da9d0d4eec3f61c9b61d1660ecfd5a696388bfd9d211c42324646389b65a64953a1704316d91930239b22e9530457a10a35f144fd5d74c2749`,
      },
      body: {
        uid: "55555",
        //@ts-ignore
        fcard_no: userData.value.fcard_no,
        isvoid: cardActive.value ? "1" : "0",
        voidmsg: voidMsg.value,
      },
    }
  );

  if (data.value.server_status == 200) {
    cardActive.value = !cardActive.value;
    closeModal();
  }
}
</script>

<template>
  <Navbar />
  <div class="w-full flex justify-center items-center px-5 py-2 relative h-fit">
    <div
      class="w-full h-full bg-white rounded-t-[30px] !z-[0] translate-y-[10%] absolute"
    ></div>
    <div class="max-w-3xl h-fit w-full z-10">
      <div class="flex flex-col gap-4 w-full items-center">
        <section class="group h-fit overflow-hidden drop-shadow relative">
          <div
            :class="cardActive ? 'animate-shine' : ''"
            class="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-40 delay-100 z-10"
          ></div>

          <div class="w-full h-full relative">
            <img
              src="/image/cash_card.jpg"
              alt="cash_card"
              style="object-fit: contain; object-position: center"
              :class="cardActive ? '' : 'grayscale'"
              class="rounded-xl overflow-hidden duration-200 transition-colors"
            />

            <p
              class="text-xs mt-1 flex items-center gap-2 absolute text-white z-10 top-2 left-4"
            >
              <span class="">CARD NO.</span>
              {{ userData.fcard_no }}
            </p>

            <div class="absolute top-2 right-2">
              <Switch
                @click="openModal"
                :class="cardActive ? 'bg-[#28C76F]' : 'bg-gray-200'"
                class="relative inline-flex h-6 w-11 items-center rounded-full outline-none"
              >
                <span class="text-[5px] absolute text-white sr-only"
                  >Active</span
                >
                <span
                  :class="cardActive ? 'translate-x-6' : 'translate-x-1'"
                  class="inline-block h-4 w-4 transform rounded-full bg-white transition"
                />
              </Switch>
            </div>
          </div>
        </section>

        <section class="w-full flex flex-col">
          <p v-if="!cardActive" class="text-sm text-red-400 mb-2">
            บัตรถูกระงับการใช้งาน เนื่องจากพบว่ามีการแจ้งสาเหตุ:{{
              userData.fcarddata.void_msg != null
                ? userData.fcarddata.void_msg
                : voidMsg
            }}
          </p>

          <p class="uppercase font-semibold text-lg">
            {{ userData.fcard_name }}
          </p>

          <div class="w-full grid grid-cols-1 mt-1">
            <p class="text-sm">{{ userData.fcarddata.renter_name }}</p>
            <p class="text-sm flex items-center gap-1">
              <span class="font-semibold">บัตรหมดอายุ :</span>
              {{
                dayjs(userData.fcarddata.fcard_enddate)
                  .locale("th")
                  .format("DD MMM BB")
              }}
            </p>
          </div>

          <!-- <div class="flex items-center">
  <p class="text-sm font-semibold min-w-[75px]">Name:</p>
  <p class="text-sm">Nathawut Thippasoet</p>
</div> -->

          <!-- <div class="flex items-center">
  <p class="text-sm font-semibold min-w-[75px]">Card ID:</p>
  <p class="text-sm">12-3456-899</p>
</div>

<div class="flex items-center">
  <p class="text-sm font-semibold min-w-[75px]">Expired:</p>
  <p class="text-sm">31 December 2023</p>
</div> -->
        </section>

        <section class="w-full h-full mt-1">
          <div
            :class="cardActive ? 'justify-between' : 'justify-center grayscale'"
            class="w-full h-full min-h-[150px] bg-gradient-to-l from-[#FF742F] to-[#FFC600] rounded-md shadow p-5 flex flex-col items-center relative"
          >
            <div class="flex flex-col items-center">
              <p class="text-sm text-white">ยอดเงินในกระเป๋า</p>
              <p class="text-4xl font-bold text-white">
                ฿{{ userData.fcarddata.fcard_value }}
              </p>
            </div>

            <NuxtLink
              to="/topup"
              v-if="cardActive"
              class="w-full font-semibold px-4 py-2 rounded-md bg-white bottom-4 shadow text-center flex items-center justify-center gap-1"
            >
              เติมเงิน
              <!-- <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-5 h-5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3"
                />
              </svg> -->
            </NuxtLink>
          </div>
        </section>

        <section class="border-t w-full flex flex-col pt-4">
          <div class="flex justify-between items-center">
            <p class="uppercase font-semibold">รายการล่าสุด</p>

            <NuxtLink to="/transaction">
              <div
                class="w-7 h-7 rounded-full bg-gradient-to-t from-[#FF742F] to-[#FFC600] relative flex justify-center items-center text-white opacity-75 hover:opacity-100 duration-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-5 h-5"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                  />
                </svg>
              </div>
            </NuxtLink>
          </div>

          <div
            v-for="(item, indx) in userData.historylog.slice(0, 5)"
            class="flex flex-col gap-2 w-full mt-4"
          >
            <div
              :key="indx"
              class="flex justify-between items-center border-b pb-2"
            >
              <div>
                <!-- <p class="text-xs text-[#161618] opacity-75">
                  {{ item.ref_no }}
                </p> -->
                <p class="text-sm font-semibold text-[#161618]">
                  {{ item.fcash_type }}
                </p>

                <div class="flex items-center gap-7">
                  <p class="text-xs text-[#161618] opacity-75 min-w-[100px]">
                    {{ item.trn_time }}
                  </p>
                </div>
              </div>

              <p
                class="text-sm font-semibold"
                :class="
                  item.fcash_type == 'เติมเงิน'
                    ? 'text-[#28C76F]'
                    : 'text-[#9C1300]'
                "
              >
                {{ item.trn_amount }}
              </p>
            </div>

            <!-- 
            <div class="flex justify-between items-center border-b pb-2">
              <div>
                <p class="text-sm font-semibold text-[#161618]">Top Up</p>
                <p class="text-xs">Ref ID: A-51D78SSGWIPC</p>
              </div>

              <p class="text-sm font-semibold text-[#28C76F]">฿300.00</p>
            </div>

            <div class="flex justify-between items-center border-b pb-2">
              <div>
                <p class="text-sm font-semibold text-[#161618]">Food</p>
                <p class="text-xs">Ref ID: A-51D78SSGWIPC</p>
              </div>

              <p class="text-sm font-semibold text-[#9C1300]">฿70.00</p>
            </div>

            <div class="flex justify-between items-center border-b pb-2">
              <div>
                <p class="text-sm font-semibold text-[#161618]">Top up</p>
                <p class="text-xs">Ref ID: A-51D78SSGWIPC</p>
              </div>

              <p class="text-sm font-semibold text-[#28C76F]">฿100.00</p>
            </div> -->
          </div>
        </section>
      </div>
    </div>
  </div>

  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="closeModal" class="relative z-10">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black/25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="flex min-h-screen items-center justify-center p-5 text-center"
        >
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="w-full max-w-md transform overflow-hidden rounded-xl bg-white p-6 py-8 text-left align-middle shadow-xl transition-all"
            >
              <DialogTitle as="h3" class="text-lg font-semibold leading-6">
                <span>{{ cardActive ? "ระงับการใช้งาน" : "เปิดใช้งาน" }}</span
                >บัตรหมายเลข {{ userData.fcard_no }}
              </DialogTitle>

              <form v-if="cardActive" class="mt-2">
                <textarea
                  name="textarea"
                  v-model="voidMsg"
                  id="textarea"
                  cols="30"
                  rows="3"
                  max-rows="6"
                  class="border w-full rounded-md px-4 pt-2 placeholder:text-sm outline-none"
                  placeholder="สาเหตุในการระงับ..."
                ></textarea>
              </form>

              <div class="mt-4 flex items-center justify-between gap-4 w-full">
                <button
                  type="button"
                  class="inline-flex justify-center rounded-md bg-gradient-to-l from-[#FF742F] to-[#FFC600] text-white px-4 py-2 font-medium w-full ring-0 outline-none"
                  @click="voidCard"
                >
                  ยืนยัน<span>{{
                    cardActive ? "ระงับการใช้งาน" : "เปิดใช้งาน"
                  }}</span>
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<style scoped></style>
