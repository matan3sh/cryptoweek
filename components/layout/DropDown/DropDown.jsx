import {
  DropDownContainer,
  Icon,
  ExitIcon,
  DropDownWrapper,
  DropDownMenu,
  DropDownLink,
  DropDownButton,
} from './styles';

const DropDown = ({ toggle, isOpen, data }) => {
  return (
    <DropDownContainer isOpen={isOpen} onClick={toggle}>
      <Icon onClick={toggle}>
        <ExitIcon onClick={toggle} />
      </Icon>

      <DropDownWrapper>
        <DropDownMenu>
          {data.map((item, index) => (
            <DropDownLink href={item.link} key={index}>
              {item.title}
            </DropDownLink>
          ))}
          <DropDownButton
            href='https://hopin.com/events/israel-crypto-week'
            target='_blank'
            rel='noopener noreferrer'>
            <span>Get Early Access</span>
          </DropDownButton>
        </DropDownMenu>
      </DropDownWrapper>
    </DropDownContainer>
  );
};

export default DropDown;
