<template>
    <v-col cols="12" sm="12">
        <header-manager :title="'DANH SÁCH CÂU HỎI'" :link="'Danh sách câu hỏi'"/>
        <v-card style="padding:25px;" >
            <v-alert :type="message.type" v-if="message.text != null" :value="true">
                {{message.text}}
            </v-alert>
            <v-card-title primary-title>
                <button class="btn btn-add" @click="dialog = true"><v-icon>mdi-plus</v-icon> Thêm mới câu hỏi</button>
            </v-card-title>
           <v-card-text>
               <item-question v-for="(question,i) in questions" :key="i" :manager="true" :question="question" @deleteQuestion="deleteQuestion()"/>
           </v-card-text>
        </v-card>
        <form-question :dialog="dialog" @closeDialog="dialog = $event" />
    </v-col>
   
</template>

<script>
export default {
    components: {
        'header-manager': () => import('@/components/manager/HeaderManager.vue'),
        'form-question': () => import('@/components/dialog/FormQuestion.vue'),
        'item-question': () => import('@/components/manager/question/ItemQuestion.vue'),
    },
    data()
    {
        return{
            questions: [],
            answers: [],
            question_answers: [],
            dialog: false
        }
    },
    methods:
    {
        ApiGetQuestion()
        {
            this.$http.get(this.$store.state.API_URL + 'question')
            .then((response) => {
                this.questions = response.data
            
            })
        },
        deleteQuestion()
        {
            this.ApiGetQuestion();
            this.message.type = 'success'
            this.message.text = 'Bạn vùa xóa 1 câu hỏi thành công!'
        }
        
    },
    created()
    {
        this.ApiGetQuestion()
    }
}
</script>