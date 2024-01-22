<script setup lang="ts">
import { useAccountStore } from '@/stores/account';
import SiteScreenshot from '../SiteScreenshot.vue';
import SiteIcon from '../SiteIcon.vue';
import { useMetaStore } from '@/stores/meta';
import { useSiteStore } from '@/stores/site';
import { useSharedStore } from '@/stores/shared';
import SidebarContext from './SidebarContext.vue';

const metaStore = useMetaStore();

const accountStore = useAccountStore();
const siteStore = useSiteStore();
const sharedStore = useSharedStore();
</script>

<template>
	<div class="sidebar border-end">
		<div class="sidebar-main">
			<div class="d-flex justify-content-center logo">
				<img src="/wpm-logo.svg" alt="Logo" />
			</div>
			<div class="sidebar__nav nav nav-pills flex-column">
				<template v-if="siteStore.routeSite()?.url">
					<SidebarContext v-for="item in sharedStore.sidebars.contextual.site.items" :item="item" />
				</template>
				<template v-else>
					<SidebarContext v-for="item in sharedStore.sidebars.contextual.main.items" :item="item" />
				</template>
			</div>
			
		</div>
		<hr>
		<div class="sidebar-footer">
			<div class="sidebar__nav nav nav-pills flex-column">
				<RouterLink class="nav-link" :to="{ name: 'account' }" v-if="accountStore.account">
					<i class="bi bi-gear me-2"></i> Account Settings
					<small class="text-muted d-block">{{ accountStore.account?.data?.email }}</small>
				</RouterLink>
				<RouterLink class="nav-link" :to="{ name: 'logout' }" v-if="accountStore.account">
					<i class="bi bi-box-arrow-right me-2"></i> Logout
					<small class="text-muted d-block">{{ accountStore.account?.data?.email }}</small>
				</RouterLink>
				<div class="nav-item">
					<RouterLink class="nav-link" :to="{ name: 'login' }" v-if="!accountStore.account">
						<i class="bi bi-box-arrow-in-right me-2"></i> Login
					</RouterLink>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
.divider-heading {
	color: var(--bs-secondary-color);
	font-size: 10px;
	font-weight: 500;
	isolation: isolate;
	letter-spacing: 1px;
	line-height: 1px;
	margin-bottom: .5rem;
	margin-top: .5rem;
	padding: .25rem 0;
	position: relative;
	text-transform: uppercase;
	width: 100%;

	&:before {
		content: attr(data-label);
		background-color: var(--bs-body-bg);
		margin-left: .75rem;
		padding: 0 8px;
		z-index: 1;
	}

	&:after {
		content: '';
		background-color: var(--bs-body-color);
		height: 1px;
		left: 0;
		opacity: .25;
		position: absolute;
		right: 0;
		z-index: -1;
	}

}

.logo {
	margin-bottom: 18px;

	img {
		max-width: 12rem;
		width: 100%;
	}

	@media(prefers-color-scheme: light) {
		.logo-light {
			display: block;
		}

		.logo-dark {
			display: none;
		}
	}

	@media(prefers-color-scheme: dark) {
		.logo-light {
			display: none;
		}

		.logo-dark {
			display: block;
		}
	}
}

.sidebar {
	width: var(--sidebar-width);
	padding: 12px;
	height: 100%;
	position: fixed;
	display: flex;
	flex-direction: column;
	transition: width 0.2s ease-in-out;

	&-main {
		flex-grow: 1;
	}

	.user {
		display: flex;

		div {
			display: flex;
			flex-direction: column;
		}

		small {
			font-size: 10px;
		}
	}

	.nav {
		--bs-nav-link-color: var(--bs-body-color);
		--bs-nav-link-hover-color: var(--bs-body-color);

		&-link {
			&:hover {
				background-color: var(--bs-secondary-bg);
			}
		}
	}

	.nav-screenshot {
		position: relative;
		margin: 0 -12px 12px -12px;
		display: grid;

		isolation: isolate;
		overflow: hidden;
		height: 8rem;

		&__content {
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			gap: .25rem;
			font-weight: 500;
		}

		.screenshot {
			position: absolute;
			z-index: -1;

			&:after {
				content: '';
				position: absolute;
				inset: 0;
				background: linear-gradient(0deg, rgba(0, 0, 0, .8) 0%, rgba(0, 0, 0, 0.5) 100%);
				transition: opacity .25s ease-in-out;
			}
		}

		.icon {
			background: white;

			z-index: 1;

			img {
				margin: 1rem;
			}
		}

	}

}</style>