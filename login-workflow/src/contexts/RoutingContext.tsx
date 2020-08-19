import { createContext, useContext } from 'react';
import { RouteConfig } from '../screens/AuthNavigationContainer';

type RoutingContextType = {
    routes: Required<RouteConfig>;
};

export const RoutingContext = createContext<RoutingContextType | null>(null);

export const useRoutes = (): RoutingContextType => {
    const context = useContext(RoutingContext);
    if (context === null) {
        throw new Error('useRoutes must be used within a RoutingContextProvider');
    }
    return context;
};
