import { Link } from "react-router-dom";
import styled from "styled-components";

const Header = () => {
  return (
    <HeaderContainer>
      <Nav>
        <Logo to="/dashboard">Finance</Logo>
        <NavList>
          <NavItem>
            <NavLink to="/">Trang chủ</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/login">Đăng nhập</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/dashboard">Finance</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/category">Danh mục</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/transaction">Giao dịch</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/account-info">Tài khoản</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/settings">Cài đặt</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/report">Chi tiết thu chi</NavLink>
          </NavItem>
        </NavList>
      </Nav>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.header`
  background-color: #282c34;
  padding: 1rem 2rem;
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  color: white;
  font-size: 1.5rem;
  text-decoration: none;
  font-weight: bold;
`;

const NavList = styled.ul`
  display: flex;
  list-style: none;
  gap: 2rem;
`;

const NavItem = styled.li``;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

export default Header;