import React from 'react';
import { Link } from 'react-router-dom';
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
        <Link to="/login" style={{ textDecoration: 'none' }}>
          <PrimaryButton>Entrar</PrimaryButton>
        </Link>
        <Link to="/cadastro" style={{ textDecoration: 'none' }}>
          <PrimaryButton>Oferecer carona</PrimaryButton>
        </Link>
        <ProfileIcon title="Perfil">
          <FiUser />
        </ProfileIcon>
      </RightActions>
    </HeaderContainer>
  );
};
