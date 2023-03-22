import Chip from "./Chip";
import { ChipOption } from "./Chip.types";
import { Meta, Story } from "@storybook/react";

export default {
  title: "Data Display/Chips",
  component: Chip,
  argTypes: {
    type: {
      defaultValue: ChipOption.FRONTEND,
      control: {
        type: "select",
        options: [
          ChipOption.FRONTEND,
          ChipOption.BACKEND,
          ChipOption.FULLSTACK,
        ],
      },
    },
  },
} as Meta;

interface ChipStoryArgs {
  type: ChipOption;
}

export const Default: Story<ChipStoryArgs> = ({ type }) => {
  return <Chip type={type}></Chip>;
};
