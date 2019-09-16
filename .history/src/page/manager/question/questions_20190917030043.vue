<template>
    <v-col cols="12" sm="12">
        <header-manager :title="'DANH SÁCH CÂU HỎI'" :link="'Danh sách câu hỏi'"/>
        <v-card style="padding:25px;" >
            <v-card-title primary-title>
                <button class="btn btn-add"><v-icon>mdi-plus</v-icon> Thêm mới câu hỏi</button>
            </v-card-title>
           <v-card-text>
               <item-question v-for="(question,i) in questions" :key="i" :manager="true" :question="question"/>
           </v-card-text>
        </v-card>
        <form-question :dialog="dialog" @closeDialog="dialog = $event" />
    </v-col>
   
</template>

<script>
import { mapGetters } from 'vuex';
import axios from 'axios';
export default {
    components: {
        'header-manager': () => import('@/components/manager/HeaderManager.vue'),
        'form-question': () => import('@/components/dialog/FormQuestion.vue'),
        'item-question': () => import('@/components/manager/question/ItemQuestion.vue'),
    },
    computed:
    {
        ...mapGetters(["this.$store.state.API_URL"]),
    },
    data()
    {
        return{
            questions: [],
            answers: [],
            question_answers: []
        }
    },
    methods:
    {
        ApiGetQuestion()
        {
            axios.get(this.this.$store.state.API_URL + 'question')
            .then((response) => {
                this.questions = response.data
                console.log(response.data)
            })
        },
        
    },
    created()
    {
        this.ApiGetQuestion()
    }
}
</script>