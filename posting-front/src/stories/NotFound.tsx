import React from 'react';

export interface NotPoundProps {
  content: string;
}

export const NotFound: React.FC<NotPoundProps> = ({content}) => {
    return (
        <>
            <h1>{content}</h1>
        </>
    );
}
