import React from 'react';

export const NewsItem = ({ guid, pictureSet, title, description, position }: Record<string, any>) => (
    <div key={guid}>
        <img src={pictureSet} alt={title} />
        <h4>{title}</h4>
        <p>{description}</p>
        <p>Position: {position}</p>
    </div>
);