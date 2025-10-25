import { fadeInUp, staggerContainer, textReveal } from '@/components/animations'
import type { SectionData } from '@/types'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Container, Wrapper } from './styles'

interface SectionProps {
  data: SectionData
}

const Section: React.FC<SectionProps> = ({ data }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <Container
      as={motion.div}
      ref={ref}
      style={{
        color: data.color,
        backgroundImage: `url(${data.bg})`,
      }}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={staggerContainer}
    >
      <Wrapper as={motion.div} variants={staggerContainer}>
        <motion.h1
          variants={fadeInUp}
          whileInView={{
            opacity: 1,
            y: 0,
            transition: {
              duration: 0.8,
              ease: [0.25, 0.46, 0.45, 0.94],
            },
          }}
          initial={{
            opacity: 0,
            y: 50,
          }}
          viewport={{ once: true, margin: '-50px' }}
        >
          {data.title}
        </motion.h1>

        <motion.p
          variants={textReveal}
          whileInView={{
            opacity: 1,
            y: 0,
            transition: {
              delay: 0.2,
              duration: 0.8,
              ease: [0.25, 0.46, 0.45, 0.94],
            },
          }}
          initial={{
            opacity: 0,
            y: 30,
          }}
          viewport={{ once: true, margin: '-50px' }}
        >
          {data.subtitle}
        </motion.p>
      </Wrapper>
    </Container>
  )
}

export default Section
