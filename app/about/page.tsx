import './about.scss';
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
    <div className="about">
      <div className="about-container">
        <div className="about-section">
          <div className="about-image1">
            <Image src={Pna1} alt="Pna1" height={400} width={300} />
          </div>

          <div className="about-content">
            <h1>
              Hello! I'm Alex and I'm a dedicated fitness trainer. I'm proud to
              present you a unique trainer profile with a combination of
              theoretical knowledge and practical experience in the field of
              sports.
            </h1>
            <p>
              I completed my studies as head of promotion at the faculty of
              physical education and sport, gaining a solid foundation of
              theoretical knowledge and practical skills in health and exercise.
              This academic training helped me gain a deeper understanding of
              the anatomy, physiology, and biomechanics of the human body,
              allowing me to develop personalized and effective training
              programs. But my real passion and impressive experience comes from
              performance sports. For 12 years, I practiced Greco-Roman
              wrestling at the highest level, gaining a deep understanding of
              the discipline, and achieving goals. This experience built my
              mental and physical resilience, and I now use it to motivate and
              guide people on their journey to a healthy and active life. Over
              the past 4 years I have worked as a wrestling coach working with
              people of all ages and fitness levels. I have helped clients
              achieve various goals, such as muscle toning or improving
              endurance and sports performance. Each person is unique and I
              specialize in tailoring training and nutrition programs to fit
              individual needs. My experience in the field of fitness, combined
              with the knowledge gained in the Faculty of Physical Education and
              Sport, helps me to offer my clients a complete package of
              expertise. I understand the importance of a balanced approach that
              combines exercise, proper nutrition and stress management to
              achieve sustainable results and a healthy lifestyle. Therefore,. I
              offer you my solid knowledge, constant motivation and personalized
              guidance so you can achieve the results you want and enjoy an
              active and healthy lifestyle for the long term.
            </p>
          </div>

          <div className="about-image2">
            <Image src={Pna2} alt="Pna2" width={330} height={400} />
          </div>
        </div>

        <div className="contact-section">
          <p>
            Contact me today and let's start the journey to a better version of
            you together!
          </p>
          <div className="social-media-container">
            <ul>
              <li>
                <a href="mailto:nicusor.popa00@e-uvt.ro">
                  <Image
                    src={Email}
                    alt="Email"
                    width="50"
                    height="50"
                    className="contact-image"
                  />
                </a>
              </li>

              <li>
                <a href="https://www.facebook.com/alexandru.popa.9231">
                  <Image
                    src={Facebook}
                    alt="Facebook"
                    width="50"
                    height="50"
                    className="contact-image"
                  />
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/pnaalex/">
                  <Image
                    src={Instagram}
                    alt="Instagram"
                    width="50"
                    height="50"
                    className="contact-image"
                  />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
