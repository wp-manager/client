<script setup lang="ts">

defineProps({
    score: {
        type: Number,
        required: true,
    },
});

enum ScoreLevel {
    GOOD = 'good',
    NEEDS_IMPROVEMENT = 'needs-improvement',
    POOR = 'poor',
}

const getScoreLevel = (score: number) => {
    if (score >= 90) {
        return ScoreLevel.GOOD;
    } else if (score >= 50 && score < 90) {
        return ScoreLevel.NEEDS_IMPROVEMENT;
    } else {
        return ScoreLevel.POOR;
    }
}

const getScoreLabel = (score: ScoreLevel) => {
    if (score === ScoreLevel.GOOD) {
        return 'Good';
    } else if (score === ScoreLevel.NEEDS_IMPROVEMENT) {
        return 'Needs Improvement';
    } else {
        return 'Poor';
    }
}
</script>

<template>
    <div class="score" :class="getScoreLevel(score)">
        <div class="value">{{ score }}%</div>
        <div class="label">{{ getScoreLabel(getScoreLevel(score)) }}</div>
    </div>
</template>

<style scoped lang="scss">
.score {
    --light-color: #f8f9fa;
    --dark-color: #343a40;
    
    align-items: center;
    aspect-ratio: 1/1;

    display: flex;
    flex-direction: column;
    
    justify-content: center;
    padding: .5rem;
    color: var(--dark-color);
    background-color: var(--light-color);

    transition: background-color .2s ease-in-out, color .2s ease-in-out;

    .value{
        font-size: 32px;
        font-weight: 700;
    }

    .label{
        font-size: 12px;
    }

    &.good {
        --light-color: #d4edda;
        --dark-color: #8BC34A;
    }

    &.needs-improvement {
        --light-color: #fff3cd;
        --dark-color: #FFC107;
    }

    &.poor {
        --light-color: #f8d7da;
        --dark-color: #F44336;
    }
}
</style>
