<template>
    <v-stepper-header>
      <v-stepper-step
        :complete="step >= 1 && step < 3"
        :editable="step >= 1 && step < 3"
        step="1"
        @click="$router.push('/booking/'+$route.params.phone)"
      >
       CHỌN KHU VỰC
      </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step
        :complete="step >= 2  && step < 3"
        :editable="step >= 2  && step < 3"
        step="2"
      >CHỌN DỊCH VỤ</v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step
       
        step="3"
      >
        HOÀN THÀNH
      </v-stepper-step>
    </v-stepper-header>
   

  
</template>

<script>
export default {
  props: ["step"]
}
</script>

<style scoped>
.step-form {width: 100%;}
</style>