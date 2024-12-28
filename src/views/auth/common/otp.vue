<template>
  <form @submit.prevent="onSubmit" class="space-y-4">
    <Textinput
      label="otp"
      type="number"
      placeholder="Type your OTP"
      name="otp"
      v-model="otp"
      :error="otpError"
      classInput="h-[48px]"
    />

    <button type="submit" class="btn btn-dark block w-full text-center">
      Send OTP
    </button>
  </form>
</template>
<script>
import Textinput from "@/components/Textinput";
import { useField, useForm } from "vee-validate";
import * as yup from "yup";
import { useToast } from 'vue-toastification';
import { useRouter } from 'vue-router';
import apiClients from '@/utils/apiClients';
import config from '@/config';
import { getOtpToken } from '../../../utils/utils';

export default {
  components: {
    Textinput,
  },
  data() {
    return {
      checkbox: false,
    };
  },
  setup() {
    const toast = useToast();
    const router = useRouter();

    // Define a validation schema
    const schema = yup.object({
      otp: yup.number().required(),
    });

    const { handleSubmit } = useForm({
      validationSchema: schema,
    });
    // No need to define rules for fields

    const { value: otp, errorMessage: otpError } = useField("otp");

    const onSubmit = handleSubmit(async() => {
      const { token } = getOtpToken();
      const url = config.apiUrl + 'auth/verify-reset-password-otp';
      const body = {  otp: otp.value, otpToken: token }
      const hasAuth = false
      const response = await apiClients.post(url, body, hasAuth);



      if(!response?.success)
        return toast.error(response?.data?.message || 'Something went wrong please try again later', {
          timeout: 3000,
        });
      
      localStorage.setItem('otp', otp.value);
      router.push(`/password`);
      toast.success(' OTP verify successfully', {
        timeout: 2000,
      });

    });

    return {
      otp,
      otpError,
      onSubmit,
    };
  },
};
</script>
<style lang="scss"></style>
