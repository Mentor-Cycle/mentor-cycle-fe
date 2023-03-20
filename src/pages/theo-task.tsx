import Chip, { ChipOption } from '@components/Chip'

function TheoTest() {
  return (
    <main className="w-screen h-screen flex gap-5 justify-center items-center">
      <Chip type={ChipOption.BACKEND} />
      <Chip type={ChipOption.FRONTEND} />
      <Chip type={ChipOption.FULLSTACK} />
    </main>
  )
}

export default TheoTest
