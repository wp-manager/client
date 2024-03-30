<script setup lang="ts">
import PerformanceCardScore from './PerformanceCardScore/PerformanceCardScore.vue';

defineProps({
    performanceScore: Number,
    seoScore: Number,
});
</script>

<template>
    <div class="score-card">
        <PerformanceCardScore :score="performanceScore" v-if="performanceScore" />
        <PerformanceCardScore :score="seoScore" v-if="seoScore" />
    </div>
</template>

<style scoped lang="scss">
.score-card{
    display: flex;
    .score {
        flex-shrink: 0;
        align-self: 1/1;
        height: 5rem;
    }
}
</style>
