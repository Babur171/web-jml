<template>
  <div>
    <!-- Breadcrumb can be added here if needed -->

    <div class="grid grid-cols-12 gap-5 mb-5">
      <div class="2xl:col-span-12 lg:col-span-12 col-span-12">
        <Card bodyClass="p-4">
          <div class="space-y-4 mb-4">
        <!-- Input Field for Number -->
              <input
                v-model.number="numberInput"
                type="text"
                placeholder="Enter"
                @input="handleInput"
                maxlength="5"
                class="w-20 pl-3 pr-1 py-2 border rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
              />

              <!-- Save Button -->
              <button
                @click="saveNumber"
                class="w-25 px-4 ml-2 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition-colors duration-300"
              >
                Update Referral Point
              </button>
      </div>
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

    <!-- Search and Donation Table Section -->
    <div class="space-y-5">
      <Donation
        :rows="userReferrals"
        :columns="columns"
        @pageChanged="pageChanged"
        :paginationOptions="paginationOptions"
        @searchText="search"
      />
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import Card from "@/components/Card";
import Donation from "./table/advanced/Donation";
import { shapeLine1, shapeLine2 } from "@/views/home/Analytics-Component/data";
import apiClients from "@/utils/apiClients";
import { useToast } from "vue-toastification";
import config from "@/config";

export default {
  components: {
    Card,
    Donation,
  },
  setup() {
    // Number input binding
    const numberInput = ref(0); // Input value
    const savedNumber = ref(null); // To store the saved number
    const toast = useToast();

    // Save number logic
    const saveNumber = async() => {
      const url =
        config.apiUrl +
        `app-config/referral-points`;
        const body = {  referralBonusPoints: numberInput.value}
      const response = await apiClients.patch(url, body);
      if(response?.success){
        toast.success("Referral point updated successfully", {
          timeout: 2000,
        });
      }
     
     
    };

    return {
      numberInput,
      savedNumber,
      saveNumber,
    };
  },
  data() {
    return {
      columns: [
        { label: "ID", field: "_id" },
        { label: "Referred By", field: "user.name" },
        { label: "Referred User", field: "receiver.name" },
        { label: "Points", field: "points" },
        { label: "Date", field: "createdAt" },
      ],
      userReferrals: [],
      statistics: [],
      paginationOptions: { current: 1, perPage: 10, total: 25 },
    };
  },
  mounted() {
    this.getReferralPoints();
    this.setStatistics();
    this.getStatistics();
    this.getSiteEarnings();
    
  },
  methods: {
    async getSiteEarnings(searchText = "") {
      const url =
        config.apiUrl +
        `transactions/all?page=${this.paginationOptions.current}&type=refer&limit=${this.paginationOptions.perPage}` +
        (searchText ? `&search=${searchText}` : "");
      const response = await apiClients.get(url);
      this.userReferrals = response.data.transactions;
      this.paginationOptions.total = response.data.count;
    },
    async getReferralPoints() {
      const url =
        config.apiUrl +
        `app-config/referral-points`;

      const response = await apiClients.get(url);
      this.numberInput = response.data.referralBonusPoints;
    },
    async getStatistics() {
      const url = config.apiUrl + `transactions/kpis?type=refer`;
      const response = await apiClients.get(url);
      this.statistics = [
        {
          name: shapeLine1,
          title: "Total Referred Bonus Points",
          count: response.data.totalPointsandCash,
          bg: "bg-[#E5F9FF] dark:bg-slate-900",
        },
        {
          name: shapeLine2,
          title: "This Month Referred Bonus Points",
          count: response.data.currentMonthPointsandCash,
          bg: "bg-[#E5F9FF] dark:bg-slate-900",
        },
        {
          name: shapeLine2,
          title: "Last Referred Bonus Points",
          count: response.data.lastTransactionPointsandCash,
          bg: "bg-[#E5F9FF] dark:bg-slate-900",
        },
      ];
    },
    setStatistics() {
      this.statistics = []; // Logic to populate statistics goes here
    },
    async search(searchText) {
      this.getSiteEarnings(searchText);
    },
    pageChanged(paginationOptions) {
      this.paginationOptions = paginationOptions;
      this.getSiteEarnings();
    },
    
    handleInput() {
      // Allow only numeric input and limit to 4 digits
      this.numberInput = this.numberInput.replace(/[^0-9]/g, "").slice(0, 4);
    },
  
  },
};
</script>
