import { Header } from '@/components/Header';
import { KanbanBoard } from '@/components/kanban/KanbanBoard';

const Index = () => {
  return (
    <div 
      className="min-h-screen"
      style={{
        background: 'linear-gradient(135deg, hsl(224 76% 95%) 0%, hsl(280 60% 95%) 50%, hsl(45 80% 95%) 100%)'
      }}
    >
      <Header />
      <KanbanBoard />
    </div>
  );
};

export default Index;
