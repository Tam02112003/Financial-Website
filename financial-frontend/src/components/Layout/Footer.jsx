import styled from "styled-components";

const Footer = () => {
  return (
    <FooterContainer>
      <p>© 2025 FinanceTracker. All rights reserved.</p>
      <SocialLinks>
        <a href="#">Facebook</a>
        <a href="#">Twitter</a>
        <a href="#">Instagram</a>
      </SocialLinks>
    </FooterContainer>
  );
};

const FooterContainer = styled.footer`
  background-color: #282c34;
  color: white;
  padding: 2rem;
  text-align: center;
  margin-top: auto;
`;

const SocialLinks = styled.div`
  margin-top: 1rem;
  a {
    color: white;
    margin: 0 0.5rem;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

export default Footer;