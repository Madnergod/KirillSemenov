import React, { useCallback, useContext, useEffect, useState } from "react";
import { useHttp } from "../hooks/http.hook";
import { AuthContext } from "../context/AuthContext";
import { useParams } from "react-router-dom";
import { Draggable,Droppable} from "react-beautiful-dnd";
import {useMessage} from "../hooks/message.hook";


export const Lists = ({ board,cards,getCards }) => {
  const message = useMessage()
  const [list, setList] = useState([]);
  const [name, setName] = useState("");
  const [activity, setActivity] = useState([]);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [user, setUser] = useState([]);
  const [description, setDescription] = useState([]);
  const { request } = useHttp();
  const { token, userId } = useContext(AuthContext);
  const boardId = useParams();
  let isCurrentUser = false;
  const id = boardId.id;
  let counter = 0;

  const getList = useCallback(async () => {
    try {
      const fetched = await request(
        "/api/list",
        "POST",
        { id },
        {
          Authorization: `Bearer ${token}`,
        }
      );
      setList(fetched);
    } catch (e) {
      console.log(e);
    }
  }, [request, token, id]);
  const getComments = useCallback(async () => {
    try {
      const fetched = await request("/api/comments/get", "GET", null, {
        Authorization: `Bearer ${token}`,
      });
      setComments(fetched);
    } catch (e) {}
  }, [request,token]);

  const getUser = useCallback(async () => {
    try {
      const fetched = await request("/api/auth/getById", "POST", null, {
        Authorization: `Bearer ${token}`,
      });
      setUser(fetched);
    } catch (e) {}
  }, [request,token]);

  const getActivity = useCallback(async () => {
    try {
      const fetched = await request("/api/activity", "POST", null, {
        Authorization: `Bearer ${token}`,
      });
      setActivity(fetched);
    } catch (e) {

    }
  },[request,token]);

  useEffect(() => {
    getList();
    getComments();
    getUser();
    getActivity();
    return () => setList([]);
  }, [getList, getComments,getActivity,getUser]);

  async function addCard(id) {
    if (name){
      await request(
          "/api/card/add",
          "POST",
          { name, id},
          {
            Authorization: `Bearer ${token}`,
          }
      );
      setName("");
      await getCards();
    }
    message('Вы не ввели название')
  }

  function changeName(event) {
    setName(event.target.value);
  }

  async function deleteButton(id) {
    await request(
      "/api/list/delete",
      "DELETE",
      { id },
      {
        Authorization: `Bearer ${token}`,
      }
    );
    getList();
  }

  function openCard(id) {
    const modal = document.getElementById(`${id}`);
    modal.classList.toggle("all");
    modal.parentElement.classList.toggle("all");
    const body = document.body;
    body.classList.toggle("no-scroll");
  }

  function changeComments(event) {
    setComment(event.target.value);
  }

  async function sendComment(id) {
    if (!comment) {
      return alert("Вы оставили поле пустым");
    }
    const coment = await request(
      "/api/comments/add",
      "POST",
      { comments: comment, id: id, userEmail: user.email},
      {
        Authorization: `Bearer ${token}`,
      }
    );
    comments.push(coment)
    await getActivity();
    setComment("");
  }
  if (board) {
    if (board.userId === userId) {
      isCurrentUser = true;
    }
  }

  async function cardDelete(id) {
    await request(
      "/api/card/delete",
      "DELETE",
      {
        id: id,
      },
      {
        Authorization: `Bearer ${token}`,
      }
    );
    await getCards();
  }

  function changeDescription(event) {
    setDescription(event.target.value);
    console.log(description);
  }

  async function sendDescription(id) {
    await request(
      "/api/card/update",
      "PATCH",
      {
        description: description,
        id: id,
      },
      {
        Authorization: `Bearer ${token}`,
      }
    );
    await getCards();
    await getActivity();
  }


  return list.map((item) => {
    return (

        <div key={item._id}
          className="col s6"
          style={{ border: "1px solid lightgrey", borderRadius: 2 ,display:"flex",flexDirection:"column"}}
        >
          <div style={{display:"flex",justifyContent:"space-between"}}>
            <h4>
              {item.name}
            </h4>
            <div className="mdiv right">
              <div
                  className="md right"
                  onClick={() => {
                    deleteButton(item._id);
                  }}
              >

              </div>
            </div>
          </div>

          <Droppable droppableId={item._id}>
            {(provided) => (
              <ul
                  style={{flexGrow:1,minHeight:320}}
                className="collection"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {cards.map((card, index) => {
                  let isCardDescription;
                  if (card.description) {
                    isCardDescription = true;
                  } else isCardDescription = false;
                  if (card.listId === item._id) {
                    return (
                      <Draggable
                        key={card._id}
                        draggableId={card._id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                          >
                            <li
                              className="collection-item"
                              onClick={() => openCard(card._id)}
                            >
                              {card.name}
                            </li>
                            <div
                              id={`${card._id}`}
                              className="modal"
                              style={{ overflow: "hidden" }}
                            >
                              <div className="row">
                                <div className="col s2 actions">
                                  <div
                                    className="modal-close mdiv right"
                                    onClick={() => {
                                      openCard(card._id);
                                    }}
                                  >
                                    <div className="md right"></div>
                                  </div>
                                </div>
                                {isCurrentUser && (
                                  <button
                                    className="btn red right"
                                    onClick={() => {
                                      cardDelete(card._id);
                                    }}
                                  >
                                    Delete Card
                                  </button>
                                )}
                                <div className="col s6 modal-content">
                                  <h4>{card.name}</h4>
                                  {isCardDescription && (
                                    <p>{card.description}</p>
                                  )}
                                  {!isCardDescription && (
                                    <>
                                      <label>Добавить описание</label>
                                      <input
                                        className="input-field"
                                        value={description}
                                        onChange={changeDescription}
                                        required={true}
                                      ></input>
                                      <button
                                        className="btn indigo"
                                        onClick={() => {
                                          sendDescription(card._id);
                                        }}
                                      >
                                        Добавить описание
                                      </button>
                                    </>
                                  )}

                                  {comments.map((comment) => {
                                    if (comment.cardId === card._id) {
                                      return (
                                        <p key={comment._id}>
                                          {comment.userEmail}: {comment.text}
                                        </p>
                                      );
                                    } else {
                                      counter++;
                                      if (counter === comments.length) {
                                        return (
                                          <p key={comment._id}>
                                            Комментариев нету
                                          </p>
                                        );
                                      } else {
                                        counter = 0;
                                      }
                                    }
                                  })}
                                  <input
                                    value={comment}
                                    onChange={changeComments}
                                    required={true}
                                    minLength={6}
                                  ></input>
                                  <button
                                    className="btn waves-effect waves-light"
                                    type="submit"
                                    onClick={() => sendComment(card._id)}
                                  >
                                    Save
                                  </button>
                                </div>
                                <div className="col s4 card-activity">
                                  {activity.map((item) => {
                                    if (item.cardId === card._id) {
                                      return <p key={item._id}>{item.text}</p>;
                                    }
                                  })}
                                </div>
                              </div>
                            </div>
                          </div>

                        )}
                      </Draggable>
                    );
                  }
                })}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
          <div style={{ display: "flex" }}>
            <input onChange={changeName}></input>
            <button
                className="btn green"
                style={{ marginTop: 10, marginLeft: 10 }}
                onClick={() => addCard(item._id)}
            >
              Add
            </button>
          </div>
        </div>

    );
  });
};
