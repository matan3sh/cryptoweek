import type { FC } from 'react'
import {
  Container,
  ContentSection,
  Description,
  FeatureButton,
  FeaturePartners,
  Headline,
  HeroImage,
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
          <Headline>Calling Israel's Top Crypto Talents</Headline>
          <Title>
            Crypto <span>Week</span>
          </Title>
          <Subtitle>13th December - 16th December</Subtitle>
          <Description>
            Join global crypto leaders, VC firms and promising blockchain
            companies unveiling the future trends from the world's top Crypto
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
            {featurPartners.map((logo, index) => (
              <img
                key={`feature-partner-${index}-${logo.name}`}
                src={`/static/images/feature/partners/${logo.name}.png`}
                alt={`${logo.name} logo`}
                height={logo.height}
                width={logo.width}
              />
            ))}
          </FeaturePartners>
        </ContentSection>

        <HeroImageSection>
          <HeroImage
            src="/images/hero/hero-3d-crypto.png"
            alt="3D Crypto Week Illustration"
            width="600"
            height="520"
          />
        </HeroImageSection>
      </Wrapper>
    </Container>
  )
}

export default Feature
