import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Loading from '../utilities/Loading';
import { restBase, featuredImage } from '../utilities/Utilities';
import { Accordion, AccordionItem } from '@szhsin/react-accordion';
import StackIcon from "tech-stack-icons";


const Single = () => {
    const { slug } = useParams();
    const restPath = `${restBase}posts?slug=${slug}&_embed`;
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
            {isLoaded && postData ? 
                <div>
                    <h2>{postData.title.rendered}</h2>
                    {postData.featured_media !== 0 && postData._embedded &&
                        <figure className="featured-image" dangerouslySetInnerHTML={featuredImage(postData._embedded['wp:featuredmedia'][0])}></figure>
                    }
                    <div className="entry-content" dangerouslySetInnerHTML={{__html: postData.content.rendered}}></div>
                    {postData.acf.requirements}
                    
                    {/* {postData.acf.cool_deatures}
                    {postData.acf.cool_features_box}
                    {postData.acf.challanges} */}
                    <div>
                        {postData.acf.tools && Array.isArray(postData.acf.tools) && postData.acf.tools.length > 0 && (
                            <StackIcon technologies={postData.acf.tools[0]} />
                        )}
                    </div>
                   <Accordion>

                    <AccordionItem header="Features">
                    <div dangerouslySetInnerHTML={{__html: postData.acf.cool_features_box}}></div>
                    </AccordionItem>

                    <AccordionItem header="Challanges">
                    <div dangerouslySetInnerHTML={{__html: postData.acf.challanges}}></div>
                    </AccordionItem>

         
                    </Accordion>
                </div>
            : 
                <Loading /> 
            }
        </>            
    );
};

export default Single;