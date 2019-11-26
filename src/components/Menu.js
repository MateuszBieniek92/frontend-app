import React from 'react';
import SubMenu from "./SubMenu";
import './menu.scss';
import logo from '../images/example-svg.svg';
import logoIcon from '../images/example-icon.png';
import {faArrowLeft, faArrowRight} from '@fortawesome/free-solid-svg-icons';
import {Tab, Nav} from 'react-bootstrap';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import RightMainSection from "./RightMainSection";

export default class Menu extends React.Component {

    constructor() {
        super();

        this.state = {
            menuItems: [],
            showMenu: false,
            desktopToggleBar: false,
            desktopToggleBarArrow: false,
            logoImage: false,
            isMobile: false,
        }
    }

    componentDidMount() {
        setTimeout(this.fetchData);

        window.addEventListener('resize', () => {
            this.setState({
                isMobile: window.innerWidth < 767
            });
        }, false);
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
    };

    toggleBar = () => {
        this.setState({
            desktopToggleBar: !this.state.desktopToggleBar,
            desktopToggleBarArrow: !this.state.desktopToggleBarArrow,
            logoImage: !this.state.logoImage,
        })
    }

    render() {
        return (
            <div className={!this.state.desktopToggleBar || this.state.isMobile ? '' : 'menu--showBar'}>
                {console.log(window.innerWidth)}
                <header className="menu ">
                    <Tab.Container>
                        <div className="menu__sidebar">
                            <div className="menu__sidebar__image">
                                <img src={this.state.logoImage ? logoIcon : logo} alt="Example logo"/>
                            </div>
                            <Nav>
                                {this.state.menuItems.map((data) => (
                                    <Nav.Item key={data.id}>
                                        <Nav.Link eventKey={data.id} onClick={() => {
                                            this.setState({showMenu: true});
                                        }}>{data.name}</Nav.Link>
                                    </Nav.Item>
                                ))}
                            </Nav>
                            {this.state.isMobile ? '' : (
                                <div className="menu__desktop-btn">
                                    <FontAwesomeIcon
                                        icon={this.state.desktopToggleBarArrow ? faArrowRight : faArrowLeft}
                                        onClick={this.toggleBar}/>
                                </div>
                            )}
                        </div>
                        {this.state.showMenu ? (
                            <div className="menu__content">
                                <Tab.Content>
                                    {this.state.menuItems.map((data) => (
                                        <Tab.Pane key={data.id} eventKey={data.id}>
                                            <SubMenu showSubMenu={this.showSubMenu} subMenu={data.subMenu}/>
                                        </Tab.Pane>
                                    ))}
                                </Tab.Content>
                            </div>
                        ) : null}

                    </Tab.Container>
                </header>
                <RightMainSection/>
            </div>
        )
    }
}