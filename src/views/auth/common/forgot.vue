<template>
  <form @submit.prevent="onSubmit" class="space-y-4">
    <Textinput
      label="phone number"
      type="number"
      placeholder="Type your phone number"
      name="phoneNumber"
      v-model="phoneNumber"
      :error="phoneNumberError"
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
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import apiClients from '@/utils/apiClients';
import config from '@/config';
import { setOtpToken } from '../../../utils/utils';

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
      phoneNumber: yup.number().required(),
    });

    const { handleSubmit } = useForm({
      validationSchema: schema,
    });
    // No need to define rules for fields

    const { value: phoneNumber, errorMessage: phoneNumberError } = useField("phoneNumber");

    const onSubmit = handleSubmit(async() => {
      const url = config.apiUrl + 'auth/forgot-password-phone';
      const body = {  phoneNumber: phoneNumber.value}
      const hasAuth = false
      const response = await apiClients.post(url, body, hasAuth);
      
      if(!response?.success)
        return toast.error(response?.data?.message || 'Something went wrong please try again later', {
          timeout: 3000,
        });

      setOtpToken((response?.data?.otpToken));
      router.push('/otp');
      toast.success(' OTP sent  successfully', {
        timeout: 2000,
      });
    });

    return {
      phoneNumber,
      phoneNumberError,
      onSubmit,
    };
  },
};
</script>
<style lang="scss"></style>
