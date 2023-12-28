<script setup lang="ts">
import { useSitesStore } from '@/stores/sites';
import { usePasskeyStore } from '@/stores/passkey';
import { useNewAuthStore } from '@/stores/newAuth';
import { useApiStore } from '@/stores/api';


const passkeyStore = usePasskeyStore();

const sitesStore = useSitesStore();
const firstSite = sitesStore.getSites()[0];
const newAuthStore = useNewAuthStore();
const apiStore = useApiStore();

defineProps<{
	msg?: string
}>()
</script>

<template>
	<div class="sidebar">
		<div class="sidebar__nav" v-if="!$route.params.uri">
			<RouterLink to="/">
				<i class="bi bi-house"></i>Home
			</RouterLink>
			<RouterLink to="/sites/add">
				<i class="bi bi-window-plus"></i> Add Site
			</RouterLink>
			<RouterLink to="/sites">
				<i class="bi bi-window-stack"></i>Sites
			</RouterLink>
			<RouterLink :to="{ name: 'site', params: { uri: firstSite.uri } }" v-if="firstSite">
				<i class="bi bi-window"></i> Site
			</RouterLink>
			<RouterLink :to="{ name: 'site-core', params: { uri: firstSite.uri } }" v-if="firstSite">
				<i class="bi bi-braces"></i> Core
			</RouterLink>
			<RouterLink :to="{ name: 'sites-plugins' }">
				<i class="bi bi-plug"></i> All Plugins
			</RouterLink>
		</div>
		<div class="sidebar__nav" v-if="$route.params.uri">
			<RouterLink :to="{ name: 'sites' }">
				<i class="bi bi-arrow-left"></i>Back
			</RouterLink>
			<RouterLink :to="{ name: 'site', params: { uri: $route.params.uri } }">
				<i class="bi bi-columns-gap"></i> Dashboard
			</RouterLink>
			<RouterLink :to="{ name: 'site-components', params: { uri: $route.params.uri } }">
				<i class="bi bi-grid"></i> Components
			</RouterLink>
			<RouterLink :to="{ name: 'site-wpengine', params: { uri: $route.params.uri } }"
				v-if="apiStore.sites.find(a => a.uri == $route.params.uri)?.wpeInstallId">
				<i class="bi bi-server"></i> WP Engine
			</RouterLink>
		</div>
		<div class="sidebar__nav" v-if="newAuthStore.user">
			<a class="user">
				<i class="bi bi-person"></i>
				<div>{{ newAuthStore.user.username }} <small>{{ newAuthStore.user.id }}</small></div>
			</a>
		</div>
		<div class="sidebar__nav" v-if="false">
			<a @click="passkeyStore.authenticate()">
				<i class="bi bi-key"></i> Use Passkey
			</a>
		</div>

	</div>
</template>

<style scoped lang="scss">
.sidebar {
	background-color: var(--sidebar-background);
	padding: .75rem;
	width: 275px;
	height: 100svh;
	flex-shrink: 0;
	display: flex;
	flex-direction: column;

	&__nav {
		display: flex;
		flex-direction: column;
		gap: .5rem;

		&:nth-child(1) {
			flex-grow: 1;
		}

		a.user {
			div {
				display: flex;
				flex-direction: column;
				flex-grow: 1;

				small {
					font-size: 10px;
					color: rgba(255, 255, 255, .3);
				}
			}
		}


		a {
			align-items: center;
			display: flex;
			gap: 1rem;
			cursor: pointer;
			font-size: .875rem;
			font-weight: 500;
			padding: .75rem .675rem;
			border-radius: 6px;
			transition: background-color .4s ease-in-out;

			&:hover {
				background-color: var(--sidebar-nav-item-hover)
			}

			&.router-link-exact-active {

				&,
				&:hover {
					background-color: var(--sidebar-nav-item-active)
				}
			}

			i {
				font-size: 1.25rem;
			}
		}
	}
}
</style>
