import { fadeInUp, staggerContainer } from '@/components/animations'
import { motion, useInView } from 'framer-motion'
import { useRef, memo } from 'react'
import Image from 'next/image'
import { Container, List } from './styles'

interface GridSectionProps {
  data: string[]
  title: string
  link: string
}

/**
 * GridSection component - Displays a grid of partner/supporter logos
 * Memoized with custom comparison to prevent re-renders when data hasn't changed
 */
const GridSection: React.FC<GridSectionProps> = ({ data, title, link }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <Container
      as={motion.div}
      ref={ref}
      id={link}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={staggerContainer}
    >
      <motion.h1 variants={fadeInUp}>{title}</motion.h1>

      <List as={motion.div} variants={staggerContainer}>
        {data.map((partner, key) => (
          <motion.div
            key={partner}
            variants={fadeInUp}
            whileInView={{
              opacity: 1,
              y: 0,
              scale: 1,
              transition: {
                delay: key * 0.1,
                duration: 0.6,
                ease: [0.25, 0.46, 0.45, 0.94],
              },
            }}
            initial={{
              opacity: 0,
              y: 30,
              scale: 0.9,
            }}
            viewport={{ once: true, margin: '-50px' }}
            whileHover={{
              scale: 1.05,
              y: -8,
              rotate: [0, -2, 2, 0],
              boxShadow: '0 10px 30px rgba(102, 126, 234, 0.2)',
              transition: {
                duration: 0.3,
                ease: [0.25, 0.46, 0.45, 0.94],
              },
            }}
            whileTap={{
              scale: 0.98,
              transition: { duration: 0.1 },
            }}
            style={{ position: 'relative', width: '100%', height: 'auto' }}
          >
            <Image
              src={partner}
              alt="Partner logo"
              width={200}
              height={100}
              quality={85}
              loading="lazy"
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          </motion.div>
        ))}
      </List>
    </Container>
  )
}

// Memoize with custom comparison function
// Only re-render if data, title, or link actually changed
export default memo(GridSection, (prev, next) => {
  return (
    prev.title === next.title &&
    prev.link === next.link &&
    prev.data.length === next.data.length &&
    prev.data.every((item, i) => item === next.data[i])
  )
})
