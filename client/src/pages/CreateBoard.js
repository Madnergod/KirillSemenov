import React, {useContext, useEffect, useState} from 'react'
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import {useHistory} from "react-router-dom";
import {useMessage} from "../hooks/message.hook";

export const CreateBoard = () =>{
    const history = useHistory()
    const message = useMessage()
    const auth = useContext(AuthContext)
    const { request} = useHttp();
    const [name,setName] = useState('')
    useEffect(()=>{
        window.M.updateTextFields()
    },[])
    const changeHandler = (event) => {
       setName(event.target.value)
    };
    const addBoard = async ()=>{
        try {
            const data = await request("/api/board/create","POST",{name},{
                Authorization:`Bearer ${auth.token}`
            })
            message(data.message)
            history.push(`/detail/${data.board._id}`)
        }catch (e) {
            message(e)
        }
    }
    return(
        <div className="row">
            <div className="col s6 offset-s3">
                <div className="row">
                    <div className="card blue darken-1">
                        <div className="card-content white-text">
                            <span className="card-title">Авторизация</span>
                            <div className="input-field">
                                <input
                                    placeholder="Название доски"
                                    id="board"
                                    type="text"
                                    className="yellow-input"
                                    name="board"
                                    value={name}
                                    onChange={changeHandler}
                                />
                                <label htmlFor="email">Название доски</label>
                            </div>
                            <button
                                className="btn grey lighten-1 black-text"
                                onClick={addBoard}
                            >
                                Добавить
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}