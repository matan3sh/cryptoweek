import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  max-width: 1200px;
  width: 100%;
  background: #ffffff;
  padding: 100px 40px;
  position: relative;

  > h1 {
    font-family: 'Moderat-Bold';
    color: #1a202c;
    font-size: 48px;
    margin-bottom: 56px;
    font-weight: 900;
    text-align: center;
    letter-spacing: -1px;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      bottom: -16px;
      left: 50%;
      transform: translateX(-50%);
      width: 80px;
      height: 4px;
      background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
      border-radius: 2px;
    }

    @media screen and (max-width: 768px) {
      font-size: 36px;
      margin-bottom: 48px;

      &::after {
        bottom: -12px;
        width: 60px;
        height: 3px;
      }
    }

    @media screen and (max-width: 475px) {
      font-size: 28px;
      margin-bottom: 40px;

      &::after {
        bottom: -10px;
        width: 50px;
      }
    }
  }

  @media screen and (max-width: 860px) {
    padding: 80px 30px;
  }

  @media screen and (max-width: 520px) {
    padding: 60px 20px;
  }
`

export const List = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 32px;
  place-items: center;
  width: 100%;

  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 24px;
  }

  @media screen and (max-width: 575px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  > div {
    width: 100%;
    max-width: 320px;
    text-align: center;
    background: linear-gradient(135deg,
      rgba(255, 255, 255, 0.75) 0%,
      rgba(255, 255, 255, 0.65) 100%);
    border: 1.5px solid rgba(255, 255, 255, 0.4);
    border-radius: var(--radius-xl);
    padding: 40px 28px;
    -webkit-backdrop-filter: var(--blur-lg);
    backdrop-filter: var(--blur-lg);
    position: relative;

    @media screen and (max-width: 768px) {
      max-width: 280px;
      padding: 32px 24px;
    }

    @media screen and (max-width: 575px) {
      max-width: 100%;
      padding: 32px;
    }

    > img {
      width: 100%;
      max-width: 200px;
      height: 200px;
      object-fit: cover;
      border-radius: 50%;
      margin-bottom: 24px;
      border: 3px solid rgba(255, 255, 255, 0.6);
      position: relative;
      z-index: 1;

      @media screen and (max-width: 768px) {
        max-width: 180px;
        height: 180px;
        margin-bottom: 20px;
      }

      @media screen and (max-width: 575px) {
        max-width: 160px;
        height: 160px;
        margin-bottom: 16px;
      }
    }

    > h2 {
      font-family: 'Moderat-Bold';
      font-size: 20px;
      font-weight: 700;
      margin: 0 0 8px 0;
      color: #1a202c;
      line-height: 1.3;
      position: relative;
      z-index: 1;

      @media screen and (max-width: 768px) {
        font-size: 18px;
      }

      @media screen and (max-width: 575px) {
        font-size: 17px;
      }
    }

    > h3 {
      font-family: 'Moderat-Medium';
      font-size: 15px;
      color: #667eea;
      line-height: 1.4;
      font-weight: 600;
      margin: 0;
      position: relative;
      z-index: 1;

      @media screen and (max-width: 768px) {
        font-size: 14px;
      }

      @media screen and (max-width: 575px) {
        font-size: 14px;
      }
    }
  }
`
