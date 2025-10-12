import AppRouter from './router/AppRouter';
import ErrorBoundary from './components/shared/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <div className="flex flex-col h-screen w-full overflow-hidden bg-gray-50">
        <AppRouter />
      </div>
    </ErrorBoundary>
  );
}

export default App;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              