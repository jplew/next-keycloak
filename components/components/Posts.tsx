import React, { useEffect } from 'react'
import { getState } from '../state'
import { fetchPosts } from '../state/action'

const Posts = () => {
  const [{ posts }, dispatch] = getState()
  console.log('posts :', posts)

  // client side data fetching
  useEffect(() => {
    fetchPosts(dispatch)
  }, [])

  return (
    <ul>
      {posts.map(
        ({
          objectID,
          url,
          title,
        }) => (
          <li key={objectID}>
            <a href={url}>{title}</a>
          </li>
        ),
      )}
    </ul>
  )
}

export default Posts
