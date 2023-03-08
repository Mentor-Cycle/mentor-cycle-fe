import * as Checkbox from "@radix-ui/react-checkbox";
import { BsCheck } from "react-icons/bs";
import { Props } from "./Checkbox-types";

const CheckboxRadix = ({ label, id, ...props }: Props) => {
  return (
    <div className="flex items-center">
      <Checkbox.Root
        className=" w-6 h-6 mr-4 rounded border border-gray-03 focus:outline-none focus:ring-2 focus:ring-gray-03 focus:border-gray-03 dark:focus:border-neutral-04 dark:border-neutral-04 dark:focus:ring-neutral-04"
        id={id}
        {...props}
      >
        <Checkbox.Indicator>
          <BsCheck size={22} className={"dark:text-neutral-04 text-gray-03"} />
        </Checkbox.Indicator>
      </Checkbox.Root>
      <label
        className={"text-sm font-normal text-gray-03 dark:text-neutral-03"}
        htmlFor={id}
      >
        {label}
      </label>
    </div>
  );
};

export default CheckboxRadix;
