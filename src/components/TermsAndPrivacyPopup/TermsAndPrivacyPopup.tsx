import { Dialog, DialogOverlay, DialogContent } from "@radix-ui/react-dialog";
import Link from "next/link";
import { useEffect, useState } from "react";

const TermsAndPrivacyPopup = ({
  open,
  setOpen,
  onAgree,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  onAgree: () => void;
}) => {
  const handleAgree = async () => {
    await onAgree();
    localStorage.setItem("hasAgreedToTermsAndPrivacy", "true");
    setOpen(false);
  };

  return (
    <Dialog open={open}>
      <DialogOverlay className="fixed z-10 inset-0 bg-secondary-01 bg-opacity-50" />
      <DialogContent
        onCloseAutoFocus={(e) => e.preventDefault()}
        className="fixed z-20 bottom-[-10vh] left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-neutral-01 p-6 rounded shadow-lg"
      >
        <h2 className="text-xl font-bold mb-4">
          Termos de Uso, Política de Privacidade e Cookies
        </h2>
        <p>
          Ao utilizar esta plataforma, você concorda com nossos{" "}
          <Link
            href="/terms"
            target="_blank"
            className="text-link-01 hover:text-link-02"
          >
            Termos de Uso
          </Link>{" "}
          e{" "}
          <Link
            href="/privacy-policy"
            target="_blank"
            className="text-link-01 hover:text-link-02"
          >
            Política de Privacidade
          </Link>
          . Além disso, usamos cookies para melhorar sua experiência em nosso
          site. Ao clicar em Concordo, você aceita o uso de cookies e nossos
          termos.
        </p>
        <button
          type="button"
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
          onClick={handleAgree}
        >
          Concordo
        </button>
      </DialogContent>
    </Dialog>
  );
};

export default TermsAndPrivacyPopup;
