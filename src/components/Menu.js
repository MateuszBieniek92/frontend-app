import React from 'react';
import SubMenu from "./SubMenu";
import './menu.scss';

import {Tab, Nav} from 'react-bootstrap';

export default class Menu extends React.Component {

    constructor() {
        super();

        this.state = {
            menuItems: [],
            showMenu: false
        }
    }

    componentDidMount() {
        setTimeout(this.fetchData);
    }

    fetchData = () => {
        fetch('data/menuData.json')
            .then(response => {
                if (response.ok) {
                    return response;
                }
                throw Error(response.status)
            })
            .then(response => response.json())
            .then(data => {
                this.setState({
                    menuItems: data.menu
                })
            })
            .catch(error => console.log('Błąd ładowania: ' + error));
    };

    showSubMenu = () => {
        this.setState({
            showMenu: false,
        })
    }

    render() {
        return (
            <header className="menu">
                <Tab.Container>
                    <div className="menu__sidebar">
                        <Nav className="flex-column">
                            {this.state.menuItems.map((data) => (
                                <Nav.Item key={data.id}>
                                    <Nav.Link eventKey={data.id} onClick={() => {
                                        this.setState({showMenu: true});
                                    }}>{data.name}</Nav.Link>
                                </Nav.Item>
                            ))}
                        </Nav>
                    </div>
                    <div className="menu__content">
                        {this.state.showMenu ? (
                            <Tab.Content>
                                {this.state.menuItems.map((data) => (
                                    <Tab.Pane key={data.id} eventKey={data.id}>
                                        <SubMenu showSubMenu={this.showSubMenu} subMenu={data.subMenu}/>
                                    </Tab.Pane>
                                ))}
                            </Tab.Content>
                        ) : ''}
                    </div>
                </Tab.Container>
            </header>
        )
    }
}