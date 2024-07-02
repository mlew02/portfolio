import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Loading from '../utilities/Loading';
import { restBase, featuredImage } from '../utilities/Utilities';
import { Accordion, AccordionItem } from '@szhsin/react-accordion';
import TechStack from "../utilities/Techstack";
import Background from "../components/background";


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
                        <h2 className='project-title'>{postData.title.rendered}</h2>
                        {postData.featured_media !== 0 && postData._embedded &&
                            <figure className="featured-image" dangerouslySetInnerHTML={featuredImage(postData._embedded['wp:featuredmedia'][0])}></figure>
                        }
                        <div className='links'>
                        <a href={postData.acf.github} className='github'>Github</a>
                        {postData.acf.mobile_view === true ?
                        <a href={postData.acf.live_site_} className='live-site mobile-hidden'>Desktop Only</a> :
                        <a href={postData.acf.live_site_} className='live-site'>Live Site</a>
                        }
                        </div>

                        <div className="entry-content" dangerouslySetInnerHTML={{__html: postData.content.rendered}}></div>
                        <p className='requirements'>{postData.acf.requirements}</p>

                        <div className='techstack-single'>
                        {postData.acf.skills && Array.isArray(postData.acf.skills) && postData.acf.skills.length > 0 && (
                            <TechStack technologies={postData.acf.skills[0].check} />
                        )}
                        </div>
                        <Accordion>
                            <AccordionItem header="Features">
                                <div dangerouslySetInnerHTML={{__html: postData.acf.cool_features_box}}></div>
                            </AccordionItem>
                            <AccordionItem header="Challenges">
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