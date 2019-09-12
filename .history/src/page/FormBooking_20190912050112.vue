<template>
<div id="wrap-main">
    <div class="layout-main form-booking">
        <v-stepper v-model="getStep" class="step-form">
            <step-form />
            <v-stepper-items>
                <!-- <step-map   @message="updateMessage" />
                <step-service  />
                <step-done /> -->
            </v-stepper-items>
            
        </v-stepper> 
         <!-- <form-question-user :dialog="dialog" @updateDialog="dialog = $event"/> -->
    </div>
    <v-overlay :value="getOverlayBooking" style="z-index:9999">
        <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
   
</div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
// import * as firebase from  'firebase';
import uuid from 'uuid'
import axios from 'axios'
export default {
    name: 'form-booking',

    components: {
        'step-form': () => import('@/components/StepForm.vue'), 
        'step-map':  () => import('@/components/StepContentMap.vue'),
        'step-service':  () => import('@/components/StepContentService.vue'),
        'step-done': () => import('@/components/StepDone.vue'),
        'form-question-user': () => import('@/components/dialog/FormQuestionUser.vue')
    },
    data()
    {
        return{
           
        }
    },
    methods:{
        
    },
    created()
    {
       
       
    }
}
</script>

<style scoped>
.layout-main.form-booking {width: 800px;height: 100%;overflow: hidden;;overflow-y:scroll;background: #EBEBEB}
.header-form {padding: 15px}

</style>