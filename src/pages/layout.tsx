import React, { useMemo } from 'react';

import { DocumentEvent } from '../event/documentEvent';
import { HomeDirectoryReplacer } from '../fileSystem/resolveFile';

import { MainPageContainer } from '../styles/container';
const { Container } = MainPageContainer;

import { Header } from '../components/header/header';
import { MainContent } from '../components/main/main';
import { useAppDispatch } from '../redux/app/hooks';
import { setOverLayer } from '../redux/features/overlayer/overLayerSlice';

export const Layout = () => {
    const dispatch = useAppDispatch();
    const visibleOverLayer = (flag:boolean) => dispatch(setOverLayer(flag));
    useMemo(async () => {
        const replacer = new HomeDirectoryReplacer();
        await DocumentEvent(replacer, visibleOverLayer);
    }, []);
    return (
        <Container>
            <Header />
            <MainContent />
        </Container>
    );
};
