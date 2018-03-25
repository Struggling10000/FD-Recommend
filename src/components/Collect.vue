<template>
    <div id="collect" class="container">
        <div class="progress">
            <div v-if="progress" class="indeterminate"></div>
        </div>
        <div class="fixed-action-btn">
            <a id="back" class="btn-floating btn-large waves-effect waves-light red">
                <i class="material-icons">fast_rewind</i>
            </a>
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
.progress{
    background-color: white;
}
.indeterminate {
    background-color: #f26767;
}
</style>
<script>
import $ from "jquery";
export default {
    name: "collect",
    data() {
        return {
            collectItems: [],
            items: [],
            progress: true
        };
    },
    methods: {
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
        }
    },
    props: [],
    mounted: function() {
        $(".collapsible").collapsible();
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
