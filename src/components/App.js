import { useState } from 'react';
import FormData from 'form-data';
import axios from 'axios';

function App() {

  const [file, setFile] = useState()
  const [ipfsHash, setIPFSHASH] = useState('')
 
  const handleFile=async (fileToHandle) =>{    

    console.log('começando')

    // inicializa o form data
    const formData = new FormData()

    // adiciona o arquivo ao form data 
    formData.append("file", fileToHandle)

    // armazena as chaves
    const API_KEY = "9f6052849e81cca8eee4"
    const API_SECRET = "1c35ddeb9ed231e7e610647f8d13bb74f52cf35bc36e3cc17ed96db5c9069534"

    // o endpoint necessário para upload o arquivo
    const url =  `https://api.pinata.cloud/pinning/pinFileToIPFS`

    const response = await axios.post(
      url,
      formData,
      {
          maxContentLength: "Infinity",
          headers: {
              "Content-Type": `multipart/form-data;boundary=${formData._boundary}`, 
              'pinata_api_key': API_KEY,
              'pinata_secret_api_key': API_SECRET

          }
      }
  )

  console.log(response)
  // obtem o hash
  setIPFSHASH(response.data.IpfsHash)  
  }
  
  return (
    <div className="App">
      <input type="file" onChange={(event)=>setFile(event.target.files[0])}/>
      <button onClick={()=>handleFile(file)}>Enviar</button>        
    {
      //  mostra a imagem
      ipfsHash.length > 0 && <img height='200' src={`https://gateway.pinata.cloud/ipfs/${ipfsHash}`} alt='not loading'/>
    }
    
    </div>
  );
}

export default App;