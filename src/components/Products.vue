<script setup lang="ts">
import type { Site } from '@/types/site';

import { useApiStore } from '@/stores/api';
import { ref } from 'vue';
import MediaImage from './MediaImage.vue';

const apiStore = useApiStore();

const loading = ref(true);
const products = ref();

apiStore.getRoute('wc/v3/products').then((res) => {
    loading.value = false;

    products.value = res;
});


</script>

<template>
    <div v-if="!loading">
        <h1>Products</h1>
        <div class="products">
            <div v-for="product in products" :key="product.id" class="product">
                <div class="product__image"
                    v-if="product.images && product.images[0]">
                   <MediaImage :id="product.images[0].id" />
                </div>
                <div class="product__content">
                    <h2 v-html="product.name"></h2>
                    <p v-html="product.short_description"></p>
                    <div class="product__footer">
                        <small>Price: {{ product.price }}</small>
                        <small>Published: {{ product.date_created }}</small>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
</style>