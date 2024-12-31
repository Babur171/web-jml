<template>
  <div>
    <Breadcrumb />
    <div class="grid grid-cols-12 gap-5 mb-5">
      <!-- <div class="2xl:col-span-3 lg:col-span-4 col-span-12">
        <div
          class="bg-no-repeat bg-cover bg-center p-4 rounded-[6px] relative"
          :style="{
            backgroundImage:
              'url('+ widget1 +')',
          }"
        >
          <div class="max-w-[169px]">
            <div class="text-xl font-medium text-slate-900 mb-2">
              Upgrade your JML
            </div>
            <p class="text-sm text-slate-800">Pro plan for better results</p>
          </div>
          <div
            class="absolute top-1/2 -translate-y-1/2 ltr:right-6 rtl:left-6 mt-2 h-12 w-12 bg-white text-slate-900 rounded-full text-xs font-medium flex flex-col items-center justify-center"
          >
            Now
          </div>
        </div>
      </div> -->
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
        <h1></h1>
      </div>
    </div>
    <div class="grid grid-cols-12 gap-5">
      <div class="lg:col-span-8 col-span-12">
        <Card>
          <div class="legend-ring">
            <apexchart
              type="bar"
              height="400"
              :options="columnCharthomeComputed.chartOptions"
              :series="columnCharthomeComputed.series"
            />
          </div>
        </Card>
      </div>
      <div class="lg:col-span-4 col-span-12">
        <Card title="points overview">
          <template #header>
            <DropEvent @action="getOverviewKpis" />
          </template>
          <apexchart
            type="radialBar"
            :height="window.width > 768 ? 350 : 250"
            :options="
              this.$store.themeSettingsStore.isDark
                ? MultipleRadialbarsDark.chartOptions
                : MultipleRadialbars.chartOptions
            "
            :series="MultipleRadialbars.series"
          />
        </Card>
      </div>
      <!-- <div class="lg:col-span-8 col-span-12">
        <Card title="All company" noborder>
          <template #header>
            <DropEvent />
          </template>
          <CompanyTable class="-mx-6 -mb-6" />
        </Card>
      </div>
      <div class="lg:col-span-4 col-span-12">
        <Card title="Recent activity">
          <template #header>
            <DropEvent />
          </template>
          <ul class="list-item space-y-3 h-full overflow-x-auto">
            <li
              class="flex items-center space-x-3 rtl:space-x-reverse border-b border-slate-100 dark:border-slate-700 last:border-b-0 pb-3 last:pb-0"
              v-for="(item, i) in activity"
              :key="i"
            >
              <div>
                <div class="w-8 h-8 rounded-[100%]">
                  <img
                    :src="item.img"
                    alt=""
                    class="w-full h-full rounded-[100%] object-cover"
                  />
                </div>
              </div>
              <div
                class="text-start overflow-hidden text-ellipsis whitespace-nowrap max-w-[63%]"
              >
                <div
                  class="text-sm text-slate-600 dark:text-slate-300 overflow-hidden text-ellipsis whitespace-nowrap"
                >
                  Finance KPI Mobile app launch preparation meeting.
                </div>
              </div>
              <div class="flex-1 ltr:text-right rtl:text-left">
                <div
                  class="text-sm font-light text-slate-400 dark:text-slate-400"
                >
                  1 hours
                </div>
              </div>
            </li>
          </ul>
        </Card>
      </div> -->
      <!-- <div class="lg:col-span-8 col-span-12">
        <Card title="Most sales">
          <template #header>
            <div
              class="border border-slate-200 dark:border-slate-700 dark:bg-slate-900 rounded p-1 flex items-center"
            >
              <span
                class="flex-1 text-sm font-normal px-3 py-1 transition-all duration-150 rounded cursor-pointer"
                :class="
                  fillterMap === 'global'
                    ? 'bg-slate-900 text-white dark:bg-slate-700 dark:text-slate-300'
                    : 'dark:text-slate-300'
                "
                @click="fillterMap = 'global'"
                >Global</span
              >
              <span
                class="flex-1 text-sm font-normal px-3 py-1 rounded transition-all duration-150 cursor-pointer"
                :class="
                  fillterMap === 'usa'
                    ? 'bg-slate-900 text-white dark:bg-slate-700 dark:text-slate-300'
                    : 'dark:text-slate-300'
                "
                @click="fillterMap = 'usa'"
                >USA</span
              >
            </div>
          </template>
          <div class="md:flex items-center">
            <div class="flex-none">
              <h4
                class="text-slate-600 dark:text-slate-200 text-sm font-normal mb-[6px]"
              >
                Total earnings
              </h4>
              <div
                class="tetx-lg font-medium mb-[6px] dark:text-white text-slate-900"
                v-if="fillterMap === 'usa'"
              >
                $12,65,64787.00
              </div>
              <div
                class="tetx-lg font-medium mb-[6px] dark:text-white text-slate-900"
                v-if="fillterMap === 'global'"
              >
                $12,65.00
              </div>
              <div class="text-xs font-light dark:text-slate-200">
                <span class="text-primary-500">+08%</span> From last month
              </div>
              <ul
                class="bg-slate-50 dark:bg-slate-900 rounded p-4 min-w-[184px] space-y-5 mt-4"
              >
                <li
                  v-for="(item, i) in mostSales"
                  :key="i"
                  class="flex justify-between text-xs text-slate-600 dark:text-slate-300"
                >
                  <span class="flex space-x-2 rtl:space-x-reverse items-center">
                    <span
                      :class="item.cls"
                      class="inline-flex h-[6px] w-[6px] bg-primary-500 ring-opacity-25 rounded-full ring-4"
                    ></span>
                    <span>{{ item.title }}</span></span
                  >
                  <span>{{ item.amount }}</span>
                </li>
              </ul>
            </div>
            <div class="flex-1">
              <Map />
            </div>
          </div>
        </Card>
      </div>
      <div class="lg:col-span-4 col-span-12">
        <Card title="overview">
          <template #header>
            <SelectMonth />
          </template>
          <apexchart
            type="radialBar"
            height="300"
            :options="
              this.$store.themeSettingsStore.isDark
                ? gearradilDark.chartOptions
                : gearradil.chartOptions
            "
            :series="gearradil.series"
          />
          <div
            class="bg-slate-50 dark:bg-slate-900 rounded p-4 mt-8 flex justify-between flex-wrap"
          >
            <div class="space-y-1">
              <h4
                class="text-slate-600 dark:text-slate-200 text-xs font-normal"
              >
                Invested amount
              </h4>
              <div class="tetx-sm font-medium text-slate-900 dark:text-white">
                $8264.35
              </div>
              <div
                class="text-slate-500 dark:text-slate-300 text-xs font-normal"
              >
                +0.001.23 (0.2%)
              </div>
            </div>
            <div class="space-y-1">
              <h4
                class="text-slate-600 dark:text-slate-200 text-xs font-normal"
              >
                Invested amount
              </h4>
              <div class="tetx-sm font-medium text-slate-900 dark:text-white">
                $8264.35
              </div>
            </div>
            <div class="space-y-1">
              <h4
                class="text-slate-600 dark:text-slate-200 text-xs font-normal"
              >
                Invested amount
              </h4>
              <div class="tetx-sm font-medium text-slate-900 dark:text-white">
                $8264.35
              </div>
            </div>
          </div>
        </Card>
      </div> -->
    </div>
  </div>
</template>
<script>
import Card from "@/components/Card";
import {
  gearradil,
  gearradilDark,
  MultipleRadialbars,
  MultipleRadialbarsDark,
} from "../../constant/appex-chart";
import CompanyTable from "./Analytics-Component/CompanyTable";
import {
  columnCharthome,
  columnCharthomeDark,
  shapeLine1,
  shapeLine2,
  shapeLine3,
  mostSales,
} from "./Analytics-Component/data";
import DropEvent from "./Analytics-Component/DropEvent";
import Map from "./Analytics-Component/Map";
import SelectMonth from "./Analytics-Component/SelectMonth";
import Breadcrumb from "./Analytics-Component/Breadcrumbs";
import window from "@/mixins/window";

// image import
import widget1 from "@/assets/images/all-img/widget-bg-1.png";
import activity1 from "@/assets/images/users/user-1.jpg";
import activity2 from "@/assets/images/users/user-2.jpg";
import activity3 from "@/assets/images/users/user-3.jpg";
import activity4 from "@/assets/images/users/user-4.jpg";
import activity5 from "@/assets/images/users/user-5.jpg";
import activity6 from "@/assets/images/users/user-6.jpg";

import apiClients from "@/utils/apiClients";
import config from "@/config";

export default {
  mixins: [window],
  components: {
    Card,
    CompanyTable,
    Map,
    DropEvent,
    SelectMonth,
    Breadcrumb,
  },
  data() {
    return {
      widget1,
      columnCharthome,
      columnCharthomeDark,
      MultipleRadialbars,
      MultipleRadialbarsDark,
      gearradil,
      gearradilDark,
      mostSales,
      fillterMap: "usa",
      kpis: {
        totalCommission: 0,
        totalCreditworthiness: 0,
        totalDealsAvailed: 0,
        totalPointsBorrowed: 0,
        totalRevenue: 0,
        totalTransactions: 0,
        totalUsers: 0,
        totalVat: 0,
        totalVendors: 0,
      },
      overallReportOverview: {},
      overallReport: {},
      overallReportCommission: [],
      overallReportBorrow: [],
      overallReportRevenue: [],
      overallReportKeys: [],
      statistics: [],
      activity: [
        {
          id: 1,
          img: activity1,
        },
        {
          id: 2,
          img: activity2,
        },
        {
          id: 3,
          img: activity3,
        },
        {
          id: 4,
          img: activity4,
        },
        {
          id: 5,
          img: activity5,
        },
        {
          id: 6,
          img: activity6,
        },
        {
          id: 7,
          img: activity1,
        },
        {
          id: 8,
          img: activity4,
        },
        {
          id: 9,
          img: activity3,
        },
      ],
    };
  },
  mounted() {
    this.setStatistics();
    this.getKPIS();
    this.getOverviewKpis();
  },

  computed: {
    columnCharthomeComputed() {
      return {
        series: [
          {
            name: "Commission Points",
            data: this.overallReportCommission,
          },
          {
            name: "Revenue Points",
            data: this.overallReportRevenue,
          },
          {
            name: "Borrowed Points",
            data: this.overallReportBorrow,
          },
        ],
        chartOptions: {
          chart: {
            toolbar: {
              show: false,
            },
          },
          plotOptions: {
            bar: {
              horizontal: false,
              endingShape: "rounded",
              columnWidth: "45%",
            },
          },
          legend: {
            show: true,
            position: "top",
            horizontalAlign: "right",
            fontSize: "12px",
            fontFamily: "Inter",
            offsetY: -30,
            markers: {
              width: 8,
              height: 8,
              offsetY: -1,
              offsetX: -5,
              radius: 12,
            },
            labels: {
              colors: this.$store.themeSettingsStore.isDark
                ? "#CBD5E1"
                : "#475569",
            },
            itemMargin: {
              horizontal: 18,
              vertical: 0,
            },
          },
          title: {
            text: "Overall Report",
            align: "left",

            offsetX: this.$store.themeSettingsStore.direction ? "0%" : 0,
            offsetY: 13,
            floating: false,
            style: {
              fontSize: "20px",
              fontWeight: "500",
              fontFamily: "Inter",
              color: this.$store.themeSettingsStore.isDark ? "#fff" : "#0f172a",
            },
          },
          dataLabels: {
            enabled: false,
          },
          stroke: {
            show: true,
            width: 2,
            colors: ["transparent"],
          },
          yaxis: {
            opposite: this.$store.themeSettingsStore.direction ? true : false,
            labels: {
              style: {
                colors: this.$store.themeSettingsStore.isDark
                  ? "#CBD5E1"
                  : "#475569",
                fontFamily: "Inter",
              },
              formatter: function (value) {
                return Math.round(value); // Round the values to the nearest whole number
              },
            },
          },
          xaxis: {
            categories: this.overallReportKeys,
            labels: {
              style: {
                colors: this.$store.themeSettingsStore.isDark
                  ? "#CBD5E1"
                  : "#475569",
                fontFamily: "Inter",
              },
            },
            axisBorder: {
              show: false,
            },
            axisTicks: {
              show: false,
            },
          },

          fill: {
            opacity: 1,
          },
          tooltip: {
            y: {
              formatter: function (val) {
                return val + " points";
              },
            },
          },
          colors: ["#4669FA", "#0CE7FA", "#FA916B"],
          grid: {
            show: true,
            borderColor: this.$store.themeSettingsStore.isDark
              ? "#334155"
              : "#E2E8F0",
            strokeDashArray: 10,
            position: "back",
          },
          responsive: [
            {
              breakpoint: 600,
              options: {
                legend: {
                  position: "bottom",
                  offsetY: 8,
                  horizontalAlign: "center",
                },
                plotOptions: {
                  bar: {
                    columnWidth: "80%",
                  },
                },
              },
            },
          ],
        },
      };
    },
  },

  methods: {
    setOverviewKpis() {
      const revenue =
        this.overallReportOverview.availGiftCard_jmlEarning +
        this.overallReportOverview.borrow_jmlEarning +
        this.overallReportOverview.earning_jmlEarning;
      const commission =
        this.overallReportOverview.availGiftCard_commission +
        this.overallReportOverview.borrow_commission +
        this.overallReportOverview.earning_commission;
      const borrow = this.overallReportOverview.borrow_points;
      const totalPoints = (revenue + commission + borrow).toFixed(0);
      this.MultipleRadialbars = {
        series: [
          ((commission / totalPoints) * 100).toFixed(0),
          ((revenue / totalPoints) * 100).toFixed(0),
          ((borrow / totalPoints) * 100).toFixed(0),
        ],
        chartOptions: {
          chart: {
            toolbar: {
              show: false,
            },
          },
          plotOptions: {
            radialBar: {
              dataLabels: {
                name: {
                  fontSize: "22px",
                  color: "#475569",
                },
                value: {
                  fontSize: "16px",
                  color: "#475569",
                },
                total: {
                  show: true,
                  label: "Total",
                  color: "#475569",
                  formatter: function () {
                    return totalPoints;
                  },
                },
              },
            },
          },
          labels: ["Commission", "Revenue", "Borrowed"],
          colors: ["#4669FA", "#0CE7FA", "#FA916B"],
        },
      };
      this.MultipleRadialbarsDark = {
        series: [
          ((commission / totalPoints) * 100).toFixed(0),
          ((revenue / totalPoints) * 100).toFixed(0),
          ((borrow / totalPoints) * 100).toFixed(0),
        ],
        chartOptions: {
          chart: {
            toolbar: {
              show: false,
            },
          },
          plotOptions: {
            radialBar: {
              dataLabels: {
                name: {
                  fontSize: "22px",
                  color: "#E2E8F0",
                },
                value: {
                  fontSize: "16px",
                  color: "#E2E8F0",
                },
                total: {
                  show: true,
                  label: "Total",
                  color: "#E2E8F0",
                  formatter: function () {
                    return totalPoints;
                  },
                },
              },
              track: {
                background: "#E2E8F0",
                strokeWidth: "97%",
              },
            },
          },
          labels: ["Commission", "Revenue", "Borrowed"],
          colors: ["#4669FA", "#0CE7FA", "#FA916B"],
        },
      };
    },
    setOverallReport() {
      console.log(
        Object.entries(this.overallReport).forEach((key, value) =>
          console.log(key, value)
        )
      );
      Object.values(this.overallReport).forEach((obj) => {
        this.overallReportCommission.push(
          obj.availGiftCard.commission +
            obj.borrow.commission +
            obj.earning.commission
        );
        this.overallReportRevenue.push(
          obj.availGiftCard.jmlEarning +
            obj.borrow.jmlEarning +
            obj.earning.jmlEarning
        );
        this.overallReportBorrow.push(obj.borrow.points);
      });
      Object.keys(this.overallReport).forEach((key) => {
        this.overallReportKeys.push(key);
        // this.overallReportBorrow.push(obj.borrow.points)
      });
    },
    setStatistics() {
      this.statistics = [
        {
          name: shapeLine1,
          title: "Commission",
          count: this.kpis.totalCommission,
          bg: "bg-[#E5F9FF] dark:bg-slate-900	",
        },
        {
          name: shapeLine2,
          title: "Users",
          count: this.kpis.totalUsers,
          bg: "bg-[#E5F9FF] dark:bg-slate-900	",
        },
        {
          name: shapeLine2,
          title: "Loan",
          count: this.kpis.totalLoanAmount,
          bg: "bg-[#E5F9FF] dark:bg-slate-900	",
        },
        {
          name: shapeLine1,
          title: "Revenue",
          count: this.kpis.totalRevenue,
          bg: "bg-[#E5F9FF] dark:bg-slate-900	",
        },
        {
          name: shapeLine2,
          title: "Vendors",
          count: this.kpis.totalVendors,
          bg: "bg-[#E5F9FF] dark:bg-slate-900	",
        },
        {
          name: shapeLine2,
          title: "Unpaid vendors",
          count: this.kpis.totalUnpaidAmount,
          bg: "bg-[#E5F9FF] dark:bg-slate-900	",
        },
        {
          name: shapeLine2,
          title: "Green list vendors",
          count: this.kpis.greenListVendorsCount,
          bg: "bg-[#E5F9FF] dark:bg-slate-900	",
        },
        {
          name: shapeLine2,
          title: "JML Balance(Payments)",
          count: this.kpis?.jmlBalance || 0,
          bg: "bg-[#FFEDE5] dark:bg-slate-900	",
        },
        {
          name: shapeLine2,
          title: "Points borrowed",
          count: this.kpis.totalPointsBorrowed,
          bg: "bg-[#EAE5FF] dark:bg-slate-900	",
        },
        {
          name: shapeLine2,
          title: "Creditworthiness points",
          count: this.kpis.totalCreditworthiness,
          bg: "bg-[#EAE5FF] dark:bg-slate-900	",
        },
        {
          name: shapeLine2,
          title: "Transactions Amount",
          count: this.kpis.totalTransactionsAmount,
          bg: "bg-[#EAE5FF] dark:bg-slate-900	",
        },
        {
          name: shapeLine2,
          title: "VAT",
          count: this.kpis.totalVat,
          bg: "bg-[#EAE5FF] dark:bg-slate-900	",
        },
      ];
    },
    async getOverviewKpis(filter = "7d") {
      const url =
        config.apiUrl +
        `transactions/spending?type=earning&type=borrow&type=availGiftCard&filter=${filter}`;
      const response = await apiClients.get(url);
      this.overallReportOverview = response.data.spending.total;
      this.overallReport = response.data.spending.response;
      this.setOverviewKpis();
      this.setOverallReport();
    },
    async getKPIS() {
      const url = config.apiUrl + `transactions/stats`;
      const response = await apiClients.get(url);
      this.kpis = response.data;
      this.setStatistics();
    },
  },
};
</script>
<style lang=""></style>
