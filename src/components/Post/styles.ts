import styled from "styled-components";

export const BigPostWrapper = styled.div`
    display: flex;
    flex-direction: column;
    grid-column-end: 3;
    grid-column-start: 1;
    border: 1px solid #b3b3b3;
    border-radius: 16px;
    box-shadow: 0px 0px 48px -3px rgba(34, 60, 80, 0.3);
`

export const TitleWrapper = styled.div`
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    margin-top: 20px;
`

export const BigTitle = styled.h4`
    font-size: 28px;
    margin: 0;
    width: 80%;
`

export const Wrapper = styled.div`
    border-radius: 16px;
    box-shadow: 0 0 10px rgba(0,0,0,0.4);
`

export const Content = styled.div`
    padding: 10px;
`

export const Photo = styled.img`
    border-radius: 16px 16px 0 0;
    width: 100%;
`

export const Title = styled.h4`
    font-size: 22px;
    margin: 0;
`

export const IconsWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;

    &> svg {
        cursor: pointer;

        &:hover {
            transform: scale(1.1);
        }
    }
`

export const Icons = styled.div`
    display: flex;
    gap: 10px;
    align-items: center;
`

export const Button = styled.button`
    padding: 10px;
    border: 1px solid #000000;
    background-color: transparent;
    border-radius: 17px;
    margin-left: auto;
    cursor: pointer;

    &:hover {
        transform: scale(1.1);
    }
`