import Button from "@components/Button";
import * as Dialog from "@radix-ui/react-dialog";
import { ModalRootProps } from "./Modal.types";

const ModalContentAlert = ({ children }: ModalRootProps) => {
  return (
    <Dialog.Content className="fixed left-[50%] top-[50%] z-50 max-h-[90vh] w-auto translate-x-[-50%] translate-y-[-50%] overflow-y-auto rounded-lg bg-neutral-01 bg-scroll py-16 text-center text-secondary-03 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px]  dark:bg-secondary-02 ">
      <div className="flex w-[350px] flex-col items-center gap-7 max-xl:px-5 xs:w-[380px] sm:w-[600px] lg:px-20">
        {children}
        <div className="flex w-full gap-6">
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
