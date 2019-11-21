import React from 'react';
import SubMenu from "./SubMenu";

export default class Menu extends React.Component {

    constructor() {
        super();

        this.state = {
            menuItems: []
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

    render() {
        return (
            <header>
                {this.state.menuItems.map((menuItem) => (
                    <div>
                        <ul>
                            <li>{menuItem.name}</li>
                        </ul>
                        <SubMenu subMenu={menuItem.subMenu}/>
                    </div>
                ))}
            </header>
        )
    }
}