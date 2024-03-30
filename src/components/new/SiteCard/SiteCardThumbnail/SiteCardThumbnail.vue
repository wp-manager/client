<script setup lang="ts">

const size = [200, 100];

const getImage = () => {
    return `https://picsum.photos/${size[0]}/${size[1]}`;
}
</script>

<template>
   <img :src="getImage()" alt="Site Thumbnail" />
</template>

<style scoped lang="scss">
</style>