import React from 'react'
import databaseService from '../Appwrite/config'
import { Link } from 'react-router-dom'

const PostCard = ({$id,featuredImage,title}) => {
  return (
    <Link to={`/post/${$id}`}> 
        <div className='w-full bg-gray-100 rounded-xl p-4 '>
          <div className='w-full justify-center mb-4'>
            <img src={databaseService.filePreview(featuredImage)} alt={title} className='rounded-xl ' />
          </div>
          <h2 className='text-xl  font-medium'>{title}</h2>

        </div>
    </Link>
  )
}

export default PostCard
