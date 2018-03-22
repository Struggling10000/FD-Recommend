<template>
    <div id="index" class="container">
        <div class="row">
            <div v-for="arr in items">
                <div v-for="i in arr">
                    <div v-if="i">
                        <item v-bind:item="i" v-on:remind="receive"></item>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style>

</style>
<script>
import Item from "@/components/Item";
import axios from "axios";
export default {
    name: "index",
    data() {
        return {
            row: 0,
            col: 0,
            //CSS指定长度，对应s2
            col_s: 2,
            //数据二维数组
            items: [],
            //数据一维数组
            data: [
                {
                    itemId: "0",
                    itemTittle: "0",
                    itemPrice: "0"
                },
                {
                    itemId: "1",
                    itemTittle: "1",
                    itemPrice: "1"
                },
                {
                    itemId: "2",
                    itemTittle: "2",
                    itemPrice: "2"
                },
                {
                    itemId: "3",
                    itemTittle: "3",
                    itemPrice: "3"
                },
                {
                    itemId: "4",
                    itemTittle: "4",
                    itemPrice: "4"
                },
                {
                    itemId: "5",
                    itemTittle: "5",
                    itemPrice: "5"
                },
                {
                    itemId: "6",
                    itemTittle: "6",
                    itemPrice: "6"
                },
                {
                    itemId: "7",
                    itemTittle: "7",
                    itemPrice: "7"
                }
            ],
            collectItems: []
        };
    },
    components: {
        item: Item
    },
    methods: {
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
            console.log("getCol");
        },
        //根据指定CSS长度获取列数
        getCol: function() {
            return 12 / this.col_s;
            console.log("getRow");
        },
        //接收子组件消息
        receive: function(msg) {
            //{ id: app.id, coll: app.coll }
            if (msg.coll) {
                addItem(msg.id);
            } else {
                removeItem(msg.id);
            }
        },
        //根据id将物品增加到数组
        addItem: function(id) {
            let app = this;
            //app.collectItems.push();
        },
        //移除
        removeItem: function(id) {},
        //通过id搜索data中的项
        searchItem: function(id) {}
    },
    mounted: function() {
        this.initItems();
    }
};
</script>
