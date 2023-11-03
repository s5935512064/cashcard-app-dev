import { defineStore } from "pinia";

interface UserPayloadInterface {
  profile: any;
}

export const useAuthStore = defineStore("auth", {
  state: () => ({
    authenticated: false,
    loading: false,
    userInfo: {},
  }),
  actions: {
    async authenticateUser({ profile }: UserPayloadInterface) {
      const runtimeConfig = useRuntimeConfig();
      const { data, pending }: any = await useFetch(
        `${runtimeConfig.public.apiBase}/api/sfm/checkauth`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer 6b61f17657d209da9d0d4eec3f61c9b61d1660ecfd5a696388bfd9d211c42324646389b65a64953a1704316d91930239b22e9530457a10a35f144fd5d74c2749`,
          },
          body: {
            uid: profile.userId,
            displayName: profile.displayName,
            pictureUrl: profile.pictureUrl,
          },
        }
      );

      this.loading = pending;
      this.userInfo = data.value;

      if (data.value.status == "registered") {
        this.authenticated = true;
      } else {
        this.authenticated = false;
      }

      // this.userInfo = data._rawValue;

      // if (data.value && data._rawValue.status == "registered") {
      //   const token = useCookie("token");
      //   token.value = "true";
      //   this.authenticated = true; // set authenticated  state value to true
      // }
    },

    logUserOut() {
      const token = useCookie("token"); // useCookie new hook in nuxt 3
      this.authenticated = false; // set authenticated  state value to false
      token.value = null; // clear the token cookie
    },
  },
});
