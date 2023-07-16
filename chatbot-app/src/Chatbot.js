import React, { useState, useEffect } from 'react';
import { Chatbot, ChatbotMessage, ChatbotTrigger } from 'react-chatbot-kit';

const UserMessage = (props) => {
  return <ChatbotMessage {...props} isUser />;
};

const BotMessage = (props) => {
  return <ChatbotMessage {...props} />;
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
      <Chatbot
        messages={messages}
        components={{
          ChatbotMessage: BotMessage, // Composant pour les messages du chatbot
          UserMessage: UserMessage, // Composant pour les messages de l'utilisateur
          Trigger: ChatbotTrigger, // Composant pour les déclencheurs de chatbot (boutons, liens, etc.)
        }}
      />
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
