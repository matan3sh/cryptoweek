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

import { featurPartners } from '@/data'

const Feature: FC = () => {
  return (
    <Container id="Feature">
      <Wrapper>
        <ContentSection>
          <Headline>Calling Israel&apos;s Top Crypto Talents</Headline>
          <Title>
            Crypto <span>Week</span>
          </Title>
          <Subtitle>13th December - 16th December</Subtitle>
          <Description>
            Join global crypto leaders, VC firms and promising blockchain
            companies unveiling the future trends from the world&apos;s top Crypto
            Week!
          </Description>
          <FeatureButton
            href="https://hopin.com/events/israel-crypto-week"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>Get early access</span>
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
            {featurPartners.map((logo) => (
              <Image
                key={`feature-partner-${logo.name}`}
                src={`/static/images/feature/partners/${logo.name}.png`}
                alt={`${logo.name} logo`}
                height={parseInt(logo.height)}
                width={parseInt(logo.width)}
                quality={85}
                loading="lazy"
              />
            ))}
          </FeaturePartners>
        </ContentSection>

        <HeroImageSection>
          <Image
            src="/images/hero/hero-3d-crypto.png"
            alt="3D Crypto Week Illustration"
            width={600}
            height={520}
            priority
            quality={90}
            style={{ maxWidth: '100%', height: 'auto' }}
          />
        </HeroImageSection>
      </Wrapper>
    </Container>
  )
}

export default Feature
