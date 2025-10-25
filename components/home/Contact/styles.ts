import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  max-width: 1200px;
  width: 100%;
  padding: 80px 40px;
  background: #ffffff;

  > h1 {
    font-family: 'Moderat-Bold';
    font-size: 48px;
    margin-bottom: 48px;
    font-weight: 900;
    color: #1a202c;
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

export const Wrapper = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  max-width: 600px;
  padding: var(--space-xl);
  background: var(--glass-surface-light);
  border: 1px solid var(--border-glass);
  border-radius: var(--radius-xl);
  box-shadow: 0 8px 32px rgba(31, 38, 135, 0.1);
  -webkit-backdrop-filter: var(--blur-lg);
  backdrop-filter: var(--blur-lg);

  @media screen and (max-width: 768px) {
    padding: var(--space-lg);
    gap: 16px;
  }

  @media screen and (max-width: 520px) {
    padding: var(--space-md);
    gap: 12px;
  }
`

export const Row = styled.div`
  display: flex;
  gap: 20px;

  @media screen and (max-width: 520px) {
    flex-direction: column;
    gap: 12px;
  }

  input {
    font-family: 'Moderat-Regular', sans-serif;
    width: 100%;
    background: rgba(255, 255, 255, 0.6);
    border: 1.5px solid rgba(102, 126, 234, 0.2);
    border-radius: var(--radius-sm);
    padding: 14px 18px;
    color: #1a202c;
    font-size: 15px;
    transition: all 0.3s ease;
    -webkit-backdrop-filter: var(--blur-sm);
    backdrop-filter: var(--blur-sm);

    &::placeholder {
      color: #718096;
    }

    &:focus {
      outline: none;
      border-color: #667eea;
      border-width: 2px;
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
      background: rgba(255, 255, 255, 0.8);
    }
  }

  textarea {
    font-family: 'Moderat-Regular', sans-serif;
    color: #1a202c;
    width: 100%;
    background: rgba(255, 255, 255, 0.6);
    border: 1.5px solid rgba(102, 126, 234, 0.2);
    border-radius: var(--radius-sm);
    padding: 14px 18px;
    font-size: 15px;
    min-height: 120px;
    resize: vertical;
    transition: all 0.3s ease;
    -webkit-backdrop-filter: var(--blur-sm);
    backdrop-filter: var(--blur-sm);

    &::placeholder {
      font-family: 'Moderat-Regular', sans-serif;
      color: #718096;
    }

    &:focus {
      outline: none;
      border-color: #667eea;
      border-width: 2px;
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
      background: rgba(255, 255, 255, 0.8);
    }
  }

  .button {
    margin-left: auto;
    color: #fff;
    border: 1px solid var(--border-glass);
    background: var(--bg-gradient-secondary);
    padding: 14px 32px;
    border-radius: var(--radius-sm);
    font-size: 16px;
    font-weight: 600;
    font-family: 'Moderat-Medium';
    transition: all 0.3s ease;
    box-shadow: var(--glow-purple);
    -webkit-backdrop-filter: var(--blur-sm);
    backdrop-filter: var(--blur-sm);

    @media screen and (max-width: 520px) {
      width: 100%;
      margin-left: 0;
      font-size: 15px;
    }

    &:hover {
      cursor: pointer;
      transform: translateY(-2px);
      background: linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%);
      box-shadow: var(--glow-purple-strong);
    }

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
      transform: none;
    }
  }
`

export const Success = styled.span`
  margin-top: 8px;
  font-size: 14px;
  color: #48bb78;
  font-weight: 500;
  text-align: center;
`
