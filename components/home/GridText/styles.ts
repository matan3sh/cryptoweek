import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto;
  background: #fff;
  padding: 0 20px;

  > h1 {
    font-family: 'Moderat-Bold';
    color: #2f154a;
    margin-top: 5rem;
    font-size: 50px;
    margin-bottom: 3rem;
    font-weight: 900;
    text-align: center;

    @media screen and (max-width: 768px) {
      font-size: 8vw;
      margin-top: 3rem;
      margin-bottom: 2rem;
    }

    @media screen and (max-width: 475px) {
      font-size: 9vw;
      margin-bottom: 1.5rem;
    }
  }
`

export const List = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  place-items: center;
  max-width: 1200px;
  width: 100%;
  padding: 0 1rem;
  margin-bottom: 4rem;

  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 1.5rem;
    margin-bottom: 3rem;
  }

  @media screen and (max-width: 575px) {
    grid-template-columns: 1fr;
    gap: 1.25rem;
    margin-bottom: 2rem;
  }

  > div {
    width: 100%;
    max-width: 280px;
    text-align: center;
    background: #fff;
    border-radius: 16px;
    padding: 24px;
    border: 1px solid rgba(0, 0, 0, 0.04);

    @media screen and (max-width: 768px) {
      max-width: 240px;
      padding: 20px;
      border-radius: 12px;
    }

    @media screen and (max-width: 575px) {
      max-width: 100%;
      padding: 16px;
      border-radius: 8px;
    }

    > img {
      width: 100%;
      max-width: 180px;
      height: 180px;
      object-fit: cover;
      border-radius: 12px;
      margin-bottom: 16px;

      @media screen and (max-width: 768px) {
        max-width: 160px;
        height: 160px;
        border-radius: 8px;
        margin-bottom: 12px;
      }

      @media screen and (max-width: 575px) {
        max-width: 140px;
        height: 140px;
        margin-bottom: 8px;
      }
    }

    > h2 {
      font-size: 18px;
      font-weight: 600;
      margin: 12px 0 8px 0;
      color: #1a202c;
      line-height: 1.3;

      @media screen and (max-width: 768px) {
        font-size: 16px;
        margin: 10px 0 6px 0;
      }

      @media screen and (max-width: 575px) {
        font-size: 15px;
        margin: 8px 0 4px 0;
      }
    }

    > h3 {
      font-size: 14px;
      color: #718096;
      line-height: 1.4;
      font-weight: 400;
      margin: 0;

      @media screen and (max-width: 768px) {
        font-size: 13px;
      }

      @media screen and (max-width: 575px) {
        font-size: 12px;
        line-height: 1.3;
      }
    }
  }
`
