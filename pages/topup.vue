<script setup lang="ts">
import { ref } from "vue";
import { useInfo } from "~/store/info";

const { fetchUser } = useInfo();
await fetchUser({ uid: "55555" });
const { userInfo } = storeToRefs(useInfo());
//@ts-ignore
let userData = ref<userInfo>(userInfo.value);
const amont_list = ref([50, 100, 200, 300, 400, 500]);
const amont = ref<string>("");
const qrtopupInfo = ref({
  amont: "",
  ref1: "",
  qrImg: "",
});

const counter = ref(90);

async function getQR(value: number) {
  const runtimeConfig = useRuntimeConfig();
  const { data, pending }: any = await useFetch(
    `${runtimeConfig.public.apiBase}api/sfm/qrtopup`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer 6b61f17657d209da9d0d4eec3f61c9b61d1660ecfd5a696388bfd9d211c42324646389b65a64953a1704316d91930239b22e9530457a10a35f144fd5d74c2749`,
      },
      body: {
        uid: "55555",
        fill_amount: String(value),
      },
    }
  );

  if (data.value.server_status == 200) {
    amont.value = data.value.data.amount;
    qrtopupInfo.value.amont = data.value.data.amount;
    qrtopupInfo.value.ref1 = data.value.data.ref1;
    //@ts-ignore
    qrtopupInfo.value.qrImg = data.value.data.scb.data.qrImage;
    countDown();
  }
}

async function confirmPayment() {
  const runtimeConfig = useRuntimeConfig();
  const { data, pending }: any = await useFetch(
    `${runtimeConfig.public.apiBase}api/sfm/inquiry`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer 6b61f17657d209da9d0d4eec3f61c9b61d1660ecfd5a696388bfd9d211c42324646389b65a64953a1704316d91930239b22e9530457a10a35f144fd5d74c2749`,
      },
      body: {
        uid: "55555",
        ppno: qrtopupInfo.value.ref1,
      },
    }
  );

  if (data.value.server_status == 200) {
    navigateTo("/status?status=success");
  } else {
    navigateTo("/status?status=fail");
  }
}

function download() {
  if (qrtopupInfo.value.qrImg != "") {
    const link = document.createElement("a");
    link.href = `data:image/png;base64,${qrtopupInfo.value.qrImg}`;
    link.download = `slip${qrtopupInfo.value.ref1}.png`;
    link.target = "_blank";
    link.click();
  }
}

function countDown() {
  //If the counter has not reached the end
  if (counter.value > 0) {
    //Wait 1 second, then decrement the counter
    setTimeout(() => {
      counter.value--;
      countDown();
    }, 1000);
  }
}

// watch(() => {
//   if (counter.value > 0) {
//     countDown();
//   }
// });
</script>

<template>
  <Navbar />
  <div class="w-full flex justify-center items-center px-7 py-2 relative h-fit">
    <div
      class="w-full h-full bg-white rounded-t-[30px] !z-[0] translate-y-[10%] absolute"
    ></div>
    <div class="max-w-3xl min-h-[90vh] w-full z-10">
      <div class="flex flex-col w-full gap-4 relative">
        <section class="">
          <h1 class="text-xl text-white font-semibold">TOP UP</h1>
        </section>

        <section
          class="w-full absolute mt-[30%] max-h-[80vh] overflow-y-scroll pb-40"
        >
          <div class="flex flex-col w-full">
            <p class="text-sm font-semibold text-[#6D6565]">TOP UP AMOUNT</p>
            <p class="text-xs text-[#6D6565]">
              Wallet Balance: ฿{{ userData.fcarddata.fcard_value }}
            </p>
          </div>

          <section v-if="amont != ''" v-motion-fade>
            <div class="mt-7 flex flex-col gap-1 items-center justify-center">
              <p class="text-xs text-center">Scan QR Code for payment</p>

              <div class="w-44 h-44 relative">
                <img
                  v-bind:src="`data:image/png;base64,${qrtopupInfo.qrImg}`"
                  alt="qrcode"
                />
              </div>

              <div>
                <p class="text-sm text-[#6D6565] text-center">
                  Ref 1 : {{ qrtopupInfo.ref1 }}
                </p>

                <p class="text-sm text-[#6D6565] text-center">
                  Amont : ฿{{ qrtopupInfo.amont }}
                </p>
              </div>

              <p class="text-base font-normal text-red-400 mt-4">
                กรุณาชำระภายใน {{ counter }} วินาที
              </p>

              <div
                class="mt-4 flex flex-col items-center gap-1 w-full relative"
              >
                <button
                  type="button"
                  @click="download"
                  class="w-fit px4 py-2 text-center outline-none flex items-center gap-2 justify-center text-sm"
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
                      d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                    />
                  </svg>

                  บันทึกรูปภาพ
                </button>

                <button
                  @click="confirmPayment"
                  type="button"
                  :disabled="counter == 0 ? false : true"
                  class="bg-gradient-to-l from-[#FF742F] to-[#FFC600] text-white w-full px4 py-2 rounded-full text-center outline-none shadow font-semibold disabled:grayscale"
                >
                  ยืนยันการชำระเงิน
                </button>
              </div>
            </div>
          </section>

          <div class="w-full grid grid-cols-3 gap-4 mt-7">
            <button
              v-for="(item, indx) in amont_list"
              @click="() => getQR(item)"
              type="button"
              :key="indx"
              :disabled="amont != '' && amont != String(item)"
              class="w-full h-full px-7 py-2 bg-[#FFC600]/50 text-[#F77014] font-semibold rounded-md shadow-sm disabled:grayscale"
            >
              {{ item }}
            </button>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
