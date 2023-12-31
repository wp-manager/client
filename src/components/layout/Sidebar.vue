<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();
</script>

<template>
	<div class="sidebar  p-3 border-end bg-dark">
		<div class="sidebar-main">
			<div class="sidebar__nav nav nav-pills flex-column" v-if="!$route.params.uri">
				<div class="nav-item">
					<RouterLink class="nav-link text-white" to="/">
						<i class="bi bi-house me-2"></i>Home
					</RouterLink>
				</div>
				<div class="nav-item">
					<RouterLink class="nav-link text-white" to="/sites/add">
						<i class="bi bi-window-plus me-2"></i> Add Site
					</RouterLink>
				</div>
				<div class="nav-item">
					<RouterLink class="nav-link text-white" to="/sites">
						<i class="bi bi-window-stack me-2"></i> Sites
					</RouterLink>
				</div>
				<div class="nav-item">
					<RouterLink class="nav-link text-white" :to="{ name: 'site', params: { uri: '' } }" v-if="false">
						<i class="bi bi-window me-2"></i> Site
					</RouterLink>
				</div>
				<div class="nav-item">
					<RouterLink class="nav-link text-white" :to="{ name: 'site-core', params: { uri: '' } }" v-if="false">
						<i class="bi bi-braces me-2"></i> Core
					</RouterLink>
				</div>
			</div>
			<div class="sidebar__nav nav nav-pills flex-column" v-if="$route.params.uri">
				<div class="nav-item">
					<RouterLink class="nav-link text-white" :to="{ name: 'sites' }">
						<i class="bi bi-arrow-left me-2"></i> Back
					</RouterLink>
				</div>
				<div class="nav-item">
					<RouterLink class="nav-link text-white" :to="{ name: 'site', params: { uri: $route.params.uri } }">
						<i class="bi bi-columns-gap me-2"></i> Dashboard
					</RouterLink>
				</div>
				<div class="nav-item">
					<RouterLink class="nav-link text-white"
						:to="{ name: 'site-components', params: { uri: $route.params.uri } }">
						<i class="bi bi-grid me-2"></i> Components
					</RouterLink>
				</div>
				<div class="nav-item">
					<RouterLink class="nav-link text-white"
						:to="{ name: 'site-wpengine', params: { uri: $route.params.uri } }">
						<i class="bi bi-server me-2"></i> WP Engine
					</RouterLink>
				</div>
			</div>
		</div>
		<div class="sidebar-footer">
			<div class="sidebar__nav nav nav-pills flex-column" v-if="authStore.user">
				<RouterLink class="nav-link text-white" :to="{ name: 'logout' }" v-if="authStore.user.email">
					<i class="bi bi-box-arrow-right me-2"></i> Logout
					<small class="text-muted d-block">{{ authStore.user.email }}</small>
				</RouterLink>
				<div class="nav-item">
					<RouterLink class="nav-link text-white" :to="{ name: 'login' }" v-if="!authStore.user.email">
						<i class="bi bi-box-arrow-in-right me-2"></i> Login
					</RouterLink>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
.sidebar {
	width: var(--sidebar-width);
	height: 100%;
	position: fixed;
	display: flex;
	flex-direction: column;
	transition: width 0.2s ease-in-out;

	&-main{
		flex-grow: 1;
	}

	.user{
		display: flex;
		div{
			display: flex;
			flex-direction: column;
		}
		small{
			font-size: 10px;
		}
	}
}
</style>