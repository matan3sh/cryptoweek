import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  flex-direction: column;
  background: ${props => props.theme.colors.bgWhite};
  padding: 100px ${props => props.theme.spacing.lg};
  max-width: 1200px;
  width: 100%;
  position: relative;

  > h1 {
    font-family: ${props => props.theme.fonts.bold};
    color: ${props => props.theme.colors.textPrimary};
    font-size: ${props => props.theme.fontSizes['5xl']};
    margin-bottom: 56px;
    font-weight: ${props => props.theme.fontWeights.bold};
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
  place-items: center;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  width: 100%;
  gap: 32px;

  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 24px;
  }

  @media screen and (max-width: 475px) {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 20px;
  }

  > img {
    width: 100%;
    max-width: 220px;
    padding: 40px;
    min-height: 160px;
    object-fit: contain;
    background: linear-gradient(135deg,
      rgba(255, 255, 255, 0.75) 0%,
      rgba(255, 255, 255, 0.65) 100%);
    border: 1.5px solid rgba(255, 255, 255, 0.4);
    border-radius: var(--radius-xl);
    -webkit-backdrop-filter: var(--blur-lg);
    backdrop-filter: var(--blur-lg);
    filter: grayscale(0%);
    opacity: 1;

    @media screen and (max-width: 768px) {
      padding: 32px;
      min-height: 120px;
      max-width: 180px;
    }

    @media screen and (max-width: 475px) {
      padding: 24px;
      min-height: 100px;
      max-width: 150px;
    }
  }
`
