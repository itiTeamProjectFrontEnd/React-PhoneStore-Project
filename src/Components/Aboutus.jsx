import React from 'react'
import styles from '../Styles/Contact.module.css'
import BrandSwiper from './BrandSwiper'

import aboutImage from '../Images/main-removebg-preview.png'

import Ahmed from '../Images/ahmed.jpg'
import Nasr from '../Images/nasr.jpg'
import Youssef from '../Images/youssef.jpg'
import Ayman from '../Images/ayman.jpg'
import Abdelrahman from '../Images/abdo.jpg'


const AboutUs = () => {
  let ourTeam = [
    {
      name: "Ahmed Yasser",
      role: "Front-End",
      image: Ahmed
    },
    {
      name: "Mohamad Nasr",
      role: "Front-End",
      image: Nasr
    },
    {
      name: "Yousef Elnagar",
      role: "Front-End",
      image: Youssef
    },
    {
      name: "Ayman ",
      role: "Front-End",
      image: Ayman
    },
    {
      name: "Abdelrahman",
      role: "Front-End",
      image: Abdelrahman
    },

  ]

  return <>
    <section id='about' className="about bg-gray py-5">
      <div className="container py-5">
        <div className="row our-company py-5 ">
          <div className="col-md-6">
            <h2 className={`${styles.mainTitle} mb-4`}>Our Site </h2>
            <h3 className='mb-4'>We are Building The Destination For Getting Things Done</h3>
            <p className={`${styles.disc}`}>we pride ourselves on offering a wide selection of the latest smartphones to meet all your needs. Whether you're looking for the newest models or the best deals, we have something for everyone. Our mission is to provide top-quality products and exceptional customer service. We strive to ensure you find the perfect device with ease and confidence.</p>
          </div>
          <div className="col-md-6">
            <img src={aboutImage} className={`img-fluid ${styles.mainImg}`} alt=""/>
          </div>
        </div>
        <BrandSwiper />

        <div className="row justify-content-center ">
          <div className="col-md-12 mb-md-4">
            <h2 className={`${styles.mainTitle} mb-4`}>Our Team</h2>
            <h2>Top team of experts</h2>
            <p className={`${styles.para}`}>Meet the talented developers behind our project—a team of dedicated professionals with a passion for innovation and excellence!</p>
          </div>

          <div className="col-12">
            <div className="row justify-content-center">
              {ourTeam.map((member, index) => (
                <div key={index} className="col-lg-2 col-md-3 col-6 mb-4 rounded-3 text-center">
                  <img src={member.image} className={`${styles.teamImg} img-fluid rounded-3 mb-2`} alt={member.name} />
                  <h5 className={`${styles.mainTitle}`}>{member.name}</h5>
                  <p >{member.role}</p>
                  <div className="icons d-flex justify-content-center text-sm gap-3">
                    <i className={`fab fa-facebook-f text-secondary ${styles.mediaIcon}`}></i>
                    <i className={`fab fa-instagram text-secondary ${styles.mediaIcon}`}></i>
                    <i className={`fab fa-linkedin text-secondary ${styles.mediaIcon}`}></i>
                  </div>

                </div>
              ))}
            </div>
          </div>
        </div>
        <hr />
      
      </div>
    </section>

  </>
}

export default AboutUs