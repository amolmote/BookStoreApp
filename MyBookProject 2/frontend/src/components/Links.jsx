import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import LoginIcon from '@mui/icons-material/Login';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import ViewListIcon from '@mui/icons-material/ViewList';
import HomeIcon from '@mui/icons-material/Home';


const Collapse = styled.div.attrs({
    className: 'collpase navbar-collapse',
})``

const List = styled.div.attrs({
    className: 'navbar-nav mr-auto',
})``

const Item = styled.div.attrs({
    className: 'collpase navbar-collapse',
})``

class Links extends Component {
    render() {
        return (
            <React.Fragment>
                <Link to="/" className="navbar-brand">     
                  Book Managment
                </Link>


                <Collapse>
                    <List>
                    <Item>
                         <Link to="/mainhome" className="nav-link">
                          <HomeIcon/>
                                 Home
                        </Link>
                        </Item>

                        <Item>
                            <Link to="/books" className="nav-link">
                            <ViewListIcon/>
                            Books
                            </Link>
                        </Item>
                        <Item>
                            <Link to="/login" className="nav-link">
                               <LoginIcon/>
                               Login
                            </Link>
                        </Item>
                        <Item>
                            <Link to="/signup" className="nav-link">
                             <PersonAddAlt1Icon/>
                               Register
                            </Link>
                        </Item>
                    </List>
                </Collapse>
            </React.Fragment>
        )
    }
}

export default Links