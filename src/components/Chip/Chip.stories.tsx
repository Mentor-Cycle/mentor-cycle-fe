import { Meta, Story } from "@storybook/react";
import Chip from "./Chip";
import { ChipOption } from "./Chip.types";

export default {
  title: "Chip/Chips",
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
          ChipOption.MENTORADO,
          ChipOption.MENTORANDO,
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
