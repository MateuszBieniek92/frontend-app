import React from 'react';

const SubMenu = (props) => {

    return (
        <div>
            {props.subMenu.map((category) => (
                <p>{category.name}</p>
            ))}
        </div>
    )
};

export default SubMenu;