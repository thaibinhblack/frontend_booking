<template>
     <v-row class="item-question" :class="{active: open}">
        <v-col cols="12" sm="12" >
            <v-row>
                <v-col cols="12" sm="9" md="10"> 
                    <span>{{question.NAME_QUESTION}}</span>
                </v-col>
                <v-col v-if="manager == true" cols="12" sm="3" md="2" style="text-align:right">
                    <span class="group-btn" v-if="open == true" @click="open = false"><v-icon>mdi-plus</v-icon></span>
                    <span class="group-btn" v-else  @click="open = true"><v-icon>mdi-minus</v-icon></span>
                    <span class="group-btn"><v-icon>mdi-pencil</v-icon></span>
                    <span class="group-btn" @click="deleteQuestion(question.UUID_QUESTION)"><v-icon>mdi-delete</v-icon></span>
                </v-col>
            </v-row>
            
        </v-col>
      
        <!-- {{ question.ANSWERS[0].NAME_ANWSER}} -->
        <v-col cols="12" sm="6" md="3" v-for="(answer,index) in answers" :key="index">
            <v-checkbox v-model="checklocal" :label="answer.NAME_ANWSER" :value="answer.UUID_ANWSER"></v-checkbox>
        </v-col>
        
    </v-row> 
</template>

<script>
import axios from 'axios'
export default {
    props: ["question", "manager", "check"],
    data()
    {
        return {
            open: false,
            answers: [],
            checklocal: null
        }
    },
    watch:
    {
        checklocal(newVal)
        {
            console.log(newVal)
            if(newVal != null)
            {
                this.$emit("updateCheck",this.check,this.checklocal)
            }
        }
    },
    methods:{
        ApiGetAnswer()
        {
             this.$http.get(this.$store.state.API_URL + 'answer')
            .then((response) => {
                this.answers =  response.data.filter((value,index,array) => {
                    return array[index].UUID_QUESTION == this.question.UUID_QUESTION
                })
            })
        },
    },
    created()
    {
        this.ApiGetAnswer()
    }
}
</script>

<style scoped>
.group-btn {cursor: pointer; padding: 5px;}
.item-question {padding: 15px;}
.item-question.active {height: 70px;overflow: hidden;;}
</style>