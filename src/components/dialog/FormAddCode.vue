<template>
<v-dialog v-model="dialog" width="600px">
    <v-card>
        <v-card-title>
        <span class="headline">Form thêm code mới</span>
        </v-card-title>
        <v-card-text>
            <form>
                <v-row>
                    <v-col cols="12" sm="12" v-if="message.text != null">
                        <v-alert :type="message.type" v-if="message.text != null" :value="true">
                            {{message.text}}
                        </v-alert>
                    </v-col>
                    <v-col cols="12" sm="12">
                        <v-select
                            :items="stores"
                            item-text="NAME_STORE"
                            item-value="UUID_STORE"
                            v-model="code.UUID_STORE"
                            label="Chọn chi nhánh"
                        ></v-select>
                    </v-col>
                    <v-col cols="12" sm="12" md="6">
                        <v-text-field
                            name="NAME_CODE"
                            label="Mã code"
                            placeholder="Nhập mã code"
                            v-model="code.NAME_CODE"
                            @change="ApiCheckCode()"
                            required
                            prepend-icon="mdi-barcode"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="12" md="6">
                        <v-text-field
                            name="NOTE_CODE"
                            label="Ghi chú"
                            placeholder="Nhập ghi chú"
                            v-model="code.NOTE_CODE"
                            required
                            prepend-icon="mdi-rename-box"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="12" md="6">
                        <v-text-field
                            name="NOTE_CODE"
                            label="Số lượng code"
                            type="number"
                            v-model="code.SL_CODE"
                            min="1"
                            prepend-icon="mdi-numeric"
                        ></v-text-field>
                    </v-col>
                </v-row>
            </form>
        </v-card-text>
        <v-card-actions>
        <div class="flex-grow-1"></div>
        <v-btn color="green darken-1" text @click="$emit('closeDialog',false)">Close</v-btn>
        <v-btn color="green darken-1" text @click="addCode()">Save</v-btn>
        </v-card-actions>
    </v-card>
</v-dialog>
</template>
<script>
export default {
    props: ["dialog","stores"],
    data()
    {
        return {
            code: {
                UUID_STORE: "",
                SL_CODE: 1,
                NOTE_CODE: "",
                error: false
            },
            message: {
                type: null,
                text: null
            }
        }
    },
    methods:
    {
        addCode()
        {
            if(this.code.NAME_CODE == '' || this.code.UUID_STORE == '' || this.code.error == true)
            {
                this.message.type = 'warning'
                if(this.code.NAME_CODE == '')
                {
                    this.message.text = 'Bạn chưa nhập mã code'
                }
                else if(this.code.UUID_STORE == "")
                {
                    this.message.text = 'Bạn chưa chọn chi nhánh'
                }
                else
                {
                     this.message.text = 'Code đã tồn tại!'
                }
                
            }
            else
            {
                const data = new FormData()
                data.append("NAME_CODE",this.code.NAME_CODE)
                data.append("UUID_STORE",this.code.UUID_STORE),
                data.append("NOTE_CODE",this.code.NOTE_CODE)
                data.append("SL_CODE",this.code.SL_CODE)
                this.$http.post(this.$store.state.API_URL + 'code?api_token='+this.$session.get('token'),data)
                .then(() => {
                    this.message.type = 'success'
                    this.message.text = 'Thêm code mới thành công!'
                }).catch(() => {
                    this.message.type = 'error'
                    this.message.text = 'Lôi! Xin vui lòng thử lại!'
                })
            }
            
        },
        ApiCheckCode()
        {
            this.$http.get(this.$store.state.API_URL + 'code?check='+this.code.NAME_CODE).then((response) => {
                if(response.data == true)
                {
                    this.code.error = true
                    this.message.type ='warning'
                    this.message.text = 'Code đã tồn tại!'
                }
                else{
                    this.message.text = null
                    this.code.error = false
                }
            })
        }
    }
}
</script>