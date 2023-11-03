<script setup lang="ts">
import { ref } from "vue";
import { useInfo } from "~/store/info";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/vue";
import dayjs from "dayjs";
import "dayjs/locale/th";
import buddhistEra from "dayjs/plugin/buddhistEra";
dayjs.extend(buddhistEra);

const { fetchUser } = useInfo();
await fetchUser({ uid: "55555" });
const { userInfo } = storeToRefs(useInfo());
//@ts-ignore
let userData = ref<userInfo>(userInfo.value);
</script>

<template>
  <Navbar />
  <div class="w-full flex justify-center px-7 py-2 relative">
    <div
      class="w-full h-full top-0 bg-white rounded-t-[30px] !z-[0] translate-y-[10vh] absolute"
    ></div>
    <div class="max-w-3xl min-h-[90vh] w-full z-10">
      <div class="flex flex-col gap-2 w-full relative">
        <section class="">
          <h1 class="text-xl text-white font-semibold">TRANSACTION</h1>
          <p class="text-xs text-slate-50 opacity-70">
            {{ dayjs().subtract(7, "day").locale("th").format("DD MMM BB") }} -
            {{ dayjs().locale("th").format("DD MMM BB") }}
          </p>
        </section>

        <section class="w-full">
          <div
            class="flex flex-col gap-2 w-full mt-[15%] max-h-[80vh] overflow-y-scroll pb-40"
          >
            <div
              v-for="(item, indx) in userData.historylog.slice(0, 20)"
              class="w-full"
            >
              <Disclosure :key="indx">
                <DisclosureButton
                  class="flex justify-between items-center border-b pb-2 w-full"
                >
                  <div class="flex flex-col items-start">
                    <p class="text-sm font-semibold text-[#161618]">
                      {{ item.fcash_type }}
                    </p>

                    <p class="text-xs text-[#161618] opacity-75 min-w-[100px]">
                      {{ item.trn_time }}
                    </p>
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
                </DisclosureButton>

                <transition
                  enter-active-class="transition duration-100 ease-out"
                  enter-from-class="transform scale-95 opacity-0"
                  enter-to-class="transform scale-100 opacity-100"
                  leave-active-class="transition duration-75 ease-out"
                  leave-from-class="transform scale-100 opacity-100"
                  leave-to-class="transform scale-95 opacity-0"
                >
                  <DisclosurePanel class="w-full py-2">
                    <div class="w-full flex justify-between">
                      <p class="text-xs text-[#161618] opacity-75">Ref.</p>
                      <p class="text-xs text-[#161618]">
                        {{ item.ref_no }}
                      </p>
                    </div>

                    <div class="w-full flex justify-between">
                      <p class="text-xs text-[#161618] opacity-75">
                        Transacntion Point
                      </p>
                      <p class="text-xs text-[#161618]">
                        {{ item.vendor_name }}
                      </p>
                    </div>

                    <div
                      v-if="item.food_list != null"
                      class="w-full flex justify-between"
                    >
                      <p class="text-xs text-[#161618] opacity-75">Food List</p>

                      <div>
                        <div v-for="(list, indx) in item.food_list.split(',')">
                          <p
                            :key="indx"
                            class="text-xs text-[#161618] text-right"
                          >
                            {{ list }}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div class="w-full flex justify-between mt-2">
                      <p class="text-xs text-[#161618] opacity-75">
                        Wallet Balance
                      </p>
                      <p class="text-xs text-[#161618] font-semibold">
                        ${{ item.bal_amount }}
                      </p>
                    </div>
                  </DisclosurePanel>
                </transition>
              </Disclosure>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
