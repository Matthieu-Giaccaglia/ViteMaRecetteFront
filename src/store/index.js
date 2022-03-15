import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        apiUrl: "https://vite-ma-recette-api.herokuapp.com/",
        apiUrlDistance: "https://vite-ma-recette-api.herokuapp.com/",
        apiUrlLocal: "http://localhost:2000/",
        pictureUrl: "https://media.tinygoblins.fr/media/",
        jwt: null,
        recipes: [],
        user: {
            'email': null,
            'username': null,
            '_id': null
        }
    },
    getters: {
        getApiUrl: (state) => {
            return state.apiUrl;
        },
        getJwt: (state) => {
            return state.jwt;
        },
        getRecipes: (state) => {
            return state.recipes;
        },
        getPictureUrl: (state) => {
            return state.pictureUrl
        },
        getUser: (state) => {
            return state.user
        },
        getRecipe: (state) => (id) => {
            for (let i = 0; i < state.recipes.length; i++) {
                if (state.recipes[i]._id === id) {
                    return state.recipes[i];
                }
            }
            return false;
        },
        getUserRecipe: (state) => {
            let userRecipes = []
            for (let i = 0; i < state.recipes.length; i++) {
                if (state.recipes[i].users.email === state.user.email) {
                    userRecipes.push(state.recipes[i])
                }
            }
            return userRecipes;
        }
    },
    mutations: {
        setJwt(state, jwt) {
            state.jwt = jwt;
            Vue.$cookies.set('jwt', jwt, 0)
        },
        setRecipes(state, recipes) {
            state.recipes = recipes;
        },
        setUser(state, user) {
            state.user.email = user.email
            state.user.username = user.username
            state.user._id = user._id;
            Vue.$cookies.set('user', user, 0)
        },
    },
    actions: {
        async initJwt(context) {
            if (Vue.$cookies.isKey('jwt') && Vue.$cookies.isKey('user')) {
                context.commit("setJwt", Vue.$cookies.get('jwt'))
                context.commit("setUser", Vue.$cookies.get('user'))
                await context.dispatch("setRecipesAction")
            }
        },
        async login(context, data) {
            try {
                let response = await axios.post(context.getters.getApiUrl + "login", {
                    email: data.email,
                    password: data.password
                })

                if (response.data.success) {
                    context.commit("setJwt", response.data.jwt)
                    await context.dispatch("setRecipesAction")
                    context.commit("setUser", response.data.user)
                    return {success: true}
                } else {
                    return {success: false, message: 'bad_credential'}
                }
            } catch (err) {
                return {success: false, message: 'server_error'}
            }
        },
        logout(context) {
            context.state.jwt = null
            context.state.user._id = null
            context.state.user.email = null
            context.state.user.username = null
            Vue.$cookies.remove("user")
            Vue.$cookies.remove("jwt")
        },
        async signIn(context, data) {
            try {
                let response = await axios.post(context.getters.getApiUrl + "signup", {
                    email: data.email,
                    password: data.password,
                    username: data.username
                })
                return response.data
            } catch (err) {
                return {success: false, message: 'Internal server error'}
            }
        },
        async setRecipesAction(context) {
            try {
                let response = await axios.get(context.getters.getApiUrl + 'recipes', {
                    headers: {Authorization: 'Bearer ' + context.state.jwt}
                })
                context.commit("setRecipes", response.data);
            } catch (err) {
                return false
            }
        },
        async getRecipeFromDB(context, id) {
            for (let i = 0; i < context.state.recipes.length; i++) {
                if (context.state.recipes[i]._id === id) {
                    return context.state.recipes[i];
                }
            }

            try {
                let response = await axios.get(context.getters.getApiUrl + 'recipe/' + id, {
                    headers: {Authorization: 'Bearer ' + context.state.jwt}
                })

                if (response.data.success) {
                    return response.data.recipe
                } else {
                    return false
                }

            } catch (err) {
                return false
            }
        },
        async createRecipe(context, data) {
            try {
                let response = await axios.post(context.getters.getApiUrl + "recipe", {
                        name: data.name,
                        description: data.description,
                        picture: data.picture,
                        nbOfPerson: data.nbOfPerson,
                        ingredients: JSON.stringify(data.ingredients),
                        steps: JSON.stringify(data.steps)
                    }
                    , {
                        headers: {
                            Authorization: 'Bearer ' + context.state.jwt
                        }
                    })

                return response.data
            } catch (err) {
                return {success: false, message: 'Internal server error'};
            }
        },
        async updateRecipe(context, data) {
            try {
                let response = await axios.put(context.getters.getApiUrl + "recipe/" + data.id, {
                        name: data.name,
                        description: data.description,
                        picture: data.picture,
                        nbOfPerson: data.nbOfPerson,
                        ingredients: JSON.stringify(data.ingredients),
                        steps: JSON.stringify(data.steps)
                    }
                    , {
                        headers: {
                            Authorization: 'Bearer ' + context.state.jwt
                        }
                    })

                return response.data
            } catch (err) {
                return {success: false, message: 'Internal server error'};
            }
        },
        async deleteRecipe(context, id) {
            try {
                let response = await axios.delete(context.getters.getApiUrl + "recipe/" + id, {
                    headers: {
                        Authorization: 'Bearer ' + context.state.jwt
                    }
                })
                return response.data
            } catch (err) {
                return {success: false, message: 'Internal server error'};
            }
        },
    }
});
