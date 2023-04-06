import { ToastContainer, toast } from "react-toastify";

const ToastVariants = {
  success: (message: string) => toast.success(message),
  error: (message: string) => toast.error(message),
  warning: (message: string) => toast.warning(message),
  info: (message: string) => toast.info(message),
};

interface ToastComponentProps {
  type: keyof typeof ToastVariants;
  message: string;
  buttonText?: string;
}

export const ToastComponent = ({
  type,
  message,
  buttonText = "Toast",
}: ToastComponentProps) => {
  const notify = () => ToastVariants[type](message);

  return (
    <div className="flex min-h-screen justify-center items-center">
      <button
        onClick={notify}
        className="py-2 px-4 bg-primary-03 text-neutral-03 rounded-lg"
      >
        {buttonText}
      </button>
      <ToastContainer />
    </div>
  );
};
