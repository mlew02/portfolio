import { useState, useEffect } from 'react';
import Loading from '../utilities/Loading';
import { restBase, featuredImage, slicerequirements } from '../utilities/Utilities';
import { Link } from 'react-router-dom';
import AOS from "aos";
import "aos/dist/aos.css";

const Works = () => {
    const restPath = restBase + 'posts?_embed';
    const [restData, setData] = useState([]);
    const [isLoaded, setLoadStatus] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(restPath);
                if (response.ok) {
                    const data = await response.json();
                    console.log(data);
                    setData(data);
                    setLoadStatus(true);
                } else {
                    setLoadStatus(false);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoadStatus(false);
            }
        };

        fetchData();
    }, [restPath]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % restData.length);
        }, 10000);
        return () => clearInterval(interval);
    }, [restData]);

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? restData.length - 1 : prevIndex - 1));
    };

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % restData.length);
    };

    const changeSlide = (index) => {
        setCurrentIndex(index);
    };
    AOS.init();
    AOS.refresh();
    return (
        <>
            {isLoaded ? (
                <div>
                    <section className='featured-projects'>
                        <h2 className='works-title'data-aos="flip-down" data-aos-delay={(restData * 1200).toString()}>Featured Projects</h2>
                        <div className='project-container'data-aos="flip-down" data-aos-delay={(restData * 1200).toString()}>
                            {restData.map((post, index) => (
                                <article key={post.id} id={`post-${post.id}`} style={{ display: index === currentIndex ? 'block' : 'none' }}>
                                    <div className='images'>
                                        {post.featured_media !== 0 && post._embedded && (
                                            <figure className='featured-image' dangerouslySetInnerHTML={featuredImage(post._embedded['wp:featuredmedia'][0])}></figure>
                                        )}
                                    </div>
                                    <div className="pagination-dots">
                                        {restData.map((_, dotIndex) => (
                                            <button
                                                key={dotIndex}
                                                className={`dot ${dotIndex === currentIndex ? 'active' : ''}`}
                                                onClick={() => changeSlide(dotIndex)}
                                            ></button>
                                        ))}
                                    </div>
                                    <h2 className='project-title'>{post.title.rendered}</h2>
                                    <div className='entry-content' dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}></div>
                                    <p className='requirements'>{slicerequirements(post.acf.requirements, 250)}</p>
                                    <Link to={`${post.slug}`} className='single-page'>More Details</Link>
                                    
                                </article>
                            ))}
                        </div>
                    </section>
                </div>
            ) : (
                <Loading />
            )}
        </>
    );
};

export default Works;