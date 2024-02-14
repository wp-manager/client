<script setup lang="ts">
import { useAccountStore } from '@/stores/account';
import SiteScreenshot from '../SiteScreenshot.vue';
import SiteIcon from '../SiteIcon.vue';
import { useMetaStore } from '@/stores/meta';
import { useSiteStore } from '@/stores/site';
import { useSharedStore } from '@/stores/shared';
import SidebarContext from './SidebarContext.vue';
import { useWPEStore } from '@/plugins/wpengine/stores/wpe';

const metaStore = useMetaStore();

const accountStore = useAccountStore();
const siteStore = useSiteStore();
const sharedStore = useSharedStore();
const wpeStore = useWPEStore();
</script>

<template>
	<div class="sidebar border-end">
		<div class="sidebar-main">
			<RouterLink to="/" class="d-flex justify-content-center logo">
				<img src="/wpm-logo.svg" alt="Logo" />
			</RouterLink>
			<div class="sidebar__nav nav nav-pills flex-column">
				<div class="sidebar__nav__inner">
					<template v-if="siteStore.routeSite()?.url">
						<div class="nav-screenshot">
							<SiteScreenshot :url="siteStore.routeSite()?.screenshot" />
							<div class="nav-screenshot__content">
								<SiteIcon :site="siteStore.routeSite()" />
								<span
									v-html="siteStore.routeSite()?.discover()?.data?.name || siteStore.routeSite()?.url"></span>
							</div>
						</div>
						<!-- if within /site/:uri/settings-->
						<SidebarContext v-for="item in sharedStore.sidebars.contextual.siteSettings.items" :item="item"
							v-if="$route.meta.siteSettings" />
						<SidebarContext v-for="item in sharedStore.sidebars.contextual.site.items" :item="item" v-else />
					</template>
					<template v-else-if="$route.meta.account">
						<SidebarContext v-for="item in sharedStore.sidebars.contextual.settings.items" :item="item" />
					</template>
					<template v-else>
						<SidebarContext v-for="item in sharedStore.sidebars.contextual.main.items" :item="item" />
					</template>
					<div class="divider-heading" data-label="Debug"></div>
					<div class="nav-item">
						<small class="d-flex flex-column gap-1">
							<div class="d-flex justify-content-between">
								<div class="text-muted">Current API requests</div>
								<div>{{ metaStore.finishedRequests }} / {{ metaStore.pendingRequests }}</div>
							</div>
							<div class="progress" role="progressbar" aria-label="Animated striped example"
								style="height:4px"
								:class="{ 'visible': (metaStore.finishedRequests !== metaStore.pendingRequests) }">
								<div class="progress-bar"
									:class="{ 'bg-success': (metaStore.finishedRequests === metaStore.pendingRequests) }"
									:style="{ width: (metaStore.finishedRequests / metaStore.pendingRequests) * 100 + '%' }">
								</div>
							</div>
						</small>
					</div>
				</div>
			</div>
		</div>
		<hr>
		<div class="sidebar-footer">
			<div class="sidebar__nav nav nav-pills flex-column">
				<SidebarContext v-for="item in sharedStore.sidebars.footer.items" :item="item" />
				<div class="socials">
					<a href="https://github.com/wp-manager/client" target="_blank" rel="noopener noreferrer">
						<i class="bi bi-github"></i>
					</a>
					<a href="https://discord.gg/k4GPvRfk3D" target="_blank" rel="noopener noreferrer">
						<i class="bi bi-discord"></i>
					</a>
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
		display: flex;
		flex-direction: column;
	}

	&__nav{
		position: relative;
		flex-grow: 1;
		margin-right: -6px;
		&__inner{
			padding-right: 6px;
			position: absolute;
			overflow-x: hidden;
			overflow-y: auto;
			inset: 0;

			&::-webkit-scrollbar {
				width: 4px;
			}
			&::-webkit-scrollbar-track {
			}

			&::-webkit-scrollbar-thumb {
				// slighlt darker than body color
				background-color: rgba(255,255,255,0.25);
			}

		}
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
		margin: 0 0 12px -12px;
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
}

.socials {
	margin-top: 1rem;
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 1rem;
	font-size: 1.125rem;

	a {
		color: var(--bs-body-color);
	}
}
</style>