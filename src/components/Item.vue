<template>
    <div id="item">
        <div class="col s4 m3">
            <div class="card-panel hoverable">
                <div class="card-image">
                    <img class="responsive-img" v-bind:src="img"></img>
                    <span class="card-title">{{itl}}</span>
                </div>
                <div class="card-content black-text">
                    <span class="card-title">{{ipr}}</span>
                </div>
                <div class="card-action">
                    <a class="waves-effect waves-teal btn-flat red lighten-1" v-on:click="collect">
                        <span class="white-text">
                            收藏
                        </span>
                    </a>
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
            coll: false,
            img:
                "https://g-search2.alicdn.com/img/bao/uploaded/i4/i3/2170721000/TB1O5enSVXXXXcNXVXXXXXXXXXX_!!0-item_pic.jpg_580x580Q90.jpg"
        };
    },
    props: ["iid", "itl", "ipr", "iimg"],
    mounted: function() {},
    methods: {
        collect: function() {
            let app = this;
            app.coll = !app.coll;
            app.$emit("remind", { id: app.iid, coll: app.coll });
        }
    },
    watch: {}
};
</script>
