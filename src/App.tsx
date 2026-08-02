import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { TopNavBar } from './components/TopNavBar';
import { Footer } from './components/Footer';
import { HomeScreen } from './components/HomeScreen';
import { DashboardScreen } from './components/DashboardScreen';
import { RoutineDetailScreen } from './components/RoutineDetailScreen';
import { AccessProtocolModal } from './components/AccessProtocolModal';
import { ProgramsScreen } from './components/ProgramsScreen';
import { CalendarScreen } from './components/CalendarScreen';
import { NewRoutineModal } from './components/NewRoutineModal';
import { AnimatePresence, motion } from 'motion/react';

const MainAppContent: React.FC = () => {
  const { currentView } = useApp();
  const [isNewRoutineOpen, setIsNewRoutineOpen] = useState(false);

  // For 'login' view, render full screen without standard header/footer layout to match the design screenshot
  if (currentView === 'login') {
    return <AccessProtocolModal />;
  }

  return (
    <div className="min-h-screen bg-[#131313] text-[#e2e2e2] flex flex-col font-body-md selection:bg-[#c3f400] selection:text-[#161e00]">
      <TopNavBar />

      <main className="flex-grow w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="w-full h-full"
          >
            {currentView === 'home' && <HomeScreen />}
            {currentView === 'dashboard' && (
              <DashboardScreen onOpenNewRoutine={() => setIsNewRoutineOpen(true)} />
            )}
            {currentView === 'routine_detail' && <RoutineDetailScreen />}
            {currentView === 'programs' && <ProgramsScreen />}
            {currentView === 'calendar' && <CalendarScreen />}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />

      <NewRoutineModal
        isOpen={isNewRoutineOpen}
        onClose={() => setIsNewRoutineOpen(false)}
      />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}
