import { createContext, useContext } from 'react';
import { RouteConfig } from '../routing/AuthNavigationContainer';

type RoutingContextType = {
    routes: Required<RouteConfig>;
};

/**
 * Context Provider that gives access to the custom routes defined for the public routes (pre authentication).
 *
 * @param routes A object containing the required routes and their respective paths
 *
 * @category Component
 */
export const RoutingContext = createContext<RoutingContextType | null>(null);

export const useRoutes = (): RoutingContextType => {
    const context = useContext(RoutingContext);
    if (context === null) {
        throw new Error('useRoutes must be used within a RoutingContextProvider');
    }
    return context;
};
