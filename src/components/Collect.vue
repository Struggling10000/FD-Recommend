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
                    <li v-for="id in collectItems">
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
            progress: false
        };
    },
    methods: {
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
            let item = app.items.find(item => {
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
    },
    watch: {
        collectItems: function(data) {
            console.log("collectItems");
            console.log(this.collectItems);
        },
        items: function(data) {
            console.log("items");
            console.log(this.items);
        }
    }
};
</script>
