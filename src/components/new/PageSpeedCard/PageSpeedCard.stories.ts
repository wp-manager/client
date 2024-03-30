import type { Meta, StoryObj } from "@storybook/vue3";

import PageSpeedCard from "./PageSpeedCard.vue";

const meta: Meta<typeof PageSpeedCard> = {
    component: PageSpeedCard,
};

export default meta;
type Story = StoryObj<typeof PageSpeedCard>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const Primary: Story = {
    args: {
        performanceScore: 82
    },
    
    render: (args) => ({
        components: { PageSpeedCard },
        setup() {
            return { args };
        },
        template:
            '<PageSpeedCard primary label="PageSpeedCard" v-bind="args" />',
    }),
};
