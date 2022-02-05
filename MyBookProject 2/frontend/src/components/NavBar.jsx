import React, { Component } from 'react'
import styled from 'styled-components'

import Logo from './Logo'
import Links from './Links'

const Nav = styled.nav.attrs({
    className: 'navbar navbar-expand-lg navbar-blue bg-dark',
    
})`
width: 100%;
`;


class NavBar extends Component {
    render() {
        return (
          
                <Nav>
                    <Logo />
                    <Links />
                </Nav> 
             
        )
    }
}

export default NavBar
