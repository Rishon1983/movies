<script>
import {mapActions, mapGetters, mapState} from "vuex";

export default {
    name: "MoviePopupComponent",
    props: ['data'],
    data() {
        return {
            isFavoriteMovieAction: false
        }
    },
    computed: {
        ...mapState({
            movieData: state => state.oneMovie.movieData
        }),
    },
    created() {
    },
    methods: {
        ...mapActions('oneMovie', [
            'closeMoviePopup'
        ]),
        ...mapActions('list', [
            'favoriteMovieAction'
        ]),
        getDirector() {
            for (const person of this.movieData.movieCredits.crew) {
                if (person.job === 'Director') {
                    return person.name;
                }
            }
        },
        formatNumberCurrency(num) {
            return num.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
            })
        },
        async favoriteMovie(data) {
            /*
            * isFavoriteMovieAction changed to true to prevent creating requests multiple times
            * */
            if (!this.isFavoriteMovieAction) {
                this.isFavoriteMovieAction = true;
                await this.favoriteMovieAction(data);
                this.isFavoriteMovieAction = false;
            }
        }
    }
}
</script>

<template>
    <div class="movie-popup-component">
        <header>
            <font-awesome-icon @click="closeMoviePopup" class="icon close" :icon="['fa','xmark']"
                               title="Close popup"></font-awesome-icon>
            <div class="movie-name">{{ movieData.movieDetails.original_title }}</div>
            <font-awesome-icon v-if="movieData.movieAccountStates.favorite"
                               @click="favoriteMovie({movieDetails: movieData.movieDetails, favorite: false})"
                               class="icon heart active"
                               :icon="['fa','heart']" title="Remove from favorite"></font-awesome-icon>
            <font-awesome-icon v-else
                               @click="favoriteMovie({movieDetails: movieData.movieDetails, favorite: true})"
                               class="icon heart" :icon="['fa','heart']"
                               title="Add to favorite"></font-awesome-icon>
        </header>
        <section class="main">
            <img :src="'https://image.tmdb.org/t/p/w300' +  movieData.movieDetails.poster_path" class="poster"
                 alt="tmdb image"/>
            <div class="genres">
                <div v-for="(oneGenre, index) in movieData.movieDetails.genres" :key="index" class="one-genre">
                    {{ oneGenre.name }}
                </div>
            </div>
            <div class="details">
                <div>
                    <span class="data tagline">{{ movieData.movieDetails.tagline }}</span>
                </div>
                <div>
                    <span class="title">Overview:</span>
                    <span class="data">{{ movieData.movieDetails.overview }}</span>
                </div>
                <div>
                    <span class="title">Creator:</span>
                    <span class="data">{{ getDirector() }}</span>
                </div>
                <div>
                    <span class="title">Budget:</span>
                    <span class="data">{{ formatNumberCurrency(movieData.movieDetails.budget) }}</span>
                </div>
                <div>
                    <span class="title">Revenue:</span>
                    <span class="data">{{ formatNumberCurrency(movieData.movieDetails.revenue) }}</span>
                </div>
                <div>
                    <span class="title">Release date:</span>
                    <span class="data">{{ movieData.movieDetails.release_date }}</span>
                </div>
            </div>
            <div class="companies">
                <div v-for="(production, index) in movieData.movieDetails.production_companies" :key="index"
                     class="company">
                    <img v-if="!!production.logo_path" :src="'https://image.tmdb.org/t/p/w92' +  production.logo_path"
                         class="production-img" :title="production.name">
                    <div v-else class="company-container">
                        <font-awesome-icon class="production-img no-image" :icon="['far','image']"
                                           :title="production.name"></font-awesome-icon>
                        <div class="data">{{ production.name }}</div>
                    </div>

                </div>
            </div>
            <div class="cast">
                <div v-for="(person, index) in movieData.movieCredits.cast" :key="index" class="cast-person">
                    <div v-if="!!person.profile_path" class="image-container">
                        <img :src="'https://image.tmdb.org/t/p/w92' +  person.profile_path"
                             class="person-img">
                    </div>
                    <div v-else class="no-image-container">
                        <font-awesome-icon class="person-img" :icon="['far','image']"></font-awesome-icon>
                    </div>
                    <div class="data" :title="person.name">{{ person.name }}</div>
                    <div class="data character" :title="person.character">{{ person.character }}</div>
                </div>
            </div>
        </section>
    </div>
</template>

<style scoped lang="scss">
@import "src/mixins";

.movie-popup-component {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80%;
    //height: 85%;
    height: 90%;
    max-height: 49.4rem;
    background-color: #fff;
    z-index: 2;
    border-radius: 6px;
    box-shadow: 0 0 8px rgb(51 51 51);

    header {
        display: grid;
        height: 70px;
        background-color: #dedede;
        grid-template-columns: 60px 1fr 80px;
        place-items: center;
        border-top-left-radius: 6px;
        border-top-right-radius: 6px;

        .icon {
            transition: all 0.3s ease-in-out;

            &.close {
                height: 2em;
                color: #6b6b6b;

                &:hover {
                    color: #5a5a5a;
                }
            }

            &.heart {
                height: 2.5em;
                color: #aaaaaa;

                &.active {
                    color: #ff5151;
                }
            }

            &:hover {
                cursor: pointer;
                transform: scale(1.2);
            }
        }

        .movie-name {
            font-size: 28px;
            font-weight: 600;
            text-shadow: 1px 1px 2px #ffffff;
        }
    }

    .poster {
        box-shadow: 0 0 12px rgba(0, 0, 0, 0.6);
        border-radius: 6px;
        margin: 15px;
    }

    .main {
        display: grid;
        overflow: auto;
        max-height: calc(100% - 70px);
        grid-template-columns: 330px 0.5fr 3fr 112px;
        grid-template-rows: 2fr 1fr;

        .genres {
            overflow: auto;
            margin: 15px;

            .one-genre {
                display: flex;
                justify-content: center;
                align-items: center;
                border: 1px solid #dedede;
                padding: 5px;
                margin: 10px 0;
                text-align: center;
                font-size: 13px;
            }
        }

        .details {
            overflow: auto;
            margin: 15px;

            div {
                margin: 10px 0;
            }

            .tagline {
                font-style: italic;
            }

            .title {
                text-decoration: underline;
                margin-inline-end: 5px;
            }
        }

        .cast {
            display: grid;
            gap: 4px;
            grid-template-rows: auto;
            grid-auto-flow: column;
            grid-column: 1 / 5;
            margin: 5px;
            overflow-x: auto;
            height: 230px;
            justify-content: start;

            .cast-person {
                width: 92px;
                display: grid;
                grid-template-rows: auto;
                align-content: start;

                .no-image-container, .image-container {
                    width: 92px;
                    height: 138px;
                }

                .no-image-container {
                    display: grid;
                    place-content: center;
                    align-items: center;

                    svg {
                        height: 100%;
                        width: 50px;
                    }
                }

                .data {
                    margin-top: 3px;
                    font-size: 14px;
                    line-height: 1.1;
                    font-weight: bold;
                    @include line-clamp(2);

                    &.character {
                        font-style: italic;
                        font-weight: normal;
                    }
                }
            }
        }

        .companies {
            display: grid;
            place-items: center;
            gap: 4px;
            grid-template-columns: auto;
            grid-auto-flow: row;
            overflow-y: auto;
            border-left: 1px solid #dedede;
            border-bottom: 1px solid #dedede;

            .company {
                min-height: 84px;
            }

            .company, .company-container {
                display: grid;
                place-items: center;

                .production-img {
                    &.no-image {
                        height: 45px;
                    }
                }

                .data {
                    font-size: 13px;
                    text-align: center;
                    line-height: 1.2;
                }
            }
        }
    }
}

@media screen and (max-width: 1280px) {
    .movie-popup-component {
        header {
            .movie-name {
                font-size: medium;
            }
        }

        .main {
            grid-template-columns: 330px 3fr 112px;
            grid-template-rows: 1fr 2fr 1fr;

            .poster {
                grid-column: 1 / 2;
                grid-row: 1 / 3;
            }

            .genres {
                font-size: 13px;
                grid-column: 2 / 3;
                grid-row: 1 / 2;
                overflow: unset;

                .one-genre {
                    margin: 3px 0;
                }
            }

            .details {
                font-size: 13px;
                grid-column: 2 / 3;
                grid-row: 2 / 3;
            }

            .companies {
                grid-column: 3 / 4;
                grid-row: 1 / 3;
            }

            .cast {
                grid-auto-flow: column;
                grid-column: 1 / 4;

                .cast-person {
                    .data {
                        font-size: 13px;
                    }

                }
            }

        }
    }
}

@media screen and (max-width: 768px) {
    .movie-popup-component {

        .main {
            max-height: calc(100% - 70px);
            grid-template-columns: 1fr;
            grid-template-rows: auto;

            .poster {
                justify-self: center;
                grid-column: 1 / 2;
                grid-row: 1 / 2;
            }

            .genres {
                font-size: 13px;
                grid-column: 1 / 2;
                grid-row: 2 / 3;
                overflow: unset;
            }

            .details {
                font-size: 13px;
                grid-column: 1 / 2;
                grid-row: 3 / 4;
            }

            .companies {
                grid-auto-flow: column;
                grid-column: 1 / 2;
                grid-row: 5 / 6;
            }

            .cast {
                grid-auto-flow: column;
                grid-column: 1 / 2;
                grid-row: 4 / 5;

                .cast-person {
                    .data {
                        font-size: 12px;
                    }

                }
            }
        }
    }
}

@media screen and (max-width: 480px) {
    .movie-popup-component {
        .main {
            .poster {
                width: 80%;
            }
        }
    }

}
</style>