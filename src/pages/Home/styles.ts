import styled from 'styled-components';

export const HomeContainer = styled.main`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f5f6fa;
`;

export const ContentArea = styled.section`
  flex: 1;
  padding: 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const WelcomeTitle = styled.h2`
  font-size: 28px;
  color: #2c3e50;
  margin-top: 40px;
`;

export const SubTitle = styled.p`
  font-size: 16px;
  color: #7f8c8d;
  margin-top: 12px;
`;
