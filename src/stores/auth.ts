import router from "@/router";
import { defineStore } from "pinia";
import { ref, type Ref } from "vue";

type User = {
    id: string;
    email: string;
};

export const useAuthStore = defineStore("auth", () => {
    let user = ref<User | null>(null);

    async function getUserFromAPI() {
        return fetch(`${import.meta.env.APP_SERVER_URL}/account`, {
            credentials: "include",
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Not logged in");
                }
                return res.json();
            })
            .then((apiUser) => {
                if (!apiUser || !apiUser.email) {
                    return;
                }
                user.value = apiUser;
            });
    }

    async function checkEmailAvailability(email: string) {
        return fetch(
            `https://${
                import.meta.env.APP_SERVER_URL
            }/account/email-availability/`,
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
            `${import.meta.env.APP_SERVER_URL}/account/register/`,
            {
                headers: {
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify({ email, password }),
            }
            ).then(res => res.json());
    }

    async function login(email: string, password: string) {
        return fetch(`${import.meta.env.APP_SERVER_URL}/account/login/`, {
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            method: "POST",
            body: JSON.stringify({ email, password }),
        }).then(res => res.json());
    }

    async function logout() {
        return fetch(`${import.meta.env.APP_SERVER_URL}/account/logout/`, {
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            method: "POST",
        }).then(async (res) => {
            if (res.ok) {
                user.value = null;
            }

            return res.ok;
        });
    }

    return {
        checkEmailAvailability,
        register,
        login,
        logout,
        user,
        getUserFromAPI,
    };
});
