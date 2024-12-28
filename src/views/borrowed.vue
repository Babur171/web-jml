<template>
  <div>
    <!-- <Breadcrumb /> -->
    <div class="grid grid-cols-12 gap-5 mb-5">
      <div class="2xl:col-span-12 lg:col-span-12 col-span-12">
        <Card bodyClass="p-4">
          <div class="grid md:grid-cols-3 col-span-1 gap-4">
            <div
              class="py-[18px] px-4 rounded-[6px]"
              v-for="(item, i) in statistics"
              :class="item.bg"
              :key="i"
            >
              <div class="flex items-center space-x-6 rtl:space-x-reverse">
                <div class="flex-none">
                  <apexchart
                    type="area"
                    height="48"
                    width="48"
                    :options="item.name.chartOptions"
                    :series="item.name.series"
                  />
                </div>
                <div class="flex-1">
                  <div
                    class="text-slate-800 dark:text-slate-300 text-sm mb-1 font-medium"
                  >
                    {{ item.title }}
                  </div>
                  <div
                    class="text-slate-900 dark:text-white text-lg font-medium"
                  >
                    {{ item.count }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
    <Donation
      :rows="borrowedPoints"
      :columns="columns"
      @pageChanged="pageChanged"
      :paginationOptions="paginationOptions"
      @searchText="search"
    />
  </div>
</template>
<script>
import Card from "@/components/Card";
import Donation from "@/views/table/advanced/Donation";
import { shapeLine1, shapeLine2 } from "@/views/home/Analytics-Component/data";
import apiClients from "@/utils/apiClients";
import config from "@/config";

export default {
  mixins: [window],
  components: {
    Card,

    Donation,
  },
  data() {
    return {
      borrowedPoints: [
        {
          // id: 1,
          // userName: "John Doe",
          // date: "12/12/2020",
          // points: "100",
        },
      ],
      columns: [
        {
          label: "ID",
          field: "_id",
        },
        {
          label: "Name",
          field: "user.name",
        },
        {
          label: "Borrowed Points",
          field: "borrowedPoints",
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
          label: "Management Fee",
          field: "commission",
        },
        {
          label: "Site Earnings",
          field: "jmlEarning",
        },
        {
          label: "VAT",
          field: "vat",
        },
        {
          label: "CWA",
          field: "creditworthiness",
        },
        {
          label: "Date",
          field: "createdAt",
        },
      ],
      paginationOptions: { current: 1, perPage: 10, total: 10 },
      statistics: [],
      statisticsData: {
        currentMonthPointsandCash: 0,
        lastTransactionPointsandCash: 0,
        totalPointsandCash: 0,
      },
    };
  },
  mounted() {
    this.timerId = null;
    this.setStatistics();
    this.getStatistics();
    this.getData();
  },
  methods: {
    pageChanged(paginationOptions) {
      this.paginationOptions = paginationOptions;
      this.getData();
    },
    debounce(searchText, delay = 1000) {
      clearTimeout(this.timerId);
      this.timerId = setTimeout(() => {
        this.getData(searchText);
      }, delay);
    },
    async search(searchText) {
      this.debounce(searchText);
    },

    async getData(searchText = "") {
      const url =
        config.apiUrl +
        `transactions/all?page=${
          this.paginationOptions.current
        }&type=borrow&limit=${this.paginationOptions.perPage}${
          searchText ? `&search=${searchText}` : ""
        }`;
      const response = await apiClients.get(url);
      this.borrowedPoints = response.data.transactions;
      this.paginationOptions.total = response.data.count;
    },
    async getStatistics() {
      const url = config.apiUrl + `transactions/kpis?type=borrow`;
      const response = await apiClients.get(url);
      this.statisticsData = { ...response.data };
      this.setStatistics();
      console.log(response.data);
    },
    setStatistics() {
      this.statistics = [
        {
          name: shapeLine1,
          title: "Total Borrowed Points",
          count: this.statisticsData.totalPointsandCash,
          bg: "bg-[#E5F9FF] dark:bg-slate-900	",
        },
        {
          name: shapeLine2,
          title: "This Month Borrowed Points",
          count: this.statisticsData.currentMonthPointsandCash,
          bg: "bg-[#E5F9FF] dark:bg-slate-900	",
        },
        {
          name: shapeLine2,
          title: "Last Borrowed Points",
          count: this.statisticsData.lastTransactionPointsandCash,
          bg: "bg-[#E5F9FF] dark:bg-slate-900	",
        },
      ];
    },
  },
};
</script>
<style lang=""></style>
