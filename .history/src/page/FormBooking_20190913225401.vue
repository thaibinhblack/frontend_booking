<template>
<div id="wrap-main">
    <div class="layout-main form-booking">
        <v-card>
            <v-card-text>
                <v-stepper v-model="step" class="step-form">
                    <header-step />
                    <v-stepper-items>
                        <v-stepper-content step="1">
                            <step-1 @updateStep="step = $event" :booking="booking"/>
                        </v-stepper-content>
                        <!-- <step-map   @message="updateMessage" />
                        <step-service  />
                        <step-done /> -->
                    </v-stepper-items>

                </v-stepper> 
            </v-card-text>
            <v-card-actions>
                 <v-row class="group-btn">
                    <v-col cols="12" sm="6" class="btn"> <v-btn class="btn-booking"> <v-icon>mdi-chevron-left</v-icon> Quay Lại</v-btn></v-col>                  
                    <v-col cols="12" sm="6">
                         <v-btn class="btn-booking" color="primary" @click="NextStep()">Tiếp Tục <v-icon>mdi-chevron-right</v-icon></v-btn>
                    </v-col>
                </v-row>
            </v-card-actions>
        </v-card>
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
                
                this.booking = response.data
                console.log(this.booking)
            })
        }
    },
    created()
    {
       this.GetInfoBooking()
       
    }
}
</script>

<style scoped>
.layout-main.form-booking {width: 800px;height: 100%;overflow: hidden;;overflow-y:scroll;background: #EBEBEB}
.header-form {padding: 15px}

</style>