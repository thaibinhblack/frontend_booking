<template>
     <v-col cols="12" sm="6" md="4" style="margin:auto" v-if="show == true">
         <v-alert :type="message.type" v-if="message.text != null" :value="true">
             {{message.text}}
         </v-alert>
         <v-form @submit.prevent="createStylist()">
                <v-card style="padding:15px;">
                    <v-card-text>
                        <div class="item-stylist" >
                            <div class="image-stylist" style="text-align:center;">
                                <v-avatar
                                    size="80"
                                    color="#e2e2e2"
                                >
                                <input type="file" ref="MyAvatar" @change="renderAvatar()">
                                    <img v-if="avatar != null" :src="avatar" alt="alt">
                                </v-avatar>
                            </div>
                            <div class="content-stylist">
                                <v-text-field
                                    name="NAME"
                                    label="HỌ & TÊN"
                                    prepend-icon="mdi-account-card-details-outline"
                                    v-model="stylist.NAME_STYLIST"
                                    :success="stylist.success"
                                    :success-messages="stylist.message"
                                    :disabled="stylist.disabled"
                                ></v-text-field>
                            </div>
                        </div>
                    </v-card-text>
                    <v-card-actions>
                       <v-btn v-if="update == false" color="success"  type="submit">Thêm mới</v-btn>
                       <v-btn v-else color="success"  type="submit">Cập nhật</v-btn>
                    </v-card-actions>
                </v-card>
            </v-form>
        </v-col>
</template>

<script>
import uuid from 'uuid'
export default {
    props: ["stylist", "update", "show"],
    data()
    {
        return{
            avatar: null,
            message: {
                type: null,
                text: null
            },
            file: null
        }
    },
    watch:{
        stylist(newVal)
        {
            this.avatar = this.$store.state.PUBLIC_URL + newVal.URL_STYLIST
        }
    },
    methods: {
         renderAvatar()
        {
            var reader  = new FileReader()
            const file = this.$refs.MyAvatar.files[0]
            if(this.update == false)
            {
                this.stylist.URL_STYLIST = file
            }
            this.file = file
            this.avatar  = URL.createObjectURL(file)
        },
        createStylist()
        {
            if(this.update == false)
            {
                if(this.avatar == null)
                {
                    this.message.type = 'warning'
                    this.message.text = 'Bạn vẫn chưa thêm avatar cho stylist'
                }
                else
                {
                    const data = new FormData()
                    data.append("UUID_STYLIST",uuid.v4())
                    data.append("NAME_STYLIST", this.stylist.NAME_STYLIST)
                    data.append("URL_STYLIST",this.stylist.URL_STYLIST)
                    this.$http.post(this.$store.state.API_URL + 'stylist',data)
                    .then((response) => {
                        this.$emit("updateStylist",true)
                        this.stylist.disabled = true
                        this.stylist.success = true
                        this.stylist.messages = 'Thêm stylist mới thành công!'
                    })
                }
                
            }
            else
            {
                const data = new FormData();
                if(this.file != null)
                {
                    data.append("URL_STYLIST", this.file)
                }
                data.append("NAME_STYLIST",this.stylist.NAME_STYLIST)
                this.$http.post(this.$store.state.API_URL + 'stylist/'+this.stylist.UUID_STYLIST+'/update',data)
                .then((response) => {
                    // console.log(response.data)
                    this.avatar = null
                    this.$emit("updateStylist",true)
                    this.message.type = 'success'
                    this.message.text = 'Cập nhật thành công!'
                }).catch(() => {
                    this.message.type = 'error'
                    this.message.text = 'Lôi! Xin vui lòng thử lại!'
                })
            }
            
        }
    }
}
</script>

<style scoped>
.image-stylist {position: relative;}
.image-stylist input {position: absolute;width: 100%;height: 100%;left: 0;top: 0;opacity: 0;}
</style>