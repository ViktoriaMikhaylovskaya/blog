import styled from "styled-components";

export const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

export const ContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
`

export const Title = styled.h2`
    font-size: 32px;
`

export const Icons = styled.div`
    display: flex;
    gap: 10px;

    &> svg {
        cursor: pointer;

        &:hover {
            transform: scale(1.1);
        }
    }
`

export const Button = styled.button`
    border: none;
    background-color: transparent;
    cursor: pointer;
    font-size: 16px;
    display: flex;
    gap: 10px;
    align-items: center;
    
    &:hover {
        transform: scale(1.1);
    }
`