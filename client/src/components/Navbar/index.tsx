// REACT
import { useState } from 'react';

// STYLED COMPONENTS
import { Logo } from './styles/Logo';
import { Container, NavList, StyledNavLink, MenuBtn } from './styles/Navbar';
import Sidenav from './components/Sidenav';

const Navbar = () => {
  const [openSidenav, setOpenSidenav] = useState(false);

  return (
    <Container>
      <Logo>recreo</Logo>
      <NavList>
        <StyledNavLink to="/login">Login</StyledNavLink>
        <StyledNavLink to="/register">Register</StyledNavLink>

        <StyledNavLink to="/logout">Logout</StyledNavLink>

        <StyledNavLink to="/playgrounds">Playgrounds</StyledNavLink>
        <StyledNavLink to="/playgrounds/new">New Playground</StyledNavLink>
      </NavList>

      <MenuBtn onClick={() => setOpenSidenav(!openSidenav)} />
      {openSidenav && <Sidenav />}
    </Container>
  );
};

export default Navbar;