import styled from 'styled-components'

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 80px auto 0;
  padding: 40px;
  gap: 12px;
  max-width: 1200px;
  width: 100%;
  background: var(--glass-surface-light);
  border-top: 1px solid var(--border-glass);
  -webkit-backdrop-filter: var(--blur-lg);
  backdrop-filter: var(--blur-lg);
  border-radius: var(--radius-lg) var(--radius-lg) 0 0;
  box-shadow: 0 -4px 24px rgba(31, 38, 135, 0.08);

  @media screen and (max-width: 768px) {
    margin-top: 60px;
    padding: 32px 20px;
  }

  @media screen and (max-width: 520px) {
    margin-top: 40px;
    padding: 24px 16px;
    gap: 8px;
  }

  > h2 {
    text-transform: capitalize;
    font-size: 15px;
    font-weight: 500;
    color: #1a202c;
    font-family: 'Moderat-Medium';

    @media screen and (max-width: 420px) {
      font-size: 14px;
    }
  }

  h3 {
    font-size: 14px;
    font-weight: 400;
    color: #4a5568;
    font-family: 'Moderat-Regular';

    @media screen and (max-width: 420px) {
      font-size: 13px;
    }
  }
`
