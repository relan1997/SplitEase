import React from 'react';
import { Link } from 'react-router-dom';
import styled, { createGlobalStyle, keyframes } from 'styled-components';
import "./Home.css"

// Preconnect and Font Import
const FontPreconnect = () => (
  <>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
    <link href="https://fonts.googleapis.com/css2?family=Agu+Display&family=Inter:wght@100..900&family=Josefin+Sans:ital,wght@0,100..700;1,100..700&display=swap" rel="stylesheet" />
    <link href="https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@500&display=swap" rel="stylesheet" />
  </>
);

// Global Styles
const GlobalStyle = createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
`;

// Keyframes for the moving gradient background
const gradientAnimation = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

// Styled components
const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background: linear-gradient(270deg, #16423C, #6A9C89);
  background-size: 400% 400%;
  animation: ${gradientAnimation} 15s ease infinite;
  font-family: 'Inter', sans-serif;
  color: #E9EFEC;
`;

const Title = styled.h1`
  font-size: 6rem;
  margin-bottom: 1rem;
  color: #C4DAD2;
  font-family: 'Agu Display', sans-serif;
`;

const Description = styled.p`
  font-size: 1.5rem;
  text-align: center;
  color: #E9EFEC;
  margin-bottom: 2rem;
  max-width: 800px;
  font-family: 'Noto Serif JP', serif;
`;

const StyledButton = styled(Link)`
  text-decoration: none;
  padding: 0.75rem 1.5rem;
  margin: 0.5rem;
  background-color: #6A9C89;
  color: #E9EFEC;
  font-size: 1.2rem;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: #16423C;
    transform: scale(1.05);
  }
`;

const Home = () => {
  return (
    <>
      <GlobalStyle />
      <FontPreconnect />
      <PageWrapper>
        <Title>SplitEase</Title>
        <Description>
          SplitEase simplifies group payments, making it effortless to divide expenses and manage contributions. 
          Say goodbye to the hassle of manual calculations and embrace a seamless solution for shared costs. 
          Join us in transforming how you handle group finances with elegance and ease.
        </Description>
        <StyledButton to="/login">Login</StyledButton>
        <StyledButton to="/register">Register</StyledButton>
      </PageWrapper>
    </>
  );
};

export default Home;
