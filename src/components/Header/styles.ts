import styled from 'styled-components';

export const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
  padding: 0 48px;
  background-color: #ffffff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
`;

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

export const LogoText = styled.h1`
  font-size: 24px;
  font-weight: 700;
  color: #2563eb;
  margin: 0;
  letter-spacing: -0.5px;
`;

export const CenterNav = styled.nav`
  display: flex;
  align-items: center;
`;

export const NavLink = styled.a`
  font-size: 16px;
  font-weight: 500;
  color: #4b5563; /* cinza escuro neutro */
  text-decoration: none;
  cursor: pointer;
  transition: color 0.2s ease-in-out;

  &:hover {
    color: #2563eb;
  }
`;

export const RightActions = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  justify-content: center;
`;

export const IconButton = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #6b7280;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s ease-in-out;

  &:hover {
    color: #1f2937;
  }
`;

export const PrimaryButton = styled.button`
  background-color: #2563eb;
  color: #ffffff;
  border: none;
  border-radius: 24px;
  padding: 10px 24px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: #1d4ed8; /* tom mais escuro */
  }
`;

export const ProfileIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #f3f4f6; /* cinza super claro */
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: #4b5563;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  
  &:hover {
    background-color: #e5e7eb;
  }
`;
