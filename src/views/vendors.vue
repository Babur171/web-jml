<template>
  <div class="space-y-5">
    <Advanced2
      :rows="users"
      @userProfile="showUserProfile"
      @update="getUsers"
      @pageChanged="pageChanged"
      :paginationOptions="paginationOptions"
      @searchText="search"
      v-if="!displayProfile"
    />
    <Profiles :user="user" v-if="displayProfile" />
  </div>
</template>
<script>
import Advanced2 from './table/advanced/Advanced2';
import apiClients from '@/utils/apiClients';
import config from '@/config';
import Profiles from '@/views/profile';
export default {
  components: {
    Advanced2,
    Profiles,
  },
  data() {
    return {
      users: [],
      user: null,
      displayProfile: false,
      paginationOptions: { current: 1, perPage: 10, total: 25 },
      searchText: '',
    };
  },
  mounted() {
    this.getUsers();
    this.timerId = null;
    this.searchText = '';
  },
  methods: {
    pageChanged(paginationOptions) {
      console.log(paginationOptions);
      this.paginationOptions = paginationOptions;
      this.getUsers();
    },
    async showUserProfile(id) {
      const url = config.apiUrl + `users/${id}`;
      const response = await apiClients.get(url);
      this.user = this.users.find((user) => user._id == id);
      this.displayProfile = true;
    },
    debounce(searchText, delay = 1000) {
      clearTimeout(this.timerId);
      this.timerId = setTimeout(() => {
        this.getUsers(searchText);
      }, delay);
    },
    async search(searchText) {
      this.debounce(searchText);
    },

    async getUsers(searchText) {
      const url =
        config.apiUrl +
        `users?role=vendor&page=${this.paginationOptions.current}&limit=${
          this.paginationOptions.perPage
        }${searchText ? `&search=${searchText}` : ''}`;
      const response = await apiClients.get(url);
      this.users = response.data.users;
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
