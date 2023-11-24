import axios from "axios";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import './BoardPostList.css';
import { useNavigate } from "react-router-dom";
import BoardPagination from "./BoardPagination";
import BoardList from "./BoardList";



function BoardPostList() {
    const [ posts, setPosts ] = useState([]);
    const navigate = useNavigate();
    const limit = 10;
    const [ page, setPage ] = useState(1);
    const startat = ( page - 1 ) * limit;
    const [searchWordKey, setSearchWordKey] = useState('title');
    const [searchWord, setSearchWord] = useState('');

    const handlerSearchWord = (e) => {setSearchWord(e.target.value);}
    const handlerSearchWordKey = e => {setSearchWordKey(e.target.value);}
    const clickSearButton = () => {
        axios.get(`${process.env.REACT_APP_EC2_API_URL}/boardlist/${searchWordKey}/${searchWord}`)
        .then(responce => {
            console.log(responce)
            setPosts(responce.data)
        }).catch(error => console.log(error));

    }

    useEffect(() => {
        console.log("env", process.env.LAMBDA_API_URL)
        axios.get(`${process.env.REACT_APP_LAMBDA_API_URL}/board`)
        .then(responce => {
            console.log(JSON.parse(responce.data))
            setPosts(JSON.parse(responce.data));
        }).catch(error => console.log(error));
    }, []);

    // const item = Object.values(posts);

    const goBoardPostList = () => navigate('/login');

    const authCheck = () => {
        if ( sessionStorage.getItem('userId') === null ) {
            alert('로그인을 해주세요:)')
            goBoardPostList();
        } else {
            navigate('/board/write')
        }
    }
    

    return (
        <>
        <div className="board_wrap" >
            <div className="board_title">
                <strong>공지사항</strong>
                <p>공지사항을 빠르고 정확하게 알려드립니다.</p>
                <div className="board_search">
                    <select value={searchWordKey} onChange={handlerSearchWordKey}>
                        <option key='title' value='title'>제목</option>
                        <option key='ID' value='ID'>작성자</option>
                        <option key='location' value='location'>위치</option>
                    </select>
                    <input type="text" placeholder="검색어를 입력해주세요." value={searchWord} onChange={handlerSearchWord}/>
                    <button type="submit" onClick={clickSearButton}><FaSearch /></button>
                </div>
                
            </div>
            <BoardList posts={posts} startat={startat} limit={limit}/>

        </div>
        

        <BoardPagination total={posts.length} limit={limit} page={page} setPage={setPage} />
        
        <div className="bt_wrap">
            <button className="on" onClick={authCheck}>등록하기</button>
        </div>
        </>
    );
}

export default BoardPostList;
