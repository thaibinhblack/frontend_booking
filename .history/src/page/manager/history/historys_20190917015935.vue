<template>
    <v-col cols="12" sm="12">
    <header-manager :title="'DANH SÁCH NHÂN VIÊN'" link="Danh sách nhân viên" />
    <v-card style="padding:25px;">
        <v-card-text>
            <v-row >
                <v-col cols="12" sm="12">
                    <button class="btn btn-add" @click="$router.push('/manager/add-user')"><v-icon>mdi-plus</v-icon> Thêm mới</button>
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
                <template v-slot:item.UUID_RULE="{item}">
                    <span v-if="item.UUID_RULE == 'manager-2019'">Quản lý</span>
                    <span v-else>Nhân viên </span>
                </template>
                <template v-slot:item.GENDER="{item}">
                    <v-icon>{{item.GENDER == 1 ? 'mdi-gender-male' : 'mdi-gender-female'}}</v-icon>
                </template>
                <template v-slot:item.ACTION="{item}">
                    <router-link :to="'/manager/user/'+item.UUID_USER"><v-icon>mdi-chevron-right</v-icon></router-link>
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
                {text: 'NHÓM CHỨC NĂNG', value: 'NAME_HISTORY',sortable: false,align: 'center'},
                {text: 'NỘI DUNG THAO TÁC', value: 'CONTENT_HISTORY', sortable: true},
                {text: 'NGÀY THAO TÁC', value: 'CREATED_AT', sortable: true},

            ],
            historys: []
        }
    },
    methods: {
        ApiHistory()
        {
            this.$http.get(this.$store.state.API_URL + 'history').then((response) => {
                this.historys = response.data
            })
        }
    },
    created()
    {
        this.ApiHistory()
    }
}
</script>

<style scoped>
a {text-decoration: none}
</style>