<template>
    <div id="login_reg">
        <div class="row">
            <div class="col s4"></div>
            <div id="card" class="col s2 m2">
                <div class="card blue-grey darken-1 small">
                    <div class="card" id="login_body">
                        <div id="full">
                            <span id="signtip">请登录</span>
                        </div>
                        <div class="input-field container">
                            <input placeholder="登录名" v-model="log_user" id="log_user" type="text" class="validate">
                        </div>
                        <div class="input-field container">
                            <input placeholder="密码" v-model="log_psw" id="log_psw" type="password" class="validate">
                        </div>
                        <div class="card-content">
                            <div class="card-title activator grey-text text-darken-4">
                                <button id="signin" v-on:click="signIn" class="btn waves-effect waves-light valign-wrapper red" name="action">
                                    <div class="valign">
                                        <p id="si">Sign in</p>
                                    </div>
                                </button>
                                <i class="material-icons right" style="margin-left: 0px;">more_vert</i>
                            </div>
                        </div>
                        <div class="card-reveal">
                            <div id="reg_div">
                                <div class="input-field container">
                                    <input placeholder="登录名" v-model="reg_user" id="reg_user" type="text" class="validate">
                                </div>
                                <div class="input-field container">
                                    <input placeholder="密码" v-model="reg_psw" id="reg_psw" type="password" class="validate">
                                </div>
                                <div class="input-field container">
                                    <select v-bind:value="reg_sex">
                                        <option value="1">男</option>
                                        <option value="2">女</option>
                                    </select>
                                </div>
                                <span class="card-title">
                                    <button id="signin" v-on:click="signUp" class="btn waves-effect waves-light valign-wrapper red" type="submit" name="action">
                                        <p id="reg" class="valign">Sign up</p>
                                    </button>
                                    <i class="material-icons right" style="margin-left: 0px;margin-top:8px">close</i>
                                </span>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <div class="col s4"></div>
        </div>
    </div>
</template>
<style>
#full {
    height: 50px;
}
#card {
    margin-left: 8%;
}
#login_body{
    margin-top: 100px;
    overflow: hidden;
}
#singin {
    margin-left: 15px;
}
#reg_div {
    overflow: hidden;
    padding-top: 0px;
}
#reg {
    margin-top: 0px;
}
.card-reveal {
    padding-top: 0px !important;
}
</style>
<script>
import $ from "jquery";
import config from "@/config/config";
import cookieUtil from "@/utils/cookie";
import axios from "axios";
export default {
    name: "login_reg",
    data() {
        return {
            log_user: "",
            log_psw: "",
            reg_user: "",
            reg_psw: "",
            reg_sex: ""
        };
    },
    mounted: function() {
        $("select").material_select();
    },
    methods: {
        // 判断字符串是否为空
        isEmpty: function(str) {
            return str.replace(/(^\s*)|(\s*$)/g, "").length == 0;
        },
        //登录
        signIn: function() {
            let app = this;
            let realName = app.isEmpty(app.log_user);
            let realPsw = app.isEmpty(app.log_psw);
            if (realName) {
                Materialize.toast("username is null", 3000);
            }
            if (realPsw) {
                Materialize.toast("password is null", 3000);
            }

            if (!realName && !realPsw) {
                
                axios
                    .post(config.login, {
                        user: app.log_user,
                        passwd: app.log_psw
                    })
                    .then(res => {
                        cookieUtil.getcookie("session")
                        console.log(res);
                        let data = res.data;
                        if (data.code == 200) {
                            // 保存用户名
                            cookieUtil.setcookie(
                                config.userkey,
                                data.data.userName
                            );
                            // 保存token
                            cookieUtil.setcookie(
                                config.serverkey,
                                data.token
                            );
                            // 保存用户id
                            cookieUtil.setcookie(
                                config.userId,
                                data.data.userId
                            );
                            // 登录成功转到主页面
                            this.$router.push({
                                path: "/",
                                name: "index"
                            });
                        } else {
                            // 登录失败提示原因
                            Materialize.toast(data.data, 3000);
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
        },
        // 注册
        signUp: function() {
            let app = this;
            let realName = app.isEmpty(app.reg_user);
            let realPsw = app.isEmpty(app.reg_psw);
            let realSex = app.isEmpty(app.reg_sex);

            // console.log(app.reg_sex);
            if (realName) {
                Materialize.toast("username is null", 3000);
            }
            if (realPsw) {
                Materialize.toast("password is null", 3000);
            }

            if (!realName && !realPsw) {
                axios
                    .post(config.reg, {
                        user: app.reg_user,
                        passwd: app.reg_psw,
                        sex: app.reg_sex
                    })
                    .then(res => {
                        // console.log(res);
                        let data = res.data;
                        // console.log(data);
                        if (data.code == 200) {
                            Materialize.toast("reg success", 3000);
                        } else {
                            Materialize.toast(data.data, 3000);
                        }
                    })
                    .catch(err => {
                        console.log("err");
                        Materialize.toast(err, 3000);
                    });
            }
        }
    }
};
</script>
