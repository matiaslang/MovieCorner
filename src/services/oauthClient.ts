// Create a client for auth0 service, which is used to login and logout the users

import { Auth0Client, User, createAuth0Client } from '@auth0/auth0-spa-js';
import { onMount } from 'svelte';
import { writable, type Writable } from 'svelte/store';

const user: Writable<User | undefined> = writable();

export function WithAuth(): {
    login: () => Promise<void>;
    logout: () => Promise<void>;
    user: Writable<User | undefined>;
} {
    function getClient(): Promise<Auth0Client> {
        return createAuth0Client({
            domain: import.meta.env.VITE_AUTH0_DOMAIN,
            clientId: import.meta.env.VITE_AUTH0_CLIENT_ID,
            authorizationParams: {
                redirect_uri: window.location.href
            }
        });
    }
    async function logout() {
        const client = await getClient();
        client.logout({});
    }

    async function login() {
        const client = await getClient();
            client.loginWithRedirect();
    }

    async function getUser(): Promise<void> {
        const auth0Client = await getClient();
        try {
            await auth0Client.getTokenSilently();
            const userDetails = await auth0Client.getUser();
            user.set(userDetails);
            console.log('userDetails', userDetails);
        } catch (error) {
            console.warn(error);
            user.set(undefined);
        }
    }

    onMount(() => {
        getUser();
    });

    return { login, logout, user };
}
