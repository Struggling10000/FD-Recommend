<template>
    <div id="item">
        <div class="col s2 m2">
            <div class="card-panel hoverable">
                <div class="card-image">
                    <img src="../../static/Desert.jpg"></img>
                    <span class="card-title">{{it}}</span>
                </div>
                <div class="card-content black-text">
                    <span class="card-title">{{ip}}</span>
                </div>
                <div class="card-action">
                    <a href="#" class="btn red lighten-1" v-on:click="collect">add</a>
                </div>
            </div>
        </div>
    </div>
</template>
<style>

</style>
<script>
export default {
    name: "item",
    data() {
        return {
            id: "",
            it: "",
            ip: "",
            coll: false
        };
    },
    props: ["item"],
    mounted: function() {},
    methods: {
        collect: function() {
            let app = this;
            app.coll = !app.collect;
            app.$emit("remind", { id: app.id, coll: app.coll });
        }
    },
    watch:{
        item: function(i){
            let app = this;
            app.id = i.itemId;
            app.it = i.itemTittle;
            app.ip = i.itemPrice;
        }
    }
};
</script>
