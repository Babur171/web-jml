<template>
  <div class="space-y-5">
    <Advanced2
      v-if="!isAddAdmin && !displayProfile"
      :rows="users"
      @update="getUsers"
      @userProfile="showUserProfile"
      :admin="'true'"
      @addAdmin="addAdmin"
      @pageChanged="pageChanged"
      @searchText="search"
      :paginationOptions="paginationOptions"
    />
    <Profiles :user="user" v-if="displayProfile" />
    <div v-if="isAddAdmin">
      <div class="text-base text-slate-600 dark:text-slate-300">
        <h2
          class="capitalize leading-6 tracking-wider font-medium text-base text-white"
        >
          Add Admin
        </h2>
        <Textinput
          label="Name"
          class=""
          type="text"
          placeholder="Type name"
          name="name"
          v-model="newAdmin.name"
          :error="newAdminError.name"
        />
        <Textinput
          label="Email"
          type="email"
          class="mt-2"
          placeholder="Type email"
          name="email"
          v-model="newAdmin.email"
          :error="newAdminError.email"
        />
        <Textinput
          label="Phone Number"
          type="number"
          class="mt-2"
          placeholder="Type phone number"
          name="number"
          v-model="newAdmin.phoneNumber"
          :error="newAdminError.phoneNumber"
        />
        <Button
            text="Submit"
            btnClass="btn-dark mt-4"
            @click="submitNewAdmin"
          ></Button>
      </div>
    </div>
  </div>
</template>
<script>
import Advanced2 from './table/advanced/Advanced2';
import apiClients from '@/utils/apiClients';
import config from '@/config';
import Profiles from '@/views/profile';
import Button from '@/components/Button';
import Textinput from '@/components/Textinput';
export default {
  components: {
    Advanced2,
    Button,
    Textinput,
    Profiles,
  },
  data() {
    return {
      users: [],
      user: {},
      displayProfile: false,
      isAddAdmin: false,
      newAdmin: {
        name: '',
        email: '',
        phoneNumber: '',
        role: 'admin',
      },
      newAdminError: {
        name: '',
        email: '',
        phoneNumber: '',
      },
      paginationOptions: { current: 1, perPage: 10, total: 25 },
    };
  },
  mounted() {
    this.getUsers();
    this.timerId = null;
  },
  methods: {
    addAdmin() {
      this.isAddAdmin = true;
    },
    pageChanged(paginationOptions) {
      this.paginationOptions = paginationOptions;
      this.getUsers();
    },
    validateNewAdmin() {
      let isValid = true;

      if (!this.newAdmin.email) {
        isValid = false;
        this.newAdminError.email = 'Please enter email';
      } else this.newAdminError.email = '';

      if (!this.newAdmin.phoneNumber) {
        isValid = false;
        this.newAdminError.phoneNumber = 'Please enter phone number';
      } else this.newAdminError.phoneNumber = '';

      if (!this.newAdmin.name) {
        isValid = false;
        this.newAdminError.name = 'Please enter name';
      } else this.newAdminError.name = '';

      return isValid;
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
    async showUserProfile(id) {
      this.user = this.users.find((user) => user._id == id);
      console.log(this.user)
      this.displayProfile = true;
    },
    async submitNewAdmin() {
      if (!this.validateNewAdmin()) return;
      const url = config.apiUrl + `users`;
      const response = await apiClients.post(url, this.newAdmin);
      console.log(response.data);
      this.isAddAdmin = false;
      this.getUsers();
      this.newAdmin.email = '';
      this.newAdmin.phoneNumber = '';
      this.newAdmin.name = '';
    },
    async getUsers(searchText = '') {
      const url =
        config.apiUrl +
        `users?role=admin&page=${this.paginationOptions.current}&limit=${
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
