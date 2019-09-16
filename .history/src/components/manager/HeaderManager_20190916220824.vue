<template>
<v-row class="header-title"> 
    <v-col cols="12" md="5" class="left-header">
    <h3>{{title}} <v-icon class="btn-reset" @click="$router.push('/manager/add-store')" v-if="add==true">mdi-update</v-icon></h3>
    </v-col>
    <v-col cols="12" md="7" class="right-header">
        <ul class="list-link">
            <li><v-icon>mdi-home</v-icon>Home</li>
            <li><v-icon>mdi-chevron-right</v-icon></li>
            <li v-if="sublink"><router-link :to="sublink.link">{{sublink.name}}</router-link></li>
            <li  v-if="sublink"><v-icon>mdi-chevron-right</v-icon></li>
            <li>{{link}}</li>
        </ul>
    </v-col>
    <v-col cols="12" sm="12" v-if="store == true">
    <v-btn class="dialog-form-map" @click="commitDialogMap(true)"><v-icon>mdi-plus</v-icon> Thêm mới địa chỉ</v-btn>
    </v-col>
    <v-col cols="12" sm="12" v-if="service == true">
        <v-btn class="dialog-form-map" @click="commitDialogService(true)"><v-icon>mdi-plus</v-icon> Thêm mới dịch vụ</v-btn>
    </v-col>
    <v-col cols="12" sm="12" v-if="question == true">
        <v-btn class="dialog-form-map" @click="commitDialogQuestion(true)"><v-icon>mdi-plus</v-icon> Thêm mới câu hỏi</v-btn>
    </v-col>
</v-row>
</template>

<script>
import {mapActions} from 'vuex'
export default {
    props: ["title", "link", "store", "service", "booking", "question", "sublink" ,"add"],
    methods: {
        ...mapActions(["commitDialogService","commitDialogMap","commitDialogQuestion"])
    }
}
</script>

<style scoped>
.header-title {margin-bottom: 50px;margin-left: 0;margin-right: 0;}
.list-link {text-align: right}
.list-link li {list-style: none;display: inline-block;}
.list-link li a {text-decoration: none;color: #333}
.list-link li a:hover {color: #2196f3}
.btn-reset {cursor: pointer; margin-left: 15px;}
</style>