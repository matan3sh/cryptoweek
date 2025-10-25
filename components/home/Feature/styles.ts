import styled from 'styled-components'

export const Container = styled.div`
  background: #ffffff;
  height: 100vh;
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  overflow: hidden;

  @media screen and (max-width: 1200px) {
    height: auto;
    min-height: 80vh;
  }

  @media screen and (max-width: 860px) {
    min-height: 70vh;
  }

  @media screen and (max-width: 520px) {
    min-height: 60vh;
  }
`

export const Wrapper = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  color: #1a202c;
  display: flex;
  align-items: center;
  min-height: 100vh;
  position: relative;
  z-index: 2;

  @media screen and (max-width: 1400px) {
    max-width: 100%;
    padding: 80px 40px 0;
  }

  @media screen and (max-width: 1200px) {
    flex-direction: column-reverse;
    text-align: center;
    padding-top: 90px;
    min-height: auto;
  }

  @media screen and (max-width: 860px) {
    padding: 80px 30px 0;
  }

  @media screen and (max-width: 520px) {
    padding: 70px 20px 0;
  }
`

export const ContentSection = styled.div`
  flex: 1.2;
  max-width: 650px;
  z-index: 3;

  @media screen and (max-width: 1200px) {
    max-width: 100%;
    margin-top: 40px;
  }

  @media screen and (max-width: 860px) {
    margin-top: 30px;
  }

  @media screen and (max-width: 520px) {
    margin-top: 20px;
  }
`

export const HeroImageSection = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  position: relative;
  margin-left: 60px;

  @media screen and (max-width: 1400px) {
    margin-left: 40px;
  }
  @media screen and (max-width: 1200px) {
    margin-left: 0;
    margin: 0 auto 20px auto;
    justify-content: center;
    width: 100%;
  }
  @media screen and (max-width: 860px) {
    max-width: 350px;
    margin: 0 auto 15px auto;
    justify-content: center;
    width: 100%;
  }
  @media screen and (max-width: 520px) {
    max-width: 280px;
    margin: 0 auto 10px auto;
    justify-content: center;
    width: 100%;
  }
`

export const HeroImage = styled.img`
  width: 100%;
  height: auto;
  max-width: 700px;
  object-fit: contain;
  filter: drop-shadow(0 20px 40px rgba(102, 126, 234, 0.2));
  border-radius: var(--radius-xl);

  @media screen and (max-width: 1400px) {
    max-width: 600px;
  }
  @media screen and (max-width: 1200px) {
    max-width: 500px;
  }
  @media screen and (max-width: 860px) {
    max-width: 350px;
  }
  @media screen and (max-width: 520px) {
    max-width: 280px;
  }
`

export const Headline = styled.h2`
  font-size: 18px;
  line-height: 24px;
  letter-spacing: -0.2px;
  text-align: left;
  margin-bottom: 12px;
  color: #667eea;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;

  @media screen and (max-width: 860px) {
    font-size: 16px;
    line-height: 22px;
    text-align: center;
  }
`

export const Title = styled.h1`
  font-family: 'Moderat-Bold';
  font-size: 72px;
  line-height: 80px;
  letter-spacing: -2px;
  text-align: left;
  margin: 0 0 20px 0;
  color: #1a202c;

  @media screen and (max-width: 1200px) {
    font-size: 56px;
    line-height: 64px;
  }

  @media screen and (max-width: 860px) {
    font-size: 48px;
    line-height: 56px;
    text-align: center;
  }

  @media screen and (max-width: 520px) {
    font-size: 36px;
    line-height: 44px;
  }

  span {
    background: linear-gradient(135deg, #667eea 0%, #936bd6 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`

export const Subtitle = styled.h3`
  font-size: 24px;
  font-family: 'Moderat-Medium';
  margin: 0 0 16px 0;
  color: #2d3748;
  font-weight: 500;
  text-align: left;

  @media screen and (max-width: 860px) {
    font-size: 20px;
    text-align: center;
  }

  @media screen and (max-width: 520px) {
    font-size: 18px;
  }
`

export const Description = styled.p`
  font-size: 18px;
  font-family: 'Moderat-Regular';
  margin: 0 0 24px 0;
  line-height: 28px;
  color: #4a5568;
  font-weight: 400;
  text-align: left;

  @media screen and (max-width: 860px) {
    line-height: 26px;
    font-size: 16px;
    text-align: center;
  }
  @media screen and (max-width: 520px) {
    line-height: 24px;
    font-size: 15px;
  }
`

export const FeatureButton = styled.a`
  font-family: 'Moderat-Medium';
  background: var(--bg-gradient-secondary);
  padding: 18px 40px;
  color: #fff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-sm);
  font-size: 16px;
  font-weight: 600;
  gap: 12px;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: var(--glow-purple);
  border: 1px solid var(--border-glass);
  -webkit-backdrop-filter: var(--blur-sm);
  backdrop-filter: var(--blur-sm);

  &:hover {
    cursor: pointer;
    transform: translateY(-2px);
    box-shadow: var(--glow-purple-strong);
    background: linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%);
  }

  @media screen and (max-width: 860px) {
    font-size: 15px;
    padding: 16px 32px;
    margin: 0 auto;
    display: flex;
  }
  @media screen and (max-width: 520px) {
    font-size: 14px;
    padding: 14px 28px;
  }

  svg {
    transition: transform 0.3s ease;
  }

  &:hover svg {
    transform: translateX(4px);
  }
`

export const FeaturePartners = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-top: 32px;
  align-items: center;
  justify-items: start;

  @media screen and (max-width: 860px) {
    justify-items: center;
    margin-top: 24px;
    gap: 16px;
  }

  @media screen and (max-width: 520px) {
    gap: 12px;
    margin-top: 20px;
  }

  img {
    width: 100%;
    max-width: 280px;
    height: 100px;
    object-fit: contain;
    opacity: 0.7;
    filter: grayscale(20%);
    border-radius: var(--radius-sm);
    padding: 24px 32px;
    background: var(--glass-white);
    border: 1px solid var(--border-glass);
    -webkit-backdrop-filter: var(--blur-sm);
    backdrop-filter: var(--blur-sm);
    transition: all 0.3s ease;

    &:hover {
      opacity: 1;
      filter: grayscale(0%);
      transform: translateY(-2px);
      box-shadow: var(--glow-purple);
    }

    @media screen and (max-width: 1024px) {
      max-width: 240px;
      padding: 20px 28px;
      height: 85px;
    }

    @media screen and (max-width: 768px) {
      max-width: 200px;
      padding: 16px 24px;
      height: 70px;
    }

    @media screen and (max-width: 520px) {
      max-width: 160px;
      padding: 12px 16px;
      height: 60px;
    }
  }
`
