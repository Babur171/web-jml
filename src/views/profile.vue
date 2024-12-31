<template>
  <div class="space-y-5 profile-page">
    <div
      class="profiel-wrap px-[35px] pb-10 md:pt-[84px] pt-10 rounded-lg bg-white dark:bg-slate-800 lg:flex lg:space-y-0 space-y-6 justify-between items-end relative z-[1]"
    >
      <div
        class="bg-slate-900 dark:bg-slate-700 absolute left-0 top-0 md:h-1/2 h-[150px] w-full z-[-1] rounded-t-lg"
      ></div>
      <div class="profile-box flex-none md:text-start text-center">
        <div class="md:flex items-end md:space-x-6 rtl:space-x-reverse">
          <div class="flex-none">
            <div
              class="md:h-[186px] md:w-[186px] h-[140px] w-[140px] md:ml-0 md:mr-0 ml-auto mr-auto md:mb-0 mb-4 rounded-full ring-4 ring-slate-100 relative"
            >
              <img
                :src="`${apiUrl}users/${user._id}/image`"
                alt=""
                class="w-full h-full object-cover rounded-full"
                v-if="user._id"
              />
              <!-- <router-link
                to="/app/profile-setting"
                class="absolute right-2 h-8 w-8 bg-slate-50 text-slate-600 rounded-full shadow-sm flex flex-col items-center justify-center md:top-[140px] top-[100px]"
                ><Icon icon="heroicons:pencil-square" />
              </router-link> -->
            </div>
          </div>
          <div class="flex-1">
            <div
              class="text-2xl font-medium text-slate-900 dark:text-slate-200 mb-[3px]"
            >
              {{ user.name || "Not Set" }}
            </div>
          </div>
        </div>
      </div>
      <!-- end profile box -->
      <div
        class="profile-info-500 md:flex md:text-start text-center flex-1 max-w-[516px] md:space-y-0 space-y-4"
      >
        <div class="flex-1">
          <div
            class="text-base text-slate-900 dark:text-slate-300 font-medium mb-1"
          >
            {{ user?.points[0]?.currentPoints || 0 }}
          </div>
          <div class="text-sm text-slate-600 font-light dark:text-slate-300">
            Total Points
          </div>
        </div>
        <!-- end single -->
        <div class="flex-1" v-if="!user?.vendor">
          <div
            class="text-base text-slate-900 dark:text-slate-300 font-medium mb-1"
          >
            {{ user?.points[0]?.creditWorthinessPoints || 0 }}
          </div>
          <div class="text-sm text-slate-600 font-light dark:text-slate-300">
            creditworthiness points
          </div>
        </div>
        <div class="flex-1" v-else>
          <div
            class="text-base text-slate-900 dark:text-slate-300 font-medium mb-1"
          >
            {{ user?.points[0]?.threshold || 1000 }}
          </div>
          <div class="text-sm text-slate-600 font-light dark:text-slate-300">
            Threshold
          </div>
        </div>
        <!-- end single -->
        <div class="flex-1" v-if="!user?.vendor">
          <div
            class="text-base text-slate-900 dark:text-slate-300 font-medium mb-1"
          >
            {{ user?.points[0]?.borrowedPoints || 0 }}
          </div>
          <div class="text-sm text-slate-600 font-light dark:text-slate-300">
            Borrowed points
          </div>
        </div>
        <div class="flex-1" v-else>
          <div
            class="text-base text-slate-900 dark:text-slate-300 font-medium mb-1"
          >
            {{ user?.vendor?.commissionPercentage || 0 }}
          </div>
          <div class="text-sm text-slate-600 font-light dark:text-slate-300">
            Commission Percentage
          </div>
        </div>
        <!-- end single -->
      </div>
      <!-- profile info-500 -->
    </div>
    <div class="grid grid-cols-12 gap-6">
      <div class="lg:col-span-12 col-span-12">
        <Card title="Info">
          <ul class="grid space-y-3 grid-cols-3 gap-1 justify-evenly">
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
                  Id
                </div>
                <a
                  href="mailto:someone@example.com"
                  class="text-base text-slate-600 dark:text-slate-50"
                >
                  {{ user._id || "Not Set" }}
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
                  Phone Number Verified
                </div>
                <a
                  href="mailto:someone@example.com"
                  class="text-base text-slate-600 dark:text-slate-50"
                >
                  {{ user.isPhoneNumberVerified ? "Yes" : "No" || "Not Set" }}
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
                  Email Verified
                </div>
                <a
                  href="mailto:someone@example.com"
                  class="text-base text-slate-600 dark:text-slate-50"
                >
                  {{ user.isEmailVerified ? "Yes" : "No" || "Not Set" }}
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
                  Active Status
                </div>
                <a
                  href="mailto:someone@example.com"
                  class="text-base text-slate-600 dark:text-slate-50"
                >
                  {{ user.active ? "Active" : "Block" || "Not Set" }}
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
                  Phone Number
                </div>
                <a
                  href="mailto:someone@example.com"
                  class="text-base text-slate-600 dark:text-slate-50"
                >
                  {{ user.phoneNumber || "Not Set" }}
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
                  Email
                </div>
                <a
                  href="mailto:someone@example.com"
                  class="text-base text-slate-600 dark:text-slate-50"
                >
                  {{ user.email || "Not Set" }}
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
                  Name
                </div>
                <a
                  href="mailto:someone@example.com"
                  class="text-base text-slate-600 dark:text-slate-50"
                >
                  {{ user.name || "Not Set" }}
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
                  Date of birth
                </div>
                <a
                  href="mailto:someone@example.com"
                  class="text-base text-slate-600 dark:text-slate-50"
                >
                  {{ new Date(user.dateOfBirth).toDateString() || "Not Set" }}
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
                  Gender
                </div>
                <a
                  href="mailto:someone@example.com"
                  class="text-base text-slate-600 dark:text-slate-50"
                >
                  {{ user.gender || "Not Set" }}
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
                  Role
                </div>
                <a
                  href="mailto:someone@example.com"
                  class="text-base text-slate-600 dark:text-slate-50"
                >
                  {{ user.role || "Not Set" }}
                </a>
              </div>
            </li>
            <!-- end single list -->
            <li class="flex space-x-3 rtl:space-x-reverse" v-if="user?.vendor">
              <div
                class="flex-none text-2xl text-slate-600 dark:text-slate-300"
              >
                <!-- <Icon icon="heroicons:envelope" /> -->
              </div>
              <div class="flex-1">
                <div
                  class="uppercase text-xs text-slate-500 dark:text-slate-300 mb-1 leading-[12px]"
                >
                  Category
                </div>
                <a
                  href="mailto:someone@example.com"
                  class="text-base text-slate-600 dark:text-slate-50"
                >
                  {{ user?.vendor.category || "Not Set" }}
                </a>
              </div>
            </li>
            <!-- end single list -->
            <li class="flex space-x-3 rtl:space-x-reverse" v-if="user?.vendor">
              <div
                class="flex-none text-2xl text-slate-600 dark:text-slate-300"
              >
                <!-- <Icon icon="heroicons:envelope" /> -->
              </div>
              <div class="flex-1">
                <div
                  class="uppercase text-xs text-slate-500 dark:text-slate-300 mb-1 leading-[12px]"
                >
                  Country
                </div>
                <a
                  href="mailto:someone@example.com"
                  class="text-base text-slate-600 dark:text-slate-50"
                >
                  {{ user?.vendor.country || "Not Set" }}
                </a>
              </div>
            </li>
            <!-- end single list -->
            <li class="flex space-x-3 rtl:space-x-reverse" v-if="user?.vendor">
              <div
                class="flex-none text-2xl text-slate-600 dark:text-slate-300"
              >
                <!-- <Icon icon="heroicons:envelope" /> -->
              </div>
              <div class="flex-1">
                <div
                  class="uppercase text-xs text-slate-500 dark:text-slate-300 mb-1 leading-[12px]"
                >
                  Location
                </div>
                <a
                  href="mailto:someone@example.com"
                  class="text-base text-slate-600 dark:text-slate-50"
                >
                  Lang:
                  {{  user?.vendor?.location?.longitude || "Not Set" }}
                </a>
              </div>
            </li>
            <!-- end single list -->
            <li class="flex space-x-3 rtl:space-x-reverse" v-if="user?.vendor">
              <div
                class="flex-none text-2xl text-slate-600 dark:text-slate-300"
              >
                <!-- <Icon icon="heroicons:envelope" /> -->
              </div>
              <div class="flex-1">
                <div
                  class="uppercase text-xs text-slate-500 dark:text-slate-300 mb-1 leading-[12px]"
                >
                  Street
                </div>
                <a
                  href="mailto:someone@example.com"
                  class="text-base text-slate-600 dark:text-slate-50"
                >
                  {{ user?.vendor.street || "Not Set" }}
                </a>
              </div>
            </li>
            <!-- end single list -->
            <li class="flex space-x-3 rtl:space-x-reverse" v-if="user?.vendor">
              <div
                class="flex-none text-2xl text-slate-600 dark:text-slate-300"
              >
                <!-- <Icon icon="heroicons:envelope" /> -->
              </div>
              <div class="flex-1">
                <div
                  class="uppercase text-xs text-slate-500 dark:text-slate-300 mb-1 leading-[12px]"
                >
                  Post code
                </div>
                <a
                  href="mailto:someone@example.com"
                  class="text-base text-slate-600 dark:text-slate-50"
                >
                  {{ user?.vendor.postCode || "Not Set" }}
                </a>
              </div>
            </li>
            <!-- end single list -->
            <li class="flex space-x-3 rtl:space-x-reverse" v-if="user?.vendor">
              <div
                class="flex-none text-2xl text-slate-600 dark:text-slate-300"
              >
                <!-- <Icon icon="heroicons:envelope" /> -->
              </div>
              <div class="flex-1">
                <div
                  class="uppercase text-xs text-slate-500 dark:text-slate-300 mb-1 leading-[12px]"
                >
                  Website
                </div>
                <a
                  href="mailto:someone@example.com"
                  class="text-base text-slate-600 dark:text-slate-50"
                >
                  {{ user?.vendor.website || "Not Set" }}
                </a>
              </div>
            </li>
            <!-- end single list -->
            <li class="flex space-x-3 rtl:space-x-reverse" v-if="user?.vendor">
              <div
                class="flex-none text-2xl text-slate-600 dark:text-slate-300"
              >
                <!-- <Icon icon="heroicons:envelope" /> -->
              </div>
              <div class="flex-1">
                <div
                  class="uppercase text-xs text-slate-500 dark:text-slate-300 mb-1 leading-[12px]"
                >
                  Website
                </div>
                <a
                  href="mailto:someone@example.com"
                  class="text-base text-slate-600 dark:text-slate-50"
                >
                  {{ user?.vendor.website || "Not Set" }}
                </a>
              </div>
            </li>
          </ul>
          <!-- end single list -->
        </Card>
      </div>
      <!-- <div class="lg:col-span-12 col-span-12" v-if="user?.role === 'user'">
        <Card title="Editable">
          <div class="space-y-3">
            <Textinput
              label="Creditworthiness Points"
              name="pn"
              type="text"
              @click="activateUpdateButton"
              modelValue="10000"
            />
            <div class="grid grid-cols-12 gap-6">
              <Textinput
                class="lg:col-span-6 col-span-6"
                label="Redeemable Points Min"
                name="pn"
                type="text"
                @click="activateUpdateButton"
                modelValue="10000"
              />
              <Textinput
                class="lg:col-span-6 col-span-6"
                label="Redeemable Points Max"
                name="pn"
                type="text"
                @click="activateUpdateButton"
                modelValue="10000"
              />
            </div>
            <button @click="updateUser" v-if="isUserInfoModified" type="button" class="btn bg-white hover:bg-opacity-80 text-slate-900 btn-sm w-full block">
              Update
            </button>
          </div>
        </Card>
      </div> -->
      <div class="lg:col-span-12 col-span-12" v-if="user?.vendor">
        <Card title="Editable">
          <div class="space-y-3">
            <div class="grid grid-cols-12 gap-6">
              <Textinput
                label="Threshold"
                class="lg:col-span-6 col-span-6"
                name="pn"
                type="text"
                @click="activateUpdateButton"
                v-model="vendorEditableProperties.threshold"
              />
              <Textinput
                label="Commission (%)"
                class="lg:col-span-6 col-span-6"
                name="pn"
                type="text"
                @click="activateUpdateButton"
                v-model="vendorEditableProperties.commissionPercentage"
              />
            </div>
            <div class="grid grid-cols-12 gap-6">
              <Textinput
                class="lg:col-span-6 col-span-6"
                label="Redeemable Points Min"
                name="pn"
                type="text"
                @click="activateUpdateButton"
                v-model="vendorEditableProperties.redeemablePointsMin"
              />
              <Textinput
                class="lg:col-span-6 col-span-6"
                label="Redeemable Points Max"
                name="pn"
                type="text"
                @click="activateUpdateButton"
                v-model="vendorEditableProperties.redeemablePointsMax"
              />
            </div>
            <Button
              text="Update"
              btnClass="btn-dark"
              @click="updateUser"
              v-if="isUserInfoModified"
            ></Button>
          </div>
        </Card>
      </div>
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
import Textinput from "@/components/Textinput";
import Textarea from "@/components/Textarea";
import Select from "@/components/Select";
export default {
  components: {
    Card,
    Button,
    Icon,
    Textinput,
    Textarea,
    Select,
  },
  props: {
    user: {
      type: Object,
      required: false,
      default: {},
    },
  },
  data() {
    return {
      apiUrl: config.apiUrl,
      basicArea,
      basicAreaDark,
      isUserInfoModified: false,
      vendorEditableProperties: {
        threshold: 0,
        commissionPercentage: 0,
        redeemablePointsMax: 0,
        redeemablePointsMin: 0,
      },
    };
  },
  mounted() {
    console.log(this.user, "======================");
    if (this.user?.vendor) {
      this.vendorEditableProperties.threshold = this.user?.vendor.threshold;
      this.vendorEditableProperties.commissionPercentage =
        this.user?.vendor.commissionPercentage;
      this.vendorEditableProperties.redeemablePointsMax =
        this.user?.vendor.redeemablePointsMax;
      this.vendorEditableProperties.redeemablePointsMin =
        this.user?.vendor.redeemablePointsMin;
    }
  },
  methods: {
    activateUpdateButton() {
      this.isUserInfoModified = true;
    },
    async updateUser() {
      console.log(this.user.vendor);
      const url = config.apiUrl + `vendor/${this.user._id}`;
      const body = { ...this.vendorEditableProperties };
      const response = await apiClients.patch(url, body);
      // if(response)
      this.isUserInfoModified = false;
    },
  },
};
</script>
<style lang="scss" scoped></style>
