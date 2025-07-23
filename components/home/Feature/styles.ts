import styled from 'styled-components'

export const Container = styled.div`
  background: linear-gradient(135deg, #f8faff 0%, #ffffff 50%, #f0f4ff 100%);
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
    background: linear-gradient(135deg, #f8faff 0%, #ffffff 100%);
    min-height: 70vh;
  }

  @media screen and (max-width: 520px) {
    min-height: 60vh;
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
    flex-direction: column-reverse;
    text-align: center;
    padding-top: 90px;
    min-height: auto;
  }

  @media screen and (max-width: 860px) {
    padding-top: 80px;
  }

  @media screen and (max-width: 520px) {
    padding-top: 70px;
  }
`

export const ContentSection = styled.div`
  flex: 1;
  max-width: 600px;
  z-index: 3;

  @media screen and (max-width: 1200px) {
    max-width: 100%;
    margin-top: 10px;
  }

  @media screen and (max-width: 520px) {
    margin-top: 5px;
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
  max-width: 1100px;
  min-width: 700px;
  object-fit: contain;
  filter: drop-shadow(0 20px 40px rgba(102, 126, 234, 0.15));
  transform: translateX(-20px);

  @media screen and (max-width: 1400px) {
    max-width: 800px;
    min-width: 400px;
  }
  @media screen and (max-width: 1200px) {
    max-width: 500px;
    min-width: 0;
  }
  @media screen and (max-width: 860px) {
    max-width: 350px;
  }
  @media screen and (max-width: 520px) {
    max-width: 280px;
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
  gap: 24px;
  margin-top: 55px;
  align-items: center;

  @media screen and (max-width: 860px) {
    justify-content: center;
    margin-top: 40px;
    gap: 20px;
  }

  @media screen and (max-width: 520px) {
    gap: 16px;
    margin-top: 32px;
  }

  img {
    object-fit: contain;
    opacity: 0.8;
    filter: grayscale(10%);
    border-radius: 8px;
    padding: 8px;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);

    @media screen and (max-width: 768px) {
      padding: 6px;
      border-radius: 6px;
    }

    @media screen and (max-width: 520px) {
      width: 35%;
      padding: 4px;
    }
  }
`
