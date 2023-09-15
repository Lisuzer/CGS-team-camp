import styled from 'styled-components';

export const HeaderWrapper = styled.header`
  background-color: #333;
  color: white;
  padding: 10px 0;
`;

export const Nav = styled.nav`
  ul {
    list-style: none;
    padding: 0;
    display: flex;
    justify-content: space-around;
  }

  li {
    margin: 0;
  }

  a {
    text-decoration: none;
    color: white;

    &:hover {
      text-decoration: underline;
    }
  }
`;
