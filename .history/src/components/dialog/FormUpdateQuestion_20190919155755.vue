<template>
    <v-dialog
        v-if="dialog == true"
        v-model="dialog"
        persistent
        max-width="650px">
        <v-card class="card-question">
         
                <v-alert :type="message.type" v-if="message.text != null" :value="true" style="width: 100%">
                    {{message.text}}
                </v-alert>
                <v-card-title primary-title>
                    <v-row>
                        <v-col cols="12" sm="12">
                            FORM CẬP NHẬT CÂU HỎI {{question.NAME_QUESTION}} 
                        </v-col>
                        <v-col cols="12" sm="12">
                            <button class="btn btn-add"><v-icon>mdi-plus</v-icon> Thêm câu trả lời</button>
                        </v-col>
                    </v-row>
                </v-card-title>
               <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12" sm="12">
                                <v-text-field
                                    name="NAME_QUESTION"
                                    label="CÂU HỎI"
                                    v-model="question.NAME_QUESTION"
                                    append-icon="mdi-update"
                                    @click:append="updateQuestion()"
                                ></v-text-field>
                            </v-col>
                            <item-answer v-for="(answer,i) in answers" :key="i" :answer="answer" />
                            <v-col cols="12" sm="12">
                                <v-text-field
                                    name="NAME_ANSWER"
                                    label="Câu trả lời"
                                    v-model="answer.NAME_ANWSER"
                                    append-icon="mdi-check"
                                    @click="addAnswer()"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                    </v-container>
               </v-card-text>
                <v-card-actions>
                    <div class="flex-grow-1"></div>
                    <v-btn color="blue darken-1" text @click="$emit('closeDialog',false)">Close</v-btn>
                    <v-btn color="blue darken-1" text type="reset"  @click="numberQuestion = 0 ">Reset</v-btn>
                </v-card-actions>
          
        </v-card>
        
    </v-dialog>
</template>

<script>
export default {
    props: ["dialog", "question"],
    data()
    {
        return {
            numberQuestion: 1,
            message: {
                type: null,
                text: null
            },
            answers: [],
            answer: {}
        }
    },
    watch:{
        dialog(newVal)
        {
            if(newVal == true)
            {
                this.$http.get(this.$store.state.API_URL + 'answer?UUID_QUESTION='+this.question.UUID_QUESTION).then((response) => {
                    this.answers = response.data
                })
            }
        }
    },
    components: {
        'item-answer': () => import('@/components/manager/question/ItemAnswer.vue')
    },
    methods:{
        updateQuestion()
        {
            const data = new FormData()
            data.append("NAME_QUESTION",this.question.NAME_QUESTION)
            this.$http.post(this.$store.state.API_URL + 'question/'+this.question.UUID_QUESTION+'/update',data).then(() => {
                this.message.type ='success'
                this.message.text = 'Cập nhật thành công!'
            }).catch(() => {
                this.message.type = 'error'
                this.message.text = 'Lôi! Xin vui lòng thử lại!'
            })
        },
        addAnswer()
        {
            const data = new FormData()
            data.append("UUID_QUESTION",this.question.UUID_QUESTION)
            data.append("NAME_ANWSER",this.answer.NAME_ANWSER)
            this.$http.post(this.$store.state.API_URL + "answer").then((response) => {
                this.answer.success = true
                this.answer.message_success = "Thêm câu trả lời mới thành công!"
                this.answer.NAME_ANWSER = ""
                this.answer.error = false
                this.answer.message_error = ""
            }).catch(() => {
                this.answer.success = false
                this.answer.message_success = ""
                this.answer.error = true
                this.answer.message_error = "Lôi! xin vui lòng thử lại!"
            })
        }
    },
    created()
    {
        
    }
}
</script>

<style  scoped>
.card-question {padding: 25px;}
.btn-add-question {cursor: pointer;margin-left: 15px;padding: 5px;}
</style>