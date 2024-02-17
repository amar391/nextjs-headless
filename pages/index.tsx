import type { NextPage } from 'next'
import { createClient } from "contentful";
import RecipeCard from "../components/RecipeCard";
import { Recipe } from "../components/types";

export async function getStaticProps(){
    const client = createClient({
        space: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
    });

    const res = await client.getEntries({ content_type: 'blogPost' });

    return {
        props: {
            recipes: res.items
        }
    }
}

interface HomePageProps {
    recipes: Array<Recipe>
}

const Home: NextPage<HomePageProps> = ({ recipes }) => {
  return (
      <div className="recipe-list">
          {recipes.map(recipe => (
              <RecipeCard key={recipe.sys.id} recipe={recipe}/>
          ))}

          <style jsx>{`
              .recipe-list {
                  display: grid;
                  grid-template-columns: 1fr 1fr;
                  grid-gap: 20px 60px;
              }
          `}</style>
      </div>
  )
}

export default Home
