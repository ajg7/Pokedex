import styled from "styled-components";


export const StyledLandingPage = styled.div`
    background-color: ${({ theme }) => theme.colorThemes.tertiary};
    color: ${({ theme }) => theme.colorThemes.quaternary};

    section {
        display: flex;
        justify-content: center;
    }

    section div {
        padding: 0 15px;
    }

    section .call-to-action-buttons {
        display: flex;
        flex-direction: column-reverse;
        justify-content: space-evenly;
    }

`