import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Loading from '../utilities/Loading';
import { restBase, featuredImage } from '../utilities/Utilities';
import { Accordion, AccordionItem } from '@szhsin/react-accordion';
import TechStack from "../utilities/Techstack";
import Background from "../components/background";
import cheveronDown from "/assets/cheveron-down.svg";
import { HashLink } from 'react-router-hash-link';


const AccordionHeader = ({ text }) => (
    <>
        {text}
        <img className="chevron-down" src={cheveronDown} alt="Chevron Down" />
    </>
)

const Single = () => {
    const { slug } = useParams();
    const restPath = `${restBase}posts?slug=${slug}&acf_format=standard&_embed`;
    const [postData, setPostData] = useState(null);
    const [isLoaded, setLoadStatus] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(restPath);
            if (response.ok) {
                const data = await response.json();
                setPostData(data[0]);
                setLoadStatus(true);
            } else {
                setLoadStatus(false);
            }
        };
        fetchData();
    }, [restPath]);



    return (
        <>
         <Background />
            {isLoaded && postData ? 
                <div>
                    <section className='single-project'>
                    <div className='backproject'>
                    <HashLink smooth to="/#work"  className="back-to-projects">
                    <img src="/assets/arrow.png" alt="Arrow" className="arrow" />
                    <span>Back to Projects</span>
                    </HashLink>
                    </div>
                        <h2 className='project-title'>{postData.title.rendered}</h2>
                        {postData.featured_media !== 0 && postData._embedded &&
                            <figure className="featured-image" dangerouslySetInnerHTML={featuredImage(postData._embedded['wp:featuredmedia'][0])}></figure>
                        }
                        
                        <div className='links'>
                        <a href={postData.acf.github} className='github'>Github</a>
                        {postData.acf.mobile_view === true ?
                        ( <a href={postData.acf.live_site_} className='live-site mobileHidden'>Live Site</a> ) :
                        ( <a href={postData.acf.live_site_} className='live-site'>Live Site</a> )}
                        </div>

                        <div className="entry-content" dangerouslySetInnerHTML={{__html: postData.content.rendered}}></div>
                        <p className='requirements'>{postData.acf.requirements}</p>
                        <h3>{postData.acf.tools_used}</h3>

                        <div className='techstack-single'>
                        {postData.acf.skills && Array.isArray(postData.acf.skills) && postData.acf.skills.length > 0 && (
                            <TechStack technologies={postData.acf.skills[0].check} />
                        )}
                        </div>
                        <Accordion>

                        <AccordionItem 
                        header={
                            <AccordionHeader 
                            text={ postData.acf.cool_features_text} />
                            } >
                            <div dangerouslySetInnerHTML={{__html: postData.acf.cool_features_box}}></div>
                            </AccordionItem>                 
                        <AccordionItem 
                        header={
                            <AccordionHeader 
                            text={ postData.acf.challenges_title} />
                            } >
                            <div dangerouslySetInnerHTML={{__html: postData.acf.challanges}}></div>
                            </AccordionItem>
                        </Accordion>
                    </section>
                    
                </div>
            : 
                <Loading /> 
            }
        </>            
    );
};

export default Single;