import Image from 'next/image'
import GoogleIcon from '../public/GoogleIcon.svg'
import LinkedinIcon from '../public/LinkedinIcon.svg'

function MyApp() {
  const handleStrategyLogin = async (route: string) => {
    window.location.href = `http://localhost:3030${route}`
  }

  const strategies = [
    {
      icon: GoogleIcon,
      label: 'Faça Login com o Google',
      route: '/auth/google',
      alt: 'Google Icon',
    },
    {
      icon: LinkedinIcon,
      label: 'Faça Login com o Linkedin',
      route: '/auth/linkedin',
      alt: 'Linkedin Icon',
    },
  ]

  return (
    <main className="w-screen h-screen flex flex-col gap-5 justify-center items-center bg-secondary-04">
      {strategies.map(({ icon, alt, route, label }, index) => (
        <button
          key={index}
          className="
          bg-primary-03 text-neutral-01 font-bold
          border-primary-03 border-2 hover:bg-primary-01
          hover:border-primary-01 active:bg-primary-04
          active:border-primary-04 disabled:bg-gray-02
          disabled:border-gray-0 dark:text-neutral-02 dark:border-neutral-02
          dark:hover:bg-secondary-01 dark:active:text-neutral-01
          dark:active:bg-secondary-05 dark:active:border-neutral-01 
          dark:disabled:bg-gray-03 dark:disabled:text-neutral-03
          dark:disabled:border-neutral-03 flex justify-center items-center rounded-lg p-4 gap-2"
          onClick={() => handleStrategyLogin(route)}
        >
          <Image src={icon} alt={alt} width="40" height="40" />
          {label}
        </button>
      ))}
    </main>
  )
}

export default MyApp
