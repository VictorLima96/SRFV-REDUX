import { Link } from '@/i18n/navigation';

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto py-10 px-4 animate-fade-in">
      <div className="section-box space-y-6">
        <h1 className="text-3xl font-bold">
          <span className="heading-em">Termos de Serviço</span>
        </h1>

        <p className="text-srfv-text-secondary leading-relaxed">
          Ao criar uma conta no SRFV Games, você concorda em usar a plataforma de forma responsável,
          respeitar os demais usuários e não publicar conteúdo ilegal, ofensivo ou que viole direitos autorais.
        </p>

        <div className="space-y-4 text-srfv-text-secondary leading-relaxed">
          <p><strong className="text-white">1.</strong> Você é responsável pela segurança da sua conta e senha.</p>
          <p><strong className="text-white">2.</strong> Conteúdos enviados podem ser removidos caso violem leis ou regras da comunidade.</p>
          <p><strong className="text-white">3.</strong> Podemos atualizar estes termos quando necessário para melhorar segurança e conformidade.</p>
          <p><strong className="text-white">4.</strong> O uso contínuo da plataforma após alterações significa aceitação dos termos atualizados.</p>
        </div>

        <div className="rounded-srfv-xs border border-white/10 bg-white/5 p-4 text-sm text-srfv-text-muted">
          Versão dos termos: <span className="text-white font-medium">2026-02-26</span>
        </div>

        <div className="pt-2">
          <Link href="/signup" className="btn-primary-srfv inline-flex items-center justify-center px-5 py-2.5">
            Voltar para cadastro
          </Link>
        </div>
      </div>
    </div>
  );
}
