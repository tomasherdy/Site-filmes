import {useEffect, useState } from 'react'
import './favoritos.css'
import {Link} from 'react-router-dom'
import {toast} from 'react-toastify'

function Favoritos(){

const [filmes, setFilmes] = useState([])

useEffect (()=>{

  const minhalista = localStorage.getItem("@primeflix");
  setFilmes(JSON.parse(minhalista) || [])

}, [])

function excluirfilme(id){
let filtrofilmes = filmes.filter((filme)=>{
  return(filme.id !== id)
})
 setFilmes(filtrofilmes);
 localStorage.setItem("@primeflix", JSON.stringify(filtrofilmes))
 toast.success("Filme removido com sucesso")
}

return(
  <div className="meus-filmes">
    <h1>Minha lista de filmes</h1>

    {filmes.length === 0 && <span>Voce nao possui nenhum filme salvo</span>}

    <ul>
    {filmes.map((filme)=> {
      return(
        <li key={filme.id}>
          <span>{filme.title}</span>
          <div>
          <Link to={`filme/${filme.id}`}> Ver Detalhes</Link>
          <button onClick={()=>excluirfilme(filme.id)}>Excluir</button>
          </div>
        </li>
      )
    })}
    </ul>

  </div>
  )
}

export default Favoritos;
