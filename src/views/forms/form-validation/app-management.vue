<template>
  <div>
    <form
      @submit.prevent="onSubmit"
      class="lg:grid-cols-3 grid gap-5 grid-cols-1"
    >
      <!-- <Textinput
          label="initial creditworthiness points"
          type="text"
          placeholder="Enter creditworthiness points"
          name="creditworthiness"
          v-model="creditworthiness"
          :error="creditworthinessError"
        /> -->
      <!-- <Textinput
          label="Threshold Points - min"
          type="text"
          placeholder="Enter Threshold Points - min"
          name="thresholdmin"
          v-model="thresholdMin"
          :error="threshold-minError"
        />     -->

      <Textinput
        label="Vendor Threshold"
        type="text"
        placeholder="Enter Vendor Threshold"
        name="threshold"
        v-model="appConfig.vendorThreshold"
        :error="thresholdError"
      />
      <Textinput
        label="Redeemable Points - min"
        type="text"
        placeholder="Enter Redeemable Points - min"
        name="redeemablemin"
        v-model="appConfig.vendorMinRedeemablePoints"
        :error="redeemable - minError"
      />

      <Textinput
        label="Redeemable Points - max"
        type="text"
        placeholder="Enter Redeemable Points - max"
        name="redeeemablemax"
        v-model="appConfig.vendorMaxRedeemablePoints"
        :error="redeemable - maxError"
      />

      <Textinput
        label="VAT Tax (%)"
        type="text"
        placeholder="Enter VAT Tax (%)"
        name="vat"
        v-model="appConfig.taxPercentage"
        :error="vatError"
      />

      <Textinput
        label="Commission (%)"
        type="text"
        placeholder="Enter Commission (%)"
        name="commission"
        v-model="appConfig.vendorCommissionPercentage"
        :error="commissionError"
      />

      <Textinput
        label="Earning (%)"
        type="text"
        placeholder="Earning (%)"
        name="earning"
        v-model="appConfig.rewardPercentage"
        :error="earningError"
      />

      <Textinput
        label="Creditworthiness (%)"
        type="text"
        placeholder="Creditworthiness (%)"
        name="creditworthiness"
        v-model="appConfig.creditWorthinessPercentage"
        :error="creditworthinessError"
      />
      <Textinput
        label="JML Earning (%)"
        type="text"
        placeholder="Enter JML Earning (%)"
        name="jmlEarning"
        v-model="appConfig.jmlEarningPercentage"
        :error="jmlEarningError"
      />

      <Textinput
        label="Min Borrow Points Limit"
        type="text"
        placeholder="Enter Min Borrow Points Limit"
        name="minBorrowPointsLimit"
        v-model="appConfig.minBorrowingLimit"
        :error="minBorrowPointsLimitError"
      />

      <Textinput
        label="Borrow Fee (%)"
        type="text"
        placeholder="Enter Min Borrow Fee"
        name="borrowingFeePercentage"
        v-model="appConfig.borrowingFeePercentage"
        :error="borrowingFeePercentageError"
      />
      <Textinput
        label="Referral Bonus Points"
        type="text"
        placeholder="Enter Referral Bonus Points"
        name="referralBonusPoints"
        v-model="appConfig.referralBonusPoints"
        :error="referralBonusPointsError"
      />
    </form>
    <div>
      <Button
        class="mt-5"
        text="Submit"
        btnClass="btn-dark"
        @click="$emit('updateAppConfig', appConfig)"
      ></Button>
    </div>
  </div>
</template>
<script>
import Button from "@/components/Button";
import Textinput from "@/components/Textinput";
import { red } from "tailwindcss/colors";
import { useField, useForm } from "vee-validate";
import * as yup from "yup";

export default {
  components: {
    Textinput,
    Button,
  },
  props: {
    appConfig: {
      type: Object,
    },
  },

  mounted() {
    console.log(this.appConfig);
  },

  setup() {
    // Define a validation schema
    const schema = yup.object({
      email: yup.string().required().email(),
      username: yup.string().required(),
      password: yup.string().required().min(8),
      thresholdMin: yup.number().required().min(0),
      thresholdMax: yup.number().required().min(0),
      confirmpass: yup
        .string()
        .required()
        .oneOf([yup.ref("password")]),
    });

    const { handleSubmit } = useForm({
      validationSchema: schema,
    });
    // No need to define rules for fields

    const { value: email, errorMessage: emailError } = useField("email");
    const { value: username, errorMessage: usernameError } =
      useField("username");
    const { value: password, errorMessage: passwordError } =
      useField("password");
    const { value: confirmpass, errorMessage: confirmpassError } =
      useField("confirmpass");

    const onSubmit = handleSubmit(() => {
      // console.warn(values.email);
    });

    return {
      email,
      password,
      passwordError,
      emailError,
      username,
      usernameError,
      confirmpass,
      confirmpassError,
      onSubmit,
    };
  },
};
</script>
<style lang="scss"></style>
