import { useState, useEffect } from 'react'
import Loading from '../utilities/Loading'
import { restBase } from '../utilities/Utilities'
import Works from "../sections/Works";
import AOS from "aos";
import "aos/dist/aos.css";
import TechStack from "../utilities/Techstack";
import Background from "../components/background";


const Home = () => {
    const restPath = restBase + 'pages/53?acf_format=standard&_embed'
    const [restData, setData] = useState(null)
    const [isLoaded, setLoadStatus] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(restPath)
            if ( response.ok ) {
                const data = await response.json()
                setData(data)
                setLoadStatus(true)
            } else {
                setLoadStatus(false)
            }
        }
        fetchData()
    }, [restPath])

    AOS.init();
    AOS.refresh();

    return (
        <>
        <Background />
        { isLoaded ? 
        
        <div>
           
             <div className="header-content" id='home'>
             <section className='header-section'data-aos="flip-down" data-aos-delay={(restData * 1200).toString()}>
                 <h1>{restData.acf.name}</h1>
                 <p>{restData.acf.web}</p>
                 <p>{restData.acf.intro}</p>
                 
             </section>
           
         </div>

         <div className="about-content" id='about'>
             <section data-aos="fade-right" data-aos-delay={(restData * 1200).toString()} >
                 <h2>{restData.acf.about_me}</h2>
                <div className='about'>
                 <p>{restData.acf.introduction}</p>
                 <p>{restData.acf.more_about}</p>
                 </div>
                 <div>
                 <h3>{restData.acf.tools_title}</h3>
                {restData.acf.skills && Array.isArray(restData.acf.skills) && restData.acf.skills[0]  && (
                            <TechStack technologies={restData.acf.skills[0].check} />
                        )}
                </div>
                 {/* <p>{restData.acf.skills}</p> */}
                
                 
             </section>

         </div>

         <div className="work-content" id='work'>
           <Works />
           
         </div>
         

         <div className="contact-content" id='contact'>
             <section data-aos="fade-left" data-aos-delay={(restData * 900).toString()}>
                 <h2>{restData.acf.contact_me}</h2>
                 <p>{restData.acf.contact}</p>  
                
                 <a href="mailto:{{restData.acf.email}}" className='email'>Send Message</a>
                 <div className='linking'>
                 <a href="https://www.linkedin.com/in/matthewjameslew" className="linked">LinkedIn</a>
                 </div>
                 <div className='git'>
                 <a href="https://github.com/mlew02" className="github">GitHub</a>
                 </div>
             </section>
         </div>

         </div>
        : 
            <Loading /> 
        }
        </>            
    )
}

export default Home