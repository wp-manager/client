<script setup lang="ts">
import { useAccountStore } from '@/stores/account';
import SiteScreenshot from '../SiteScreenshot.vue';
import SiteIcon from '../SiteIcon.vue';
import { useMetaStore } from '@/stores/meta';
import { useSiteStore } from '@/stores/site';

const metaStore = useMetaStore();

const accountStore = useAccountStore();
const siteStore = useSiteStore();
</script>

<template>
	<div class="sidebar border-end">
		<div class="sidebar-main">
			<div class="d-flex justify-content-center logo">
				<img src="/wpm-logo.svg" alt="Logo" />
			</div>
			<div v-if="accountStore.account">
				<div class="sidebar__nav nav nav-pills flex-column" v-if="siteStore.routeSite()">
					<div class="nav-screenshot">
						<SiteScreenshot :url="siteStore.routeSite()?.screenshot" />
						<div class="nav-screenshot__content">
							<SiteIcon :site="siteStore.routeSite()" />
							<span
								v-html="siteStore.routeSite()?.discover()?.data?.name || siteStore.routeSite()?.url"></span>
						</div>
					</div>
					<div class="nav-item">
						<RouterLink class="nav-link" :to="{ name: 'sites' }">
							<i class="bi bi-arrow-left me-2"></i> Back
						</RouterLink>
					</div>
					<hr>
					<div class="nav-item">
						<RouterLink class="nav-link" :to="{ name: 'site', params: { uri: siteStore.routeSite()?.url } }">
							<i class="bi bi-columns-gap me-2"></i> Dashboard
						</RouterLink>
					</div>

					<div class="nav-item">
						<RouterLink class="nav-link" to="/"
							v-if="siteStore.routeSite()?.hasNamespace('wpe/cache-plugin/v1')">
							<i class="bi bi-server me-2"></i> WP Engine
						</RouterLink>
					</div>
					<div class="nav-item">
						<RouterLink class="nav-link"
							:to="{ name: 'site-pagespeed', params: { uri: siteStore.routeSite()?.url } }"
							v-if="siteStore.routeSite()?.pagespeed()?.data">
							<i class="bi bi-speedometer me-2"></i> PageSpeed
						</RouterLink>
					</div>
					<hr>
					<div class="nav-item">
						<RouterLink class="nav-link" to="/sites/gravity-forms"
							v-if="siteStore.routeSite()?.hasNamespace('gravityforms/v2')">
							<i class="bi bi-ui-checks me-2"></i> Gravity Forms
						</RouterLink>
					</div>
					<div class="nav-item">
						<RouterLink class="nav-link" to="/sites/cf7-forms"
							v-if="siteStore.routeSite()?.hasNamespace('contact-form-7/v1')">
							<i class="bi bi-input-cursor-text me-2"></i> Contact Form 7
						</RouterLink>
					</div>
					<div class="nav-item">
						<RouterLink class="nav-link" to="/sites/cf7-forms"
							v-if="siteStore.routeSite()?.hasNamespace('wp-rocket/v1')">
							<i class="bi bi-rocket-takeoff me-2"></i> WP Rocket
						</RouterLink>
					</div>
					<div class="nav-item">
						<RouterLink class="nav-link disabled" to="/sites"
							v-if="siteStore.routeSite()?.hasNamespace('stq/v1') && siteStore.routeSite()?.hasPlugin('sucuri-scanner/sucuri')">
							<i class="bi bi-shield me-2"></i> Sucuri
						</RouterLink>
					</div>
				</div>
				<!-- if on /account or any sub pages -->
				<div class="sidebar__nav nav nav-pills flex-column" v-else-if="$route.meta.account">
					<div class="nav-item">
						<RouterLink class="nav-link" :to="{ name: 'sites' }">
							<i class="bi bi-arrow-left me-2"></i> Back
						</RouterLink>
					</div>
					<hr>
					<div class="nav-item">
						<RouterLink class="nav-link" :to="{ name: 'account-home' }">
								General
						</RouterLink>
					</div>
					<div class="nav-item">
						<RouterLink class="nav-link" :to="{ name: 'account-wp-engine' }">
							WP Engine
						</RouterLink>
					</div>
				</div>
				<div class="sidebar__nav nav nav-pills flex-column" v-else>
					<div class="nav-item">
						<RouterLink class="nav-link" to="/">
							<i class="bi bi-house me-2"></i>Home
						</RouterLink>
					</div>
					<hr>
					<div class="nav-item">
						<RouterLink class="nav-link" to="/sites/add">
							<i class="bi bi-window-plus me-2"></i> Add Site
						</RouterLink>
					</div>
					<div class="nav-item">
						<RouterLink class="nav-link" to="/sites">
							<i class="bi bi-window-stack me-2"></i> Sites
						</RouterLink>
					</div>
					<hr>
					<div class="nav-item">
						<RouterLink class="nav-link" to="/sites/plugins">
							<i class="bi bi-plug me-2"></i> Plugins Overview
						</RouterLink>
					</div>
					<div class="nav-item">
						<RouterLink class="nav-link" to="/sites/users">
							<i class="bi bi-people me-2"></i> Users Overview
						</RouterLink>
					</div>
					<div class="nav-item">
						<RouterLink class="nav-link" :to="{ name: 'sites-application-passwords' }">
							<i class="bi bi-key me-2"></i> App Passwords
						</RouterLink>
					</div>
					<hr>
					<div class="nav-item">
						<RouterLink class="nav-link" to="/sites/gravity-forms">
							<i class="bi bi-ui-checks me-2"></i> Gravity Forms
						</RouterLink>
					</div>
					<div class="nav-item">
						<RouterLink class="nav-link" to="/sites/cf7-forms">
							<i class="bi bi-input-cursor-text me-2"></i> Contact Form 7
						</RouterLink>
					</div>
					<div class="nav-item">
						<RouterLink class="nav-link disabled" to="/sites/wordfence">
							<i class="bi bi-shield me-2"></i> Wordfence
						</RouterLink>
					</div>
					<div class="nav-item">
						<RouterLink class="nav-link disabled" to="/sites/sucuri">
							<i class="bi bi-shield me-2"></i> Sucuri
						</RouterLink>
					</div>
					<hr>
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
.logo {
	margin-bottom: 18px;

	img {
		max-width: 12rem;
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

}
</style>