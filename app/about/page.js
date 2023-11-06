import Image from 'next/image';
import Email from '../../public/email.png';
import Facebook from '../../public/facebook.png';
import Instagram from '../../public/instagram.png';
import Pna1 from '../../public/pna1.jpg';
import Pna2 from '../../public/pna2.jpg';
import Telephone from '../../public/telephone.png';

export const metadata = {
  title: { default: 'About', template: '%s' },
  description: 'Description about the personal trainer and contact information',
};

export default function AboutPage() {
  return (
    <div>
      <div style={{ display: 'flex' }}>
        {/* Left side with Pna1 image */}
        <div style={{ flex: 1, padding: '20px' }}>
          <Image src={Pna1} alt="Pna1" className="pna1-image" />
        </div>

        {/* Content in the middle */}
        <div style={{ flex: 2, padding: '10px' }}>
          <h1>Hello! I'm Alex and I'm a dedicated fitness trainer...</h1>
          {/* Your existing content goes here */}
        </div>

        {/* Right side with Pna2 image */}
        <div style={{ flex: 1, padding: '20px' }}>
          <Image src={Pna2} alt="Pna2" className="pna2-image" />
        </div>
      </div>

      {/* Contact information at the bottom */}
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
          <li>
            <a href="tel:+436706561791">
              <Image
                src={Telephone}
                alt="Telephone"
                className="telephone-image"
              />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
