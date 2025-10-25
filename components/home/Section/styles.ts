import styled from 'styled-components'

export const Container = styled.div`
  min-height: 600px;
  width: 100%;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  position: relative;
  display: flex;
  align-items: center;
  padding: 80px 40px;

  @media screen and (max-width: 768px) {
    min-height: 500px;
    padding: 60px 30px;
  }

  @media screen and (max-width: 520px) {
    min-height: 450px;
    padding: 40px 20px;
  }
`

export const Wrapper = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 48px 40px;
  background: var(--glass-surface-light);
  border: 1px solid var(--border-glass);
  border-radius: var(--radius-xl);
  -webkit-backdrop-filter: var(--blur-lg);
  backdrop-filter: var(--blur-lg);
  box-shadow: 0 12px 48px rgba(31, 38, 135, 0.15);

  @media screen and (max-width: 768px) {
    padding: 40px 32px;
  }

  @media screen and (max-width: 520px) {
    padding: 32px 24px;
  }

  > h1 {
    font-family: 'Moderat-Bold';
    font-size: 48px;
    line-height: 1.2;
    max-width: 680px;
    color: #1a202c;
    margin: 0 0 24px 0;
    letter-spacing: -1px;

    @media screen and (max-width: 768px) {
      font-size: 36px;
      max-width: 100%;
    }

    @media screen and (max-width: 520px) {
      font-size: 28px;
    }
  }

  > p {
    font-size: 18px;
    line-height: 28px;
    font-family: 'Moderat-Regular';
    margin: 0;
    max-width: 650px;
    color: #2d3748;

    @media screen and (max-width: 768px) {
      font-size: 17px;
      line-height: 26px;
      max-width: 100%;
    }

    @media screen and (max-width: 520px) {
      font-size: 16px;
      line-height: 24px;
    }
  }
`
