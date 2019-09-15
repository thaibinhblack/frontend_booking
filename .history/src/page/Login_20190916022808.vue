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
<style scoped>
.form-login {position: absolute;width: 450px;padding: 15px 10px;top: 50%;left: 50%;transform: translate(-50%,-50%)}
</style>