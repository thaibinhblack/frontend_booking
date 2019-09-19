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
                        <v-alert :type="message.type" :value="true">
                            {{message.text}}
                        </v-alert>
                    </v-col>
                    <v-col cols="12" sm="12">
                        <v-select
                            :items="stores"
                            item-text="NAME_STORE"
                            item-value="UUID_CODE"
                            v-model="code.UUID_CODE"
                            label="Chọn chi nhánh"
                        ></v-select>
                    </v-col>
                    <v-col cols="12" sm="12" md="6">
                        <v-text-field
                            name="NAME_CODE"
                            label="Mã code"
                            placeholder="Nhập mã code"
                            required
                            prepend-icon="mdi-barcode"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="12" md="6">
                        <v-text-field
                            name="NOTE_CODE"
                            label="Ghi chú"
                            placeholder="Nhập ghi chú"
                            required
                            prepend-icon="mdi-rename-box"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="12" md="6">
                        <v-text-field
                            name="NOTE_CODE"
                            label="Số lượng code"
                            type="number"
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
            years: ["2019","2018","2017"],
            code: {
                UUID_STORE: this.stores[0].UUID_STORE
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
            this.$http.post(this.$store.state.API_URL + 'code?api_token='+this.$session.get('token'))
            .then(() => {
                this.message.type = 'success'
                this.message.text = 'Thêm code mới thành công!'
            }).catch(() => {
                this.message.type = 'error'
                this.message.text = 'Lôi! Xin vui lòng thử lại!'
            })
        }
    }
}
</script>