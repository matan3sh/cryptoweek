import styled from 'styled-components';

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto;
  height: 10vh;
  gap: 5px;
  background: linear-gradient(304.49deg, #001443 45.38%, #000a2c 82.48%);

  > h2 {
    text-transform: capitalize;
    font-size: 16px;
    @media screen and (max-width: 420px) {
      font-size: 13px;
    }
  }
  h3 {
    font-size: 16px;
    font-weight: 300 !important;
  }
`;
