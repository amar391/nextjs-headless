import Image from "next/image";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { createClient } from "contentful";
import Skeleton from "../../components/Skeleton";
import { Recipe } from "../../components/types";


interface ParamProps {
    params: {
        slug: string
    }
}

interface RecipeProps {
    recipe: Recipe
}

const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
});

export async function getStaticPaths(){
    const res = await client.getEntries({ content_type: "blogPost" });
    const paths = res.items.map(item => ({
        params: { slug: item.fields.slug }
    }));

    return {
        paths,
        fallback: true
    }
}

export async function getStaticProps({ params }: ParamProps){
    const { items } = await client.getEntries({
        content_type: "blogPost",
        "fields.slug": params.slug
    })

    if(!items.length) {
        return {
            redirect: {
                destination: "/",
                permanent: false
            }
        }
    }

    return {
        props: {
            recipe: items[0]
        },
        revalidate: 1
    }
}

export default function RecipeDetails({ recipe }: RecipeProps) {
    if(!recipe) return <Skeleton />

    const { featureImage, title, cookingTime, ingredients, method } = recipe.fields;

    return (
        <div>
            <div className="banner">
                <Image
                    alt={featureImage.fields.title}
                    src={'https:' + featureImage.fields.file.url}
                    width={1200}
                    height={400}
                />
                <h2>{title}</h2>
            </div>

            <div className="info">
                <p>Takes about {cookingTime} mins to cook.</p>
                <h3>Ingredients:</h3>

                {ingredients.map(ing => (
                    <span key={ing}>{ing}</span>
                ))}
            </div>

            <div className="method">
                <h3>Method:</h3>
                <div>{documentToReactComponents(method)}</div>
            </div>

            <style jsx>{`
                h2, h3 {
                    text-transform: uppercase;
                }

                .banner h2 {
                    margin: 0;
                    background: #fff;
                    display: inline-block;
                    padding: 20px;
                    position: relative;
                    top: -60px;
                    left: -10px;
                    transform: rotateZ(-1deg);
                    box-shadow: 1px 3px 5px rgba(0, 0, 0, 0.1);
                }

                .info p {
                    margin: 0;
                }

                .info span::after {
                    content: ", ";
                }

                .info span:last-child::after {
                    content: ".";
                }
            `}</style>
        </div>
    )
}