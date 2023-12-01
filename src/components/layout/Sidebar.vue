<script setup lang="ts">
defineProps<{
	msg?: string
}>()
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
			<RouterLink to="/sites/1/core">
				<i class="bi bi-braces"></i> Core
			</RouterLink>
		</div>
	</div>
</template>

<style scoped lang="scss">
.sidebar {
	background-color: var(--sidebar-background);
	padding: .75rem;
	width: 275px;
	height: 100svh;

	&__nav {
		display: flex;
		flex-direction: column;
		gap: .5rem;
	

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
