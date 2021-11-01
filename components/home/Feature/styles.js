import styled from 'styled-components';

export const Container = styled.div`
  background-image: url('/static/images/feature/feature.png');
  height: 959px;
  max-width: 1600px;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  margin: auto;

  @media screen and (max-width: 860px) {
    background-size: 450px;
    background-position: 150% 10%;
    height: 100%;
  }
`;

export const Wrapper = styled.div`
  color: black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;

  @media screen and (max-width: 860px) {
    transform: translateY(100px);
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
    font-size: 70px;
    line-height: 76px;
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
  margin-top: 20px;

  @media screen and (max-width: 860px) {
    font-size: 20px;
    text-align: center;
  }
`;

export const Description = styled.h5`
  font-size: 22px;
  font-family: 'Moderat-Light';
  margin-top: 20px;
  width: 484px;
  line-height: 28px;

  @media screen and (max-width: 860px) {
    width: 95%;
    line-height: 24px;
    font-size: 18px;
    text-align: center;
    margin-top: 15px;
  }
`;
