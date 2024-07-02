import React from "react";
import StackIcon from "tech-stack-icons";

const TechStack = ({ technologies }) => {
    return (
        <div className="tech-stack">
            {technologies.map((tech, index) => (
                <div key={index} id={tech.label} className="tech-item">
                    <StackIcon name={tech.value}  className="tech-icons"/>
                    <span>{tech.label}</span>
                </div>
            ))}
        </div>
    );
};

export default TechStack