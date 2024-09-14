import PIEquationCalculator from '../components/pi-equation-calculator';
import Header from '../components/Header';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Header />
      <div className="flex-grow p-0 pb-4 sm:p-8 md:p-12 w-full">
        <PIEquationCalculator />
      </div>
      <footer className="w-full text-center py-4 text-sm text-muted-foreground">
        The PIE Equation was created by Alex Harmozi
      </footer>
    </main>
  );
}
