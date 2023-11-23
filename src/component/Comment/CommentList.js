import axios from 'axios';
import './Comment.css';
import { RiDeleteBin2Fill } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';

const CommentList = ({comment, idx, isuser}) => {
    const navigate = useNavigate();

    const clickDeleteComment = () => {
        axios.delete(`${process.env.REACT_APP_EC2_API_URL}/commentdelete/${comment.commentId}`)
        .then(response => {
            console.log(response.data);
            alert('댓글이 삭제되었습니다.');
            navigate(0);
        }).catch(error => console.log(error));
    } 
    
    return (
        <>

            <div className='comment_list' key={idx}>
                <div>
                    <div>{comment.ID}</div>
                   
                    {isuser && (<button type='submit' onClick={clickDeleteComment}><RiDeleteBin2Fill/></button>)}
                    <div className='date'>{comment.createAt}</div>  
                </div>
                <div>{comment.content}</div>
            </div>
        
        
        </>
    );
}

export default CommentList;