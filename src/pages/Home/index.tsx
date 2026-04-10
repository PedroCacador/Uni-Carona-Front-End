import React from 'react';
import { Header } from '../../components/Header';
import { HomeContainer, ContentArea, WelcomeTitle } from './styles';

export const Home: React.FC = () => {
  return (
    <HomeContainer>
      <Header />
      <ContentArea>
        <WelcomeTitle>Bem-vindo ao UniCarona</WelcomeTitle>
      </ContentArea>
    </HomeContainer>
  );
};
