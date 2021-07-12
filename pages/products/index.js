import React, { Fragment } from 'react';
import { URL } from '../api/hello';
import Layout from '../../components/layout';
import { getSeoData } from '../../utils';
import Link from 'next/link';

export default function Products({ data, SEO }) {
    return (
        <div className="container">
            <Fragment>
                <Layout seoData={SEO}>
                    {data?.length > 0 && (
                        <Fragment>
                            <h1>All Products</h1>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Categories</th>
                                        <th>Price</th>
                                        <th>Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map(data => (
                                        <tr key={data.id}>
                                            <td>{data.title}</td>
                                            <td>
                                                <Link
                                                    passHref
                                                    href={`products/${data.categories[0].slug}`}
                                                >
                                                    <a>
                                                        {
                                                            data.categories[0]
                                                                .name
                                                        }
                                                    </a>
                                                </Link>
                                            </td>
                                            <td>{data.price}</td>
                                            <td>{data.description}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </Fragment>
                    )}
                </Layout>
            </Fragment>
        </div>
    );
}

export async function getStaticProps() {
    const resp = await fetch(`${URL}/products`);
    const data = await resp.json();
    const SEO = await getSeoData({ id: 1 });
    return { props: { data, SEO } };
}
