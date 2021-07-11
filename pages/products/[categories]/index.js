import React, { Fragment } from 'react';
import Layout from '../../../components/layout';
import { DEFAULT_SEO, getSeoData } from '../../../utils';
import { URL } from '../../api/hello';

export default function Caterories({ SEO, data }) {
    return (
        <div className="container">
            <Fragment>
                AAA
                <Layout seoData={SEO}>
                    {data?.length > 0 && (
                        <Fragment>
                            <h1>All Products</h1>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Price</th>
                                        <th>Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map(data => (
                                        <tr key={data.id}>
                                            <td>{data.title}</td>
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

export async function getStaticPaths() {
    const getCategories = await fetch(`${URL}/categories`);
    const categories = await getCategories.json();

    const paths = categories.map(category => ({
        params: { categories: category.slug },
    }));

    return {
        // paths: [{ params: { categories: 'front' } }],
        paths,
        fallback: false,
    };
}

export async function getStaticProps({ params: { categories } }) {
    const resp = await fetch(`${URL}/categories/${categories}`);
    const category = await resp.json();
    const data = category.products;
    // console.log(data.products);
    // const SEO = await getSeoData({ id: 1 });
    // const data = [];
    const SEO = { ...DEFAULT_SEO };
    return { props: { data, SEO } };
}
