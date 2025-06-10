// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React from 'react';

import { Helmet } from 'react-helmet';
type MetaTag = {
    name?: string;
    property?: string;
    content: string;
};

type Props = {
    title: string;
    description: string;
    meta?: MetaTag[];
    children: React.ReactNode;
};

const PageContainer = ({ title, description, meta = [], children }: Props) => (
    <div>
        <Helmet>
            <title>{title}</title>
            <meta name="description" content={description} />
            {meta.map((m, i) =>
                m.name ? (
                    <meta key={i} name={m.name} content={m.content} />
                ) : m.property ? (
                    <meta key={i} property={m.property} content={m.content} />
                ) : null
            )}
        </Helmet>
        {children}
    </div>
);

export default PageContainer;
