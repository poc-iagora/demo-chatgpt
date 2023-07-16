import React, { useState, useEffect } from 'react';

const UserMessage = (props) => {
  return <div className="user-message">{props.text}</div>;
};

const BotMessage = (props) => {
  return <div className="bot-message">{props.text}</div>;
};

const ChatbotComponent = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const cachedMessages = JSON.parse(localStorage.getItem('chatMessages')) || [];
    setMessages(cachedMessages);
  }, []);

  useEffect(() => {
    localStorage.setItem('chatMessages', JSON.stringify(messages));
  }, [messages]);

  const handleSendMessage = async (message) => {
    setMessages([...messages, { text: message, sender: 'user' }]);

    try {
      // Faites une requête POST vers votre API backend avec le message de l'utilisateur
      const response = await fetch('URL_DE_VOTRE_API', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Ajoutez l'API Key d'OpenAI à vos en-têtes
          'Authorization': 'Bearer VOTRE_API_KEY',
        },
        body: JSON.stringify({ message }),
      });

      // Vérifiez si la requête a réussi (code de statut 200)
      if (response.ok) {
        const data = await response.json();

        // Récupérez la réponse du chatbot depuis la réponse de l'API
        const botResponse = data.botResponse;

        // Mettez à jour les messages avec la réponse du chatbot
        setMessages([...messages, { text: botResponse, sender: 'bot' }]);
      } else {
        // Gérez les erreurs si la requête a échoué
        console.error('Échec de la requête vers l\'API backend');
      }
    } catch (error) {
      console.error('Erreur lors de la requête vers l\'API backend:', error);
    }
  };

  return (
    <div>
      <div className="chatbox">
        {messages.map((message, index) => {
          if (message.sender === 'user') {
            return <UserMessage key={index} text={message.text} />;
          } else {
            return <BotMessage key={index} text={message.text} />;
          }
        })}
      </div>
      <div>
        <input
          type="text"
          placeholder="Tapez un message..."
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleSendMessage(e.target.value);
              e.target.value = '';
            }
          }}
        />
      </div>
    </div>
  );
};

export default ChatbotComponent;
