import React from 'react';
import { NavLink } from 'react-router-dom';
import ad from './LandingPage.module.css';

export default function LandingPage() {


    return (
        <div className={ad.ad}>
            <NavLink to="/home">
                <div className={ad.divpokeball}>
                </div>
            </NavLink>
        </div>
    )
}