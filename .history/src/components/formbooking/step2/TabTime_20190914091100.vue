<template>
<v-tabs vertical >
    <v-tab v-for="(room,i) in rooms" :key="i" @click="checkRoom(room.UUID_ROOM)">
        <p>{{room.NAME_ROOM}}</p>
    </v-tab>
    <v-tab-item  v-for="(room,i) in rooms" :key="i">
        <tab-time-room :id="room.UUID_ROOM" :tab="tab" />
    </v-tab-item>
</v-tabs>
</template>

<script>
import axios from 'axios'
import { mapGetters, mapActions } from 'vuex';

export default {
    props: ["tab","rooms"],
    computed: {
    },
    components: {
        'tab-time-room': () => import('@/components/formbooking/step2/TabTimeRoom.vue')
    },
    data()
    {
        return{
            times: []
        }
    },
    methods: {
        checkRoom(UUID)
        {
            const date = new Date()
            if(date.getDay() != this.tab)
            {
                var day = 0
                if(this.tab > date.getDay())
                {
                    day = this.tab - date.getDay()
                    date.setDate(date.getDate() + day)
                }
                else
                {
                    day = this.tab -  date.getDay()
                    day = day + 8
                    date.setDate(date.getDate() + day)
                }
                
                // console.log(date.getFullYear(),date.getMonth(),date.getDate()) 
               
            }
            this.$emit("checkedRoom",UUID)
        }
    },
    
}
</script>

<style>
.content-time {text-align: center;border: 1px solid #e2e2e2;cursor: pointer;}
.content-time {border-bottom: 3px solid #4CAF50}
.content-time.active {border-bottom: 3px solid red}
.content-time:hover,.item-room .content-room:hover  {background: #ebebeb;}
.content-time.active::after{position: absolute;content: '';width: 100%;height: 100%;top: 0;left: 0;background: #33333326;z-index: 999;}
.content-time.active:hover {background: transparent;cursor: not-allowed}
.title-time {font-size: 26px;font-weight: bold}
.list-time .item-time {padding: 2px !important;display: inline-block;}
.item-room {text-align: center;}
.item-room .content-room,.content-time {height: 80px;;}
.item-room .content-room {border:1px solid #e2e2e2;cursor: pointer;margin: 2px 0;}
.item-room .content-room.active {background: #ebebeb}
.item-room .content-room.active:hover {cursor: not-allowed;}
.customer-room {font-size: 12px;}
</style>