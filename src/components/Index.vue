<template>
    <div id="index" class="container">
        <div v-for="arr in items" class="row">
            <div v-for="i in arr">
                <div v-if="i">
                    <item v-bind:iid="i.itemId" v-bind:itl="i.itemTitle" v-bind:ipr="i.itemPrice" v-bind:iimg="i.itemImg" v-on:remind="receive"></item>
                </div>
            </div>
        </div>
        <div class="fixed-action-btn" v-on:click="routeTo">
            <a class="btn-floating btn-large red">
                <i class="large material-icons">payment</i>
            </a>
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
export default {
    name: "index",
    data() {
        return {
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
    components: {
        item: Item
    },
    methods: {
        getData: function() {
            let app = this;
            axios
                .get(config.data)
                .then(res => {
                    if (res.data.code === 200) {
                        app.data = res.data.data;
                        app.initItems()
                    } else {

                    }
                })
                .catch(err => {
                    console.log(err)
                });
        },
        routeTo: function() {
            this.$router.push({
                path: "/collect",
                name: "collect",
                params: {
                    collectItems: this.collectItems,
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
            let index = this.searchItem(id);
            this.collectItems.splice(index, 1);
        },
        //搜索
        searchItem: function(id) {
            return this.collectItems.findIndex(i => {
                return i === id;
            });
        }
    },
    mounted: function() {
        this.getData();
    }
};
</script>
