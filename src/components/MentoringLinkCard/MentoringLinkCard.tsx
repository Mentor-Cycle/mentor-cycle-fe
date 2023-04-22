import * as Select from "@radix-ui/react-select";
import Image from "next/image";
import Chip from "../../components/Chip";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Props, StatusToVariantMap } from "./MentoringLinkCard.types";
import Button from "../../components/Button";
import Modal from "@components/Modal/Modal";

const MentoringLinkCard = ({
  avatar,
  name,
  job,
  status,
  date,
  hour,
}: Props) => {
  const statusToPortugueseMap: Record<string, string> = {
    PENDING: "A confirmar",
    DONE: "Realizada",
    CANCELLED: "Cancelada",
    CONFIRMED: "Confirmada",
  };

  const handleStatusCard = (status: string) => {
    const statusToVariantMap: StatusToVariantMap = {
      "Não realizada": "primary",
      Realizada: "secondary",
      "A confirmar": "tertiary",
    };

    const variant = statusToVariantMap[statusToPortugueseMap[status]];
    return <Chip variant={variant}>{statusToPortugueseMap[status]}</Chip>;
  };

  return (
    <div className="py-4 px-6 flex flex-col sm:flex sm:flex-row  justify-between gap-4 max-w-7xl w-full border border-gray-03 rounded-lg">
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
          <h1 className="text-3xl font-bold text-secondary-01 dark:text-neutral-01 max-w-[320px] truncate">
            {name}
          </h1>
          <p className="text-sm text-gray-04 dark:text-gray-01 max-w-[280px] truncate">
            {job}
          </p>
          <div className="flex gap-2 mt-4 max-w-[260px] truncate">
            {handleStatusCard(status)}
          </div>
        </div>
      </div>
      <div className="flex justify-end items-end flex-col md:min-w-[278px] ">
        <Button size="small">Acessar chamada</Button>
        <div className="flex items-center justify-center ">
          <div className="flex flex-col justify-end items-end mr-3">
            <span className="mt-4 dark:text-neutral-03">{date}</span>
            <span className="text-gray-03 dark:text-neutral-05">{hour}</span>
          </div>
          <div className="relative cursor-pointer transition-all duration-300">
            <SelectComponent />
          </div>
        </div>
      </div>
    </div>
  );
};

const SelectComponent = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");

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

  return (
    <>
      <Modal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        closeModalComponent={<button onClick={handleCloseModal}></button>}
      >
        <p className="text-2xl font-bold px-20">
          Deseja realmente cancelar sua mentoria?
        </p>
        <div className="flex mt-16 px-20 gap-4">
          <Button size="small" variant="secondary" onClick={handleCloseModal}>
            Cancelar
          </Button>
          <Button size="small">Confirmar</Button>
        </div>
      </Modal>
      <Select.Root
        open={isOpen}
        onOpenChange={setIsOpen}
        value={value}
        onValueChange={handleValueChange}
      >
        <Select.Trigger className="flex items-center justify-center cursor-pointer">
          {isOpen ? <BiChevronUp size={24} /> : <BiChevronDown size={24} />}
        </Select.Trigger>
        <Select.Content
          position="popper"
          alignOffset={30}
          side="left"
          className={clsx(
            "bg-neutral-01 border border-gra p-4 rounded-lg mt-2"
          )}
        >
          <Select.Item
            data-testid="remarcar-option"
            value="Remarcar"
            className="hover:bg-primary-01 hover:text-neutral-01 focus:text-neutral-01 rounded-lg p-2 focus:bg-primary-01 focus:outline-none focus:ring-0 focus:ring-primary-03"
          >
            Remarcar
          </Select.Item>
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
