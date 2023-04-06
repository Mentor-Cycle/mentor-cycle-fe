import { ToastContainer, toast } from "react-toastify";

interface ToastComponentProps {
  type: "success" | "error" | "warning" | "info";
  message: string;
  buttonText?: string;
}

export const ToastComponent = ({
  type,
  message,
  buttonText = "Toast",
}: ToastComponentProps) => {
  const notify = {
    success: () => toast.success(message),
    error: () => toast.error(message),
    warning: () => toast.warning(message),
    info: () => toast.warning(message),
  }[type];

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
