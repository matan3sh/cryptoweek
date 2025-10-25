import type { FC } from 'react'
import Image from 'next/image'
import {
  Container,
  ContentSection,
  Description,
  FeatureButton,
  FeaturePartners,
  Headline,
  HeroImageSection,
  Subtitle,
  Title,
  Wrapper,
} from './styles'

import type { HeroSection } from '@/lib/content/interfaces'

interface FeatureProps {
  hero: HeroSection
}

const Feature: FC<FeatureProps> = ({ hero }) => {
  return (
    <Container id="Feature">
      <Wrapper>
        <ContentSection>
          <Headline>{hero.headline}</Headline>
          <Title>
            {hero.title} <span>{hero.titleHighlight}</span>
          </Title>
          <Subtitle>{hero.subtitle}</Subtitle>
          <Description>{hero.description}</Description>
          <FeatureButton
            href={hero.cta.url}
            target={hero.cta.openInNewTab ? '_blank' : '_self'}
            rel={hero.cta.openInNewTab ? 'noopener noreferrer' : undefined}
          >
            <span>{hero.cta.text}</span>
            <svg
              width="8"
              height="15"
              viewBox="0 0 8 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M1 1L6 7.25L1 13.5" stroke="white" strokeWidth="2.5" />
            </svg>
          </FeatureButton>

          <FeaturePartners>
            {hero.featuredPartners.map((partner) => (
              <Image
                key={`feature-partner-${partner.name}`}
                src={partner.logo.src}
                alt={partner.logo.alt || `${partner.name} logo`}
                height={partner.logo.height || parseInt(partner.displayHeight || '40')}
                width={partner.logo.width || parseInt(partner.displayWidth || '120')}
                quality={85}
                loading="lazy"
              />
            ))}
          </FeaturePartners>
        </ContentSection>

        <HeroImageSection>
          {hero.heroImage && (
            <Image
              src={hero.heroImage.src}
              alt={hero.heroImage.alt || 'Hero Illustration'}
              width={hero.heroImage.width || 600}
              height={hero.heroImage.height || 520}
              priority
              quality={90}
              style={{ maxWidth: '100%', height: 'auto' }}
              placeholder={hero.heroImage.blurDataUrl ? 'blur' : 'empty'}
              blurDataURL={hero.heroImage.blurDataUrl}
            />
          )}
        </HeroImageSection>
      </Wrapper>
    </Container>
  )
}

export default Feature
