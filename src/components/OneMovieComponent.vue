<script>
import {mapActions} from "vuex";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

export default {
    name: "OneMovieComponent",
    components: {FontAwesomeIcon},
    props: ['data'],
    data() {
        return {}
    },
    computed: {},
    created() {
    },
    methods: {
        ...mapActions('oneMovie', [
            'openMoviePopup'
        ]),
        getYear() {
            return new Date(this.data.oneItem.release_date).getFullYear();
        },
        openPopup() {
            //alert('alertFromOneRow ' + this.data.oneItem.name);
            this.openMoviePopup(this.data.oneItem.id);
        }
    }
}
</script>

<template>
    <div class="one-movie-component">
        <div @click="openPopup" class="content-container">
            <img :src="'https://image.tmdb.org/t/p/w300' +  data.oneItem.poster_path" alt="tmdb image"/>
            <div class="movie-info">
                <span class="vote-average">
                    <font-awesome-icon class="icon star" :icon="['fas','star']" title="Some text"></font-awesome-icon>
                    <div>{{ data.oneItem.vote_average }}</div>
                </span>
                <!--                <font-awesome-icon class="icon heart" :icon="['far','heart']" title="Some text"></font-awesome-icon>-->
                <span class="release-year">{{ getYear() }}</span>
                <span>{{ data.oneItem.original_title }}</span>
            </div>

        </div>
    </div>
</template>

<style lang="scss" scoped>
.one-movie-component {
    cursor: pointer;

    .content-container {
        display: grid;
        //justify-items: center;

        img {
            width: 100%;
            box-shadow: 0 0 12px rgba(0, 0, 0, .6);
            transition: all .5s;
            border-radius: 8px;
            border: 3px solid #fff;
            transform: scale(.82);
        }

        .movie-info {
            display: grid;
            padding: 0 10px;
            grid-template-columns: 1fr 1fr;

            .icon {
                &.star {
                    height: 19px;
                    color: gold;
                    padding: 0 4px 3px 0;
                }

                &.thumbs-up {
                    height: 19px;
                    color: #d6b712;
                    padding: 0 4px 2px 0;
                }

                &.heart {
                    height: 25px;
                    color: red;
                }
            }

            .release-year {
                font-size: 13px;
            }

            span {
                display: grid;
                align-items: center;

                &:nth-child(1) {
                    grid-template-columns: auto auto;
                    justify-content: start;
                }

                &:nth-child(2) {
                    justify-content: end;
                }

                &:nth-child(3) {
                    grid-column: span 2;
                    justify-content: center;
                    font-weight: 500;
                    //grid-column: 1 / span 2;
                }
            }
        }

        &:hover {
            img {
                transform: scale(.9);
                box-shadow: 0 0 12px rgba(0, 0, 0, 1.6);
                border-color: #000;
            }

            .movie-info {
                span {
                    &:nth-child(3) {
                        font-weight: 600;
                    }
                }
            }
        }
    }
}
</style>