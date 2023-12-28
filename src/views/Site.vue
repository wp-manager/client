<script setup lang="ts">
import { useApiStore } from '@/stores/api';
import { ref } from 'vue';

const apiStore = useApiStore();

const siteData = ref({});
const loading = ref(true);

apiStore.getRoute('').then((res) => {
	loading.value = false;

	siteData.value = res;
});


</script>

<template>
	<Transition name="fade">
		<div class="loading" v-if="loading"></div>
	</Transition>
	<div v-if="!loading">
		<h1 v-html="siteData.name"></h1>
		<p v-if="siteData.description" v-html="siteData.description"></p>
	</div>
	<hr>
	<RouterView v-if="!loading" />
</template>

<style scoped lang="scss">
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}
</style>
