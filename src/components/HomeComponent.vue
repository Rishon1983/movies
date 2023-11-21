<script>
import ListComponent from "./ListComponent.vue";
import {mapActions, mapState} from "vuex";
import MoviePopupComponent from "./MoviePopupComponent.vue";

export default {
    name: "HomeComponent",
    components: {MoviePopupComponent, ListComponent},
    computed: {
        ...mapState({
            isBackgroundLayout: state => state.general.backgroundLayout,
            isMoviePopupOpen: state => state.oneMovie.isMoviePopupOpen
        })
    }
}
</script>

<template>
    <div class="home-component">
        <ListComponent/>
        <MoviePopupComponent v-if="isMoviePopupOpen"></MoviePopupComponent>

        <div v-show="isBackgroundLayout" id="background-layout"></div>
    </div>

</template>

<style lang="scss" scoped>
.home-component {

}

#background-layout {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(2px);
    z-index: 1;
}
</style>