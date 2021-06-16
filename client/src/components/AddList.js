import React, {useContext, useEffect, useState} from "react";
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import {useParams} from "react-router-dom";

export const AddList = ({getBoard})=>{
    const {request} = useHttp();
    const auth = useContext(AuthContext)
    const [name,setName] = useState('')
    const boardId = useParams()
    useEffect(()=>{
        window.M.updateTextFields()
    },[])
    const addList = async ()=>{
        try {
            await request("/api/list/add","POST",{name,boardId},{
                Authorization:`Bearer ${auth.token}`
            })
            getBoard()
        }catch (e) {

        }
    }
    const changeHandler = (event) => {
        setName(event.target.value)
    };
    return(
        <div className="col s4">
                    <div className="card blue darken-1">
                        <div className="card-content white-text">
                            <span className="card-title">Добавление Списка</span>
                            <div className="input-field">
                                <input
                                    placeholder="Название списка"
                                    id="list_name"
                                    type="text"
                                    className="yellow-input"
                                    name="list_name"
                                    value={name}
                                    onChange={changeHandler}
                                />
                                <label htmlFor="list_name">Название списка</label>
                            </div>
                        </div>
                        <div className="card-action">
                            <button className="btn yellow darken-4" onClick={addList}>
                                Добавить список
                            </button>
                        </div>
                    </div>
        </div>
    )
}