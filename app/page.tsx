import Image from 'next/image';
import React from 'react';
import Pna from '../public/pna.jpg';

{
  /*export default function Home() {
  return <p>Get started by editing</p>;
} */
}

const Home = () => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', height: '100vh' }}>
      <div style={{ flex: '1', padding: '20px', textAlign: 'left' }}>
        <p>
          What sets me apart is my passion for performance.I don't know the term
          “half done”, and this in sports is what makes you shine.If you want to
          lose weight or build muscle, or simply want to have a healthy
          lifestyle, I am ready to offer you my knowledge.
        </p>
        <a href="/login">
          <button style={{ marginRight: '10px' }}>JOIN NOW</button>
        </a>
        <button>Get in Touch</button>
      </div>
      <div style={{ width: '50%', position: 'relative' }}>
        <Image
          src={Pna}
          alt="Your Image"
          style={{
            maxWidth: '80%',
            maxHeight: '80vh',
          }}
        />
      </div>
    </div>
  );
};

export default Home;
