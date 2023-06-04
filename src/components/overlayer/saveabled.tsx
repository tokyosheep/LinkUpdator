import React, { FC } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { useAppSelector } from '../../redux/app/hooks';

export const overLayer = css`
    width: 100vw;
    height: 100vh;
    position: fixed;
    background: rgba(0,0,0,0.3);
    top: 0;
    left: 0;
`;

const OverLayerWrapper = styled.div<{isVisible: boolean}>`
    ${overLayer};
    background: #000;
    z-index: 30;
    display: ${props => props.isVisible ? 'block' : 'none'};
`;

const fading = keyframes`
    0%{
        opacity: 0.7;
    }
    50%{
        opacity: 1;
    }
    100%{
        opacity: 0.7;
    }
`;

const LoadedTitle = styled.span`
    color: #fff;
    font-size: 25px;
    font-weight: 300;
    display: block;
    position: absolute;
    top: 20%;
    left: 50%;
    transform: translateX(-50%);
    animation: ${fading} .6s linear infinite;
`;

export const SaveabledMonitor = () => {
    const flag = useAppSelector(state => state.overLayer.value);
    return (
        <OverLayerWrapper isVisible={flag}>
            <LoadedTitle>保存の有効化 saveabe document</LoadedTitle>
        </OverLayerWrapper>
    );
};
