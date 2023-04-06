import React, { useMemo } from 'react';

import { DocumentEvent } from '../event/documentEvent';

import { MainPageContainer } from '../styles/container';
const { Container } = MainPageContainer;

import { Header } from '../components/header/header';
import { MainContent } from '../components/main/main';

export const Layout = () => {
    useMemo(() => {
        DocumentEvent();
    }, []);
    return (
        <Container>
            <Header />
            <MainContent />
        </Container>
    );
};
