const quotes = [
    "En esta isla vivió, durante cuatro largos años, Robinson Crusoe, cuya historia no solamente fascinó y emocionó al mundo entero sino que puso en el mapa del mundo a esta isla en la cual viven ochocientas chilenas y chilenos.",
    "Y durante nuestro Gobierno, vamos a entregar cinco nuevos ‘tiatros’ regionales en Iquique, La Serena, ‘Rancuagua’, Concepción y Punta Arenas.",
    "Si usted maneja, no conduce.",
    "Nunca han mirado las estrellas, la galactea o el fondo del alma? Una cosa es mirar e intentar descubrir y otra cosa ver que es lo sensorial",
    "Marepoto",
    "Tusunami",
    "Es la misma bandera con que hemos ‘cubrido’ tantas veces los féretros de nuestros ‘mártis’",
    "Ha llegado el fin de año, tiempo en que nos preguntamos, qué hicimos bien, qué hicimos mal, qué ‘podimos’ haber hecho mejor"
  ];
  
  /**
   * Gets a random Piñera Quote
   * @returns {string}
   */
  function randomQuote() {
    return quotes[Math.floor(Math.random() * quotes.length)];
  }
  
  module.exports = {
    randomQuote
  };