import React, { useState, useRef } from 'react';
import { Typography, TextField, Button } from '@material-ui/core/';
import { useDispatch } from 'react-redux';

import { commentPost } from '../../actions/post';
import useStyles from './styles';


const CommentSection = ({ post }) => {
  const user = JSON.parse(localStorage.getItem('profile'));
  // console.log(user)

  const [comment, setComment] = useState('');
  const [comments, setComments] = useState(post?.comments);

  const dispatch = useDispatch();
  const classes = useStyles();
  const commentsRef = useRef();
   
  const handleComment=async ()=>{
    const finalComment=`${user?.result?.name}: ${comment}`
      const newComments = await dispatch(commentPost(finalComment, post._id));
      setComment('');
      setComments(newComments)
      
    commentsRef.current.scrollIntoView({ behavior: 'smooth' });
  }

  const handleEnter=(e)=>{
   if (e.keyCode === 13) {
      handleComment();
      // console.log('enter')
    }
  }
  
  return (
      <div>
      <div className={classes.commentsOuterContainer}>
        <div className={classes.commentsInnerContainer}>
          <Typography gutterBottom variant="h6">Comments</Typography>
          {comments?.map((c, i) => (
            <Typography key={i} gutterBottom variant="subtitle1">
              <strong>{c.split(': ')[0]}</strong>
              {c.split(':')[1]}
            </Typography>
          ))}
          <div ref={commentsRef} />
        </div>
        <div style={{ width: '70%' }}>
          <Typography gutterBottom variant="h6">Write a comment</Typography>
          <TextField fullWidth rows={4} variant="outlined" label="Comment" multiline onKeyDown={handleEnter} value={comment} onChange={(e) => setComment(e.target.value)} />
          <br />
          <Button style={{ marginTop: '10px' }} fullWidth disabled={!comment.length} color="primary" variant="contained" onClick={handleComment}>
            Comment
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CommentSection;
