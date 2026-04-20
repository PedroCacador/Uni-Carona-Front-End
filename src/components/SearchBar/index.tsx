import React from 'react';
import { Link } from 'react-router-dom';
import { FiMapPin, FiCalendar, FiUsers, FiSearch } from 'react-icons/fi';
import {
  SearchBarContainer,
  SearchField,
  InputGroup,
  Label,
  Input,
  SearchButton,
} from './styles';

export const SearchBar: React.FC = () => {
  return (
    <SearchBarContainer>
      <SearchField>
        <FiMapPin />
        <InputGroup>
          <Label>Origem</Label>
          <Input type="text" placeholder="De onde?" />
        </InputGroup>
      </SearchField>

      <SearchField>
        <FiMapPin />
        <InputGroup>
          <Label>Destino</Label>
          <Input type="text" placeholder="Para onde?" />
        </InputGroup>
      </SearchField>

      <SearchField>
        <FiCalendar />
        <InputGroup>
          <Label>Data</Label>
          <Input type="text" placeholder="Quando?" />
        </InputGroup>
      </SearchField>

      <SearchField>
        <FiUsers />
        <InputGroup>
          <Label>Vagas</Label>
          <Input type="number" min="1" placeholder="Quantas?" />
        </InputGroup>
      </SearchField>

      <Link to="/caronas" style={{ textDecoration: 'none' }}>
        <SearchButton type="button">
          <FiSearch />
          Procurar
        </SearchButton>
      </Link>
    </SearchBarContainer>
  );
};
