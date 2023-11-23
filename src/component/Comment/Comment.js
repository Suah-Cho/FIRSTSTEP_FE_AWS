import { useEffect, useState } from "react";
import CommentWrite from "./ComentWrite";
import CommentList from "./CommentList";
import axios from "axios";
import CommentPagination from "./CommentPagination";
import './Comment.css'

const Comment = ({boardId}) => {
    const [ comments, setComments ] = useState({});
    const [ page, setPage ] = useState(1);
    const limit = 5;
    const startat = ( page - 1 ) * limit;


    useEffect(() => {
        axios.get(`${process.env.REACT_APP_EC2_API_URL}/boardlist/${boardId}/commentlist`)
        .then(response => {
            setComments(response.data)
            console.log(response.data)
        }).catch(error => console.log(error));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const item = Object.values(comments);


    return (
        <>
        <div className="comment_wrap">          

            {
                item.slice(startat, startat + limit ).map((comment, idx) => {
                    if (comment.userId === sessionStorage.getItem('userId')) {
                        return <CommentList comment={comment} idx={idx} isuser={true}/>
                    } else {
                        return <CommentList comment={comment} idx={idx} isuser={false}/>
                    }
                })
            }
            <CommentWrite boardId={boardId} />
            <CommentPagination total={item.length} limit={limit} page={page} setPage={setPage} />
        </div>
        </>
    );
}

export default Comment;