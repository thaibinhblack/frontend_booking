<template>
    <div id="wrap-main">
        <v-card class="form-login">
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
                            required
                        ></v-text-field>
                    </v-col>
                </v-row>
            </v-card-text>
            <v-card-actions>
                <button class="btn btn-add">Đăng nhập</button>
            </v-card-actions>
        </v-card>
    </div>
</template>

<script>
export default {
    methods: {
        ApiLogin()
        {
            data = new FormData()
            data.append("EMAIL",this.user.EMAIL)
            data.append("PASSWORD",this.user.PASSWORD)
            this.$http.post(this.$store.state.API_URL + 'login',data).then(() => {
                
            })
        }
    }
}
</script>
<style scoped>
.form-login {position: absolute;width: 450px;padding: 25px 10px;top: 50%;left: 50%;transform: translate(-50%,-50%); z-index: 999;border-radius: 10px}
.form-login label {font-weight: bold}
</style>