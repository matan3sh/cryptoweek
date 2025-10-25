import { getSiteSettings } from '@/lib/content/static'
import type { NavigationLink } from '@/lib/content/interfaces'
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

interface DropDownProps {
  toggle: () => void
  isOpen: boolean
  data: NavigationLink[]
}

const DropDown: FC<DropDownProps> = ({ toggle, isOpen, data }) => {
  const settings = getSiteSettings()

  return (
    <DropDownContainer
      $isOpen={isOpen}
      onClick={toggle}
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation menu"
    >
      <Icon onClick={toggle}>
        <ExitIcon
          onClick={toggle}
          role="button"
          aria-label="Close navigation menu"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              toggle()
            }
          }}
        />
      </Icon>

      <DropDownWrapper>
        <DropDownMenu
          id="mobile-navigation"
          role="navigation"
          aria-label="Mobile menu"
        >
          {data.map((item, index) => (
            <DropDownLink
              key={`dropdown-${index}-${item.title}`}
              href={item.url}
            >
              {item.title}
            </DropDownLink>
          ))}
          <DropDownButton
            href={settings.primaryCta.url}
            target={settings.primaryCta.openInNewTab ? '_blank' : undefined}
            rel={settings.primaryCta.openInNewTab ? 'noopener noreferrer' : undefined}
          >
            {settings.primaryCta.text}
          </DropDownButton>
        </DropDownMenu>
      </DropDownWrapper>
    </DropDownContainer>
  )
}

export default DropDown
