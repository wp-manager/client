<script setup lang="ts">
import { useSitesStore } from '@/stores/sites';
import { usePasskeyStore } from '@/stores/passkey';
import { useNewAuthStore } from '@/stores/newAuth';
import { useApiStore } from '@/stores/api';
import { useNewSitesStore } from '@/stores/sitesNew';

const newAuthStore = useNewAuthStore();

const newSitesStore = useNewSitesStore();


defineProps<{
	msg?: string
}>()
</script>

<template>
	<div class="sidebar-wrapper p-3 border-end bg-dark">
		<div class="sidebar ">
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
				<div class="nav-item">
					<RouterLink class="nav-link text-white" :to="{ name: 'sites-plugins' }">
						<i class="bi bi-plug me-2"></i> All Plugins
					</RouterLink>
				</div>
			</div>
			{{ $route.params.uri }}
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
			<div class="sidebar__nav" v-if="newAuthStore.user">
				<a class="user">
					<i class="bi bi-person me-2"></i>
					<div>{{ newAuthStore.user.username }} <small>{{ newAuthStore.user.id }}</small></div>
				</a>
			</div>

		</div>
	</div>
</template>

<style scoped lang="scss">
.sidebar-wrapper {
	width: var(--sidebar-width);
	transition: width 0.2s ease-in-out;
}
</style>