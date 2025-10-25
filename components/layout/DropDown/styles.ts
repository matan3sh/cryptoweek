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
  background: rgba(255, 255, 255, 0.95);
  -webkit-backdrop-filter: var(--blur-xl);
  backdrop-filter: var(--blur-xl);
  box-shadow: var(--shadow-glass-md);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  transition: all 0.3s ease;
  opacity: ${({ $isOpen }) => ($isOpen ? '1' : '0')};
  top: ${({ $isOpen }) => ($isOpen ? '0' : '-100%')};
`

export const Icon = styled.div`
  position: absolute;
  top: 28px;
  right: 40px;
  font-size: 1.5rem;
  cursor: pointer;
  outline: none;
  padding: 12px;
  border-radius: var(--radius-full);
  background: var(--glass-surface-light);
  border: 1px solid var(--border-glass);
  transition: all 0.3s ease;
  box-shadow: 0 4px 16px rgba(31, 38, 135, 0.1);

  &:hover {
    box-shadow: var(--glow-purple);
    background: var(--glass-white-strong);
    transform: rotate(90deg);
  }

  > svg {
    color: #1a202c;
  }

  @media screen and (max-width: 768px) {
    top: 20px;
    right: 20px;
  }

  @media screen and (max-width: 480px) {
    top: 16px;
    right: 12px;
    padding: 10px;
  }
`

export const ExitIcon = styled(CloseIcon)`
  color: #1a202c !important;
`

export const DropDownWrapper = styled.div`
  color: #1a202c;
`

export const DropDownMenu = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  text-align: center;
  font-size: 1.1rem;
  font-weight: 500;
  max-width: 400px;
  width: 90%;
  padding: var(--space-lg);
  border: 1px solid var(--border-glass);
  border-radius: var(--radius-lg);
  background: var(--glass-surface-light);
  box-shadow: 0 8px 32px rgba(31, 38, 135, 0.15);

  @media screen and (max-width: 480px) {
    max-width: 90%;
    padding: var(--space-md);
    gap: 12px;
  }
`

export const DropDownLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  list-style: none;
  color: #1a202c;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 16px 24px;
  border-radius: var(--radius-sm);
  background: rgba(255, 255, 255, 0.4);
  border: 1px solid var(--border-glass);
  font-weight: 500;
  font-size: 16px;

  &:hover {
    color: #667eea;
    background: var(--glass-white-medium);
    border-color: var(--border-glass-strong);
    box-shadow: var(--glow-purple);
    transform: translateY(-2px);
  }

  @media screen and (max-width: 480px) {
    padding: 14px 20px;
    font-size: 15px;
  }
`

export const DropDownButton = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 16px 24px;
  margin-top: 8px;
  border-radius: var(--radius-sm);
  font-weight: 600;
  background: var(--bg-gradient-secondary);
  color: white;
  border: 1px solid var(--border-glass);
  cursor: pointer;
  text-decoration: none;
  transition: all 0.3s ease;
  font-size: 16px;
  box-shadow: var(--glow-purple);
  -webkit-backdrop-filter: var(--blur-sm);
  backdrop-filter: var(--blur-sm);

  &:hover {
    background: linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%);
    transform: translateY(-2px);
    box-shadow: var(--glow-purple-strong);
  }

  @media screen and (max-width: 480px) {
    padding: 14px 20px;
    font-size: 15px;
  }
`
