<script setup lang="ts">
import { useAccountStore } from '@/stores/account';
import SiteScreenshot from '../SiteScreenshot.vue';
import SiteIcon from '../SiteIcon.vue';
import { useMetaStore } from '@/stores/meta';

const metaStore = useMetaStore();

const accountStore = useAccountStore();
</script>

<template>
	<div class="sidebar  p-3 border-end bg-dark">
		<div class="sidebar-main">
			<div v-if="accountStore.account">
				<div class="sidebar__nav nav nav-pills flex-column" v-if="!$route.params.uri">
					<div class="nav-item">
						<RouterLink class="nav-link text-white" to="/">
							<i class="bi bi-house me-2"></i>Home
						</RouterLink>
					</div>
					<hr>
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
					<hr>
					<div class="nav-item">
						<RouterLink class="nav-link text-white" to="/sites/plugins">
							<i class="bi bi-plug me-2"></i> Plugins Overview
						</RouterLink>
					</div>
					<div class="nav-item">
						<RouterLink class="nav-link text-white" to="/sites/users">
							<i class="bi bi-people me-2"></i> Users Overview
						</RouterLink>
					</div>
					<div class="nav-item">
						<RouterLink class="nav-link text-white" :to="{ name: 'sites-application-passwords' }">
							<i class="bi bi-key me-2"></i> App Passwords
						</RouterLink>
					</div>
					<hr>
					<div class="nav-item">
						<RouterLink class="nav-link text-white" to="/sites/gravity-forms">
							<i class="bi bi-ui-checks me-2"></i> Gravity Forms
						</RouterLink>
					</div>
					<div class="nav-item">
						<RouterLink class="nav-link text-white" to="/sites/cf7-forms">
							<i class="bi bi-input-cursor-text me-2"></i> Contact Form 7
						</RouterLink>
					</div>
					<div class="nav-item">
						<RouterLink class="nav-link text-white" to="/sites/cf7-forms">
							<i class="bi bi-shield me-2"></i> Wordfence
						</RouterLink>
					</div>
					<div class="nav-item">
						<RouterLink class="nav-link text-white" to="/sites/cf7-forms">
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
				<div class="sidebar__nav nav nav-pills flex-column" v-if="$route.meta.site">
					<div class="nav-screenshot">
						<SiteScreenshot :url="$route.meta.site?.screenshot" />
						<div class="nav-screenshot__content">
							<SiteIcon :site="$route.meta.site" />
							<span v-html="$route.meta.site?.discover()?.data?.name || $route.meta.site?.url"></span>
						</div>
					</div>
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
						<RouterLink class="nav-link text-white" v-if="$route.meta.site?.hasNamespace('wpe/cache-plugin/v1')"
							:to="{ name: 'site-wpengine', params: { uri: $route.params.uri } }">
							<i class="bi bi-server me-2"></i> WP Engine
						</RouterLink>
					</div>
					<hr>
					<div class="nav-item">
						<RouterLink class="nav-link text-white" to="/sites/gravity-forms"
							v-if="$route.meta.site?.hasNamespace('gravityforms/v2')">
							<i class="bi bi-ui-checks me-2"></i> Gravity Forms
						</RouterLink>
					</div>
					<div class="nav-item">
						<RouterLink class="nav-link text-white" to="/sites/cf7-forms"
							v-if="$route.meta.site?.hasNamespace('contact-form-7/v1')">
							<i class="bi bi-input-cursor-text me-2"></i> Contact Form 7
						</RouterLink>
					</div>
					<div class="nav-item">
						<RouterLink class="nav-link text-white" to="/sites/cf7-forms"
							v-if="$route.meta.site?.hasNamespace('wp-rocket/v1')">
							<i class="bi bi-rocket-takeoff me-2"></i> WP Rocket
						</RouterLink>
					</div>
					<div class="nav-item">
						<RouterLink class="nav-link text-white" to="/sites/cf7-forms"
							v-if="$route.meta.site?.hasNamespace('stq/v1') && $route.meta.site?.hasPlugin('sucuri-scanner/sucuri')">
							<i class="bi bi-shield me-2"></i> Sucuri
						</RouterLink>
					</div>

				</div>
			</div>
		</div>
		<div class="sidebar-footer">
			<div class="sidebar__nav nav nav-pills flex-column">
				<RouterLink class="nav-link text-white" :to="{ name: 'logout' }" v-if="accountStore.account">
					<i class="bi bi-box-arrow-right me-2"></i> Logout
					<small class="text-muted d-block">{{ accountStore.account?.data?.email }}</small>
				</RouterLink>
				<div class="nav-item">
					<RouterLink class="nav-link text-white" :to="{ name: 'login' }" v-if="!accountStore.account">
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

	.nav-screenshot {
		position: relative;
		margin: -1rem -1rem 0 -1rem;
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