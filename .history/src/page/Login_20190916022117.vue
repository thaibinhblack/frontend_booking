<template>
    <div id="wrap-main">
        <v-card>
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
                            required
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="12">
                        <label for="EMAIL"> Password</label>
                        <v-text-field
                            name="EMAIL"
                            label="Email"
                            placeholder="Nhập email"
                            append-icon="mdi-email"
                            required
                        ></v-text-field>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>
    </div>
</template>