import Image from 'next/image';
import React from 'react';

export const NewsItem = ({ guid, pictureSet, title, description, position }: Record<string, string>) => (
    <div key={guid}>
        <Image src={pictureSet} alt={title} width={500} height={700}/>
        <h4>{title}</h4>
        <p>{description}</p>
        <p>Position: {position}</p>
    </div>
);