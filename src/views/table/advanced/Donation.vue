<template>
  <div>
    <Card noborder>
      <div
        class="md:flex pb-6 md:space-y-0 space-y-3 justify-between items-center"
      >
        <InputGroup
          v-model="searchTerm"
          @keypress="search"
          @keydown="search"
          placeholder="Search"
          type="text"
          prependIcon="heroicons-outline:search"
          merged
        />
        <!-- <button type="button" class="capitalize" @click="search">
            Search
          </button> -->
      </div>
      <div class="-mx-6">
        <vue-good-table
          :columns="columns"
          styleClass=" vgt-table centered  lesspadding2 table-head "
          :rows="rows"
          :pagination-options="{
            enabled: true,
            perPage: perpage,
          }"
          :sort-options="{
            enabled: true,
          }"
          :select-options="{
            enabled: false,
          }"
        >
          <template v-slot:table-row="props">
            <span v-if="props.column.field == 'name'" class="flex">
              <span class="w-7 h-7 rounded-full ltr:mr-3 rtl:ml-3 flex-none">
                <img
                  :src="`${apiUrl}users/${props.row._id}/image`"
                  :alt="props.row.name"
                  class="object-cover w-full h-full rounded-full"
                />
              </span>
              <span
                class="text-sm text-slate-600 dark:text-slate-300 capitalize"
                >{{ props.row.name }}</span
              >
            </span>
            <span v-if="props.column.field == 'createdAt'" class="flex">
              <span
                class="text-sm text-slate-600 dark:text-slate-300 capitalize"
                >{{ new Date(props.row.createdAt).toDateString() }}</span
              >
            </span>
            <span v-if="props.column.field == 'points'" class="flex">
              <span
                class="text-sm text-slate-600 dark:text-slate-300 capitalize"
                >{{ formatNumberWithCommas(props.row.points) }}</span
              >
            </span>
            <span v-if="props.column.field == 'cash'" class="flex">
              <span
                class="text-sm text-slate-600 dark:text-slate-300 capitalize"
                >{{ formatNumberWithCommas(props.row.cash) }}</span
              >
            </span>
            <span v-if="props.column.field == 'commission'" class="flex">
              <span
                class="text-sm text-slate-600 dark:text-slate-300 capitalize"
                >{{
                  formatNumberWithCommas(Math.round(props.row.commission))
                }}</span
              >
            </span>

            <span v-if="props.column.field == 'vat'" class="flex">
              <span
                class="text-sm text-slate-600 dark:text-slate-300 capitalize"
                >{{ formatNumberWithCommas(Math.round(props.row.vat)) }}</span
              >
            </span>

            <span v-if="props.column.field == 'earning'" class="flex">
              <span
                class="text-sm text-slate-600 dark:text-slate-300 capitalize"
                >{{
                  formatNumberWithCommas(Math.round(props.row.earning))
                }}</span
              >
            </span>

            <span v-if="props.column.field == 'creditworthiness'" class="flex">
              <span
                class="text-sm text-slate-600 dark:text-slate-300 capitalize"
                >{{
                  formatNumberWithCommas(Math.round(props.row.creditworthiness))
                }}</span
              >
            </span>

            <span v-if="props.column.field == 'jmlEarning'" class="flex">
              <span
                class="text-sm text-slate-600 dark:text-slate-300 capitalize"
                >{{
                  formatNumberWithCommas(Math.round(props.row.jmlEarning))
                }}</span
              >
            </span>

            <span v-if="props.column.field == 'borrowedPoints'" class="flex">
              <span
                class="text-sm text-slate-600 dark:text-slate-300 capitalize"
                >{{
                  formatNumberWithCommas(
                    Math.round(props.row.borrowedPoints) || 0
                  )
                }}</span
              >
            </span>

            <!-- <span v-if="props.column.field == 'order'">
                {{ "#" + props.row.order }}
              </span>
              <span
                v-if="props.column.field == 'date'"
                class="text-slate-500 dark:text-slate-300"
              >
                {{ props.row.date }}
              </span>
              <span v-if="props.column.field == 'status'" class="block w-full">
                <span
                  class="inline-block px-3 min-w-[90px] text-center mx-auto py-1 rounded-[999px] bg-opacity-25"
                  :class="`${
                    props.row.status === 'paid'
                      ? 'text-success-500 bg-success-500'
                      : ''
                  } 
              ${
                props.row.status === 'due'
                  ? 'text-warning-500 bg-warning-500'
                  : ''
              }
              ${
                props.row.status === 'cancled'
                  ? 'text-danger-500 bg-danger-500'
                  : ''
              }
              
               `"
                >
                  {{ props.row.status }}
                </span>
              </span> -->
            <span v-if="props.column.field == 'action'">
              <div class="flex space-x-3 rtl:space-x-reverse">
                <Tooltip placement="top" arrow theme="dark">
                  <template #button>
                    <div class="action-btn" @click="viewRow(props.row._id)">
                      <Icon icon="heroicons:eye" />
                    </div>
                  </template>
                  <span> View</span>
                </Tooltip>
                <!-- <Tooltip placement="top" arrow theme="dark">
                    <template #button>
                      <div class="action-btn">
                        <Icon icon="heroicons:pencil-square" />
                      </div>
                    </template>
                    <span> Edit</span>
                  </Tooltip> -->
                <Tooltip placement="top" arrow theme="danger-500">
                  <template #button>
                    <div class="action-btn" @click="deleteRow(props.row.id)">
                      <Icon icon="heroicons-outline:ban" />
                    </div>
                  </template>
                  <span>Ban User</span>
                </Tooltip>
              </div>
            </span>
          </template>
          <template #pagination-bottom="props">
            <div class="py-4 px-3 flex justify-center">
              <Pagination
                :total="paginationOptions.total"
                :current="current"
                :per-page="perpage"
                :pageRange="pageRange"
                @page-changed="pageChanged"
                :pageChanged="props.pageChanged"
                :perPageChanged="props.perPageChanged"
              >
                >
              </Pagination>
            </div>
          </template>
        </vue-good-table>
      </div>
    </Card>
  </div>
</template>
<script>
import Card from "@/components/Card";
import Icon from "@/components/Icon";
import Tooltip from "@/components/Tooltip";
import InputGroup from "@/components/InputGroup";
import Pagination from "@/components/Pagination";
// import FormsModal from "@/views/components/modal/modals/FormsModal.vue";
import { advancedTable } from "../../../constant/basic-tablle-data";
import apiClients from "@/utils/apiClients";
import config from "@/config";

export default {
  components: {
    Pagination,
    Icon,
    Tooltip,
    InputGroup,
    Card,
    // FormsModal,
  },

  props: {
    rows: {
      type: Array,
      required: false,
      default: [],
    },
    paginationOptions: {
      type: Object,
      required: false,
      default: {
        current: 1,
        perPage: 10,
        total: 1,
      },
    },
    columns: {
      type: Array,
      required: false,
      default: [
        {
          label: "ID",
          field: "_id",
        },
        {
          label: "Name",
          field: "user.name",
        },
        {
          label: "Points",
          field: "points",
        },
        {
          label: "Cash",
          field: "cash",
        },
        {
          label: "Date",
          field: "createdAt",
        },
      ],
    },
  },

  data() {
    return {
      allRows: [],
      apiUrl: config.apiUrl,
      advancedTable,
      searchTerm: "",
      current: 1,
      perpage: 10,
      pageRange: 5,
      searchTerm: "",

      // options: [
      //   {
      //     value: "1",
      //     label: "1",
      //   },
      //   {
      //     value: "3",
      //     label: "3",
      //   },
      //   {
      //     value: "5",
      //     label: "5",
      //   },
      // ],
      // columns2: ["gender", "dateOfBirth", "role", "otp", "isPhoneNumberVerified", "isEmailVerified", "", "", "phoneNumber", ""],
    };
  },

  mounted() {
    this.rows.forEach((row) => {
      row.createdAt = new Date(row.createdAt).toDateString()
        ? new Date(row.createdAt).toDateString()
        : row.createdAt;
    });
    this.allRows = this.rows;
    this.current = this.paginationOptions.current;
    this.perpage = this.paginationOptions.perPage;
    this.pageRange = 5;
  },

  methods: {
    formatNumberWithCommas(number) {
      if (!number?.toString()) return number;
      const parts = number?.toString().split(".");
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return parts.join(".");
    },
    pageChanged(event) {
      this.current = event;
      this.$emit("pageChanged", {
        ...this.paginationOptions,
        current: this.current,
      });
    },
    async deleteRow(id) {
      const url = config.apiUrl + "users/" + id;
      debugger;
      await apiClients.del(url);
      this.$emit("update");
    },

    viewRow(id) {
      this.$emit("userProfile", id);
    },

    search() {
      this.$emit("searchText", this.searchTerm);
    },
  },
};
</script>
<style lang="scss" scoped>
.action-btn {
  @apply h-6 w-6 flex flex-col items-center justify-center border border-slate-200 dark:border-slate-700 rounded;
}
</style>
