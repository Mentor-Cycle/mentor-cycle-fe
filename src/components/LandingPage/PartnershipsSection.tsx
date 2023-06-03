import Image from "next/image";

const PartnershipsSection = () => {
  return (
    <section className="bg-secondary-02 xs:min-h-[600px]">
      <div className="container py-20 xs:py-40 ">
        <h2
          className="font-bold text-2xl xs:text-4.5xl text-center text-neutral-01"
          id="como-funciona"
        >
          Parcerias
        </h2>
        <div className="flex justify-center items-center mt-20">
          <a
            href="https://www.soujunior.tech/"
            className="opacity-70 hover:opacity-100 transition"
          >
            <Image
              alt="souJunior Logo"
              src={"/soujunior-logo.svg"}
              width={250}
              height={50}
            />
          </a>
        </div>
      </div>
    </section>
  );
};

export default PartnershipsSection;
