import styled from 'styled-components';

export const Container = styled.div`
  background-image: url('/static/images/feature/feature.png');
  height: 959px;
  max-width: 1600px;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  margin: auto;

  position: relative;

  @media screen and (max-width: 860px) {
    background-size: 380px;
    background-position: -100% 10%;
    height: 100%;
  }
  @media screen and (max-width: 520px) {
    background-size: 275px;
    background-position: 20% 10%;
  }
`;

export const Wrapper = styled.div`
  color: black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;

  @media screen and (min-width: 1920px) {
    position: absolute;
    top: 50%;
    left: 20%;
    transform: translate(-50%, -50%);
  }
  @media screen and (max-width: 860px) {
    transform: translateY(70px);
  }
  @media screen and (max-width: 520px) {
    transform: translateY(25px);
  }
`;

export const Headline = styled.h2`
  font-size: 22px;
  line-height: 28px;
  letter-spacing: -0.2665834426879883px;
  text-align: left;

  @media screen and (max-width: 860px) {
    font-size: 18px;
    line-height: 24px;
    text-align: center;
  }
`;

export const Title = styled.h1`
  font-family: 'Moderat-Bold';
  font-size: 130px;
  line-height: 136px;
  letter-spacing: -1.0362775325775146px;
  text-align: left;
  width: 403px;

  @media screen and (max-width: 860px) {
    width: 100%;
    font-size: 48px;
    line-height: 56px;
    text-align: center;
  }

  span {
    background: #3d68ff;
    background: -webkit-linear-gradient(
      to right,
      #3d68ff 42%,
      #966be2 62%,
      #e27b73 88%
    );
    background: -moz-linear-gradient(
      to right,
      #3d68ff 42%,
      #966be2 62%,
      #e27b73 88%
    );
    background: linear-gradient(
      to right,
      #3d68ff 42%,
      #966be2 62%,
      #e27b73 88%
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

export const Subtitle = styled.h3`
  font-size: 28px;
  font-family: 'Moderat-Light';
  margin-top: 15px;

  @media screen and (max-width: 860px) {
    margin-top: 15px;
    font-size: 20px;
    text-align: center;
  }
`;

export const Description = styled.h5`
  font-size: 22px;
  font-family: 'Moderat-Light';
  margin-top: 15px;
  width: 484px;
  line-height: 28px;

  @media screen and (max-width: 860px) {
    width: 95%;
    line-height: 24px;
    font-size: 16px;
    text-align: center;
    margin-top: 15px;
  }
  @media screen and (max-width: 520px) {
    line-height: 22px;
    font-size: 14px;
    width: 100%;
    padding: 0 1rem;
  }
`;

export const FeatureButton = styled.a`
  font-family: 'Moderat-Medium';
  background-color: #1d1d27;
  width: 246px;
  height: 70px;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 25px;
  border-radius: 55px;
  font-size: 20px;
  gap: 15px;

  &:hover {
    cursor: pointer;
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
`;

export const FeaturePartners = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 55px;
  align-items: center;
  @media screen and (max-width: 860px) {
    justify-content: center;
    margin-top: 10px;
    width: 95%;
  }

  img {
    object-fit: contain;
    @media screen and (max-width: 520px) {
      width: 35%;
    }
  }
`;
