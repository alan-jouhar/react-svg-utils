import type { Meta, StoryObj } from "@storybook/react";

import AnalogClock from "./AnalogClock";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: "Components/AanlogClock",
  component: AnalogClock,
  tags: ["autodocs"],
} satisfies Meta<typeof AnalogClock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Cairo: Story = {
  args: {
    timeZone: "Africa/Cairo",
    brand: "CAIRO",
    side: 200,
  },
};

export const Berlin: Story = {
  args: {
    timeZone: "Europe/Berlin",
    brand: "BERLILN",
    side: 300,
  },
};

export const Australia: Story = {
  args: {
    timeZone: "Australia/Melbourne",
    brand: "Melbourne",
    side: 500,
  },
};
