import { HEIGHT_HEADER } from "./HeaderLP";

export const scrollToSection = (id: string) => {
  const section = document.getElementById(id);
  if (section) {
    const sectionTopOffset =
      section.getBoundingClientRect().top + window.scrollY - HEIGHT_HEADER;
    window.scrollTo({ top: sectionTopOffset, behavior: "smooth" });
  }
};
