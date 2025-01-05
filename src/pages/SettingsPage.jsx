import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

const SettingsPage = () => {
    const { theme, setTheme, language, setLanguage, username, setUsername } = useContext(UserContext);

    return (
        <div>
            <h1>Configuración</h1>
            <div>
                <label>User Name:</label>
                <input 
                    type="text" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                />
            </div>
            <div>
                <label>Theme :</label>
                <select value={theme} onChange={(e) => setTheme(e.target.value)}>
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                </select>
            </div>
            <div>
                <label>Language:</label>
                <select value={language} onChange={(e) => setLanguage(e.target.value)}>
                    <option value="us">English</option>
                    <option value="es">Spanish</option>
                </select>
            </div>
        </div>
    );
};

export default SettingsPage;
