import Chip from "./Chip";
import { ChipOption } from "./Chip.types";
import { Meta, StoryObj } from "@storybook/react";

/**
 * O componente `Chip` é usado para exibir opções ou categorias em um formato compacto.
 */
const meta = {
  title: "Data Display/Chips",
  component: Chip,
  argTypes: {
    type: {
      control: "radio",
      options: Object.values(ChipOption),
    },
  },
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    type: ChipOption.BACKEND,
  },
};
