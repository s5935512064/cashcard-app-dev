import { defineStore } from "pinia";

interface UserPayloadInterface {
  uid: string;
}

export const useInfo = defineStore("info", {
  state: () => ({
    userInfo: {},
  }),
  actions: {
    async fetchUser({ uid }: UserPayloadInterface) {
      const runtimeConfig = useRuntimeConfig();
      const { data, pending }: any = await useFetch(
        `${runtimeConfig.public.apiBase}api/sfm/checkauth`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer 6b61f17657d209da9d0d4eec3f61c9b61d1660ecfd5a696388bfd9d211c42324646389b65a64953a1704316d91930239b22e9530457a10a35f144fd5d74c2749`,
          },
          body: {
            uid: uid,
          },
        }
      );

      this.userInfo = data._rawValue;
    },
  },
});
