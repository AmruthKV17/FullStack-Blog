import React,{useState,useEffect} from 'react'
import databaseService from '../Appwrite/config'
import { Container, PostCard } from '../Components'

const Home = () => {
    const [posts, setposts] = useState([])

    useEffect(()=>{
        databaseService.listPosts()
        .then((posts) => {
            if (posts) {
                setposts(posts)
            }
        })
    },[])
  if (posts.length > 0) {
    return (
      <div className='w-full py-8'>
        <Container>
            <div className='flex flex-wrap'>
                {
                    posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <PostCard {...post}/>
                        </div>
                    ))
                }
            </div>
        </Container>
      </div>
    )
  }else{
    return <Container>
        <h2>No posts Available</h2>
    </Container>
  }
}

export default Home
