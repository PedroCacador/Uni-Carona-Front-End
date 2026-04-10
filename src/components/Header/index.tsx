import React from 'react';
import { FiSearch, FiHelpCircle, FiUser } from 'react-icons/fi';
import {
  HeaderContainer,
  LogoContainer,
  LogoText,
  CenterNav,
  NavLink,
  RightActions,
  IconButton,
  PrimaryButton,
  ProfileIcon
} from './styles';

export const Header: React.FC = () => {
  return (
    <HeaderContainer>
      <LogoContainer>
        <LogoText>UniCarona</LogoText>
      </LogoContainer>

      <CenterNav>
        <NavLink>Caronas</NavLink>
      </CenterNav>

      <RightActions>
        <IconButton title="Buscar">
          <FiSearch />
        </IconButton>
        <IconButton title="Ajuda">
          <FiHelpCircle />
        </IconButton>
        <PrimaryButton>Oferecer carona</PrimaryButton>
        <ProfileIcon title="Perfil">
          <FiUser />
        </ProfileIcon>
      </RightActions>
    </HeaderContainer>
  );
};
