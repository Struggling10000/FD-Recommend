<template>
    <div id="collect" class="container">
        <div class="progress">
            <div v-if="progress" class="indeterminate"></div>
        </div>
        <div class="fixed-action-btn">
            <a id="back" class="btn-floating btn-large waves-effect waves-light red">
                <i class="material-icons">list</i>
            </a>
            <ul>
                <li v-if="islive" v-on:click="logout">
                    <a class="btn-floating green">
                        登出
                    </a>
                </li>
                <li v-on:click="routeTo('/','index')">
                    <a class="btn-floating blue">
                        返回
                    </a>
                </li>
            </ul>
        </div>
        <div class="row">
            <div class="col s4 m4">
                <ul class="collapsible popout" data-collapsible="accordion">
                    <li v-for="id in collectItems" v-on:click="showrecommend(id)">
                        <div class="collapsible-header">
                            <i class="material-icons">shopping_cart</i>
                            {{getItem(id).itemTitle}}
                        </div>
                        <div class="collapsible-body">
                            <img class="responsive-img" v-bind:src="getItem(id).itemImg"></img>
                            <br>
                            <span>
                                {{getItem(id).itemPrice}}
                            </span>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="col s4 valign-wrapper">

            </div>
            <div class="col s4">
                <ul v-if="showviews.length > 0" class="collapsible popout" data-collapsible="accordion">
                    <li v-for="id in showviews">
                        <div class="collapsible-header">
                            <i class="material-icons">shopping_cart</i>
                            {{items[id].itemTitle}}
                        </div>
                        <div class="collapsible-body">
                            <img class="responsive-img" v-bind:src="items[id].itemImg"></img>
                            <br>
                            <span>
                                {{items[id].itemPrice}}
                            </span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<style scoped>
#back {
    box-sizing: border-box;
    display: inline-block;
    float: none;
    line-height: 56px;
    position: static;
    z-index: auto;
}
.progress {
    background-color: white;
}
.indeterminate {
    background-color: #f26767;
}
</style>
<script>
import $ from "jquery";
import cookieUtil from "@/utils/cookie";
import config from "@/config/config";
import signOper from "@/module/signOper";
import axios from "axios";
export default {
    name: "collect",
    data() {
        return {
            islive: false,
            // 用户收藏列表 只保存了ID
            collectItems: [],
            // 原始数据 保存了其他数据
            items: [],
            // 进度条是否显示
            progress: false,
            //要发送的数据
            records: [],
            // 后台返回的推荐数据
            recommends: {},
            //用来显示推荐数据
            showviews: [],
            // 推荐数据是否准备好
            isReady: false
        };
    },
    methods: {
        //获取推荐数据
        recommend: function() {
            let app = this;
            axios
                .get(
                    config.recommend + "?token=" + cookieUtil.getcookie("token")
                )
                .then(res => {
                    let data = res.data;
                    if (data.code == 200) {
                        app.recommends = data.data;
                    } else {
                        Materialize.toast(data.data, 3000);
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        },
        // 发送数据
        postData: function() {
            let app = this;
            let token = cookieUtil.getcookie(config.serverkey);

            if (app.records.length > 0) {
                axios
                    .post(config.buy, {
                        token: token,
                        records: app.records
                    })
                    .then(res => {
                        let data = res.data;
                        if (data.code == 200) {
                            console.log("post success");
                            app.recommend();
                        } else {
                            Materialize.toast(data.data, 3000);
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
        },
        // 初始化要发送给服务器的购买记录
        initData: function() {
            let app = this;
            if (app.collectItems.length > 0) {
                for (var index in app.collectItems) {
                    let item = app.getItem(app.collectItems[index]);
                    let userid = cookieUtil.getcookie(config.userId);
                    app.records.push([parseInt(userid), item.itemId, 1]);
                }
            }
        },
        logout: function() {
            // 退出登录后返回登录界面
            signOper.logout();
            this.routeTo("/login", "login_reg");
        },
        //从路由获取参数
        getParams: function() {
            let params = this.$route.params;
            this.items = params.items;
            this.collectItems = params.collectItems;
        },
        //搜索item
        getItem: function(id) {
            let app = this;
            var item = app.items.find(item => {
                return id === item.itemId;
            });
            return item;
        },
        // 路由到其他路径
        routeTo: function(path, name) {
            this.$router.push({
                path: path,
                name: name
            });
        },
        showrecommend: function(id) {
            let app = this;
            app.isReady = false;
            for (let i in app.recommends) {
                if (app.recommends[i].itemId == id) {
                    app.showviews = app.recommends[i].recommendlist[0];
                    break;
                }
            }
            console.log(app.showviews)
            console.log(app.collectItems)
            $(".collapsible").collapsible();
        }
    },
    props: [],
    mounted: function() {
        // 初始化
        $(".collapsible").collapsible();
        // 检查token以确认用户是否登录
        if (cookieUtil.checkcookie(config.serverkey)) {
            this.islive = true;
        }
        // 从路由获取参数
        this.getParams();

        this.initData();
        this.postData();
    },
    watch: {
        showviews: function(val) {
            let app = this;
            app.isReady = true;
            $(".collapsible").collapsible();
        }
    }
};
</script>
