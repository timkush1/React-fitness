// pages/About.js

import React, { useState, useEffect } from 'react';

// Custom hook to handle scroll position
const useScrollFadeOut = () => {
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPercentage = window.scrollY / window.innerHeight;
      const newOpacity = 1 - scrollPercentage; // Fade out effect
      setOpacity(newOpacity < 0 ? 0 : newOpacity); // Prevent negative values
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return opacity;
};

const About = () => {
  const opacity = useScrollFadeOut(); // Use the custom hook

  const backgroundStyle = {
    height: '100vh', // Full viewport height
    backgroundAttachment: 'fixed',
    backgroundImage: 'url(/images/fitness-hero.png)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    transition: 'opacity 0.2s', // Smooth transition for opacity change
    opacity: opacity // Set the opacity based on the custom hook's return value
  };
  

  return (
    <div style={{ textAlign: 'center' }}>
      <div style={backgroundStyle}>
        {/* Transparent overlay to allow content to be visible */}
        <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: 'white', background: 'rgba(0,0,0,0.5)' }}>
          <h1>About Fitness and Anatomy</h1>
      <article style={{ padding: '2rem', lineHeight: '1.6' }}>
        <p>Fitness is more than just an activity; it's a pivotal aspect of a healthy lifestyle. It's about the harmony between the body and mind that comes through regular exercise. Fitness can improve cardiovascular health, enhance muscular strength, and contribute to overall well-being.</p>
        <p>Understanding the human body's anatomy is crucial in optimizing physical training. Each muscle and bone plays a specific role in movement and stability. A well-informed fitness routine that takes into account the intricacies of body mechanics can prevent injuries and improve performance.</p>
        <p>Regular physical activity is known to boost mental health as well. It can alleviate symptoms of depression and anxiety, foster self-esteem, and enhance cognitive function. Fitness is a lifelong journey that encourages individuals to push beyond their limits and discover their full potential.</p>
        <p>While this site is born from a passion for fitness and aims to share comprehensive knowledge about exercise and anatomy, it's important to remember that the information provided here is for general educational purposes and not professional advice.</p>
        <p>Before embarking on any new fitness program, especially if you have health concerns, it is essential to consult with a healthcare professional. Personalized advice is crucial since each body is unique and requires tailored care and attention.</p>
        <p>This site is a celebration of the fitness community and a hub for sharing insights and experiences. However, it is not a substitute for professional guidance. For any health-related queries or concerns, professional consultation is advised.</p>
        <p>As you navigate through your fitness journey, take the time to learn about your body, heed its signals, and nourish it with the care it deserves. May your path to wellness be enriching and full of discovery.</p>
        <p>Join us in exploring the fascinating world of fitness and anatomy, and let's support each other in our individual quests for health and happiness. Remember, fitness is not a destination; it's a way of life.</p>
        <p>Thank you for visiting our site. We hope your journey through fitness is as transformative as it is enjoyable.</p>
      </article>
        </div>
      </div>
    </div>
  );
};

export default About;
