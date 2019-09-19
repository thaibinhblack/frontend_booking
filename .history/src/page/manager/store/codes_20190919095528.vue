<template>
    <v-col cols="12" sm="12">
        <header-manager :title="'DANH SÁCH CHI NHÁNH'" :link="'Danh sách chi nhánh'" />
        <v-card>
            <v-card-title primary-title>
                <button class="btn btn-add"><v-icon>mdi-plus</v-icon> Thêm code mới</button>
            </v-card-title>
            <v-card-text>
                <v-data-table
                    :headers="headers"
                    :items="copdes"
                >
                    
                </v-data-table>
            </v-card-text>
        </v-card>
        <form-add-code :dalog="dialog" @closeDialog="dialog = $event"/>
    </v-col>
</template>
<script>
export default {
    components: {
        'header-manager': () => import('@/components/manager/HeaderManager.vue'),
        'for-add-code': () => import('@/components/dialog/FormAddCode.vue')
    },
    data()
    {
        return {
            headers: [
                {text: 'MÃ CODE', value: 'NAME_CODE'},
                {text: 'GHI CHÚ', value: 'NOTE_CODE'},
                {text: 'CHI NHÁNH', value: 'UUID_STORE'},
                {text: 'SL', value: 'SL_CODE'},
                {text: 'SL CÒN LẠI', value: 'SL_CODED'},
                {text: 'NGÀY TẠO', value: 'CREATED_AT'},
                {text: 'TÁC VỤ', value: 'ACTION'}
            ],
            codes: [],
            dialog: false,
        }
    }
}
</script>