import { useMutation } from "@apollo/client";
import Spinner from "@components/Spinner/Spinner";
import { useUser } from "@hooks/useUser";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
import { UPDATE_USER_PHOTO } from "services/apollo/mutations";
import { GET_ME } from "services/apollo/queries";
import Swal from "sweetalert2";

const Dropzone = ({ setIsModalOpen }: any) => {
  const [uploadImage, { loading }] = useMutation(UPDATE_USER_PHOTO, {
    refetchQueries: [GET_ME],
  });
  const { user, setUser } = useUser();

  const onDrop = async (acceptedFiles: File[]) => {
    setIsModalOpen(false);
    const selectedFile = acceptedFiles[0];
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
          toast.error(
            "Erro ao alterar a foto. Por favor, tente novamente mais tarde."
          );
        }
      }
    });
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

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="bg-neutral-01 mt-4">
          <div
            {...getRootProps({ className: "dropzone" })}
            className="min-h-[30vh]"
          >
            <button type="button" className="text-danger-02" onClick={open}>
              Trocar foto
            </button>
            <aside>
              <h1 className="text-xs italic">tamanho máximo 1mb</h1>
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
