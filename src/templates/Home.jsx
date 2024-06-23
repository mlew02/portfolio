import { useState, useEffect } from 'react'
import Loading from '../utilities/Loading'
import { restBase } from '../utilities/Utilities'
import Works from "../sections/Works";

import TechStack from "../utilities/Techstack";



const Home = () => {
    const restPath = restBase + 'pages/53?_embed?acf_format=standard'
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

    return (
        <>
        { isLoaded ? 
        <div>
             <div className="header-content">
             <section>
                 <h1>{restData.acf.name}</h1>
                 <p>{restData.acf.web}</p>
                 <p>{restData.acf.intro}</p>
                 
             </section>
           
         </div>

         <div className="about-content">
             <section>
                 <h2>{restData.acf.about_me}</h2>
                <div className='about'>
                 <p>{restData.acf.introduction}</p>
                 <p>{restData.acf.more_about}</p>
                 </div>
                 {/* <p>{restData.acf.skills}</p> */}
                 <div>
                {restData.acf.skills && Array.isArray(restData.acf.skills) && restData.acf.skills.length > 0 && (
                            <TechStack technologies={restData.acf.skills[0].check} />
                        )}
                </div>
                 
             </section>

         </div>

         <div className="work-content">
           <Works />
           
         </div>
         

         <div className="contact-content">
             <section>
                 <h2>{restData.acf.contact_me}</h2>
                 <p>{restData.acf.contact}</p>  
                 <a href="mailto:{{restData.acf.email}}" className='email'>Send Message</a>
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