import React from "react";
import Button from '../UI/Button';
import classes from './Logout.module.css';

const DEFAULT_PROVIDER_IRI = "https://broker.pod.inrupt.com/";

export const Logout = () => {
    return (
        <div className={classes.logoutButton}>
            <Button type={"button"} onClick={() => alert('hello')}>
                Logout
            </Button>
        </div>
    )
}