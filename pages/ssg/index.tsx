
import { User } from "@/types/user"

type Props = {
    posts: User
}

export default function Index({ posts }: Props) {
    // Render posts...
    return (
        <div>
            <ul>
                <li> {posts.id}</li>
                <li>{posts.username}</li>
                <li>{posts.firstName}</li>
                <li>{posts.lastName}</li>
                
            </ul>
           
        </div>
    )
}

// This function gets called at build time
export async function getStaticProps() {
    // Call an external API endpoint to get posts
    const res = await fetch('https://petstore.swagger.io/v2/user/heinnaing')
    const posts = await res.json()

    // By returning { props: { posts } }, the Blog component
    // will receive `posts` as a prop at build time
    return {
        props: {
            posts,
        },
    }
}