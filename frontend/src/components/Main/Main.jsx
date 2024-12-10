
import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './Home';
import '../../styles/components/_Main.scss';
import ChartDashboard from './AdminDashboard';
import ChatBot from './ChatBot';
import PrivateRoute from '../PrivateRoute';
import Cookies from 'js-cookie';



import ChatbotKit from 'react-chatbot-kit'
import AdminProfile from './AdminProfile';
import ModChatbot from './ModChatbot'
import ProbandoApi from './ProbandoApi'


import config from '../../elements/Bot/config/config.jsx';
import MessageParser from '../../elements/Bot/MessageParser/MessageParser.jsx';
import ActionProvider from '../../elements/Bot/ActionProvider/ActionProvider.jsx';

import 'react-chatbot-kit/build/main.css'
import '../../css/chatbot/custom-chatbot-kit.css';

//import Error404 from './Error404'; 

function Main() {

  const token = Cookies.get('token'); // Obtiene el token desde las cookies

	const [showChatbot, setShowChatbot] = useState(false);
	return (
		<main > {/* className="boxMain" */}
			     {/* Botón flotante que aparece cuando el chatbot está oculto */}
				 {!showChatbot && (
        <button
          onClick={() => setShowChatbot(!showChatbot)}
          className="chatbot-toggle-button"
        >
          💬 {/* Icono del botón */}
        </button>
      )}

      {/* Contenedor del chatbot */}
      {showChatbot && (
        <div className="chatbot-container">
          <button
            onClick={() => setShowChatbot(false)}
            className="chatbot-close-button"
          >
            ❌ {/* Icono para cerrar el chatbot */}
          </button>
          <ChatbotKit
            config={config}
            messageParser={MessageParser}
            actionProvider={ActionProvider}
          />
        </div>
      )}
			<Routes>
				{/* <Route path="/" element={<Home />} /> */}
        {/* Rutas protegidas */}
          <Route element={<PrivateRoute token={token} />}>
            <Route path="/admin" element={<AdminProfile />} />
            <Route path="/admin/charts" element={<ChartDashboard />} />
            <Route path="/admin/modchatbot" element={<ModChatbot />} />
            <Route path="/admin/probandoapi" element={<ProbandoApi />} />
          </Route>
				<Route path="/chatbot" element={<ChatBot />} />
				{/* <Route path="/chatbotkit" element={<ChatbotKit
					config={config}
					messageParser={MessageParser}
					actionProvider={ActionProvider}
				/>} /> */}
				{/* <Route path="*" element={<Error404 />} />  */}

			</Routes>
		</main>
	);
}

export default Main;
