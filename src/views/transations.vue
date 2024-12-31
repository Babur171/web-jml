<template>
  <div class="space-y-5">
    <Advanced3
      :rows="transactions"
      @userProfile="showUserProfile"
      @pageChanged="pageChanged"
      :paginationOptions="paginationOptions"
      @searchText="search"
      v-if="!displayProfile"
    />
    <Profiles :user="user" v-if="displayProfile" />
  </div>
</template>
<script>
import Advanced2 from "./table/advanced/Advanced2";
import apiClients from "@/utils/apiClients";
import Profiles from "@/views/profile";
import config from "@/config";
import Advanced3 from "./table/advanced/Advanced3.vue";
export default {
  components: {
    Advanced2,
    Profiles,
    Advanced3
  },
  data() {
    return {
      transactions: [],
      user: null,
      displayProfile: false,
      paginationOptions: { current: 1, perPage: 10, total: 10 },
    };
  },
  mounted() {
    this.getTransactions();
  },
  methods: {
    pageChanged(paginationOptions) {
      this.paginationOptions = paginationOptions;
      this.getTransactions();
    },
    debounce(searchText, delay = 1000) {
      clearTimeout(this.timerId);
      this.timerId = setTimeout(() => {
        this.getTransactions(searchText);
      }, delay);
    },
    async search(searchText) {
      this.debounce(searchText);
    },
    async showUserProfile(id) {
      this.user = this.transactions.find((user) => user._id == id);
      this.displayProfile = true;
    },
    async getTransactions(searchText = "") {
      const url =
        config.apiUrl +
        `transactions?page=${this.paginationOptions.current}&limit=${
          this.paginationOptions.perPage
        }${searchText ? `&search=${searchText}` : ""}`;
      const response = await apiClients.get(url);
      console.log("response", response);
      this.transactions = response.data.transactions;
      this.paginationOptions.total = response.data.count;
    },
  },
};
</script>
<style lang="scss">
.vgt-inner-wrap {
  @apply shadow-none;
}
</style>
