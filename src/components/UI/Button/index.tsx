import React from 'react';

import classes from './Button.module.css';

interface ButtonProps {
    type: 'button' | 'submit' | 'reset' | undefined,
    onClick: (event: any) => void,
    children: any
}

const Button = (props: ButtonProps) => {
    return (
        <button
            className={classes.button}
            type={props.type || 'button'}
            onClick={props.onClick}
        >
            {props.children}
        </button>
    );
};

export default Button;