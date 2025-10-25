import styled from 'styled-components'

export const Container = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  max-width: 1200px;
  width: 100%;
  gap: 40px;
  padding: 80px 40px;

  @media screen and (max-width: 1024px) {
    flex-direction: column;
    padding: 60px 30px;
    gap: 32px;
  }

  @media screen and (max-width: 520px) {
    padding: 40px 20px;
    gap: 24px;
  }

  img {
    flex: 1;
    max-width: 500px;
    width: 100%;
    object-fit: contain;
    border-radius: var(--radius-lg);
    border: 1px solid var(--border-glass);
    padding: 24px;
    background: var(--glass-surface-light);
    -webkit-backdrop-filter: var(--blur-md);
    backdrop-filter: var(--blur-md);
    box-shadow: 0 8px 32px rgba(31, 38, 135, 0.1);
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-8px);
      box-shadow: var(--glow-purple);
      border-color: var(--border-glass-strong);
    }

    @media screen and (max-width: 1024px) {
      max-width: 100%;
    }
  }

  div {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    padding: var(--space-xl);
    background: var(--glass-surface-light);
    border: 1px solid var(--border-glass);
    border-radius: var(--radius-xl);
    -webkit-backdrop-filter: var(--blur-lg);
    backdrop-filter: var(--blur-lg);
    box-shadow: 0 8px 32px rgba(31, 38, 135, 0.1);
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 12px 48px rgba(31, 38, 135, 0.15);
      border-color: var(--border-glass-strong);
    }

    @media screen and (max-width: 1024px) {
      align-items: center;
      text-align: center;
      padding: var(--space-lg);
    }

    @media screen and (max-width: 520px) {
      padding: var(--space-md);
    }

    h5 {
      font-family: 'Moderat-Bold';
      margin-bottom: 20px;
      font-size: 32px;
      color: #1a202c;
      letter-spacing: -0.5px;

      @media screen and (max-width: 1024px) {
        font-size: 28px;
      }

      @media screen and (max-width: 520px) {
        font-size: 24px;
      }
    }
  }
`
