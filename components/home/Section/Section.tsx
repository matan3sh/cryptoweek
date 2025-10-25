import { fadeInUp, staggerContainer, textReveal } from '@/components/animations'
import type { ContentSection } from '@/lib/content/interfaces'
import { motion, useInView } from 'framer-motion'
import { useRef, memo } from 'react'
import { Container, Wrapper } from './styles'

interface SectionProps {
  data: ContentSection
}

/**
 * Section component - Displays content section with background
 * Memoized with custom comparison to prevent re-renders when data hasn't changed
 */
const Section: React.FC<SectionProps> = ({ data }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  // Map semantic theme to color value
  const themeColors = {
    light: '#fff',
    dark: '#3f354d',
  }

  const textColor = data._legacyColor || themeColors[data.theme]
  const backgroundImage = data.backgroundImage || ''

  return (
    <Container
      as={motion.div}
      ref={ref}
      style={{
        color: textColor,
        backgroundImage: `url(${backgroundImage})`,
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

// Memoize with custom comparison function
// Only re-render if content actually changed
export default memo(Section, (prev, next) => {
  return (
    prev.data.title === next.data.title &&
    prev.data.subtitle === next.data.subtitle &&
    prev.data.theme === next.data.theme &&
    prev.data.backgroundImage === next.data.backgroundImage
  )
})
