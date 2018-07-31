<template>
    <div>
        Hello App
        <MyComponent />
    </div>
</template>

<script lang="ts">
    import MyComponent from './my-component.vue';

    export default {
        components: {
            MyComponent,
        }
    };
</script>

<style lang="scss">
    @import "../styles/global.scss";
</style>
