import Link from 'next/link';
import { WHATSAPP } from '@/lib/constants';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-white font-bold mb-4">CertDigital</h3>
            <p className="text-sm">Emissão de certificados digitais A1 com segurança e rapidez.</p>
          </div>
          <div>
            <h3 className="text-white font-bold mb-4">Contato</h3>
            <p className="text-sm">WhatsApp: {WHATSAPP.numero_formatado}</p>
          </div>
          <div>
            <h3 className="text-white font-bold mb-4">Legal</h3>
            <p className="text-sm">© 2024 CertDigital. Todos os direitos reservados.</p>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 text-center text-sm">
          <p>Desenvolvido com ❤️ para facilitar sua vida digital</p>
        </div>
      </div>
    </footer>
  );
}
