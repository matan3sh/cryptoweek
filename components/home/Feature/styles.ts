import styled from 'styled-components'

export const Container = styled.div`
  background: linear-gradient(135deg, #f8faff 0%, #ffffff 50%, #f0f4ff 100%);
  height: 100vh;
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  overflow: hidden;

  @media screen and (max-width: 860px) {
    background: linear-gradient(135deg, #f8faff 0%, #ffffff 100%);
  }
`

export const Wrapper = styled.div`
  max-width: 1620px;
  width: 100%;
  margin: 0 auto;
  padding: 0 40px;
  color: #1a202c;
  display: flex;
  align-items: center;
  min-height: 100vh;
  padding-top: 80px;
  position: relative;
  z-index: 2;

  @media screen and (max-width: 1820px) {
    width: 95%;
    padding: 80px 2.5% 0;
  }

  @media screen and (max-width: 1200px) {
    flex-direction: column;
    text-align: center;
    padding-top: 80px;
    min-height: auto;
  }
`

export const ContentSection = styled.div`
  flex: 1;
  max-width: 600px;
  z-index: 3;

  @media screen and (max-width: 1200px) {
    max-width: 100%;
    margin-bottom: 40px;
  }
`

export const HeroImageSection = styled.div`
  flex: 2.5;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  position: relative;
  margin-left: 40px;

  @media screen and (max-width: 1400px) {
    margin-left: 20px;
  }
  @media screen and (max-width: 1200px) {
    margin-left: 0;
    margin: 0 auto;
    justify-content: center;
  }
  @media screen and (max-width: 860px) {
    max-width: 450px;
  }
  @media screen and (max-width: 520px) {
    max-width: 320px;
  }
`

export const HeroImage = styled.img`
  width: 100%;
  height: auto;
  max-width: 1100px;
  min-width: 700px;
  object-fit: contain;
  animation: floatAnimation 6s ease-in-out infinite;
  filter: drop-shadow(0 20px 40px rgba(102, 126, 234, 0.15));

  @keyframes floatAnimation {
    0%,
    100% {
      transform: translateY(0px) rotate(0deg);
    }
    50% {
      transform: translateY(-10px) rotate(1deg);
    }
  }

  @media screen and (max-width: 1400px) {
    max-width: 800px;
    min-width: 400px;
  }
  @media screen and (max-width: 1200px) {
    max-width: 600px;
    min-width: 0;
  }
  @media screen and (max-width: 860px) {
    max-width: 450px;
  }
  @media screen and (max-width: 520px) {
    max-width: 320px;
  }
`

export const Headline = styled.h2`
  font-size: 22px;
  line-height: 28px;
  letter-spacing: -0.2665834426879883px;
  text-align: left;
  margin-bottom: 10px;
  color: #4a5568;
  font-weight: 500;

  @media screen and (max-width: 860px) {
    font-size: 18px;
    line-height: 24px;
    text-align: center;
  }
`

export const Title = styled.h1`
  font-family: 'Moderat-Bold';
  font-size: 130px;
  line-height: 136px;
  letter-spacing: -1.0362775325775146px;
  text-align: left;
  width: 403px;
  margin: 0;
  color: #1a202c;

  @media screen and (max-width: 860px) {
    width: 100%;
    font-size: 48px;
    line-height: 56px;
    text-align: center;
  }

  span {
    background: linear-gradient(135deg, #667eea 0%, #936bd6 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`

export const Subtitle = styled.h3`
  font-size: 28px;
  font-family: 'Moderat-Light';
  margin: 15px 0;
  color: #2d3748;
  font-weight: 400;

  @media screen and (max-width: 860px) {
    font-size: 20px;
    text-align: center;
  }
`

export const Description = styled.h5`
  font-size: 22px;
  font-family: 'Moderat-Light';
  margin: 15px 0;
  width: 484px;
  line-height: 28px;
  color: #4a5568;
  font-weight: 400;

  @media screen and (max-width: 860px) {
    width: 95%;
    line-height: 24px;
    font-size: 16px;
    text-align: center;
    margin: 15px auto;
  }
  @media screen and (max-width: 520px) {
    line-height: 22px;
    font-size: 14px;
    width: 100%;
    padding: 0 1rem;
  }
`

export const FeatureButton = styled.a`
  font-family: 'Moderat-Medium';
  background: linear-gradient(135deg, #1a202c 0%, #2d3748 100%);
  width: 246px;
  height: 70px;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 25px;
  border-radius: 55px;
  font-size: 18px;
  gap: 15px;
  text-decoration: none;
  transition: all 0.3s ease-in-out;
  box-shadow: 0 4px 20px rgba(26, 32, 44, 0.2);

  &:hover {
    cursor: pointer;
    transform: translateY(-2px);
    box-shadow: 0 8px 30px rgba(26, 32, 44, 0.3);
    background: linear-gradient(135deg, #2d3748 0%, #1a202c 100%);
  }

  @media screen and (max-width: 860px) {
    font-size: 16px;
    width: 199px;
    height: 45px;
    margin: 15px auto;
  }
  @media screen and (max-width: 520px) {
    font-size: 14px;
    width: 159px;
    height: 35px;
  }

  svg {
    transform: translateY(3px);
    @media screen and (max-width: 520px) {
      transform: translateY(0px);
    }
  }
`

export const FeaturePartners = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 55px;
  align-items: center;

  @media screen and (max-width: 860px) {
    justify-content: center;
    margin-top: 30px;
    width: 95%;
  }

  img {
    object-fit: contain;
    transition: transform 0.2s ease-in-out;
    opacity: 0.7;
    filter: grayscale(20%);

    &:hover {
      transform: scale(1.05);
      opacity: 1;
      filter: grayscale(0%);
    }

    @media screen and (max-width: 520px) {
      width: 35%;
    }
  }
`
