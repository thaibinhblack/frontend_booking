<template>
    <v-dialog v-model="dialog" persistent max-width="600px">
        <form @submit.prevent="addService()">
            <v-card>
                <v-card-title>
                    <span class="headline" v-if="update == false">THÊM MỚI DỊCH VỤ</span>
                    <span class="headline" v-else>CẬP NHẬT DỊCH VỤ {{item_service.NAME_SERVICE}}</span>
                </v-card-title>
                <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="12">
                            <v-alert :type="message.type" v-if="message.text != null" :value="true">
                                {{message.text}}
                            </v-alert>
                        </v-col>
                        <v-col cols="12" sm="12">
                            
                            <v-text-field
                                name="NAME_SERVICE"
                                label="TÊN DỊCH VỤ"
                                prepend-icon="mdi-face-agent"
                                v-model="service.NAME_SERVICE"
                                required
                            ></v-text-field>
                            <span>HÌNH ẢNH DỊCH VỤ</span>
                            <div class="bg-servivce">
                                <input type="file" ref="myFiles" @change="renderImage()">
                                <img v-if="url != null" :src="url" required />
                                <img v-else :src="$store.state.PUBLIC_URL + service.IMAGE_SERVICE " alt="">
                            </div>
                        </v-col>
                        <v-col cols="12" sm="6">
                           
                        </v-col>
                    </v-row>
                </v-container>
                </v-card-text>
                <v-card-actions>
                <div class="flex-grow-1"></div>
                <v-btn color="blue darken-1" text @click="$emit('closeDialog',false)">Close</v-btn>
                <v-btn v-if="update == false"  color="blue darken-1" text type="submit" ><v-icon>mdi-plus</v-icon> Thêm mới</v-btn>
                <v-btn v-else  color="blue darken-1" text type="submit" ><v-icon>mdi-update</v-icon> Cập nhật</v-btn>
                </v-card-actions>
            </v-card>
            </form>
        </v-dialog>
</template>

<script>
import uuid from 'uuid'
export default {
    props: ["dialog","update", "item_service"],
    data()
    {
        return {
            message: {
                type: null,
                text: null
            },
            url: null,
            service: {
                UUID_SERVICE: uuid.v4(),
                NAME_SERVICE: '',
                IMAGE_SERVICE: ''
            }
        }
    },
    watch:{
        item_service(newVal)
        {
            this.url = this.$store.state.PUBLIC_URL +  newVal.IMAGE_SERVICE
            this.NAME_SERVICE = newVal.NAME_SERVICE
            this.service.UUID_SERVICE = newVal.UUID_SERVICE
        }
    },
    methods: {
        renderImage(){
            var reader  = new FileReader()
            const file = this.$refs.myFiles.files[0]
            this.service.IMAGE_SERVICE = file
            this.url  = URL.createObjectURL(file)
            // console.log(file)
        },
        addService()
        {
            const data = new FormData()
            data.append("UUID_SERVICE",this.service.UUID_SERVICE)
            data.append("NAME_SERVICE",this.service.NAME_SERVICE)
            if(this.service.IMAGE_SERVICE != '')
            {
                data.append("IMAGE_SERVICE",this.service.IMAGE_SERVICE)
            }
            
            if(this.update == false)
            {
                if(this.service.IMAGE_SERVICE == '')
                {
                    this.message.type = 'warning'
                    this.message.text = 'Bạn chưa thêm hình ảnh cho dịch vụ!'
                }
                else
                {
                    this.$http.post(this.$store.state.API_URL + "service?api_token="+this.$session.get('api_token'),data)
                .then((response) => {
                    this.service = {}
                    this.service.UUID_SERVICE = uuid.v4()
                    this.message.type = 'success'
                    this.message.text = 'Bạn vừa thêm dịch vụ mới!'
                }).catch((eror) => {
                    this.message.type = 'error'
                    this.message.text = 'Lôi! Có vấn đề xảy ra, xin vuio lòng thử lại!'
                })
                }
                
            }
            else
            {
                this.$http.post(this.$store.state.API_URL + "service/"+this.service.UUID_SERVICE+'/update?api_token='+this.$session.get('api_token'),data)
                .then((response) => {
                    this.message.type = 'success'
                    this.message.text = 'Bạn cập nhật dịch vụ '+this.service.NAME_SERVICE + ' !'
                }).catch((eror) => {
                    this.message.type = 'error'
                    this.message.text = 'Lôi! Có vấn đề xảy ra, xin vuio lòng thử lại!'
                })
            }
            
        }
    }
}
</script>
<style scoped>
.bg-servivce {width: 100%; position: relative;min-height: 120px;border: 1px solid #e2e2e2;border-radius: 5px;}
.bg-servivce img {width: 100%;height: 100%;}
.bg-servivce input[type="file"] { position: absolute;width: 100%;height: 100%;opacity: 0;top: 0;left: 0;}
</style>