const About = () => {
  return (
    <section className="py-4 lg:py-0">
      <h4 className="text-2xl font-bold text-neutral-01 text-center lg:text-start">
        Sobre nós
      </h4>
      <ul className="mt-6 flex flex-col gap-2 justify-center items-center lg:items-start lg:justify-start mb-10 xs:mb-10">
        <a
          target="_blank"
          rel="noreferrer"
          href="https://uxdavidareal.notion.site/Mentor-Cycle-ff5e6e73778d40d690d57aeac24d8cb5"
        >
          <li className="hover:opacity-70 hover:cursor-pointer text-gray-01">
            Notion
          </li>
        </a>
        <a
          target="_blank"
          rel="noreferrer"
          href="https://github.com/Mentor-Cycle/mentor-cycle-fe"
        >
          <li className="hover:opacity-70 hover:cursor-pointer text-gray-01">
            Repositório Back End
          </li>
        </a>
        <a
          target="_blank"
          rel="noreferrer"
          href="https://github.com/Mentor-Cycle/mentor-cycle-be"
        >
          <li className="hover:opacity-70 hover:cursor-pointer text-gray-01">
            Repositório Front End
          </li>
        </a>
      </ul>
    </section>
  );
};

export default About;
