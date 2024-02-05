import { IconType } from 'react-icons';
import styled from 'styled-components';

const StyledIcon = styled.span<{ disabled?: boolean }>`
  opacity: ${props => (props.disabled ? 0.5 : 1)};
  pointer-events: ${props => (props.disabled ? 'none' : 'auto')};
`;

interface IconProps {
  icon: IconType;
  onClick: () => void;
  disabled?: boolean;
}
/** icon에 disabled 속성 넣어주기 위해서 */
const Icon = ({
  icon: IconComponent,
  onClick,
  disabled = false,
}: IconProps) => {
  return (
    <StyledIcon disabled={disabled} onClick={onClick}>
      <IconComponent />
    </StyledIcon>
  );
};
export default Icon;
