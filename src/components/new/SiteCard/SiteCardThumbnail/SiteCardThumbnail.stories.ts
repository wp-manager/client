import type { Meta, StoryObj } from "@storybook/vue3";

import SiteCardThumbnail from "./SiteCardThumbnail.vue";

const meta: Meta<typeof SiteCardThumbnail> = {
    component: SiteCardThumbnail,
};

export default meta;
type Story = StoryObj<typeof SiteCardThumbnail>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const Primary: Story = {
    args: {
        
    },    
    render: (args) => ({
        components: { SiteCardThumbnail },
        setup() {
            return { args };
        },
        template:
            '<SiteCardThumbnail primary label="SiteCardThumbnail" v-bind="args" />',
    }),
};
