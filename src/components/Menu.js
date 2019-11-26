import React from 'react';
import SubMenu from "./SubMenu";
import './menu.scss';
import logo from '../images/example-svg.svg';
import logoIcon from '../images/example-icon.png';
import {faArrowLeft, faArrowRight, faBars} from '@fortawesome/free-solid-svg-icons';
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
            showMobileMenu: false,
        }

        this.toggleMenu = this.toggleMenu.bind(this);
        this.handleOutsideClick = this.handleOutsideClick.bind(this);
        window.addEventListener("load", this.updateWindowInnerWidth.bind(this));
    }

    componentDidMount() {
        setTimeout(this.fetchData);

        window.addEventListener('resize', () => {
            this.setState({
                isMobile: window.innerWidth < 767
            });
        }, false);
    }

    updateWindowInnerWidth = () => {
        if (window.innerWidth < 767) {
            this.setState({
                isMobile: true,
            });
        }
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
    };

    toggleMenu = () => {

        if (!this.state.showMobileMenu) {
            document.addEventListener('click', this.handleOutsideClick, false);
        } else {
            document.removeEventListener('click', this.handleOutsideClick, false);
        }

        this.setState({
            showMobileMenu: !this.state.showMobileMenu,
        })
    };

    handleOutsideClick(e) {
        if (this.node.contains(e.target)) {
            return;
        }

        this.toggleMenu();
    }

    render() {
        return (
            <div className={!this.state.desktopToggleBar || this.state.isMobile ? '' : 'menu--showBar'}>
                <header className="menu ">
                    <Tab.Container>
                        <div className="menu__sidebar">
                            <div className="menu__sidebar__image">
                                <img src={!this.state.logoImage || this.state.isMobile ? logo : logoIcon}
                                     alt="Example logo"/>
                            </div>
                            <Nav ref={node => {
                                this.node = node
                            }}
                                 className={this.state.showMobileMenu && this.state.isMobile ? 'mm--active' : ''}>
                                {this.state.menuItems.map((data) => (
                                    <Nav.Item key={data.id}>
                                        <Nav.Link eventKey={data.id} onClick={() => {
                                            this.setState({showMenu: true});
                                        }}>{data.name}</Nav.Link>
                                    </Nav.Item>
                                ))}
                            </Nav>
                            {this.state.isMobile ? (
                                <div className="menu__mobile-btn">
                                    <FontAwesomeIcon
                                        icon={faBars}
                                        onClick={this.toggleMenu}/>
                                </div>
                            ) : (
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