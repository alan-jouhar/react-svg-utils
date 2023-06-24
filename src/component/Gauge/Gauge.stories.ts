import type { Meta, StoryObj } from "@storybook/react";

import Gauge from "./Gauge";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: "Components/Gauge",
  component: Gauge,
  tags: ["autodocs"],
} satisfies Meta<typeof Gauge>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    label: "Button",
    color: "green",
  },
};

export const Secondary: Story = {
  args: {
    label: "Button",
    color: "green",
  },
};

export const Large: Story = {
  args: {
    label: "Button",
    color: "green",
  },
};

export const Small: Story = {
  args: {
    label: "Button",
    color: "green",
  },
};
