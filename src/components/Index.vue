<template>
    <div id="index" class="container">
        <div v-for="arr in items" class="row">
            <div v-for="i in arr">
                <div v-if="i">
                    <item v-bind:iid="i.itemId" v-bind:itl="i.itemTitle" v-bind:ipr="i.itemPrice" v-bind:iimg="i.itemImg" v-on:remind="receive"></item>
                </div>
            </div>
        </div>
        <div class="fixed-action-btn">
            <a class="btn-floating btn-large red">
                <i class="large material-icons">list</i>
            </a>
            <ul>
                <li v-if="!islive" v-on:click="routeTo('/login','login_reg')">
                    <a class="btn-floating red">
                        登录
                    </a>
                </li>
                <li v-if="islive" v-on:click="logout">
                    <a class="btn-floating green">
                        登出
                    </a>
                </li>
                <li v-on:click="routeTo('/collect','collect')">
                    <a class="btn-floating blue">
                        收藏
                    </a>
                </li>
            </ul>
        </div>
    </div>
</template>
<style>

</style>
<script>
import $ from "jquery";
import config from "@/config/config";
import Item from "@/components/Item";
import axios from "axios";
import cookieUtil from "@/utils/cookie";
import signOper from "@/module/signOper";
export default {
    name: "index",
    data() {
        return {
            // 判断是否是已登录状态
            islive: false,
            row: 0,
            col: 0,
            //CSS指定长度，对应s2
            col_s: 3,
            //数据二维数组
            items: [],
            //数据一维数组
            data: [],
            collectItems: []
        };
    },
    // 子组件
    components: {
        item: Item
    },
    methods: {
        logout: function() {
            // 退出登录后返回登录界面
            signOper.logout();
            this.routeTo("/login", "login_reg");
        },
        // 获取初始数据
        getData: function() {
            let app = this;
            axios
                .get(config.data)
                .then(res => {
                    if (res.data.code === 200) {
                        app.data = res.data.data;
                        console.log(app.data)
                        app.initItems();
                    } else {
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        // 路由到其他url
        routeTo: function(path, name) {
            this.$router.push({
                path: path,
                name: name,
                // 默认传递参数
                params: {
                    // 用户收藏商品
                    collectItems: this.collectItems,
                    // 原始数据
                    items: this.data
                }
            });
        },
        //初始化二维数组
        initItems: function() {
            console.log("initItems");
            let app = this;
            app.col = app.getCol();
            app.row = app.getRow(app.data.length);
            app.items = new Array(app.row);
            for (let i = 0; i < app.row; i++) {
                app.items[i] = new Array(app.col);
                for (let j = 0; j < app.items[i].length; j++) {
                    app.items[i][j] = app.data[i * app.col + j];
                }
            }
        },
        //根据数据长度获取显示行数
        getRow: function(len) {
            return Math.ceil(len / this.getCol());
        },
        //根据指定CSS长度获取列数
        getCol: function() {
            return 12 / this.col_s;
        },
        //接收子组件消息
        receive: function(msg) {
            //{ id: app.id, coll: app.coll }
            if (msg.coll) {
                this.addItem(msg.id);
            } else {
                this.removeItem(msg.id);
            }
        },
        //根据id将物品增加到收藏数组
        addItem: function(id) {
            this.collectItems.push(id);
            console.log(this.collectItems);
        },
        //移除
        removeItem: function(id) {
            let index = this.searchIndex(id);
            this.collectItems.splice(index, 1);
        },
        //搜索 返回index
        searchIndex: function(id) {
            return this.collectItems.findIndex(i => {
                return i === id;
            });
        },
        
        
    },
    mounted: function() {
        this.getData();
        // 检查token以确认用户是否登录
        if (cookieUtil.checkcookie(config.serverkey)) {
            this.islive = true;
        }
    }
};
</script>
