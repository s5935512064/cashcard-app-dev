import { useAuthStore } from "~/store/auth";
import { storeToRefs } from "pinia";
import liff, { type Liff } from "@line/liff";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const runtimeConfig = useRuntimeConfig();
  const { authenticateUser } = useAuthStore();

  async function init() {
    await liff
      .init({
        liffId: runtimeConfig.public.lineliff,
      })
      .then(() => {
        if (!liff.isLoggedIn()) {
          const destinationUrl = window.location.href;
          liff.login({ redirectUri: destinationUrl });
        }

        // if (liff.isLoggedIn()) {
        //   // console.log('LIFF isLoggedIn', liff.isLoggedIn());
        //   liff
        //     .getProfile()
        //     .then(async (profile) => {
        //       await authenticateUser({ profile });
        //       const { authenticated } = storeToRefs(useAuthStore());
        //       console.log(to, from);

        //       // if (authenticated.value) {
        //       //   return navigateTo("/");
        //       // } else {
        //       //   abortNavigation();
        //       //   return navigateTo("/login");
        //       // }
        //     })
        //     .catch((err) => {
        //       console.log("getProfile failed", err);
        //     });
        // }
      })
      .catch((error: Error) => {
        console.log("LIFF init failed.");
        return Promise.reject(error);
      });
  }

  // init();

  // if(initResult) {

  // } else {
  // }

  //   const { authenticated } = storeToRefs(useAuthStore());

  // console.log(initResult.value);

  //   if (initResult.value) {
  //     authenticated.value = true;
  //   }

  //   if (initResult.value && to?.name === "login") {
  //     return navigateTo("/");
  //   }

  //   if (!initResult.value && to?.name !== "login") {
  //     abortNavigation();
  //     return navigateTo("/login");
  //   }
});
