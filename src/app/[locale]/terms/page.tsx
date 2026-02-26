import { Link } from '@/i18n/navigation';

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto py-10 px-4 animate-fade-in">
      <div className="section-box space-y-6">
        <h1 className="text-3xl font-bold">
          <span className="heading-em">Termos de Serviço</span>
        </h1>

        <p className="text-srfv-text-secondary leading-relaxed">
          Estes Termos de Serviço regulam o uso da plataforma SRFV Games. Ao criar conta, acessar
          ou utilizar os serviços, você declara que leu e concorda com estes termos.
        </p>

        <div className="space-y-5 text-srfv-text-secondary leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-white font-semibold">1. Conta e acesso</h2>
            <p>
              Você é responsável pelas informações fornecidas no cadastro e pela segurança da sua conta,
              incluindo senha e dispositivos utilizados. É proibido compartilhar credenciais ou tentar acessar
              contas de terceiros sem autorização.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-white font-semibold">2. Conduta do usuário</h2>
            <p>
              O uso da plataforma deve respeitar a legislação aplicável e as regras da comunidade. Não é permitido
              publicar conteúdo ilegal, ofensivo, discriminatório, malicioso, fraudulento ou que viole direitos de terceiros.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-white font-semibold">3. Conteúdo e propriedade intelectual</h2>
            <p>
              Você mantém a responsabilidade pelo conteúdo que envia. Ao publicar conteúdo na plataforma,
              você declara possuir os direitos necessários para esse envio. Conteúdos que violem direitos autorais
              ou regras da plataforma podem ser removidos sem aviso prévio.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-white font-semibold">4. Privacidade e LGPD</h2>
            <p>
              Dados pessoais são tratados para operação da conta, autenticação e segurança da plataforma,
              em conformidade com a LGPD (Lei nº 13.709/2018). Você pode solicitar atualização, correção
              ou exclusão de dados pessoais pelos canais oficiais de suporte do projeto.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-white font-semibold">5. Suspensão e encerramento</h2>
            <p>
              A conta poderá ser suspensa ou encerrada em caso de violação destes termos, uso abusivo,
              tentativa de fraude, exploração de vulnerabilidades ou qualquer conduta que comprometa a
              segurança e a integridade da plataforma.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-white font-semibold">6. Limitação de responsabilidade</h2>
            <p>
              A plataforma é fornecida no estado em que se encontra. Empregamos esforços razoáveis para manter
              disponibilidade e segurança, mas não garantimos funcionamento ininterrupto ou ausência total de falhas.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-white font-semibold">7. Atualizações destes termos</h2>
            <p>
              Estes termos podem ser alterados periodicamente para refletir melhorias, requisitos legais e medidas de segurança.
              O uso contínuo da plataforma após a publicação de nova versão representa aceite dos termos atualizados.
            </p>
          </section>
        </div>

        <div className="rounded-srfv-xs border border-white/10 bg-white/5 p-4 text-sm text-srfv-text-muted space-y-1">
          <p>
            Última atualização: <span className="text-white font-medium">26/02/2026</span>
          </p>
          <p>
            Versão dos termos: <span className="text-white font-medium">2026-02-26</span>
          </p>
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
