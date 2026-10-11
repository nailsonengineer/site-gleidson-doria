import { useState, useEffect } from 'react';

import { Home } from './pages/Home/Home';

import { ClientLogin } from './pages/ClientLogin/ClientLogin';

import { ClientDashboard } from './pages/ClientDashboard/ClientDashboard';

import { AdminLogin } from './pages/AdminLogin/AdminLogin';

import { AdminDashboard } from './pages/AdminDashboard/AdminDashboard';

import { IntroVideo } from './components/IntroVideo';


export function App() {

    const [currentRoute, setCurrentRoute] = useState<string>(window.location.hash || '#inicio');

    // Verifica se já assistiu ao vídeo nesta sessão do navegador

    const [showIntro, setShowIntro] = useState<boolean>(() => {

        return !sessionStorage.getItem('gleidson_intro_watched');

    });


    useEffect(() => {

        const handleHashChange = () => {

            setCurrentRoute(window.location.hash || '#inicio');

        };


        window.addEventListener('hashchange', handleHashChange);

        return () => window.removeEventListener('hashchange', handleHashChange);

    }, []);


    const handleCompleteIntro = () => {

        sessionStorage.setItem('gleidson_intro_watched', 'true');

        setShowIntro(false);

    };


    if (currentRoute === '#cliente/login') return <ClientLogin />;

    if (currentRoute === '#cliente/dashboard') return <ClientDashboard />;

    if (currentRoute === '#admin/login') return <AdminLogin />;

    if (currentRoute === '#admin/dashboard') return <AdminDashboard />;



    if (showIntro && (currentRoute === '#inicio' || currentRoute === '')) {

        return (

            <IntroVideo

                onComplete={handleCompleteIntro}

                videoSrc="/videoGleidson.mp4"

            />

        );

    }

    return <Home />;

}


export default App; 