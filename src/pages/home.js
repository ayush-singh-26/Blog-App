import React, {useEffect, useState} from 'react'
import appwriteService from "../appwrite/config";
import { Container } from '../component';
import PostCard from '../component/postcard';
function Home() {
    const [post, setPosts] = useState([])

    useEffect(() => {
        appwriteService.getPosts().then((post) => {
            if (post) {
                setPosts(post.documents)
            }
        })
    }, [])
  
    if (post.length === 0) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                Add your post
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {post.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Home