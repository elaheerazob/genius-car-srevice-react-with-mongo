import React from 'react';

const Footer = () => {
    const today =new Date();
    const year = today.getFullYear();
    return (
        <footer>
            <p className='text-center mt-3'>Copyright {'\u00A9'} {year}</p>
        </footer>
    );
};

export default Footer;