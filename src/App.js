import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [resultado, setResultado] = useState('');
  const [emoji, setEmoji] = useState(null);
  const [animacaoInicial, setAnimacaoInicial] = useState(true);
  const [backgroundColor, setBackgroundColor] = useState('white');

  const calcularIMC = () => {
    setAnimacaoInicial(false);
    setEmoji(null);
    setResultado('');

    const pesoNum = parseFloat(peso);
    let alturaNum = parseFloat(altura);

    if (isNaN(pesoNum) || isNaN(alturaNum) || pesoNum <= 0 || alturaNum <= 0) {
      setResultado('Por favor, insira valores válidos para peso e altura.');
      setEmoji(null);
      return;
    }

    alturaNum = alturaNum / 100;
    const imc = pesoNum / (alturaNum * alturaNum);
    let classificacao = '';

    setTimeout(() => {
      if (imc < 18.5) {
        classificacao = 'Abaixo do peso';
        setEmoji("https://cdn-icons-mp4.flaticon.com/512/11175/11175745.mp4");
        setBackgroundColor('#ADD8E6');
      } else if (imc < 24.9) {
        classificacao = 'Peso normal';
        setEmoji("https://cdn-icons-mp4.flaticon.com/512/11175/11175727.mp4");
        setBackgroundColor('#90EE90');
      } else if (imc < 29.9) {
        classificacao = 'Sobrepeso';
        setEmoji("https://cdn-icons-mp4.flaticon.com/512/11175/11175731.mp4");
        setBackgroundColor('#FFD700');
      } else {
        classificacao = 'Obesidade';
        setEmoji("https://cdn-icons-mp4.flaticon.com/512/11175/11175772.mp4");
        setBackgroundColor('#FF6347');
      }

      setResultado(`Seu IMC é de: ${imc.toFixed(2)} - ${classificacao}`);

    }, 100);
  }

  useEffect(() => {
    document.body.style.backgroundColor = backgroundColor;
    document.body.style.transition = 'background-color 0.5s ease';

    return () => {
      document.body.style.backgroundColor = 'white';
    };
  }, [backgroundColor]);

  const handleSubmit = (e) => {
    e.preventDefault();
    calcularIMC();
  };

  return (
    <div className='container'>

      <h1>Calculadora de IMC</h1>
      <p>Insira seu peso e altura para calcular seu Índice de Massa Corporal (IMC).</p>

      <form onSubmit={handleSubmit}>
        <label htmlFor="peso">Peso (kg):</label>
        <input
          type="number"
          id="peso"
          value={peso}
          onChange={(e) => setPeso(e.target.value)}
          placeholder="Ex: 70.5"
          step={0.1}
        />

        <label htmlFor="altura">Altura (cm):</label>
        <input
          type="number"
          id="altura"
          value={altura}
          onChange={(e) => setAltura(e.target.value)}
          placeholder="Ex: 175"
        />

        <button type='submit'
          aria-label="Calcular IMC"
        >
          Calcular IMC
        </button>
      </form>

      {
        resultado && (
          <div id="resultado">
            {emoji && (
              <video
                className="emoji-animado fade-in"
                autoPlay
                muted
                playsInline
              >
                <source src={emoji} type="video/mp4" />
              </video>
            )}
            <p>{resultado}</p>
          </div>
        )
      }

      {
        animacaoInicial && (
          <div id="emoji">
            <video
              className="emoji-animado fade-in"
              autoPlay
              loop
              muted
              playsInline
              aria-hidden="true"
            >
              <source src={"https://cdn-icons-mp4.flaticon.com/512/15579/15579038.mp4"} type="video/mp4" />
            </video>
          </div>
        )
      }

      <h2>Classificações de IMC</h2>
      <ul>
        <li>Abaixo do peso: IMC menor que 18.5</li>
        <li>Peso normal: IMC entre 18.5 e 24.9</li>
        <li>Sobrepeso: IMC entre 25 e 29.9</li>
        <li>Obesidade: IMC 30 ou mais</li>
      </ul>
    </div >
  );
}

export default App;