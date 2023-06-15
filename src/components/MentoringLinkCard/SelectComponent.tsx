import * as Select from "@radix-ui/react-select";
import clsx from "clsx";
import { useState } from "react";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import Button from "../../components/Button";
import Modal from "@components/Modal/Modal";
import { useMutation } from "@apollo/client";
import { UPDATE_EVENT } from "services/apollo/mutations";
import { IUpdateEventInput, Props } from "./SelectComponent.types";

export const SelectComponent = ({
  eventId,
  setStatus,
  name: nameUser,
  date,
  hour,
  onCancel,
  disabled,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [value, setValue] = useState("");
  const [updateEventStatus, { loading: loadingUpdatingEvent }] =
    useMutation(UPDATE_EVENT);
  const [currentStep, setCurrentStep] = useState(1);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsOpen(false);
  };

  const handleValueChange = (newValue: string) => {
    setValue(newValue);
    if (newValue == "Cancelar") {
      setIsModalOpen(true);
      setValue("");
    }
  };

  const handleUpdateEventStatus = async (eventId: string) => {
    setCurrentStep((currentStep) => 1 + currentStep);
    const updateEventInput: IUpdateEventInput = {
      id: eventId,
      status: "CANCELLED",
    };
    try {
      await updateEventStatus({ variables: { updateEventInput } });
      setStatus("CANCELLED");
      onCancel();
    } catch (error) {
      console.error("Error updating event status:", error);
    }
  };
  return (
    <>
      <Modal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        closeModalComponent={<button onClick={handleCloseModal}></button>}
      >
        {currentStep === 1 && (
          <>
            <p className="text-2xl font-bold px-20">
              Deseja realmente cancelar sua mentoria?
            </p>
            <div className="flex mt-16 px-20 gap-4">
              <Button
                size="small"
                variant="secondary"
                onClick={handleCloseModal}
              >
                Cancelar
              </Button>
              <Button
                size="small"
                onClick={() => handleUpdateEventStatus(eventId)}
              >
                Confirmar
              </Button>
            </div>
          </>
        )}
        {currentStep === 2 && !loadingUpdatingEvent && (
          <>
            <p className="text-2xl font-bold px-20 text-success-01 text-center">
              Sua mentoria foi cancelada com sucesso!
            </p>
            <p className="font-bold px-20 text-base mt-4">{nameUser}</p>
            <p className=" px-14 text-base mt-4 text-gray-03">
              Seu mentorado será notificado do seu cancelamento da mentoria
            </p>
            <p className=" px-20 text-base mt-4">
              <span className="font-bold">Horário:</span> {hour}
            </p>
            <p className=" px-20 text-base mt-4">
              <span className="font-bold"> Data:</span> {date}
            </p>
          </>
        )}
      </Modal>
      <Select.Root
        open={isOpen}
        onOpenChange={setIsOpen}
        value={value}
        disabled={disabled}
        onValueChange={handleValueChange}
      >
        <Select.Trigger className="flex items-center justify-center cursor-pointer focus:outline-none">
          {isOpen ? <BiChevronUp size={24} /> : <BiChevronDown size={24} />}
        </Select.Trigger>
        <Select.Content
          position="popper"
          alignOffset={30}
          side="left"
          className={clsx(
            "bg-neutral-01 dark:bg-secondary-02 border border-gra p-4 rounded-lg mt-2"
          )}
        >
          {/* <Select.Item
            data-testid="remarcar-option"
            value="Remarcar"
            className="hover:bg-primary-01 hover:text-neutral-01 focus:text-neutral-01 rounded-lg p-2 focus:bg-primary-01 focus:outline-none focus:ring-0 focus:ring-primary-03"
          >
            Remarcar
          </Select.Item> */}
          <Select.Item
            value="Cancelar"
            className="hover:bg-primary-01 hover:text-neutral-01 focus:text-neutral-01 rounded-lg p-2 focus:bg-primary-01 focus:outline-none focus:ring-0 focus:ring-primary-03"
          >
            Cancelar
          </Select.Item>
        </Select.Content>
      </Select.Root>
    </>
  );
};
