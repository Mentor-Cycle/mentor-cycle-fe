import * as Select from "@radix-ui/react-select";
import Image from "next/image";
import Chip from "../../components/Chip";
import clsx from "clsx";
import { useState } from "react";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { Props, StatusToVariantMap } from "./MentoringLinkCard.types";
import Button from "../../components/Button";
import Modal from "@components/Modal/Modal";
import { useMutation } from "@apollo/client";
import { UPDATE_EVENT } from "services/apollo/mutations";

const MentoringLinkCard = ({
  avatar,
  name,
  job,
  status,
  date,
  hour,
  meetingLink,
  eventId,
  onCancel,
}: Props) => {
  const [updatedStatus, setUpdatedStatus] = useState(status);

  const statusToPortugueseMap: Record<string, string> = {
    PENDING: "Agendada",
    DONE: "Realizada",
    CANCELLED: "Cancelada",
    CONFIRMED: "Agendada",
  };
  const handleStatusCard = (status: string) => {
    const statusToVariantMap: StatusToVariantMap = {
      "Não realizada": "primary",
      Realizada: "primary",
      "A confirmar": "tertiary",
      Agendada: "chipCards",
      Cancelada: "chipCards",
    };

    const variant = statusToVariantMap[statusToPortugueseMap[status]];
    return <Chip variant={variant}>{statusToPortugueseMap[status]}</Chip>;
  };
  const isDisabled = status === "DONE" || status === "CANCELLED";

  return (
    <div className=" py-4 px-6 flex flex-col sm:flex sm:flex-row  justify-between gap-4 max-w-7xl w-[98%] sm:w-full border border-gray-03 rounded-lg">
      <div className="flex flex-col sm:flex sm:flex-row gap-4 ">
        <div className="rounded-lg overflow-hidden w-24 h-24">
          <Image
            src={avatar || "/imgCard.png"}
            alt="avatar profile"
            width={98}
            height={98}
          />
        </div>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-secondary-01 dark:text-neutral-01 max-w-[320px] truncate">
            {name}
          </h1>
          <p className="text-sm text-gray-04 dark:text-gray-01 max-w-[280px] truncate">
            {job}
          </p>
          <div className="flex gap-2 mt-4 max-w-[260px] truncate">
            {handleStatusCard(updatedStatus)}
          </div>
        </div>
      </div>
      <div className="flex justify-end items-end flex-col md:min-w-[270px] ">
        <a
          href={meetingLink}
          className="w-full"
          rel="noreferrer"
          target="_blank"
        >
          <Button disabled={isDisabled} size="small">
            {isDisabled ? "Chamada Encerrada" : "Acessar chamada"}
          </Button>
        </a>
        <div className="flex items-center justify-center ">
          <div className="flex flex-col justify-end items-end mr-3">
            <span className="mt-4 dark:text-neutral-03">{date}</span>
            <span className="text-gray-03 dark:text-neutral-05">{hour}</span>
          </div>

          <div
            className={clsx(
              "relative cursor-pointer transition-all duration-300",
              ["DONE", "CANCELLED"].includes(status) && "invisible"
            )}
          >
            <SelectComponent
              eventId={eventId}
              status={updatedStatus}
              onCancel={onCancel}
              disabled={status === "DONE" || status === "CANCELLED"}
              setStatus={setUpdatedStatus}
              nameUser={name}
              hour={hour}
              date={date}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const SelectComponent = ({
  eventId,
  setStatus,
  nameUser,
  date,
  hour,
  onCancel,
  disabled,
}: {
  date: React.ReactNode;
  hour: React.ReactNode;
  nameUser: string;
  eventId: string;
  status: string;
  disabled?: boolean;
  onCancel: () => void;
  setStatus: (status: string) => void;
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");
  const [updateEventStatus, { loading }] = useMutation(UPDATE_EVENT);
  const [currentStep, setCurrentStep] = useState(1);

  const handleCloseModal = () => {
    setIsModalOpen(!isModalOpen);
    setIsOpen(!isOpen);
  };

  const handleValueChange = (newValue: string) => {
    setValue(newValue);
    if (newValue == "Cancelar") {
      setIsModalOpen(true);
      setValue("");
    }
  };

  const handleUpdateEventStatus = async (eventId: string) => {
    setCurrentStep(currentStep + 1);
    const updateEventInput = {
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
        {currentStep === 2 && !loading && (
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

export default MentoringLinkCard;
