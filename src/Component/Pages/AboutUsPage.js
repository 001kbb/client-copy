import React from 'react';
import { t } from "i18next"
import { useTranslation } from "react-i18next";
import logo from './aitu.png';

const AboutUs = () => {
  const {t} = useTranslation()
    return (
      <div className="about-us-container">
        <h1 className="about-us-title">{t('About Us')}</h1>
        <div className="about-us-content">
          <p className="about-us-text">
            {t('The mission of Astana IT University is to provide digital transformation through training, research and successful innovation.')}
          </p>
          <p className="about-us-text">
            {t('Vision. Astana IT University is a leading center of competence for digital transformation in Central Asia.')}
          </p>
          <p className="about-us-text">
            {t('The global goal is to train highly qualified specialists in the digital economy based on interdisciplinary technologies.')}
          </p>
        </div>
        <div className="about-us-logo-container">
        <img className="about-us-logo" src={logo} alt="Logo" />
      </div>
      </div>
    );
  };
  
  export default AboutUs;