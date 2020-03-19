import Styled from 'styled-components'

export const CenteredBox=Styled.div`position: fixed;
                                    top: 50%;
                                    left: 50%;
                                    -webkit-transform: translate(-50%, -50%);
                                    transform: translate(-50%, -50%);
                                    height: ${props=>props.height ? props.height : '50vh'};
                                    width: ${props=>props.width ? props.width: '75%'}
                                    `