
import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Button } from "@/components/ui/button";

interface ErrorFallbackProps {
  navigate: (path: string) => void;
}

const ErrorFallback: React.FC<ErrorFallbackProps> = ({ navigate }) => {
  return (
    <MainLayout>
      <div className="container mx-auto py-6">
        <h1 className="text-2xl font-bold text-red-500">Error loading form</h1>
        <p>There was a problem initializing the form. Please try again.</p>
        <Button onClick={() => navigate('/categories')}>Back to Categories</Button>
      </div>
    </MainLayout>
  );
};

export default ErrorFallback;
