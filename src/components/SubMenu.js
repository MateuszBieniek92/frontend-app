import React from 'react';
import './menu.scss';
import {Tabs, Tab, Accordion} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const SubMenu = (props) => {

    return (
        <div>
            <Tabs className="category-wrapper">
                {props.subMenu.map((category, id) => (
                    <Tab key={id} eventKey={id} title={category.name}>
                        <Accordion defaultActiveKey={id}>
                            {category.elements.map((elements, id) => (
                                <div key={id}>
                                    <Accordion.Toggle eventKey={id} className="accordion__header">
                                        {elements.name}
                                    </Accordion.Toggle>
                                    <Accordion.Collapse eventKey={id} className="accordion__content">
                                        <div>
                                            {elements.group.map((group, id) => (
                                                <div key={id} className="group">
                                                    <h4>{group.name}</h4>
                                                    <ul>
                                                        {group.groupElement.map((groupItem, id) => (
                                                            <li  key={id}>
                                                                <a href={groupItem.name}>{groupItem.name}</a>
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