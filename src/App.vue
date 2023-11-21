<script setup>
import EmployeesList from "./components/HomeComponent.vue";
import HomeComponent from "./components/HomeComponent.vue";
</script>

<template>

    <HomeComponent/>
    <a href="https://goralex.com" target="_blank" class="logo">
        <img src="./assets/logo-home.svg" alt="Goralex logo"/>
    </a>
</template>

<style lang="scss" scoped>
.logo {
    position: fixed;
    bottom: 0;
    height: 25px;
    will-change: filter;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: 1280px;
    border-top: 1px solid #f7f7f7;
    img{
        height: 20px;
    }
}

.logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
    filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
