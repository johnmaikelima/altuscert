'use client';

import { Suspense } from 'react';
import CheckoutContent from './checkout-content';

export default function CheckoutPage() {
  return (
    <Suspense fallback={<CheckoutLoading />}>
      <CheckoutContent />
    </Suspense>
  );
}

function CheckoutLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-black text-white flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500 mb-4"></div>
        <p className="text-slate-400">Carregando...</p>
      </div>
    </div>
  );
}
