import { ReactQueryDemo } from '$/pages/HomePage/components/ReactQueryDemo';
import { ZustandDemo } from '$/pages/HomePage/components/ZustandDemo';

export const HomePage = () => {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-bold text-4xl">React Starter Template</h1>

      <h2 className="font-bold text-3xl">Zustand Demo</h2>
      <ZustandDemo />

      <h2 className="font-bold text-3xl">React Query Demo</h2>
      <ReactQueryDemo />
    </div>
  );
};
