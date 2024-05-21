import { createContext, useContext, useState, ReactNode } from "react";

/**
 * Interface for the navigation context
 */
interface NavigationContextType {
    canAccess: boolean;
    setCanAccess: (access: boolean) => void;
}

/**
 * Context for the navigation provider
 */
const NavigationContext = createContext<NavigationContextType | undefined>(
    undefined
);

/**
 * function to wrap the children in the NavigationProvider
 * @param param0 the children
 * @returns navigation context provider
 */
export const NavigationProvider = ({ children }: { children: ReactNode }) => {
    const [canAccess, setCanAccess] = useState(false);

    return (
        <NavigationContext.Provider value={{ canAccess, setCanAccess }}>
            {children}
        </NavigationContext.Provider>
    );
};

/**
 * function to get the navigation context
 * @returns the navigation context
 */
export const useNavigation = () => {
    const context = useContext(NavigationContext);
    if (!context) {
        throw new Error(
            "useNavigation must be used within a NavigationProvider"
        );
    }
    return context;
};
