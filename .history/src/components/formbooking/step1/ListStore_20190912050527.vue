<template>
     <v-stepper-content step="1">
        <div>
            <div class="header-form">
            <v-icon>mdi-map-marker</v-icon> CHỌN TỈNH / THÀNH PHỐ
            </div>
            <select-map />
            <div class="group-btn">
                <v-layout row>
                    <v-flex xs12 sm6 class="btn">
                        <v-btn class="btn-booking"> <v-icon>mdi-chevron-left</v-icon> Quay Lại</v-btn>
                    </v-flex>
                    <v-flex xs12 sm6 class="btn">
                        <v-btn class="btn-booking" color="primary" @click="NextStep()">Tiếp Tục <v-icon>mdi-chevron-right</v-icon></v-btn>
                    </v-flex>
                </v-layout>
            </div>
        </div>
    </v-stepper-content>
</template>
<script>
import axios from 'axios'
import {mapGetters, mapActions} from 'vuex'
export default {
    
}
</script>
<style scoped>
.pd0 {margin: 0 !important}

</style>