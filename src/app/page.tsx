import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import TopBar from './components/TopBar';

export default function Home() {
  
  return (
    <div className="min-h-screen flex flex-col">
      <TopBar />
      <div className="flex flex-1">
        <Sidebar />
        <MainContent />
      </div>
    </div>
  );
}