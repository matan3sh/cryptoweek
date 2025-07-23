import { CloseIcon } from '@/components/icons'
import styled from 'styled-components'

interface DropDownContainerProps {
  $isOpen: boolean
}

export const DropDownContainer = styled.div<DropDownContainerProps>`
  position: fixed;
  z-index: 101;
  width: 100%;
  height: 100%;
  background: #fff;
  display: grid;
  align-items: center;
  top: 0;
  left: 0;
  transition: 0.3s ease-in-out;
  opacity: ${({ $isOpen }) => ($isOpen ? '1' : '0')};
  top: ${({ $isOpen }) => ($isOpen ? '0' : '-100%')};
`

export const Icon = styled.div`
  position: absolute;
  top: 1.5rem;
  right: 1rem;
  font-size: 2rem;
  cursor: pointer;
  outline: none;
  > svg {
    color: #333;
  }
`

export const ExitIcon = styled(CloseIcon)`
  color: #333 !important;
`

export const DropDownWrapper = styled.div`
  color: #333;
`

export const DropDownMenu = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(2, 80px);
  text-align: center;
  margin-bottom: 4rem;
  font-size: 1.3rem;
  font-weight: 500;

  @media screen and (max-width: 480px) {
    grid-template-rows: repeat(2, 60px);
  }
`

export const DropDownLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  list-style: none;
  color: #333;
  cursor: pointer;
  transition: 0.4s ease-in-out;
  padding: 8px 16px;
  border-radius: 6px;
  margin: 0 20px;

  &:hover {
    color: #667eea;
    background: rgba(102, 126, 234, 0.1);
  }
`

export const DropDownButton = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 240px;
  height: 48px;
  margin: 0 auto;
  border-radius: 8px;
  font-weight: 500;
  background: #667eea;
  color: white;
  border: none;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.3s ease-in-out;
  font-size: 14px;

  &:hover {
    background: #5a67d8;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
  }
`
