<template>
  <!-- <div class="modal-groups"> -->
  <Modal
    :title="'Confirmation'"
    labelClass="btn-outline-dark"
    ref="modal1"
    sizeClass="max-w-xs"
  >
    <Button
      class="px-4 py-2 bg-red-700 text-white rounded-md mr-2"
      @click="clickYes"
    >
      Yes
    </Button>
    <Button class="px-4 py-2 text-white rounded-md" @click="cancelModal">
      No
    </Button>

    <!-- <template v-slot:footer>
        </template> -->
  </Modal>

  <!-- </div> -->
</template>
<script>
import Button from "@/components/Button";
import Modal from "@/components/Modal/Modal";
export default {
  components: {
    Modal,
    Button,
  },
  props: {
    userId: String,
  },
  methods: {
    clickYes() {
      this.$refs.modal1.closeModal();
      console.log(this.userId);
      this.$emit("submitYes", this.userId);
    },
    cancelModal() {
      this.$refs.modal1.closeModal();
    },
  },
};
</script>
<style lang=""></style>
