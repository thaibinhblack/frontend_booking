<template>
<v-col cols="12" sm="12">
    <header-manager :title="'DANH SÁCH BOOKING'" :link="'Danh sách booking'" />
    <v-alert :type="message.type"  v-if="message.text != null" :value="true" >
        {{message.text}}
    </v-alert>
    <v-card>
        <v-data-table
        :headers="headers"
        :items="desserts"
        show-select
        item-key="name"
        v-model="selected">
            <template v-slot:item.action1="{ item }">
                <v-icon>{{item.ACTION_BOOKING >= 1 ?  'mdi-check' : 'mdi-alert-circle-outline'}}</v-icon>
            </template>
            <template v-slot:item.action2="{ item }">
                <v-icon>{{item.ACTION_BOOKING >= 2 ?  'mdi-check' : 'mdi-alert-circle-outline'}}</v-icon>
            </template>
            <template v-slot:item.action3="{ item }">
                <v-icon>{{item.ACTION_BOOKING == 3 ?  'mdi-check' : 'mdi-alert-circle-outline'}}</v-icon>
            </template>
            <template v-slot:item.TIME_BOOK="{ item }">
                <span>{{item.TIME_BOOK}}, ngày {{item.DATE_BOOK}}</span>
            </template>
            <template v-slot:item.actions="{ item }">
                <v-icon class="btn-table" color="success" v-if="item.CHECK_BOOKING == 2" title="Đã check">mdi-check</v-icon>
                <v-icon class="btn-table" color="error" v-else title="Chưa check" @click="checkBooking(item)">mdi-check</v-icon>
                <router-link class="link-booking" :to="'./booking/' +item.UUID_BOOKING"><v-icon class="btn-table" title="Xem thông tin chi tiết"> mdi-chevron-right</v-icon></router-link>
               
            </template>
        </v-data-table>
    </v-card>
</v-col>
</template>
<script>
export default {
    components: {
        'header-manager': () => import('@/components/manager/HeaderManager.vue')
    },
    data()
    {
        return {
            selected: [],
            headers: [
            {
                text: 'SĐT',
                align: 'center',
                sortable: true,
                value: 'PHONE_BOOKING',
                width: '120px'
            },
            { text: 'HỌ & TÊN', value: 'NAME_BOOKING', sortable: true, },
            { text: 'EMAIL', value: 'EMAIL_BOOKING', sortable: true, },
            { text: 'B1', value: 'action1', sortable: false, },
            { text: 'B2', value: 'action2', sortable: false, },
            { text: 'B3', value: 'action3', sortable: false, },
            { text: 'GHI CHÚ', value: 'NOTE_BOOKING', sortable: false, },
            { text: 'LỊCH HẸN', value: 'TIME_BOOK'},
            { text: 'TÁC VỤ', value: 'actions',align: 'center', sortable: false,width: '120px'}
            ],
            desserts: [],
            message: {
                type: null,
                text: null
            }
        }
    },
    methods: {
        ApiGetBooking(){
            this.$http.get(this.$store.state.API_URL + 'booking?api_token='+this.$session.get('token'))
            .then((response) => {
                this.desserts = response.data
            })
        },
        checkBooking(item)
        {
            this.$http.get(this.$store.state.API_URL + "booking/check?UUID_BOOKING="+item.UUID_BOOKING+'&api_token='+this.$session.get('token')+'&phone='+item.PHONE_BOOKING)
            .then(() => {
                this.message.type = 'success'
                this.message.text = 'Cập nhật thành công!'
                this.ApiGetBooking()
                // console.log(response.data)
            }).catch(() => {
                this.message.type = 'error'
                this.message.text = 'Lôi! Xin vui lòng thử lại!'
            })
        },
        DeleteBooking(UUID_BOOKING)
        {
            this.$http.delete(this.$store.state.API_URL + "booking/"+UUID_BOOKING)
            .then((response) => {
                this.message.type = 'success'
                this.message.text = 'Bạn vừa xóa một booking!'
                this.ApiGetBooking()
            }).catch((eror) => {
                this.message.type = 'error'
                this.message.text = 'Lôi! Xin vui lòng thử lại!'
            })
        }
    },
    created()
    {
        this.ApiGetBooking()
    }
}
</script>

<style scoped>
.btn-table {padding: 5px;cursor: pointer;}
.link-booking {text-decoration: none}
</style>