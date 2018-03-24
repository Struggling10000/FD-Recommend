<template>
    <div id="collect" class="container">
        <div class="fixed-action-btn">
            <a id="back" class="btn-floating btn-large waves-effect waves-light red">
                <i class="material-icons">add</i>
            </a>
        </div>
        <div class="row">
            <div class="col s6 m4">
                <ul class="collapsible popout" data-collapsible="accordion">
                    <li v-for="id in collectItems">
                        <div class="collapsible-header">
                            <i class="material-icons">shopping_cart</i>{{getTittle(id)}}</div>
                        <div class="collapsible-body">
                            <p>{{getTittle(id)}}</p>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="col s6">
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
</style>
<script>
import $ from "jquery";
export default {
    name: "collect",
    data() {
        return {
            collectItems: [],
            items: []
        };
    },
    methods: {
        getParams: function() {
            console.log(this.$route.params);
            let params = this.$route.params;
            this.items = params.items;
            this.collectItems = params.collectItems;
        },
        getTittle: function(id) {
            console.log(id);
            console.log(this.items);
            let app = this;
            let item = app.items.find(item => {
                return id === item.itemId;
            });
            return item.itemTittle;
        }
    },
    props: [],
    mounted: function() {
        $(".collapsible").collapsible();
        this.getParams();
    },
    watch: {
        collectItems: function(data) {
            console.log(this.collectItems);
        },
        items: function(data) {
            console.log(this.items);
        }
    }
};
</script>
