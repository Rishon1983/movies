<script>
import {mapState, mapActions} from 'vuex';
import OneMovieComponent from "./OneMovieComponent.vue";

export default {
    name: "ListComponent",
    components: {OneMovieComponent},
    data() {
        return {
            isLoading: false,
        }
    },
    computed: {
        ...mapState({
            mainList: state => state.list.mainList,
            selectedModeIndex: state => state.general.selectedModeIndex,
            modes: state => state.general.modes
        })
    },
    created() {
        this.$store.dispatch("list/getData", 'popular');
    },
    methods: {
        ...mapActions('general', [
            'setSelectedModeIndex'
        ]),
        ...mapActions('list', [
            'getData',
            'resetListStateByDefault',
            'setCurrentPage'
        ]),
        selectMode(modeIndex) {
            this.setSelectedModeIndex(modeIndex);

            this.resetListStateByDefault();
            this.getData(this.modes[modeIndex].name);
        },
        async handleScroll({target: {scrollTop, clientHeight, scrollHeight}}) {
            if (!this.isLoading && scrollTop + clientHeight >= scrollHeight) {
                /*
                * isLoading changed to true to prevent creating requests multiple times
                * */
                this.isLoading = true;
                await this.getData(this.modes[this.selectedModeIndex].name);
                this.isLoading = false;
            }
        }
    }
}
</script>

<template>
    <div class="list-component">
        <div class="header">{{ modes[selectedModeIndex].title }}</div>
        <div class="action-buttons">
            <button @click="selectMode(0)" :class="{active: selectedModeIndex === 0}">{{ modes[0].title }}</button>
            <button @click="selectMode(1)" :class="{active: selectedModeIndex === 1}">{{ modes[1].title }}</button>
            <button @click="selectMode(2)" :class="{active: selectedModeIndex === 2}">{{ modes[2].title }}</button>
        </div>
        <div v-if="mainList.length > 0" class="rows-container" @scroll="handleScroll">
            <div v-for="(oneItem, index) in mainList" :key="oneItem.id" class="one-item">
                <OneMovieComponent :data="{oneItem, index}"/>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.list-component {
    .header {
        display: grid;
        align-items: center;
        justify-items: center;
        font-size: 22px;
        padding: 5px;
    }

    .action-buttons {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 2rem;
        padding: 10px 5%;
        border-bottom: 3px solid #f7f7f7;

        button {
            color: black;
            background-color: #f5f5f5;
            border: 1px solid #d8d3d3;
            outline: none;

            &.active {
                background-color: #dfd9d9;
                border: 1px solid #afacac;
                box-shadow: 0 0 6px rgb(141 129 129);
            }
        }
    }

    .rows-container {
        display: grid;
        width: 95%;
        max-height: calc(100vh - 133px);
        margin: auto;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: .2rem;
        overflow: auto;
    }

    .one-item {
        box-shadow: 0 0 2px rgba(0, 0, 0, .1);
        //&:nth-child(odd) {
        //    background-color: #f8f9fa;
        //}
    }
}

@media screen and (max-width: 768px) {
    .list-component {
        .action-buttons {
            grid-template-columns: 1fr;
            gap: .5rem;

            button {
                padding: 0.2em 0.2em;
            }
        }

        .rows-container {
            max-height: calc(100vh - 193px);
        }
    }
}
</style>