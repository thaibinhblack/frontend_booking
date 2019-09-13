<template>
<v-col cols="12" sm="6">
    <v-list-item class="item-data">
        <v-list-item-content class="content" :class="{active: classActive}"  @click="updateActive()">
            <v-list-item-title class="title" >{{item.NAME_STORE}}</v-list-item-title>
            <v-list-item-subtitle>{{item.ADDRESS_STORE}}</v-list-item-subtitle>
            <v-list-item-subtitle>{{item.PHONE_STORE}}</v-list-item-subtitle>
         </v-list-item-content>
        
    </v-list-item>
</v-col >

</template>

<script>
import {mapActions} from 'vuex'
export default {
    props: ['item','index'],
    watch:
    {
        index(newVal)
        {
          
            if(newVal)
            {
                // console.log('watch',newVal)
                if(this.item.UUID_STORE == this.index.UUID_STORE )
                {
                    this.classActive = true
                } 
                else
                {
                    this.classActive = false
                }  
                
            }
        }
    },
    data()
    {
        return {
            classActive: false
        }
    },
    methods: {
        updateActive()
        {
            this.$emit("activeClass",this.item)
        }
    }
}
</script>

<style scoped>
.item-data {display: inline-block;  text-align: center;padding: 2px !important}
.item-data .content {border:1px solid #e2e2e2;cursor: pointer}
.item-data .content.active {background: #EBEBEB}
.item-data .title {font-size: 16px;text-transform: uppercase}
.item-data .content:hover {background: #EBEBEB}
</style>