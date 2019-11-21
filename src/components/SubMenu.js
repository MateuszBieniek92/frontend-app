import React from 'react';
import './subMenu.scss';
import {Tabs, Tab, Accordion} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const SubMenu = (props) => {

    return (
        <div>
            <Tabs className="category-wrapper">
                {props.subMenu.map((category, id) => (
                    <Tab key={id} eventKey={id} title={category.name}>
                        <Accordion defaultActiveKey={0}>
                            {category.elements.map((elements, id) => (
                                <div key={id}>
                                    <Accordion.Toggle eventKey={id} className="accordion__header">
                                        {elements.name}
                                    </Accordion.Toggle>
                                    <Accordion.Collapse eventKey={id} className="accordion__content">
                                        <div className="group-wrapper">
                                            {elements.group.map((group, id) => (
                                                <div key={id} className="group">
                                                    <h4 className="group__header"> {group.name}</h4>
                                                    <ul className="group__list">
                                                        {group.groupElement.map((groupItem, id) => (
                                                            <li key={id} className="group-wrapper__list__item">
                                                                <a href="#">{groupItem.name}</a>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            ))}
                                        </div>
                                    </Accordion.Collapse>
                                </div>
                            ))}
                        </Accordion>
                    </Tab>
                ))}
            </Tabs>
        </div>
    )
};

export default SubMenu;