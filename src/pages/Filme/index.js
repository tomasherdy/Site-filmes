import { useEffect, useState } from 'react';
import {useParams, useNavigate} from 'react-router-dom'
import api from '../../services/api';
import './filme-info.css'
import { toast } from 'react-toastify';

function Filme(){
  const{id} = useParams();
  const navigate = useNavigate();

  const [filme, setFilme] = useState({});
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    async function loadFilme() {
    await api.get(`/movie/${id}`,
    {params:{
      api_key: "a252df8dc13910bd12fa64ca3e7ff907",
      language: "pt-BR"
     }
    })
    .then((response)=>{
      setFilme(response.data);
      setLoading(false);
    })
    .catch(()=>{
      console.log("FILME NAO ENCONTRADO")
      navigate("/", {replace: true});
      return;
    })
  }

    loadFilme();


    return() => {
      console.log("COMPONENTE FOI DESMOTADO")
    }
   },[navigate, id])

   function salvarFilme(){
    const minhalista = localStorage.getItem("@primeflix")

    let filmesSalvos = JSON.parse(minhalista) || []

    const hasFilme = filmesSalvos.some((filmesSalvo)=> filmesSalvo.id === filme.id)

    if (hasFilme){
      toast.warn("esse filme ja esta na lista")
      return;
    }

    filmesSalvos.push(filme);
    localStorage.setItem("@primeflix", JSON.stringify(filmesSalvos));
    toast.sucess("filme salvo com sucesso!")


   }

   if(loading){
    return(
    <div className="filme-info">
      <h1>Carregando detalhes</h1>
    </div>
   )
  }

  return(
    <div className="filme-info">
      <h1>{filme.title}</h1>
      <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title} />

      <h3>sinopse</h3>
      <span>{filme.overview}</span>
      <strong> Avaliação: {filme.vote_average} / 10</strong>

      <div className="area-botao">
        <button onClick={salvarFilme}>Salvar</button>
        <button>
          <a targer="blank" rel="external" href={`https://youtube.com/results?search_query=${filme.title} trailer`}>Trailer</a>
        </button>

      </div>

    </div>
  )
}

export default Filme;
