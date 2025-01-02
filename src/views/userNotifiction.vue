<template>
  <div class="space-y-5">
    <Advanced5
      :rows="userNotification"
      @approveNotification="approveNotification"
      @pageChanged="pageChanged"
      :paginationOptions="paginationOptions"
      @searchText="search"
    />
    <Profiles :user="user" v-if="displayProfile" />
  </div>
</template>
<script>
import Advanced5 from "./table/advanced/Advanced5";
import apiClients from "@/utils/apiClients";
import config from "@/config";
import Profiles from "@/views/profile";
export default {
  components: {
    Advanced5,
    Profiles,
  },
  data() {
    return {
      userNotification: [],
      user: null,
      displayProfile: false,
      paginationOptions: { current: 1, perPage: 10, total: 25 },
      searchText: "",
    };
  },
  mounted() {
    this.getUserNotification();
    this.timerId = null;
    this.searchText = "";
  },
  methods: {
    pageChanged(paginationOptions) {
      console.log(paginationOptions);
      this.paginationOptions = paginationOptions;
      this.getUserNotification();
    },

    debounce(searchText, delay = 1000) {
      clearTimeout(this.timerId);
      this.timerId = setTimeout(() => {
        this.getUserNotification(searchText);
      }, delay);
    },
    async search(searchText) {
      this.debounce(searchText);
    },
    async approveNotification(id) {
      const url = config.apiUrl + `users/notification-approvals/${id}`;
      const response = await apiClients.patch(url);
    },
    async getUserNotification(searchText) {
      const url =
        config.apiUrl +
        'users/notification-approvals'
      const response = await apiClients.get(url);
      if(response?.success){
        this.userNotification = response.data.users;
        this.paginationOptions.total = response.data.count;
      }
    },
  },
};
</script>
<style lang="scss">
.vgt-inner-wrap {
  @apply shadow-none;
}
</style>
