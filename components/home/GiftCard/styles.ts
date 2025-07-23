import styled from 'styled-components'

export const Container = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2rem auto;
  width: 70%;
  gap: 25px;
  @media screen and (max-width: 1195px) {
    flex-direction: column;
    justify-content: center;
  }
  img {
    width: 580px;
    object-fit: contain;
    border-radius: 10px;
    transition: box-shadow 0.4s cubic-bezier(0.4, 0, 0.2, 1),
      transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 2px 16px 0 rgba(171, 78, 136, 0.1);
    &:hover {
      transform: scale(1.04) rotate(-2deg);
      box-shadow: 0 8px 32px 0 rgba(171, 78, 136, 0.18);
    }
    @media screen and (max-width: 1290px) {
      width: 460px;
    }
    @media screen and (max-width: 1195px) {
      width: 100%;
    }
  }
  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: auto;
    text-align: center;
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1),
      box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    &:hover {
      transform: scale(1.03);
      box-shadow: 0 4px 32px 0 rgba(171, 78, 136, 0.1);
    }
    h5 {
      font-family: 'Moderat-Bold';
      margin-bottom: 2rem;
      font-size: 34px;
      @media screen and (max-width: 1195px) {
        font-size: 24px;
      }
    }
  }
`
