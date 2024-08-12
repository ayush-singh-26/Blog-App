import React from 'react'
import { Container } from '../component' 
import PostForm from '../component/postform/postform'

function AddPost() {
  return (
    <div className='py-8'>
        <Container>
            <PostForm />
        </Container>
    </div>
  )
}

export default AddPost
