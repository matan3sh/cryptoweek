import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  flex-direction: column;
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
      padding-top: 25px;
      margin-bottom: 1.5rem;
    }
  }
`

export const List = styled.div`
  display: grid;
  place-items: center;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  max-width: 1200px;
  width: 100%;
  gap: 2rem;
  margin-bottom: 4rem;
  padding: 0 1rem;

  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.5rem;
    margin-bottom: 3rem;
  }

  @media screen and (max-width: 475px) {
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
    gap: 1rem;
    margin-bottom: 2rem;
  }

  > img {
    width: 100%;
    max-width: 200px;
    padding: 24px;
    min-height: 140px;
    object-fit: contain;
    background: #fff;
    border-radius: 12px;
    border: 1px solid rgba(0, 0, 0, 0.04);

    @media screen and (max-width: 768px) {
      padding: 20px;
      min-height: 120px;
      border-radius: 8px;
    }

    @media screen and (max-width: 475px) {
      padding: 16px;
      min-height: 100px;
      max-width: 100%;
    }
  }
`
