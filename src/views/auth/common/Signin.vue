<template>
  <div class="flex justify-between mb-4">
    <button
      :class="
        activeTab === 'login'
          ? 'bg-blue-500 text-white'
          : 'bg-gray-200 text-gray-600'
      "
      class="w-1/2 py-2 rounded-l-md focus:outline-none"
      @click="toggleTab('login')"
    >
      Login
    </button>
    <button
      :class="
        activeTab === 'signup'
          ? 'bg-blue-500 text-white'
          : 'bg-gray-200 text-gray-600'
      "
      class="w-1/2 py-2 rounded-r-md focus:outline-none"
      @click="toggleTab('signup')"
    >
      Magic Login
    </button>
  </div>

  <form @submit.prevent="onSubmit" class="space-y-4">
    <Textinput
      label="Email"
      type="email"
      placeholder="Type your Email/Phone Number"
      name="emil"
      v-model="email"
      :error="emailError"
      classInput="h-[48px]"
    />
    <Textinput
      label="Password"
      type="password"
      placeholder="8+ characters, 1 capitat letter "
      name="password"
      v-model="password"
      :error="passwordError"
      hasicon
      classInput="h-[48px]"
    />
    <Textinput
      v-if="activeTab === 'signup'"
      label="Vendor Email"
      type="email"
      placeholder="Vendor Email"
      name="email"
      v-model="memail"
      :error="mEmailError"
      classInput="h-[48px]"
    />
    <div class="flex justify-between">
      <label class="cursor-pointer flex items-start">
        <input
          type="checkbox"
          class="hidden"
          @change="() => (checkbox = !checkbox)"
        />
        <span
          class="h-4 w-4 border rounded flex-none inline-flex mr-3 relative top-1 transition-all duration-150"
          :class="
            checkbox
              ? 'ring-2 ring-black-500 dark:ring-offset-slate-600 dark:ring-slate-900  dark:bg-slate-900 ring-offset-2 bg-slate-900'
              : 'bg-slate-100 dark:bg-slate-600 border-slate-100 dark:border-slate-600 '
          "
        >
          <img
            src="@/assets/images/icon/ck-white.svg"
            alt=""
            class="h-[10px] w-[10px] block m-auto"
            v-if="checkbox"
          />
        </span>
        <span class="text-slate-500 dark:text-slate-400 text-sm leading-6"
          >Keep me signed in</span
        >
      </label>
      <router-link
        to="/forgot-password"
        class="text-sm text-slate-800 dark:text-slate-400 leading-6 font-medium"
        >Forgot Password?</router-link
      >
    </div>

    <button type="submit" class="btn btn-dark block w-full text-center">
      {{ activeTab === "login" ? "Login" : "Magic Login" }}
    </button>
  </form>
</template>
<script>
import { ref, watch } from "vue";
import Textinput from "@/components/Textinput";
import config from "../../../config";
import apiClients from "../../../utils/apiClients";
import {
  setAccessToken,
  setRefreshToken,
  setActiveUser,
} from "../../../utils/utils";
import { useField, useForm } from "vee-validate";
import * as yup from "yup";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";

export default {
  components: {
    Textinput,
  },
  setup() {
    const activeTab = ref("login");
    const checkbox = ref(false);

    // Validation schema
    const schema = yup.object({
      email: yup.string().required("Email is required").email(),
      password: yup.string().required("Password is required").min(8),
    });
    const mSchema = yup.object({
      email: yup.string().required("Email is required").email(),
      memail: yup.string().required("Email is required").email("Invalid email"),
      password: yup.string().required("Password is required").min(8),
    });
    const currentSchema = ref(schema);

    const toast = useToast();
    const router = useRouter();

    watch(activeTab, (newTab) => {
      currentSchema.value = newTab === "login" ? schema : mSchema;
    });

    const formValues = {
      email: "Ab1@mail.com",
      password: "brand1111",
    };

    const magicFormValues = {
      email: "magic@jml.com",
      password: "Magic@123",
      memail: "brandhhh@mail.com",
    };

    const { handleSubmit } = useForm({
      validationSchema: currentSchema,
      initialValues: activeTab.value === "login" ? formValues : magicFormValues,
    });

    const { value: email, errorMessage: emailError } = useField("email");
    const { value: memail, errorMessage: mEmailError } = useField("memail");
    const { value: password, errorMessage: passwordError } =
      useField("password");

    const onSubmit = handleSubmit(async (values) => {
      const url = config.apiUrl + "auth/login";
      const mUrl = config.apiUrl + "auth/magic-login";
      const data = { userId: values.email, password: values.password };
      const mNewdata = {
        email: values.email,
        password: values.password,
        vendorEmail: values.memail || "",
      };
      const bodyValue = activeTab.value === "login" ? data : mNewdata;
      const body = bodyValue;
      const hasAuth = false;

      const response = await apiClients.post(
        activeTab.value === "login" ? url : mUrl,
        body,
        hasAuth
      );

      if (
        response?.data?.user?.role === "admin" ||
        response?.data?.user?.role === "vendor"
      ) {
        setAccessToken(JSON.stringify(response?.data?.tokens?.access));
        setRefreshToken(JSON.stringify(response?.data?.tokens?.refresh));
        setActiveUser(JSON.stringify(response?.data?.user));
        router.push(
          response?.data?.user?.role === "vendor"
            ? "/app/transations"
            : "/app/home"
        );
        toast.success(" Login successfully", {
          timeout: 2000,
        });
      } else {
        return toast.error(" Email or Password is incorrect", {
          timeout: 2000,
        });
      }
    });

    const toggleTab = (tab) => {
      activeTab.value = tab;
    };

    return {
      activeTab,
      checkbox,
      email,
      memail,
      emailError,
      mEmailError,
      password,
      passwordError,
      onSubmit,
      toggleTab,
    };
  },
};
</script>

<style lang="scss"></style>
