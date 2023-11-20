import Image from 'next/image';
import React from 'react';
import Pna from '../public/pna.jpg';
import styles from './home.module.scss';

const Home = () => {
  return (
    <div className="styles.homeWrapper">
      <div className={styles.homeContainer}>
        <div className={styles.leftContainer}>
          <div className={styles.leftSide}>
            <p>
              What sets me apart is my passion for performance. I don't know the
              term “half done”, and this in sports is what makes you shine. If
              you want to lose weight or build muscle, or simply want to have a
              healthy lifestyle, I am ready to offer you my knowledge.
            </p>
            <a href="/login">
              <button className={styles.joinNowBtn}>JOIN NOW</button>
            </a>
            <a href="/about">
              <button className={styles.getInTouchBtn}>GET IN TOUCH</button>
            </a>
          </div>
        </div>
        <div className={styles.rightContainer}>
          <div className={styles.rightSide}>
            <div className={styles.imageContainer}>
              <Image src={Pna} alt="Your Image" className={styles.image} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
