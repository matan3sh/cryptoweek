import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  flex-direction: column;
  background: #fff;
  padding: 80px 40px;
  max-width: 1200px;
  width: 100%;

  > h1 {
    font-family: 'Moderat-Bold';
    color: #1a202c;
    font-size: 48px;
    margin-bottom: 48px;
    font-weight: 900;
    text-align: center;
    letter-spacing: -1px;

    @media screen and (max-width: 768px) {
      font-size: 36px;
      margin-bottom: 32px;
    }

    @media screen and (max-width: 475px) {
      font-size: 28px;
      margin-bottom: 24px;
    }
  }

  @media screen and (max-width: 860px) {
    padding: 60px 30px;
  }

  @media screen and (max-width: 520px) {
    padding: 40px 20px;
  }
`

export const List = styled.div`
  display: grid;
  place-items: center;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  width: 100%;
  gap: 24px;

  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
    gap: 20px;
  }

  @media screen and (max-width: 475px) {
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    gap: 16px;
  }

  > img {
    width: 100%;
    max-width: 200px;
    padding: 32px;
    min-height: 140px;
    object-fit: contain;
    background: var(--glass-surface-light);
    border: 1px solid var(--border-glass);
    border-radius: var(--radius-lg);
    -webkit-backdrop-filter: var(--blur-md);
    backdrop-filter: var(--blur-md);
    box-shadow: 0 4px 16px rgba(31, 38, 135, 0.08);
    transition: all 0.3s ease;
    filter: grayscale(10%);
    opacity: 0.9;

    &:hover {
      transform: translateY(-8px);
      box-shadow: var(--glow-purple);
      border-color: var(--border-glass-strong);
      filter: grayscale(0%);
      opacity: 1;
    }

    @media screen and (max-width: 768px) {
      padding: 24px;
      min-height: 100px;
      max-width: 160px;
    }

    @media screen and (max-width: 475px) {
      padding: 16px;
      min-height: 80px;
      max-width: 140px;
    }
  }
`
