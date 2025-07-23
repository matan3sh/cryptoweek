import type { DropDownProps } from '@/types'
import type { FC } from 'react'
import {
  DropDownButton,
  DropDownContainer,
  DropDownLink,
  DropDownMenu,
  DropDownWrapper,
  ExitIcon,
  Icon,
} from './styles'

const DropDown: FC<DropDownProps> = ({ toggle, isOpen, data }) => {
  return (
    <DropDownContainer $isOpen={isOpen} onClick={toggle}>
      <Icon onClick={toggle}>
        <ExitIcon onClick={toggle} />
      </Icon>

      <DropDownWrapper>
        <DropDownMenu>
          {data.map((item, index) => (
            <DropDownLink
              key={`dropdown-${index}-${item.title}`}
              href={item.link}
            >
              {item.title}
            </DropDownLink>
          ))}
          <DropDownButton
            href="https://hopin.com/events/israel-crypto-week"
            target="_blank"
            rel="noopener noreferrer"
          >
            Get Early Access
          </DropDownButton>
        </DropDownMenu>
      </DropDownWrapper>
    </DropDownContainer>
  )
}

export default DropDown
