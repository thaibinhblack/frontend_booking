<template>
    <v-col cols="12" sm="12">
    <header-manager :title="'DANH SÁCH NHÂN VIÊN'" link="Danh sách nhân viên" />
    <v-card style="padding:25px;">
        <v-card-text>
            <v-row >
                <v-col cols="12" sm="12">
                    <button class="btn btn-add"><v-icon>mdi-plus</v-icon> Thêm mới</button>
                </v-col>
            </v-row>
        </v-card-text>
        <v-card-text>
            <v-data-table
            :headers="headers"
            :items="users"
            >
                <template v-slot:item.AVATAR="{item}">
                    <v-avatar
                        size="50"
                        color="#e2e2e2"
                    >
                        <img v-if="item.AVATAR != null" :src="$store.state.PUBLIC_URL + item.AVATAR" alt="alt">
                    </v-avatar>
                </template>
                <template v-slot:item.UUID_RULE="item">
                    <span v-if="item.UUID_RULE == 'manager-2019'">Quản lý</span>
                    <span v-else>Nhân viên {{item.UUID_RULE}}</span>
                </template>
                <template v-slot:item.GENDER="{item}">
                    <v-icon>{{item.GENDER == 1 ? 'mdi-gender-male' : 'mdi-gender-female'}}</v-icon>
                </template>
                <template v-slot:item.ACTION="{item}">
                    <router-link :to="'./user/'+item.UUID_USER"><v-icon>mdi-chevron-right</v-icon></router-link>
                </template>
            </v-data-table>
        </v-card-text>
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
            headers: [
                {text: 'AVATAR', value: 'AVATAR',sortable: false,align: 'center'},
                {text: 'USERNAME', value: 'USERNAME', sortable: true},
                {text: 'QUYỀN', value: 'UUID_RULE', sortable: false},
                {text: 'EMAIL', value: 'EMAIL', sortable: true},
                {text: 'PHONE', value: 'PHONE', sortable: true},
                {text: 'GIỚI TÍNH', value: 'GENDER', sortable: false, align: 'center'},
                {text: 'NGÀY SINH', value: 'BIRTH_DAY', sortable: false},
                {text: 'NGÀY TẠO', value: 'CREATED_AT'},
                {text: 'TÁC VỤ', value: 'ACTION', sortable: true},

            ],
            users: [
                
            ],
            province: [],
            country: []
        }
    },
    methods: {
        ApiGetUser()
        {
            this.$http.get(this.$store.state.API_URL + 'user?api_token='+this.$session.get('token')).then((response) => {
                this.users = response.data
            })
        },
        ApiGetProvince() {
            this.$http.get(this.$store.state.API_URL + 'province').then((response) => {
                this.province = response.data
            })
        },
        ApiGetCountry() {
            this.$http.get(this.$store.state.API_URL + 'country').then((response) => {
                this.country = response.data
            })
        }
    },
    created()
    {
        this.ApiGetUser()
        this.ApiGetProvince()
        this.ApiGetCountry()
    }
}
</script>

<style scoped>
a {text-decoration: none}
</style>