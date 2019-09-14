<template>

        <div>
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
                        <tab-service />
                    </v-tab-item>
                    <v-tab-item>
                        <tab-stylist />
                    </v-tab-item>
                    <v-tab-item>
                        <tab-code/>
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
            <v-tabs v-model="tabs">
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
                    
                    
                </v-tabs>
                
            
            </div>
            <div class="group-btn">
                
                <v-layout row>
                    <v-flex xs12 sm6 class="btn">
                        <v-btn class="btn-booking"  @click="commitStep(1)"> <v-icon>mdi-chevron-left</v-icon> Quay Lại</v-btn>
                    </v-flex>
                    <v-flex xs12 sm6 class="btn">
                        <v-btn class="btn-booking" color="primary" @click="NextStep(3)">Tiếp Tục {{getUUID_ROOM}} <v-icon>mdi-chevron-right</v-icon></v-btn>
                    </v-flex>
                </v-layout>
            </div>
        </div>
    
</template>