<template>
    <div id="wrap-main">
        <v-card class="form-login">
            <v-form @submit.prevent="ApiLogin()"> 
                <v-alert :type="message.type" v-if="message.text != null" :value="true">
                    {{message.text}}
                </v-alert>
                <v-card-title primary-title>
                    <h4>ĐĂNG NHẬP</h4>
                </v-card-title>
                <v-card-text>
                    <v-row>
                        <v-col cols="12" sm="12">
                            <label for="EMAIL"> Email</label>
                            <v-text-field
                                name="EMAIL"
                                label="Email"
                                placeholder="Nhập email"
                                append-icon="mdi-email"
                                type="email"
                                class="input-login"
                                v-model="user.EMAIL"
                                required
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="12">
                            <label for="EMAIL"> Password</label>
                            <v-text-field
                                name="PASSWORD"
                                label="Mật khẩu"
                                placeholder="Nhập mật khẩu"
                                type="password"
                                append-icon="mdi-key"
                                class="input-login"
                                v-model="user.PASSWORD"
                                required
                            ></v-text-field>
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-card-actions>
                    <button type="sbumit" class="btn btn-add">Đăng nhập</button>
                </v-card-actions>
            </v-form>
        </v-card>
    </div>
</template>

<script>
export default {
    data()
    {
        return {
            user: {

            },
            message: {
                type: null,
                text: null
            }
        }
    },
    methods: {
        ApiLogin()
        {
            const data = new FormData()
            data.append("EMAIL",this.user.EMAIL)
            data.append("PASSWORD",this.user.PASSWORD)
            this.$http.post(this.$store.state.API_URL + 'login',data).then((response) => {
                // console.log(response.data)
                if(response.data != false)
                {
                    // console.log(response.data)
                    this.$session.start()
                    this.$session.set('token',response.data)
                    this.$router.push('/manager/bookings    ')
                }
                else
                {
                    // console.log('err')
                    this.message.type = 'warning'
                    this.message.text = 'Email hoặc password sai!'
                }
                
            }).catch((error) => {
                // console.log(error)
                this.message.type = 'warning'
                this.message.text = 'Email hoặc password sai!'
            })
        }
    }
}
</script>
<style scoped>
.form-login {position: absolute;width: 450px;padding: 25px 10px;top: 50%;left: 50%;transform: translate(-50%,-50%); z-index: 999;border-radius: 10px}
.form-login label {font-weight: bold}
</style>