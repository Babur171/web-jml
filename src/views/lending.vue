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
    <div class="space-y-5">
      <Donation
        :columns="columns"
        :rows="lendingPoints"
        @pageChanged="pageChanged"
        :paginationOptions="paginationOptions"
        @searchText="search"
      />
    </div>
  </div>
</template>
<script>
import Card from "@/components/Card";
import { shapeLine1, shapeLine2 } from "@/views/home/Analytics-Component/data";
import apiClients from "@/utils/apiClients";
import config from "@/config";
import Donation from "./table/advanced/Donation";
export default {
  mixins: [window],
  components: {
    Card,
    Donation,
  },
  data() {
    return {
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
          label: "Points",
          field: "points",
        },

        {
          label: "Date",
          field: "createdAt",
        },
      ],
      lendingPoints: [
        // {
        //   id: 1,
        //   userName: "John Doe",
        //   date: "12/12/2020",
        //   points: "100",
        // }
      ],
      statistics: [],
      paginationOptions: { current: 1, perPage: 10, total: 25 },
      statisticsData: {
        currentMonthPointsandCash: 0,
        lastTransactionPointsandCash: 0,
        totalPointsandCash: 0,
      },
    };
  },
  mounted() {
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
        `transactions/all?limit=${
          this.paginationOptions.perPage
        }&type=lending&page=${this.paginationOptions.current}${
          searchText ? `&search=${searchText}` : ""
        }`;
      const response = await apiClients.get(url);
      this.lendingPoints = response.data.transactions;
      this.paginationOptions.total = response.data.count;
    },
    async getStatistics() {
      const url = config.apiUrl + `transactions/kpis?type=lending`;
      const response = await apiClients.get(url);
      this.statisticsData = { ...response.data };
      this.setStatistics();
    },
    setStatistics() {
      this.statistics = [
        {
          name: shapeLine1,
          title: "Total Lending Points",
          count: this.statisticsData.totalPointsandCash,
          bg: "bg-[#E5F9FF] dark:bg-slate-900	",
        },
        {
          name: shapeLine2,
          title: "This Month Lending Points",
          count: this.statisticsData.currentMonthPointsandCash,
          bg: "bg-[#E5F9FF] dark:bg-slate-900	",
        },
        {
          name: shapeLine2,
          title: "Last Lending",
          count: this.statisticsData.lastTransactionPointsandCash,
          bg: "bg-[#E5F9FF] dark:bg-slate-900	",
        },
      ];
    },
  },
};
</script>
<style lang=""></style>
