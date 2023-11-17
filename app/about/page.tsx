import Image from 'next/image';
import React from 'react';
import Email from '../../public/email.png';
import Facebook from '../../public/facebook.png';
import Instagram from '../../public/instagram.png';
import Pna1 from '../../public/pna1.jpg';
import Pna2 from '../../public/pna2.jpg';

export const metadata = {
  title: { default: 'About', template: '%s' },
  description: 'Description about the personal trainer and contact information',
};

export default function AboutPage() {
  return (
    <div>
      <div style={{ display: 'flex' }}>
        <div style={{ flex: 1, padding: '20px' }}>
          <Image
            src={Pna1}
            width={100}
            height={100}
            alt="Pna1"
            className="pna1-image"
          />
        </div>

        <div style={{ flex: 2, padding: '10px' }}>
          <h1>Hello! I'm Alex and I'm a dedicated fitness trainer...</h1>
        </div>

        <div style={{ flex: 1, padding: '20px' }}>
          <Image
            src={Pna2}
            alt="Pna2"
            width={100}
            height={100}
            className="pna2-image"
          />
        </div>
      </div>

      <div className="contact">
        <p>Contact Information:</p>
        <ul>
          <li>
            <a href="mailto:nicusor.popa00@e-uvt.ro">
              <Image src={Email} alt="Email" className="email-image" />
            </a>
          </li>

          <li>
            <a href="https://www.facebook.com/alexandru.popa.9231">
              <Image src={Facebook} alt="Facebook" className="facebook-image" />
            </a>
          </li>
          <li>
            <a href="https://www.instagram.com/pnaalex/">
              <Image
                src={Instagram}
                alt="Instagram"
                className="instagram-image"
              />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
