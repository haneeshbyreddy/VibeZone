import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import './home.css';
import Navbar from '../components/Navbar';

function Home({ userId, user, refreshPosts, setUser, onUserChange, usersList }) {
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const videoRefs = useRef([]);
  const cancelTokenSource = useRef(axios.CancelToken.source());

  // Add Post API
  const addPost = async (formData) => {
    setLoading(true)
    try {
      let response = await axios.post(`https://api.vibezone.space/api/${userId}/uploadFile`, formData, {
        onUploadProgress: ProgressEvent => {
          const percentCompleted = ((ProgressEvent.loaded * 100) / ProgressEvent.total).toFixed(2)
          setUploadProgress(percentCompleted)
        },
        cancelToken: cancelTokenSource.current.token
      })
      console.log(response)
      if (response.status < 200 || response.status >= 300) {
        alert('Post Not Added');
      } 
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log('Upload canceled by user')
      } else {
        console.log('Error uploading file:', error)
      }
    }
    setLoading(false)
    setUploadProgress(0)
    refreshPosts()
    setShowPopup(!showPopup);
    cancelTokenSource.current.cancel('Operation canceled')
  };

  // Delete Post API
  const deletePost = async (imgUrl, index) => {
    let response = await fetch(`https://api.vibezone.space/api/${userId}/deletePost`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ "imgURL": imgUrl })
    });
    if (response.ok) {
      setUser(user => ({
        ...user,
        posts: user.posts.filter((_, i) => i !== index)
      }));
      console.log('deleted')
    } else {
      alert('Failed to delete Post');
    }
  };

  function isImage(url) {
    return /\.(jpg|jpeg|png|gif)$/i.test(url);
  }

  // auto play video if in view
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5
    };

    const callback = (entries) => {
      entries.forEach((entry) => {
        const video = entry.target;
        if (entry.isIntersecting) {
          video.play();
        } else {
          setTimeout(() => {
            video.pause();
          }, 300);
        }
      });
    };

    // Create a single Intersection Observer instance
    const observer = new IntersectionObserver(callback, options);

    // Observe each videoRef
    videoRefs.current.forEach((videoRef) => {
      if (videoRef instanceof Element) {
        observer.observe(videoRef);
      }
    });
    // Cleanup function
    return () => {
      observer.disconnect();
    };
  }, [user.posts]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      cancelTokenSource.current = axios.CancelToken.source()
      addPost(formData);
    }
  };
  const handleCancelUpload = () => {
    cancelTokenSource.current.cancel('Upload cancelled by user')
    setLoading(!loading)
    setUploadProgress(0)
    setShowPopup(!showPopup)
  }

  return (
    <div className='wrapper'>
      <div className='content'>
        <Navbar userId={userId} usersList={usersList} refreshPost={refreshPosts} onUserChange={onUserChange}/>
        {showPopup && (
          <div id="popupOverlay" className="overlay-container show">
            <div className="popup-box">
              <h2 style={{ color: 'green' }}>New Post</h2>
              <form className="form-container">
                <input
                  className="form-input"
                  type="file"
                  id="file"
                  name="file"
                  onChange={handleFileChange}
                />
              </form>
              { loading && (
                  <div className="progress-container">
                    <div className="progress-bar" style={{ width: `${uploadProgress}%` }}>{uploadProgress}%</div>
                  </div>
              )}
              {loading && <button className='btn-cancel' onClick={handleCancelUpload}>Cancel</button>}
              { !loading && <button className="btn-close-popup" onClick={() => setShowPopup(false)}>Close</button> }
            </div>
          </div>
        )}
        <div className='divider'></div>
        <a className='post_add' onClick={() => { setShowPopup(!showPopup) }}>New Post</a>
        {user.posts.map((mediaUrl, index) => (
          <div style={{ width: '100%' }}>
            <div className='post' key={index}>
              <div className='post-info'>
                <img className='profile-image image' src={user.profileImage} alt='Img' />
                <Link to={`/${userId}/profile`} style={{ color: 'white' , textDecorationLine:'none'}}>{user.name}
                    
                </Link>
                <a className='download' href={mediaUrl} download><i className='fa fa-fw fa-download'></i></a>
                <a className='delete' onClick={() => deletePost(mediaUrl, index)}><i className='fa fa-fw fa-trash'></i></a>
              </div>
              <div className='post-media'>
                {isImage(mediaUrl) ? (
                  <img src={mediaUrl} alt='Post' />
                ) : (
                  <video ref={(el) => (videoRefs.current[index] = el)} controls muted>
                    <source src={mediaUrl} type='video/mp4' />
                    Your browser does not support the video tag.
                  </video>
                )}
              </div>
            </div>
            <div className='divider'></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;