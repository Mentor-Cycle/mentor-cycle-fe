import Image from 'next/image'
import testimonialImg from '../../public/avatarTestimonial.png'
import TruncatedText from './TruncatedText'
import { PropsTestimonialCard } from './TestimonialCard.types'

const TestimonialCard = ({ maxLines, text }: PropsTestimonialCard) => {
  const MAX_WIDTH = 'max-w-[274px]'

  return (
    <div
      className={`border border-gray-03 rounded-lg shadow py-6 px-8 ${MAX_WIDTH}`}
    >
      <div>
        <Image
          src={testimonialImg}
          alt="testimonial avatar"
          width={64}
          height={64}
        />
        <h2 className="font-semibold mt-8">Esther Howard</h2>
        <TruncatedText maxLines={maxLines} text={text} expanded={false} />
      </div>
    </div>
  )
}

export default TestimonialCard
