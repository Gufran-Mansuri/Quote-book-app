import { useState } from "react";

import classes from "./Comments.module.css";
import NewCommentForm from "./NewCommentForm";
import { useParams } from "react-router-dom";
import useHttp from "../../hooks/use-http";
import { getAllComments } from "../../lib/api";
import { useEffect } from "react";
import LoadingSpinner from "../../components/UI/LoadingSpinner";
import CommentsList from "./CommentsList";
import { useCallback } from "react";
const Comments = () => {
  const [isAddingComment, setIsAddingComment] = useState(false);
  const params = useParams();
  const {
    sendRequest,
    status,
    data: loadedCommenrs,
    error,
  } = useHttp(getAllComments);
  const quoteId = params.quoteId;
  useEffect(() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId]);
  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };

  const addedCommentHandler = useCallback(() => {
    sendRequest(quoteId);

  },[sendRequest, quoteId]);
  let comments;
  if (status === "pending") {
    comments = (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }
  if(status === 'completed' && loadedCommenrs){
    comments = <CommentsList comments={loadedCommenrs} /> 
  }
  if(status === 'completed' && (!loadedCommenrs || loadedCommenrs.length === 0)){
    comments = <p className='centered'>No Comments has added yet</p>
  }
  return (
    <section className={classes.comments}>
      <h2>User Comments</h2>
      {!isAddingComment && (
        <button className="btn" onClick={startAddCommentHandler}>
          Add a Comment
        </button>
      )}
      {isAddingComment && (
        <NewCommentForm
          id={quoteId}
          onAddedComment={addedCommentHandler}
        />
      )}
      {comments}
    </section>
  );
};

export default Comments;
