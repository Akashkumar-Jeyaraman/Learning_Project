import './App.css';
import { Comments } from './components/Comments';
import ErrorBoundary from './ErrorBoundary';
function App() {
  return (
    <div className="App">
      <ErrorBoundary>
      <Comments/>
      </ErrorBoundary>

    </div>
  );
}

export default App;
