import React from 'react';
import img from '../../image/Logo.png';

export default function ApplicationLogo(props) {
    return (
        <svg {...props} viewBox="0 0 316 316" xmlns="http://www.w3.org/2000/svg">
            <image href={img} x="0" y="0" height="316" width="316" />
        </svg>
    );
}
