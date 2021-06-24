import React, {useContext} from "react";
import { Link } from "react-router-dom";
import {AuthContext} from "../context/AuthContext";
export const BoardList = ({ boards }) => {
  const {userId} = useContext(AuthContext);
  if (!boards.length) {
    return <p className="center">Досок нету</p>;
  }
  return (
    <div className="row" style={{paddingTop:'5rem'}}>
      {boards.map((board) => {
        if (board.userId===userId){
          return (
              <div key={board._id} className="col s12 m6">
                <div className="card orange">
                  <span className="card-title">{board.name}</span>
                  <Link
                      to={`detail/${board._id}`}
                      className="btn-floating halfway-fab waves-effect waves-light red"
                  >
                    <i className="material-icons">+</i>
                  </Link>
                  <div className="card-content">
                    <p>
                      I am a very simple card. I am good at containing small bits of
                      information. I am convenient because I require little markup
                      to use effectively.
                    </p>
                  </div>
                </div>
              </div>
          );
        }else return (
            <div key={board._id} className="col s12 m6">
              <div className="card">
                <span className="card-title">{board.name}</span>
                <Link
                    to={`detail/${board._id}`}
                    className="btn-floating halfway-fab waves-effect waves-light red"
                >
                  <i className="material-icons">+</i>
                </Link>
                <div className="card-content">
                  <p>
                    I am a very simple card. I am good at containing small bits of
                    information. I am convenient because I require little markup
                    to use effectively.
                  </p>
                </div>
              </div>
            </div>
        );

      })}
    </div>
  );
};
