<template>
    <div id="item">
        <div class="col s4 m3" id="info">
            <div class="card-panel hoverable">
                <div class="card-image">
                    <img class="responsive-img" v-bind:src="iimg"></img>
                </div>
                <div class="card-content black-text">
                    <span class="card-title">{{itl}}</span>
                    <br>
                    <span class="card-title">{{ipr}}</span>
                </div>
                <div class="card-action">
                    <a class="waves-effect waves-purple btn-flat red lighten-1" v-on:click="collect">
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
        };
    },
    props: ["iid", "itl", "ipr", "iimg"],
    mounted: function() {},
    methods: {
        //点击添加到收藏
        collect: function() {
            let app = this;
            app.coll = !app.coll;
            app.$emit("remind", { id: app.iid, coll: app.coll });
        }
    },
    watch: {}
};
</script>
