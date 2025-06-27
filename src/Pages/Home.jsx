import React,{useState,useEffect} from 'react'
import databaseService from '../Appwrite/config'
import { Container, PostCard } from '../Components'

const Home = () => {
    const [posts, setposts] = useState([])

    useEffect(()=>{
        databaseService.listPosts()
        .then((posts) => {
            if (posts) {
                setposts(posts.documents)
            }
        })
    },[])
  if (posts.length > 0) {
    return (
      <div className='w-full '>
        <Container>
            <div className='gap-2 columns-4'>
                {
                    posts.map((post) => (
                        <div key={post.$id} className='w-full aspect-square mb-2'>
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
        <h2>Log In to view posts!</h2>
    </Container>
  }
}

export default Home
