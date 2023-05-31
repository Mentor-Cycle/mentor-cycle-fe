import React from "react";

const About = () => {
  return (
    <section>
      <h4 className="text-2xl font-bold">Sobre nós</h4>
      <ul className="mt-6 space-y-2">
        <li className="hover:opacity-70 hover:cursor-pointer">Notion</li>
        <li className="hover:opacity-70 hover:cursor-pointer">
          Repositório Back End
        </li>
        <li className="hover:opacity-70 hover:cursor-pointer">
          Repositório Front End
        </li>
      </ul>
    </section>
  );
};

export default About;
