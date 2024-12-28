<template>
  <form @submit.prevent="onSubmit" class="space-y-4">
    <Textinput label="password" type="text" placeholder="Type your new password" name="password" v-model="password"
      :error="passwordError" classInput="h-[48px]" />

    <button type="submit" class="btn btn-dark block w-full text-center">
      Set new password
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
      password: yup.string().required(),
    });

    const { handleSubmit } = useForm({
      validationSchema: schema,
    });
    // No need to define rules for fields

    const { value: password, errorMessage: passwordError } = useField("password");

    const onSubmit = handleSubmit(async () => {
      const { token } = getOtpToken();
      const otp = localStorage.getItem('otp');
      const url = config.apiUrl + 'auth/reset-password-phone';
      const body = { newPassword: password.value, otpToken: token, otp }
      const hasAuth = false
      const response = await apiClients.post(url, body, hasAuth);

      if (!response?.success)
        return toast.error(response?.data?.message || 'Something went wrong please try again later', {
          timeout: 3000,
        });

      localStorage.removeItem('otp');
      router.push('/');
      toast.success(' New password has been set', {
        timeout: 2000,
      });
    });

    return {
      password,
      passwordError,
      onSubmit,
    };
  },
};
</script>
<style lang="scss"></style>
