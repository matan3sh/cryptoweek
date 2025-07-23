import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto;
  background: linear-gradient(304.49deg, #001443 45.38%, #000a2c 82.48%);

  > h1 {
    font-family: 'CircularStd-Bold';
    margin-top: 5rem;
    font-size: 50px;
    margin-bottom: 1.5rem;
    font-weight: 900;
    @media screen and (max-width: 475px) {
      font-size: 10.6041666666666665vw;
    }
  }
`

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`

export const Row = styled.form`
  display: flex;
  gap: 25px;

  input {
    background: linear-gradient(304.49deg, #001443 45.38%, #000a2c 82.48%);
    border: 1px #fff solid;
    border-radius: 6px;
    padding: 7.5px 15px;
    color: #fff;
    transition: box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1),
      border-color 0.3s cubic-bezier(0.4, 0, 0.2, 1),
      background 0.3s cubic-bezier(0.4, 0, 0.2, 1),
      transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 0 0 0 rgba(171, 78, 136, 0.3);
    &::placeholder {
      color: #fff;
    }
    &:focus {
      outline: none;
      border-color: #ab4e88;
      box-shadow: 0 0 0 3px rgba(171, 78, 136, 0.2);
      background: linear-gradient(304.49deg, #1a1a3c 45.38%, #1a1a2c 82.48%);
      transform: scale(1.03);
    }
  }

  textarea {
    font-family: 'CircularStd-Regular', sans-serif !important;
    color: #fff;
    width: 100%;
    background: linear-gradient(304.49deg, #001443 45.38%, #000a2c 82.48%);
    border: 1px #fff solid;
    border-radius: 6px;
    padding: 7.5px 15px;
    transition: box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1),
      border-color 0.3s cubic-bezier(0.4, 0, 0.2, 1),
      background 0.3s cubic-bezier(0.4, 0, 0.2, 1),
      transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 0 0 0 rgba(171, 78, 136, 0.3);
    &::placeholder {
      font-family: 'CircularStd-Regular', sans-serif !important;
      color: #fff;
    }
    &:focus {
      outline: none;
      border-color: #ab4e88;
      box-shadow: 0 0 0 3px rgba(171, 78, 136, 0.2);
      background: linear-gradient(304.49deg, #1a1a3c 45.38%, #1a1a2c 82.48%);
      transform: scale(1.03);
    }
  }

  .button {
    margin-left: auto;
    color: #fff;
    border: none;
    background: linear-gradient(120deg, #ab4e88, #ce8f6b);
    padding: 15px 20px;
    border-radius: 35px;
    font-size: 14px;
    transition: background 0.3s cubic-bezier(0.4, 0, 0.2, 1),
      transform 0.2s cubic-bezier(0.4, 0, 0.2, 1),
      box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 2px 16px 0 rgba(171, 78, 136, 0.12);
    @media screen and (max-width: 400px) {
      font-size: 12px;
    }
    &:hover {
      cursor: pointer;
      transform: translateY(-4px) scale(1.05);
      background: linear-gradient(120deg, #ce8f6b, #ab4e88);
      box-shadow: 0 4px 32px 0 rgba(171, 78, 136, 0.18);
    }
  }
`

export const Success = styled.span`
  margin-top: 5px;
  font-size: 12px;
`
