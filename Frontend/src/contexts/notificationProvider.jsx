import { useState,useContext,createContext } from "react";

const NotificationContext = createContext();

export const useNotification = () => {
    return useContext(NotificationContext);
};

export const NotificationProvider = ({ children }) => {
    const [notification, setNotification] = useState(null);

    const addNotification = (notification) => {
        if (notification) {
            setNotification(null);
            setTimeout(() => {
                setNotification(notification);
            }, 200);
        }
        else {
            setNotification(notification);
        }
        setTimeout(() => {
            setNotification(null);
        }, 3000);
    };

    return (
        <NotificationContext.Provider
            value={{ addNotification }}
        >
            <div className={`fixed top-4 left-1/2 -translate-x-1/2 ${notification ? 'translate-y-0' : '-translate-y-16'} transition-transform duration-300 ease-in-out text-white text-2xl bg-green-700 p-4 rounded-full z-50`}>{notification && <p className="w-full h-full text-center">{notification}</p>}</div>
            {children}
        </NotificationContext.Provider>
    );
};