import type { Meta, StoryObj } from "@storybook/vue3";

import GenericCard from "./GenericCard.vue";

const meta: Meta<typeof GenericCard> = {
    component: GenericCard,
};

export default meta;
type Story = StoryObj<typeof GenericCard>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const Primary: Story = {
    args: {
        
    },    
    render: (args) => ({
        components: { GenericCard },
        setup() {
            return { args };
        },
        template:
            '<GenericCard primary label="GenericCard" v-bind="args" />',
    }),
};
