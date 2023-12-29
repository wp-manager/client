<script setup lang="ts">
import type { Site } from '@/types/site';

import { useApiStore } from '@/stores/api';
import { ref } from 'vue';

const apiStore = useApiStore();

const loading = ref(true);
const posts = ref();

apiStore.getRoute('wp/v2/posts?context=embed&_embed=1').then((res) => {
    loading.value = false;

    posts.value = res;
});


</script>

<template>
    <div v-if="!loading">
        <h1>Posts</h1>
        <div class="posts">
            <div v-for="post in posts" :key="post.id" class="post">
                <div class="post__image"
                    v-if="post._embedded['wp:featuredmedia'] && post._embedded['wp:featuredmedia'][0].media_details.sizes.medium.source_url">
                    <img v-if="post._embedded['wp:featuredmedia'][0].media_details.sizes.medium.source_url"
                        :src="post._embedded['wp:featuredmedia'][0].media_details.sizes.medium.source_url"
                        :alt="post._embedded['wp:featuredmedia'][0].alt_text">
                </div>
                <div class="post__content">
                    <h2 v-html="post.title.rendered"></h2>
                    <p v-html="post.excerpt.rendered"></p>
                    <div class="post__footer">
                        <small>Author: {{ post._embedded.author[0].name }}</small>
                        <small>Published: {{ post.date }}</small>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
