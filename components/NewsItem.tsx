import Image from 'next/image';
import React from 'react';

export const NewsItem = ({ guid, pictureSet, title, description, position }: Record<string, string>) => (
    <div key={guid}>
        <Image src={pictureSet} alt={title} />
        <h4>{title}</h4>
        <p>{description}</p>
        <p>Position: {position}</p>
    </div>
);