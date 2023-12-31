import { defineStore } from "pinia";
import { ref, type Ref } from "vue";

type User = {
    id: string,
    email: string
};

export const useAuthStore = defineStore("auth", () => {
    let user: Ref<User> = ref({} as User);

    if(import.meta.env.APP_SERVER_URI){
        getUserFromAPI();
    }

    async function getUserFromAPI(){
        fetch(`https://${import.meta.env.APP_SERVER_URI}/auth/user`, {credentials: 'include'}).then(res => res.json()).then(apiUser => {
            if(!apiUser.id){
                return;
            };
            user.value = apiUser;
        });
        return user;
    }

    async function checkEmailAvailability(email: string) {
        return fetch(
            `https://${
                import.meta.env.APP_SERVER_URI
            }/auth/email-availability/`,
            {
                headers: {
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify({ email }),
            }
        )
            .then(async (res) => {
                if (res.ok) {
                    return res.json();
                }
                return false;
            })
            .then((resp) => {
                return resp.available;
            });
    }

    async function register(email: string, password: string) {
        return fetch(
            `https://${import.meta.env.APP_SERVER_URI}/auth/register/`,
            {
                headers: {
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify({ email, password }),
            }
        )
            .then(async (res) => {
                if (res.ok) {
                    return res.json();
                }
                return false;
            })
            .then((resp) => {
                return resp;
            });
    }

    async function login(email: string, password: string) {
        return fetch(`https://${import.meta.env.APP_SERVER_URI}/auth/login/`, {
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            method: "POST",
            body: JSON.stringify({ email, password }),
        })
            .then(async (res) => {
                return res.ok;
            })
    }

    async function logout() {
        return fetch(`https://${import.meta.env.APP_SERVER_URI}/auth/logout/`, {
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            method: "POST",
        })
            .then(async (res) => {
                return res.ok;
            });
    }

    return { checkEmailAvailability, register, login, logout, user };
});
