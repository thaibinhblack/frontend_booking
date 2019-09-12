<template>
    <v-stepper-header>
      <v-stepper-step
        :complete="$store.state.step >= 1 && $store.state.step < 3"
        :editable="$store.state.step >= 1 && $store.state.step < 3"
        step="1"
      >
       CHỌN KHU VỰC
      </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step
        :complete="$store.state.step >= 2  && $store.state.step < 3"
        :editable="$store.state.step >= 2  && $store.state.step < 3"
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

}
</script>

<style scoped>
.step-form {width: 100%;}
</style>