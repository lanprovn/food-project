import AppRouter from './router/AppRouter';
import ErrorBoundary from './components/shared/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <div id="app-wrapper" className="w-screen h-screen overflow-hidden bg-white">
        <AppRouter />
      </div>
    </ErrorBoundary>
  );
}

export default App;
