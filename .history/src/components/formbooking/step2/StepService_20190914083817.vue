<template>

        <div style="padding:15px;">
            <div class="list-service">
                <v-alert :type="message.type" :value="true" v-if="message.text != null">
                    {{message.text}}
                </v-alert>
                <v-tabs>
                    <v-tab>
                        DỊCH VỤ
                    </v-tab>
                    <v-tab>
                        STYLE LIST 
                    </v-tab>
                    <v-tab>
                        MÃ KHUYẾN MÃI
                    </v-tab>
                    <v-tab>
                        THÔNG TIN KHÁCH HÀNG
                    </v-tab>
                    <v-tab-item>
                        <tab-service :services="services" @updateCheckService="checkedService = $event" />
                    </v-tab-item>
                    <v-tab-item>
                        <!-- <tab-stylist /> -->
                    </v-tab-item>
                    <v-tab-item>
                        <!-- <tab-code/> -->
                    </v-tab-item>
                    <v-tab-item>
                        <v-text-field
                            name="phone"
                            label="HỌ VÀ TÊN CỦA QUÝ KHÁCH"
                            v-model="booking.NAME_BOOKING"
                            prepend-icon="mdi-account"
                            ></v-text-field>
                        <v-text-field
                            name="phone"
                            label="EMAIL CỦA QUÝ KHÁCH"
                            v-model="booking.EMAIL_BOOKING"
                            :counter="50"
                            :rules="ruleEmail"
                            prepend-icon="mdi-email"
                        ></v-text-field>
                    </v-tab-item>
                </v-tabs>
                
            </div>
            <div class="check-time">
            <!-- <v-tabs v-model="tabs">
                <v-tab class="item-tab"><h4 style="width:100%;">CHỦ NHẬT</h4></v-tab>
                    <v-tab class="item-tab"><h4 style="width:100%;">THỨ 2</h4></v-tab>
                    <v-tab class="item-tab"><h4 style="width:100%;">THỨ 3</h4></v-tab>
                    <v-tab class="item-tab"><h4 style="width:100%;">THỨ 4</h4></v-tab>
                    <v-tab class="item-tab"><h4 style="width:100%;">THỨ 5</h4></v-tab>
                    <v-tab class="item-tab"><h4 style="width:100%;">THỨ 6</h4></v-tab>
                    <v-tab class="item-tab"><h4 style="width:100%;">THỨ 7</h4></v-tab>
                    
                    <v-tab-item>
                        <tab-time :now="now" :tab="0"/>
                    </v-tab-item>
                    <v-tab-item>
                        <tab-time :now="now" :tab="1" />
                    </v-tab-item>
                    <v-tab-item> 
                        <tab-time :now="now" :tab="2"/>
                    </v-tab-item>
                    <v-tab-item> 
                        <tab-time :now="now" :tab="3"/>
                    </v-tab-item>
                    <v-tab-item>
                        <tab-time :now="now" :tab="4" />
                    </v-tab-item>
                    <v-tab-item>
                        <tab-time :now="now" :tab="5"/>
                    </v-tab-item>
                    <v-tab-item>
                        <tab-time :now="now" :tab="6" />
                    </v-tab-item>
                    
                    
                </v-tabs>-->
                
            
            </div> 
            <div class="group-btn">
                
                <v-layout row>
                    <v-flex xs12 sm6 class="btn">
                        <v-btn class="btn-booking"  @click="$emit('updateStep',1)"> <v-icon>mdi-chevron-left</v-icon> Quay Lại</v-btn>
                    </v-flex>
                    <v-flex xs12 sm6 class="btn">
                        <v-btn class="btn-booking" color="primary" @click="NextStep(3)">Tiếp Tục <v-icon>mdi-chevron-right</v-icon></v-btn>
                    </v-flex>
                </v-layout>
            </div>
        </div>
    
</template>

<script>
export default {
    props: ["step"],
    components: {
        'tab-service': () => import('@/components/formbooking/step2/TabService.vue')
    },
    data()
    {
        return {
            message: {
                type: null,
                text: null
            },
            booking: {},
            CODE: null,
            ruleEmail: [
            v => !!v || 'Bạn chưa nhập Email',
            v => /.+@.+\..+/.test(v) || 'Đây không phải là email!',
            ],
            services: [],
            checkedService: []
        }
    },
    watch:{
        step(newVal)
        {
            if(newVal == 2)
            {
                this.ApiGetService()
            }
            else
            {
                this.services = []
            }
        }
    },
    methods:
    {
        ApiGetService()
        {
            this.$http.get(this.$store.state.API_URL + 'service')
            .then((response) => {
                this.services = response.data
            })
        },
        NextStep(value)
        {
            console.log(this.checkedService)
        }
    }
}
</script>

<style scoped>
.item-tab {display: block;padding: 15px;text-align: center}

</style>