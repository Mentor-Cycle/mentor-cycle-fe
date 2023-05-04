import { useMutation } from "@apollo/client";
import { useUser } from "@hooks/useUser";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
import { UPDATE_USER_PHOTO } from "services/apollo/mutations";
import { GET_ME } from "services/apollo/queries";
import Swal from "sweetalert2";

const Dropzone = ({ setIsModalOpen }: any) => {
  const [uploadImage] = useMutation(UPDATE_USER_PHOTO, {
    refetchQueries: [GET_ME],
  });
  const { user, setUser } = useUser();

  const onDrop = async (acceptedFiles: File[]) => {
    const selectedFile = acceptedFiles[0];
    try {
      const { data } = await uploadImage({
        variables: {
          file: selectedFile,
          userId: user.id,
        },
      });
      toast.success("Foto alterada com sucesso!");
      console.log("Imagem enviada com sucesso:", data);
    } catch (error) {
      toast.error("Erro ao alterar a foto");
      console.error("Não foi possível enviar a imagem:", error);
    }
  };
  const { getRootProps, getInputProps, open, acceptedFiles } = useDropzone({
    noClick: true,
    noKeyboard: true,
    maxFiles: 1,
    maxSize: 1048576,
    noDrag: true,
    onDrop,
  });

  const files = acceptedFiles.map((file) => (
    <li key={file.name}>
      {file.name} - {(file.size / 1024).toFixed(2)} KB
    </li>
  ));

  const handleChangeUserPhoto = () => {
    setIsModalOpen(false);
    Swal.fire({
      customClass: {
        container: "swal-overlay",
        popup: "swal-overlay",
      },
      title: "Tem certeza que deseja mudar sua foto de perfil?",
      showCancelButton: true,
      confirmButtonColor: "#BA0000",
      cancelButtonColor: "#343434",
      confirmButtonText: "Sim, mudar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      setIsModalOpen(true);
      if (result.isConfirmed) {
        open();
      } else {
        toast.info("Troca de foto não finalizada!");
      }
    });
  };

  return (
    <div className="bg-neutral-01 mt-4 min-h-[30vh]">
      <div
        {...getRootProps({ className: "dropzone" })}
        className="min-h-[30vh]"
      >
        <button
          type="button"
          className="text-danger-02"
          onClick={handleChangeUserPhoto}
        >
          Trocar foto
        </button>
        <aside>
          <h1 className="text-xs italic">tamanho máximo 1mb</h1>
          <ul>{files}</ul>
        </aside>
        <input {...getInputProps()} />
      </div>
    </div>
  );
};
export default Dropzone;
