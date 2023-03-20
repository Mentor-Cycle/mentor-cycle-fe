import { useRouter } from 'next/router'

function TokenVerifyPage() {
  const { token } = useRouter().query
  // word wrap wrap tailwind

  return (
    <main className="w-screen h-screen flex flex-col justify-center items-center bg-secondary-04">
      <h1 className="text-4xl font-bold text-neutral-05 break-all p-20">
        Token: {token}
      </h1>
    </main>
  )
}

export default TokenVerifyPage
