import Link from "next/link";

const FAQ = () => {
  return (
    <ul className="flex flex-col justify-center items-center xs:justify-start xs:flex-row space-x-4 space-y-4 xs:space-y-0">
      <Link href={"/terms"}>
        <li className="xs:border-r xs:border-neutral-01 pr-2 text-neutral-01 hover:text-gray-02">
          FAQ
        </li>
      </Link>
      <Link href={"/terms"}>
        <li className="xs:border-r xs:border-neutral-01 pr-2 text-neutral-01 hover:text-gray-02">
          Termos e condições
        </li>
      </Link>
      <Link href={"/terms"}>
        <li className="text-neutral-01 hover:text-gray-02">Privacidade</li>
      </Link>
    </ul>
  );
};

export default FAQ;
