<template>
<div id="wrap-main">
    <div class="layout-main form-booking">
        <v-stepper v-model="step" class="step-form">
            <header-step />
            <v-stepper-items>
                <v-stepper-content step="1">
                    <step-1 @updateStep="step = $event"/>
                </v-stepper-content>
                <!-- <step-map   @message="updateMessage" />
                <step-service  />
                <step-done /> -->
            </v-stepper-items>
            
        </v-stepper> 
         <!-- <form-question-user :dialog="dialog" @updateDialog="dialog = $event"/> -->
    </div>
   
</div>
</template>
<script>
import uuid from 'uuid'
export default {
    name: 'form-booking',

    components: {
        'header-step': () => import('@/components/formbooking/HeaderStep.vue'), 
        'step-1': () => import('@/components/formbooking/step1/ListStore.vue')
       
    },
    data()
    {
        return{
            booking: {}
        }
    },
    computed:{
        step(){
            return this.$store.state.step
        }
    },
    methods:{
        GetInfoBooking()
        {
            this.$http.get(this.$store.state.API_URL + 'booking/'+this.$route.params.phone).then((response) => {
                console.log(this.booking)
                this.booking = response.data
            })
        }
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