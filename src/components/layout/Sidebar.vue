<script setup lang="ts">
import {useAuthStore} from '@/stores/auth';

const authStore = useAuthStore();


defineProps<{
	msg?: string
}>()

const changePassphrase = () => {
	if(authStore.ask()){
		window.location.reload();
	}
}
</script>

<template>
	<div class="sidebar">
		<div class="sidebar__nav">
			<RouterLink to="/">
				<i class="bi bi-house"></i>Home
			</RouterLink>
			<RouterLink to="/sites">
				<i class="bi bi-window-stack"></i>Sites
			</RouterLink>
			<RouterLink to="/sites/1">
				<i class="bi bi-window"></i> Site
			</RouterLink>
			<RouterLink to="/sites/add">
				<i class="bi bi-window-plus"></i> Add Site
			</RouterLink>
			<RouterLink to="/sites/1/core">
				<i class="bi bi-braces"></i> Core
			</RouterLink>
			</div>
			<div class="sidebar__nav">
				<a @click="changePassphrase">
					<i class="bi bi-key"></i> Change Passphrase
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
	display: flex;
	flex-direction: column;

	&__nav {
		display: flex;
		flex-direction: column;
		gap: .5rem;

		&:nth-child(1) {
			flex-grow: 1;
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
		transition: background-color .2s ease-in-out;

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
