import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import {BoardPage} from "../components/BoardPage";
import {Lists} from "../components/Lists";
import {AddList} from "../components/AddList";
import {DragDropContext} from "react-beautiful-dnd";


export const DetailBoard = () =>{
    const {token} = useContext(AuthContext)
    const {request}= useHttp()
    const [board,setBoard] = useState(null)
    const boardId = useParams().id
    const [cards, setCards] = useState([]);

    const getCards = useCallback(async () => {
        try {
            const fetched = await request("/api/card", "POST", null, {
                Authorization: `Bearer ${token}`,
            });
            fetched.sort((a,b)=>{
                if (a.order>b.order){
                    return 1;
                }
                if (a.order<b.order){
                    return -1
                }
                return 0
            })
            setCards(fetched);
        } catch (e) {}
    }, [request, token]);

    const getBoard = useCallback(async ()=>{
        try {
            const fetched = await request(`/api/board/${boardId}`,'GET',null,{
                Authorization:`Bearer ${token}`
            })
            setBoard(fetched)
        }catch (e) {
            console.log(e)
        }
    },[token,boardId,request])


    useEffect(()=>{
        getBoard()
        getCards()
    },[getBoard,getCards])

    const onDragEnd = async result => {
        const{destination,source,draggableId} = result
        if (!destination){
            console.log(1)
            return
        }
        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ){
            return;
        }
        const start = source.droppableId
        const finish = destination.droppableId
        const a = cards.filter((item)=>item._id===draggableId)
        if (start===finish){
            cards.splice(source.index,1)
            cards.splice(destination.index,0,a[0])
            for (let i=0;i<cards.length;i++){
                cards[i].order = i
            }

            await request('/api/card/drop',"POST",cards,{
                Authorization: `Bearer ${token}`,
            })
        }else {
            const b = cards.filter((item)=>item._id===draggableId)
            const iin = cards.indexOf(b[0])
            cards[iin].listId = destination.droppableId
            await request('/api/card/list','POST',{listId:destination.droppableId,cardId:b[0]._id},{
                Authorization: `Bearer ${token}`,
            })
        }

    }
    return (
      <>
        <div>{board && <BoardPage board={board} />}</div>
          <div className="row">
              <DragDropContext onDragEnd={onDragEnd}>
                <div className="col s8">
                        <Lists board={board} cards={cards} getCards = {getCards}/>
                </div>
              </DragDropContext>

              <AddList getBoard={getBoard} />
          </div>

      </>
    );
}