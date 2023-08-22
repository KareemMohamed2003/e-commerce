import React, { PropsWithChildren } from "react";

import "../sass/card.scss";

function Card({ children }: PropsWithChildren) {
   return (
      
      <div className="card-overlay ">
            {children}
         </div>

)
}

export default Card;
