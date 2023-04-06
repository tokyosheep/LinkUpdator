import React from 'react';
import styled from 'styled-components';

import { MainPageContainer } from '../../styles/container';
const { HeaderContainer } = MainPageContainer;

const Title = styled.h1`
    color: #fff;
    font-size: 20px;
`;

export const Header = () => {
    return (
        <HeaderContainer>
            <Title>Link updator</Title>
        </HeaderContainer>
    )
}