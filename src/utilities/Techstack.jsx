import React from "react";
import StackIcon from "tech-stack-icons";

const TechStack = ({ technologies }) => {
    return (
        <div className="tech-stack">
            {technologies.map((tech, index) => (
                <div key={index} className="tech-item">
                    <StackIcon name={tech} className="tech-icons"/>
                    <span>{tech}</span>
                </div>
            ))}
        </div>
    );
};

export default TechStack