import { useNavigate } from "react-router-dom"

export default function SelectedProductError() {
   const navigate = useNavigate()
   return <div>
      <h1>something went wrong</h1>
      <button onClick={() => navigate(-1)}>go back</button>
   </div>
}