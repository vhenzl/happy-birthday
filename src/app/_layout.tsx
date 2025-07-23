import { runMigrations } from '@/data/migrations';
import { SplashScreen, Stack } from 'expo-router';
import { openDatabaseSync } from 'expo-sqlite';
import { createContext, Suspense, use, useContext } from 'react';
import { ActivityIndicator } from 'react-native';
import 'react-native-get-random-values';

SplashScreen.preventAutoHideAsync();

function createServices() {
  const db = openDatabaseSync('happy-birthday.db');
  return { db };
}

export type Services = ReturnType<typeof createServices>;

const ServicesContext = createContext<Services | null>(null);

export function useServiceLocator(): Services {
  const services = useContext(ServicesContext);
  if (!services) {
    throw new Error('ServicesContext is not available');
  }
  return services;
}

async function setup() {
  await runMigrations(services.db);
  await SplashScreen.hideAsync();
}

const services = createServices();

function ServicesProvider({ children }: { children: React.ReactNode }) {
  return (
    <ServicesContext.Provider value={services}>
      {children}
    </ServicesContext.Provider>
  );
}

const setupPromise = setup();

function AppSetup({ children }: { children: React.ReactNode }) {
  use(setupPromise);
  return <>{children}</>;
}

/**
 * Expo does not have an obvious entry point, the top-level layout serves as one.
 * This Main component is used to keep the entry point logic and the layout separated.
 */
function Main({ children }: { children: React.ReactNode }) {
  // TODO: Add ErrorBoundary to handle errors in the app setup
  // TODO: Extract the suspense fallback to a separate component with proper styling
  //  (Although the fallback shouldn't be visible thanks to the splash screen.)
  return (
    <ServicesProvider>
      <Suspense fallback={<ActivityIndicator size="large" />}>
        <AppSetup>
          {children}
        </AppSetup>
      </Suspense>
    </ServicesProvider>
  );
}

export default function RootLayout() {
  return (
    <Main>
      <Stack />
    </Main>
  );
}
