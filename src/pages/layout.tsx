import React, { useMemo } from 'react';

import { DocumentEvent } from '../event/documentEvent';
import { HomeDirectoryReplacer } from '../fileSystem/resolveFile';

import { MainPageContainer } from '../styles/container';
const { Container } = MainPageContainer;

import { Header } from '../components/header/header';
import { MainContent } from '../components/main/main';

export const Layout = () => {
    useMemo(async () => {
        const replacer = new HomeDirectoryReplacer();
        await DocumentEvent(replacer);
    }, []);
    return (
        <Container>
            <Header />
            <MainContent />
        </Container>
    );
};
