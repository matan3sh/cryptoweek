import { fadeInUp, staggerContainer, textReveal } from '@/components/animations'
import { motion, useInView } from 'framer-motion'
import { useRef, memo } from 'react'
import Image from 'next/image'
import { Container, List } from './styles'

interface GridTextItem {
  image: string
  name: string
  role: string
}

interface GridTextProps {
  title: string
  data: GridTextItem[]
  link: string
}

/**
 * GridText component - Displays a grid of people (speakers/team) with photos
 * Memoized with custom comparison to prevent re-renders when data hasn't changed
 */
const GridText: React.FC<GridTextProps> = ({ title, data, link }) => {
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
        {data.map((item, key) => (
          <motion.div
            key={`${item.name}-${item.image}`}
            variants={fadeInUp}
            whileInView={{
              opacity: 1,
              y: 0,
              scale: 1,
              transition: {
                delay: key * 0.05,
                duration: 0.6,
                ease: [0.25, 0.46, 0.45, 0.94],
              },
            }}
            initial={{
              opacity: 0,
              y: 40,
              scale: 0.95,
            }}
            viewport={{ once: true, margin: '-50px' }}
            whileHover={{
              y: -10,
              scale: 1.03,
              boxShadow: '0 20px 40px rgba(102, 126, 234, 0.15)',
              transition: {
                duration: 0.3,
                ease: [0.25, 0.46, 0.45, 0.94],
              },
            }}
            whileTap={{
              scale: 0.98,
              transition: { duration: 0.1 },
            }}
          >
            <motion.div
              style={{ position: 'relative', width: '100%', height: 'auto' }}
              whileHover={{
                scale: 1.05,
                rotate: [0, -1, 1, 0],
                transition: { duration: 0.3 },
              }}
            >
              <Image
                src={item.image}
                alt={item.name}
                width={300}
                height={300}
                quality={85}
                loading="lazy"
                style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px' }}
              />
            </motion.div>
            <motion.h2 variants={textReveal}>{item.name}</motion.h2>
            <motion.h3 variants={textReveal}>{item.role}</motion.h3>
          </motion.div>
        ))}
      </List>
    </Container>
  )
}

// Memoize with custom comparison function
// Only re-render if data, title, or link actually changed
export default memo(GridText, (prev, next) => {
  return (
    prev.title === next.title &&
    prev.link === next.link &&
    prev.data.length === next.data.length &&
    prev.data.every((item, i) =>
      item.name === next.data[i].name &&
      item.image === next.data[i].image &&
      item.role === next.data[i].role
    )
  )
})
