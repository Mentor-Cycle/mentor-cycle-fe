import * as Dialog from "@radix-ui/react-dialog";
import { ModalContentProps } from "./Modal.types";
import Button from "@components/Button";

const ModalContentAlert = ({ children }: ModalContentProps) => {
  return (
    <Dialog.Content className="text-center py-6 text-secondary-03 z-50 rounded-lg bg-scroll overflow-y-auto bg-neutral-01 dark:bg-secondary-02 fixed top-[50%] left-[50%] max-h-[90vh] w-auto translate-x-[-50%] translate-y-[-50%]  shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] ">
      <div className="flex flex-col items-center">
        {children}
        <div className="flex gap-6 w-[300px] xs:w-[380px] sm:w-[600px] md:w-[60%]">
          <Button type="submit" variant="primary" size="small">
            Sim, pode mudar
          </Button>

          <Dialog.Close asChild>
            <Button type="button" variant="secondary" size="small">
              Cancelar
            </Button>
          </Dialog.Close>
        </div>
      </div>
    </Dialog.Content>
  );
};

export default ModalContentAlert;
