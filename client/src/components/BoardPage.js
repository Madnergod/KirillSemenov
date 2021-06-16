import React from "react";

export const BoardPage = ({board}) =>{
    return(
            <>
                <div>
                    <h2>Ссылка</h2>
                    <p>Ваша Доска:{board.name}</p>
                </div>
            </>

    )
}