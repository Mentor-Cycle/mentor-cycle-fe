import { useMutation } from "@apollo/client";
import Spinner from "@components/Spinner";
import { useUser } from "@hooks/useUser";
import { useModal } from "contexts/ModalContext";
import { ModalActionTypes } from "contexts/types";
import { useTheme } from "next-themes";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
import { UPDATE_USER_PHOTO } from "services/apollo/mutations";
import { GET_ME } from "services/apollo/queries";
import Swal from "sweetalert2";

const Dropzone = () => {
  const [uploadImage, { loading }] = useMutation(UPDATE_USER_PHOTO, {
    refetchQueries: [GET_ME],
  });
  const { user } = useUser();
  const { theme } = useTheme();
  const { openModal, closeModal } = useModal();
  const onDrop = async (acceptedFiles: File[]) => {
    closeModal(ModalActionTypes.SETTINGS_MODAL);
    const [selectedFile] = acceptedFiles;
    Swal.fire({
      customClass: {
        container: "swal-overlay",
        popup: "swal-overlay",
      },
      title: "Tem certeza que deseja mudar sua foto de perfil?",
      background: `${theme === "dark" ? "#212324" : "#FAFAFA"}`,
      showCancelButton: true,
      confirmButtonColor: "#BA0000",
      cancelButtonColor: "#343434",
      confirmButtonText: "Sim, mudar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      openModal(ModalActionTypes.SETTINGS_MODAL);
      if (result.isConfirmed) {
        try {
          await uploadImage({
            variables: {
              file: selectedFile,
              userId: user.id,
            },
          });
          toast.success("Foto alterada com sucesso!");
        } catch (error) {
          toast.error(
            "Erro ao alterar a foto. Por favor, tente novamente mais tarde."
          );
        }
      }
    });
  };

  const MAX_FILE_SIZE_MB = 10;
  const BYTES_IN_MB = 1048576;

  const { getRootProps, getInputProps, open, acceptedFiles } = useDropzone({
    noClick: true,
    noKeyboard: true,
    maxFiles: 1,
    maxSize: MAX_FILE_SIZE_MB * BYTES_IN_MB,
    noDrag: true,
    onDrop,
    accept: {
      "image/*": [],
    },
  });

  const files = acceptedFiles.map((file) => (
    <li key={file.name}>
      {file.name} - {(file.size / 1024).toFixed(2)} KB
    </li>
  ));

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="bg-neutral-01 dark:bg-secondary-02 mt-4">
          <div
            {...getRootProps({ className: "dropzone" })}
            className="min-h-[10vh]"
          >
            <button type="button" className="text-danger-02" onClick={open}>
              Trocar foto
            </button>
            <em className="text-xs block dark:text-neutral-02">
              (Apenas imagens são aceitos)
            </em>
            <aside>
              <h1 className="text-xs italic text-secondary-02 dark:text-neutral-02">
                tamanho máximo 10mb
              </h1>
              <ul>{files}</ul>
            </aside>
            <input {...getInputProps()} />
          </div>
        </div>
      )}
    </>
  );
};

export default Dropzone;
