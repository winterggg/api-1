import styled from 'styled-components';
import logo from '../img/logo.svg';
import { gql, useQuery } from '@apollo/client';
import ButtonAsLink from './ButtonAsLink';
import { useNavigate } from 'react-router-dom';

const HeaderBar = styled.header`
  width: 100%;
  padding: 0.5em 1em;
  display: flex;
  height: 64px;
  position: fixed;
  align-items: center;
  background-color: #fff;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.25);
  z-index: 1;
`;

const LogoText = styled.h1`
  margin: 0;
  padding: 0;
  display: inline;
`;

const UserState = styled.div`
  margin-left: auto;
`;

const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;

interface HeaderProps {
    title?: string;
}

const Header = ({ title = 'Notedly' }: HeaderProps) => {
    const { data, client } = useQuery(IS_LOGGED_IN);

    const navigate = useNavigate();

    return (
        <HeaderBar>
            <img src={logo} alt="logo" height="40" />
            <LogoText>{ title }</LogoText>
            <UserState>
              { 
                data.isLoggedIn ? (<ButtonAsLink // todo: check data is undefined
                  onClick={async () => {
                    localStorage.removeItem('token');
                    await client.resetStore(); // todo: check if this is needed
                    navigate('/');
                  }}
                >Log Out</ButtonAsLink>) : (<p>
                  <a href="/signin">Sign In</a> or <a href="/signup">Sign Up</a>
                </p>)
              }
            </UserState>
        </HeaderBar>
    )
}

export default Header;