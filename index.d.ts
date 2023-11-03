import "vue";

declare module "vue/types/vue" {
  interface Vue {
    $encodeBase64: (value: string) => string;
    $decodeBase64: (value: string) => string;
  }

  interface Vue {
    $liffInit: Promise<void>;
  }
}

declare module "@nuxt/types" {
  // nuxtContext.app.$lines inside asyncData, fetch, plugins, middleware, nuxtServerInit
  interface NuxtAppOptions {
    $encodeBase64: (value: string) => string;
    $decodeBase64: (value: string) => string;
  }
  // nuxtContext.$lines
  interface Context {
    $encodeBase64: (value: string) => string;
    $decodeBase64: (value: string) => string;
  }

  interface Context {
    $liffInit: Promise<void>;
  }
}

declare module "vuex/types/index" {
  // this.$lines inside Vuex stores
  // eslint-disable-next-line
  interface Store<S> {
    $encodeBase64: (value: string) => string;
    $decodeBase64: (value: string) => string;
  }
}

declare module "nuxt/schema" {
  interface RuntimeConfig {
    apiSecret: string;
  }
  interface PublicRuntimeConfig {
    apiBase: string;
  }
}

declare global {
  interface FcardData {
    cannot_pay: string | null;
    cannot_refill: string | null;
    cannot_refund: string | null;
    fcard_enddate: string | null;
    fcard_id: string | null;
    fcard_no: string | null;
    fcard_note: string | null;
    fcard_owner: string | null;
    fcard_startdate: string | null;
    fcard_status: string | null;
    fcard_tel: string | null;
    fcard_title: string | null;
    fcard_type: string | null;
    fcard_value: string | null;
    ftype_desc: string | null;
    id_statusvoid: string | null;
    is_void: string | null;
    last_used: string | null;
    mfcard_tagid: string | null;
    name: string | null;
    renter_id: string | null;
    renter_name: string | null;
    useable_date: string | null;
    void_msg: string | null;
  }

  interface historyInfo {
    bal_amount: string | null;
    cashcard_list: string | null;
    fcash_type: string | null;
    food_list: string | null;
    ref_no: string | null;
    trn_amount: string | null;
    trn_time: string | null;
    trn_time2: string | null;
    vendor_name: string | null;
  }

  interface userInfo {
    displayName: string | null;
    fcard_name: string | null;
    fcard_no: string | null;
    fcard_tag: string | null;
    pictureUrl: string | null;
    pvm_no: string | null;
    server_status: number;
    status: string | null;
    userId: string | null;
    setting?: any;
    fcarddata: FcardData;
    historylog: Array<historyInfo>;
  }
}

export {};
