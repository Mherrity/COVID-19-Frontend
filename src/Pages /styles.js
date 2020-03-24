import Styled from 'styled-components'

export const CenteredBox=Styled.div`position: absolute;
                                    float: right;
                                    top: 50%;
                                    right: 5vw;
                                    -webkit-transform: translate(-0%, -50%);
                                    transform: translate(-0%, -50%);
                                    height: ${props=>props.height ? props.height : '50vh'};
                                    width: ${props=>props.width ? props.width: '75%'};
                                    `

/*
                                    left: 50%;
                                    -webkit-transform: translate(-50%, -50%);
                                    transform: translate(-50%, -50%);
                                    height: ${props=>props.height ? props.height : '50vh'};
                                    width: ${props=>props.width ? props.width: '75%'}
                                    `
*/

export const CenteredFlex=Styled.div`position: relative;
                                    float: right;
                                    right: 5vw;
                                    top: 25vh;
                                    display: flex;
                                    align-content: flex-end;
                                    justify-content: flex-end;
                                    height: ${props=>props.height ? props.height : '50vh'};
                                    width: ${props=>props.width ? props.width: '75%'}`

export const TopSelector=Styled.div`position: relative;
                                    float: right;
                                    right: 5vw;
                                    top: ${props=>props.top ? props.top : '5vh'};
                                    width: 100%;
                                    display: flex;
                                    align-content: flex-end;
                                    justify-content: flex-end;
                                    `