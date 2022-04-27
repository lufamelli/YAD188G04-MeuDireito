import React, { useEffect, useState } from 'react';
import { GET_POSTS } from '../../constants';
import api from '../../services/api';
import Search from '../user/search';
import { useDispatch, useSelector } from 'react-redux';
import './postStyle.css';

export default function Posts(props) {

  const [posts, setPosts] = useState([]);
  const [searched, setSearched] = useState('');
  //const [results, setResults] = useState([]);
  const [searchText, setSearchText] = useState('');

  const dispatch = useDispatch()

  useEffect(() =>{
    async function loadPosts(){
      const response = await api.get("/post");
      console.log(response)
      setPosts(response.data)
    }
    loadPosts();
  },[]);

  /*
  const updateSearchText = (newSearchText) =>  {
    setSearchText(newSearchText)
    console.log(newSearchText)

    const variables = {
      skip: 0,
      searchText: newSearchText
  }

  getPosts(variables)

    const posts = response.data
    if(response.status ===200) {
      console.log('status 200')
      filterPosts(posts, searchText)
    }
    else {
      console.log(response.status )
    }
  }

  const getPosts = (variables) => {
    
  }

  function filterPosts(posts, searchText) {
    const results = posts.map((post) => post.title.includes(searchText))
    setSearched({posts: results})

  }
  
  const postHeadlines = {
    margin: '0 10px',
    pading: '0 10px',
  }*/

  const buildSearch = (e) => {
    setSearchText(e.target.value)

    dispatch(getPosts({title: 'text', query: e.target.value}))

}

async function getPosts(arg) {
  //try {
		const response = await api.post('/api/filter/search', arg);

		dispatch({
			title: GET_POSTS,
			payload: response.data.posts,
		});
	/*} catch (err) {
		console.log('getProductsByFilter api error: ', err);
		dispatch({ title: STOP_LOADING });
		dispatch({
			title: SHOW_ERROR_MESSAGE,
			payload: err.response.data.errorMessage,
		});
	}*/
}
  return(
    <>
      <div>
        <input 
          placeholder="Pesquisa" 
          name="search"
          value={searchText} 
          onChange={buildSearch}
          className="search" 
        />
      </div>
      <div>
      {
        posts.map((post) => (
          <div className="postHeadlines" key={post._id}>
            <div>{post.title}</div>
            <div>{post.subTitle}</div>
          </div>
        ))
      }
      </div>
    </>
  )
}