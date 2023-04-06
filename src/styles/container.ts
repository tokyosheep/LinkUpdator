import styled from 'styled-components';

export const MainPageContainer = {
    Container: styled.div`
        display: grid;
        grid-template-rows: 50px 1fr;
        grid-template-columns: 100%;
        grid-template-areas: 
        'header'
        'main';
    `,
    HeaderContainer: styled.header`
        grid-area: header;
    `,
    MainContainer: styled.main`
        grid-area: main;
    `
}