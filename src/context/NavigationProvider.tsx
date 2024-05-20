import { createContext, useContext, useState, ReactNode } from "react";

interface NavigationContextType {
    canAccess: boolean;
    setCanAccess: (access: boolean) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(
    undefined
);

export const NavigationProvider = ({ children }: { children: ReactNode }) => {
    const [canAccess, setCanAccess] = useState(false);

    return (
        <NavigationContext.Provider value={{ canAccess, setCanAccess }}>
            {children}
        </NavigationContext.Provider>
    );
};

export const useNavigation = () => {
    const context = useContext(NavigationContext);
    if (!context) {
        throw new Error(
            "useNavigation must be used within a NavigationProvider"
        );
    }
    return context;
};
