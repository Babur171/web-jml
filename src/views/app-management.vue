<template>
  <div class="space-y-5 profile-page">
    <div class="grid grid-cols-12 gap-6" v-if="!editing">
      <div class="lg:col-span-12 col-span-12">
        <Card title="Baseline Values">
          <ul class="grid space-y-3 grid-cols-3 gap-1 justify-evenly">
            <!-- end single list -->

            <li class="flex space-x-3 rtl:space-x-reverse">
              <div
                class="flex-none text-2xl text-slate-600 dark:text-slate-300"
              >
                <!-- <Icon icon="heroicons:envelope" /> -->
              </div>
              <div class="flex-1">
                <div
                  class="uppercase text-xs text-slate-500 dark:text-slate-300 mb-1 leading-[12px]"
                >
                  Vendor Threshold
                </div>
                <a
                  href="mailto:someone@example.com"
                  class="text-base text-slate-600 dark:text-slate-50"
                >
                  {{ appConfig.vendorThreshold }}
                </a>
              </div>
            </li>
            <!-- end single list -->
            <li class="flex space-x-3 rtl:space-x-reverse">
              <div
                class="flex-none text-2xl text-slate-600 dark:text-slate-300"
              >
                <!-- <Icon icon="heroicons:envelope" /> -->
              </div>
              <div class="flex-1">
                <div
                  class="uppercase text-xs text-slate-500 dark:text-slate-300 mb-1 leading-[12px]"
                >
                  Redeemable Points Min
                </div>
                <a
                  href="mailto:someone@example.com"
                  class="text-base text-slate-600 dark:text-slate-50"
                >
                  {{ appConfig.vendorMinRedeemablePoints }}
                </a>
              </div>
            </li>
            <li class="flex space-x-3 rtl:space-x-reverse">
              <div
                class="flex-none text-2xl text-slate-600 dark:text-slate-300"
              >
                <!-- <Icon icon="heroicons:envelope" /> -->
              </div>
              <div class="flex-1">
                <div
                  class="uppercase text-xs text-slate-500 dark:text-slate-300 mb-1 leading-[12px]"
                >
                  Redeemable Points Max
                </div>
                <a
                  href="mailto:someone@example.com"
                  class="text-base text-slate-600 dark:text-slate-50"
                >
                  {{ appConfig.vendorMaxRedeemablePoints }}
                </a>
              </div>
            </li>
            <!-- end single list -->
            <li class="flex space-x-3 rtl:space-x-reverse">
              <div
                class="flex-none text-2xl text-slate-600 dark:text-slate-300"
              >
                <!-- <Icon icon="heroicons:envelope" /> -->
              </div>
              <div class="flex-1">
                <div
                  class="uppercase text-xs text-slate-500 dark:text-slate-300 mb-1 leading-[12px]"
                >
                  VAT Tax (percentage)
                </div>
                <a
                  href="mailto:someone@example.com"
                  class="text-base text-slate-600 dark:text-slate-50"
                >
                  {{ appConfig.taxPercentage }}
                </a>
              </div>
            </li>
            <!-- end single list -->
            <li class="flex space-x-3 rtl:space-x-reverse">
              <div
                class="flex-none text-2xl text-slate-600 dark:text-slate-300"
              >
                <!-- <Icon icon="heroicons:envelope" /> -->
              </div>
              <div class="flex-1">
                <div
                  class="uppercase text-xs text-slate-500 dark:text-slate-300 mb-1 leading-[12px]"
                >
                  Commission (Percentage)
                </div>
                <a
                  href="mailto:someone@example.com"
                  class="text-base text-slate-600 dark:text-slate-50"
                >
                  {{ appConfig.vendorCommissionPercentage }}
                </a>
              </div>
            </li>
            <!-- end single list -->
            <li class="flex space-x-3 rtl:space-x-reverse">
              <div
                class="flex-none text-2xl text-slate-600 dark:text-slate-300"
              >
                <!-- <Icon icon="heroicons:envelope" /> -->
              </div>
              <div class="flex-1">
                <div
                  class="uppercase text-xs text-slate-500 dark:text-slate-300 mb-1 leading-[12px]"
                >
                  Earned Points (Percentage)
                </div>
                <a
                  href="mailto:someone@example.com"
                  class="text-base text-slate-600 dark:text-slate-50"
                >
                  {{ appConfig.rewardPercentage }}
                </a>
              </div>
            </li>
            <!-- end single list -->
            <li class="flex space-x-3 rtl:space-x-reverse">
              <div
                class="flex-none text-2xl text-slate-600 dark:text-slate-300"
              >
                <!-- <Icon icon="heroicons:envelope" /> -->
              </div>
              <div class="flex-1">
                <div
                  class="uppercase text-xs text-slate-500 dark:text-slate-300 mb-1 leading-[12px]"
                >
                  Creditworthiness Points (Percentage)
                </div>
                <a
                  href="mailto:someone@example.com"
                  class="text-base text-slate-600 dark:text-slate-50"
                >
                  {{ appConfig.creditWorthinessPercentage }}
                </a>
              </div>
            </li>
            <!-- end single list -->
            <li class="flex space-x-3 rtl:space-x-reverse">
              <div
                class="flex-none text-2xl text-slate-600 dark:text-slate-300"
              >
                <!-- <Icon icon="heroicons:envelope" /> -->
              </div>
              <div class="flex-1">
                <div
                  class="uppercase text-xs text-slate-500 dark:text-slate-300 mb-1 leading-[12px]"
                >
                  JML/Site Earnings (Percentage)
                </div>
                <a
                  href="mailto:someone@example.com"
                  class="text-base text-slate-600 dark:text-slate-50"
                >
                  {{ appConfig.jmlEarningPercentage }}
                </a>
              </div>
            </li>
            <!-- end single list -->
            <li class="flex space-x-3 rtl:space-x-reverse">
              <div
                class="flex-none text-2xl text-slate-600 dark:text-slate-300"
              >
                <!-- <Icon icon="heroicons:envelope" /> -->
              </div>
              <div class="flex-1">
                <div
                  class="uppercase text-xs text-slate-500 dark:text-slate-300 mb-1 leading-[12px]"
                >
                  Min Borrow Points Limit
                </div>
                <a
                  href="mailto:someone@example.com"
                  class="text-base text-slate-600 dark:text-slate-50"
                >
                  {{ appConfig.minBorrowingLimit }}
                </a>
              </div>
            </li>
            <!-- end single list -->
            <li class="flex space-x-3 rtl:space-x-reverse">
              <div
                class="flex-none text-2xl text-slate-600 dark:text-slate-300"
              >
                <!-- <Icon icon="heroicons:envelope" /> -->
              </div>
              <div class="flex-1">
                <div
                  class="uppercase text-xs text-slate-500 dark:text-slate-300 mb-1 leading-[12px]"
                >
                  Borrowing Fee
                </div>
                <a
                  href="mailto:someone@example.com"
                  class="text-base text-slate-600 dark:text-slate-50"
                >
                  {{ appConfig.borrowingFeePercentage }} %
                </a>
              </div>
            </li>
            <!-- end single list -->
            <li class="flex space-x-3 rtl:space-x-reverse">
              <div
                class="flex-none text-2xl text-slate-600 dark:text-slate-300"
              >
                <!-- <Icon icon="heroicons:envelope" /> -->
              </div>
              <div class="flex-1">
                <div
                  class="uppercase text-xs text-slate-500 dark:text-slate-300 mb-1 leading-[12px]"
                >
                  Referral Bonus Points
                </div>
                <a class="text-base text-slate-600 dark:text-slate-50">
                  {{ appConfig.referralBonusPoints }}
                </a>
              </div>
            </li>
          </ul>
          <Button
            class="mt-5"
            text="Edit"
            btnClass="btn-dark"
            @click="editing = true"
          ></Button>

          <!-- end single list -->
        </Card>
      </div>
    </div>

    <div class="xl:col-span-2" v-else>
      <Card title="Update Baseline Values">
        <AppManagement
          :appConfig="appConfig"
          @updateAppConfig="updateAppConfig"
        />
        <!-- <Button class="mt-5" text="Submit" btnClass="btn-dark" @click="editing = false"></Button> -->
      </Card>
    </div>
  </div>
</template>
<script>
import Card from "@/components/Card";
import Icon from "@/components/Icon";
import Button from "@/components/Button";
import { basicArea, basicAreaDark } from "@/constant/appex-chart.js";
import apiClients from "@/utils/apiClients";
import config from "@/config";
import { getRefreshToken } from "../utils/utils";
import Textinput from "@/components/Textinput";
import Textarea from "@/components/Textarea";
import Select from "@/components/Select";
import AppManagement from "./forms/form-validation/app-management.vue";
export default {
  components: {
    Card,
    Icon,
    Textinput,
    Textarea,
    Select,
    Button,
    AppManagement,
  },
  props: {},
  data() {
    return {
      apiUrl: config.apiUrl,
      basicArea,
      basicAreaDark,
      isUserInfoModified: false,
      editing: false,
      appConfig: {
        borrowingFeePercentage: 0,
        creditWorthinessPercentage: 0,
        id: null,
        jmlEarningPercentage: 0,
        minBorrowingLimit: 0,
        rewardPercentage: 0,
        taxPercentage: 0,
        vendorCommissionPercentage: 0,
        vendorMaxRedeemablePoints: 0,
        vendorMinRedeemablePoints: 0,
        vendorThreshold: 0,
      },
    };
  },
  mounted() {
    this.getSettings();
  },
  methods: {
    async updateAppConfig(appConfig) {
      const url = config.apiUrl + `app-config`;
      const reqBody = { ...this.appConfig };
      delete reqBody?.id;
      const response = await apiClients.patch(url, reqBody);
      if (response.data.code === 400) alert("Please enter valid values");
      else alert("App configuration has been updated");
      this.editing = !this.editing;
      this.getSettings();
    },
    async getSettings() {
      const url = config.apiUrl + `app-config`;
      const response = await apiClients.get(url);
      if (response?.data) this.appConfig = response?.data;
      // this.borrowedPoints = response.data.transactions
    },
  },
};
</script>
<style lang="scss" scoped></style>
