import styled from 'styled-components';
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";



export const FilterBox = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 100px;
    color: #fff;
    `;

export const FilterH1 = styled.h1`
    font-size: 16px;
    color: #fff;
    text-align: center;
    margin-bottom: 20px;
    `;

export const FilterContent = styled.div`
    display: flex;
    justify-content: center;
    `;

export const FilterItem = styled.div`
    display: flex;
    align-items: center;
    `;

export const FilterLabel = styled.label`
    margin-right: 10px;
    `;

export const FilterSelect = styled.select`
    padding: 5px;
    `;

    export const CollapseButton = styled(FaChevronCircleLeft)`
    font-size: 24px;
    color: #fff;
    cursor: pointer;
    position: absolute;  /* Position it relative to FilterBox */
    right: 10px;  /* Align it to the right of the FilterBox */
    &:hover {
        color: #ccc;
    }
`;

export const ExpandButton = styled(FaChevronCircleRight)`
    font-size: 24px;
    color: #fff;
    cursor: pointer;
    position: absolute;  /* Position it relative to FilterBox */
    right: 10px;  /* Align it to the right of the FilterBox */
    
    &:hover {
        color: #ccc;
    }
`;