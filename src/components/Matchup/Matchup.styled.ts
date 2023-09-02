import styled from 'styled-components';

export const MatchupWrapper = styled.div`

display: inline-block;
width: 20%;
border: 3px solid #73AD21;
text-align: left;
vertical-align: top;

div {
    display: inline-block;
    width: 100%;
}

h1 {
    text-align: center;
}

.select-button {
    -webkit-appearance: button;
    -webkit-writing-mode: horizontal-tb !important;
    text-rendering: auto;
    color: buttontext;
    letter-spacing: normal;
    word-spacing: normal;
    text-transform: none;
    text-indent: 0px;
    text-shadow: none;
    display: inline-block;
    text-align: center;
    align-items: flex-start;
    cursor: default;
    background-color: buttonface;
    box-sizing: border-box;
    margin: 0em;
    font: 400 11px system-ui;
    padding: 1px 7px 2px;
    border-width: 1px;
    border-style: solid;
    border-color: rgb(216, 216, 216) rgb(209, 209, 209) rgb(186, 186, 186);
    border-image: initial;
    width: 150px;
}
`;
