window.MENTAL_MAPS = window.MENTAL_MAPS || {};
window.MENTAL_MAPS.seguranca = {
  id: "seguranca",
  code: "MC942 · MO639",
  title: "Segurança Computacional",
  center: "Segurança",
  centerNote: "Propriedades + ameaças + políticas + mecanismos",
  description: "Fundamentos de segurança com Stallings como referência conceitual.",
  branches: [
    {
      title: "Objetivos de segurança",
      color: "#bd4b55",
      concepts: [
        {
          id: "cia",
          name: "Tríade CIA",
          definition: "Confidencialidade restringe acesso indevido; integridade protege contra alterações não autorizadas; disponibilidade mantém recursos acessíveis quando necessários.",
          exam: "Saiba identificar qual propriedade está sendo violada em um cenário e perceba que um incidente pode afetar mais de uma propriedade.",
          example: "Sniffing ameaça confidencialidade; adulteração ameaça integridade; DDoS ameaça disponibilidade.",
          links: ["Confidencialidade", "Integridade", "Disponibilidade"],
          question: "Dê um exemplo de violação para cada elemento da tríade CIA.",
          answer: "Leitura não autorizada viola confidencialidade; alteração indevida viola integridade; impedir acesso legítimo a um serviço viola disponibilidade."
        },
        {
          id: "authenticity",
          name: "Autenticidade",
          definition: "Propriedade relacionada à confiança de que uma entidade, mensagem ou origem é realmente aquilo que afirma ser.",
          exam: "Não confunda autenticidade com confidencialidade. Saber quem enviou uma mensagem não significa escondê-la.",
          example: "Verificar uma assinatura digital pode ajudar a confirmar a origem de uma mensagem.",
          links: ["Autenticação", "Assinatura digital", "Integridade"],
          question: "Autenticidade e confidencialidade são a mesma propriedade?",
          answer: "Não. Autenticidade trata da legitimidade da identidade ou origem; confidencialidade trata de impedir leitura por quem não está autorizado."
        }
      ]
    },
    {
      title: "Identidade e acesso",
      color: "#4e9b8f",
      concepts: [
        {
          id: "authentication-authorization",
          name: "Autenticação × autorização",
          definition: "Autenticação verifica quem é a entidade. Autorização determina quais operações essa entidade pode realizar.",
          exam: "A pergunta mental é simples: autenticação = quem é você? autorização = o que você pode fazer?",
          example: "Login confirma identidade; permissões de arquivo determinam se o usuário pode ler ou alterar um recurso.",
          links: ["Controle de acesso", "ACL", "Kernel"],
          question: "Um usuário autenticado está automaticamente autorizado a acessar qualquer recurso?",
          answer: "Não. A identidade pode estar corretamente autenticada, mas cada recurso ainda pode exigir permissões específicas."
        },
        {
          id: "accountability",
          name: "Responsabilização",
          definition: "Capacidade de associar ações a entidades, permitindo rastreamento, auditoria e atribuição de responsabilidade.",
          exam: "Logs sem identidade confiável ou sem proteção de integridade podem não oferecer boa responsabilização.",
          example: "Registros de auditoria mostram qual usuário alterou uma configuração e em que momento.",
          links: ["Auditoria", "Logs", "Não repúdio"],
          question: "Qual é a finalidade de accountability em segurança?",
          answer: "Permitir que ações sejam atribuídas a entidades identificáveis, apoiando auditoria, investigação e responsabilização."
        },
        {
          id: "nonrepudiation",
          name: "Não repúdio",
          definition: "Propriedade voltada a reduzir a possibilidade de uma parte negar posteriormente uma ação ou mensagem que realizou.",
          exam: "Associe frequentemente a assinaturas digitais e evidências verificáveis.",
          example: "Uma assinatura digital verificável pode fornecer evidência de que determinada chave privada foi usada para assinar um documento.",
          links: ["Assinatura digital", "Autenticidade", "Responsabilização"],
          question: "Que propriedade busca impedir que uma entidade negue posteriormente uma ação realizada?",
          answer: "Não repúdio."
        }
      ]
    },
    {
      title: "Ameaças e risco",
      color: "#7a62ad",
      concepts: [
        {
          id: "risk-chain",
          name: "Vulnerabilidade → ameaça → ataque → risco",
          definition: "Vulnerabilidade é uma fraqueza; ameaça é um potencial causador de dano; ataque é uma ação concreta; risco considera a possibilidade do evento e suas consequências.",
          exam: "Essa sequência costuma aparecer em definições e cenários. Evite tratar os quatro termos como sinônimos.",
          example: "Senha fraca → vulnerabilidade; agente interessado → ameaça; brute force → ataque; chance e impacto da invasão → risco.",
          links: ["Controles", "Impacto", "Probabilidade"],
          question: "Diferencie vulnerabilidade, ameaça, ataque e risco em uma frase para cada termo.",
          answer: "Vulnerabilidade é fraqueza; ameaça é potencial de dano; ataque é exploração/ação concreta; risco expressa a possibilidade e o impacto do dano."
        },
        {
          id: "passive-active",
          name: "Ataques passivos × ativos",
          definition: "Ataques passivos observam ou coletam informação sem modificar diretamente o sistema; ataques ativos alteram dados, comportamento ou disponibilidade.",
          exam: "Ataques passivos podem ser difíceis de detectar; ataques ativos frequentemente exigem também detecção e recuperação.",
          example: "Sniffing é tipicamente passivo; adulteração, replay e DoS são exemplos de ações ativas.",
          links: ["CIA", "Sniffing", "DoS"],
          question: "Por que ataques passivos podem ser particularmente difíceis de detectar?",
          answer: "Porque o adversário pode apenas observar a comunicação sem produzir alterações visíveis no comportamento do sistema."
        }
      ]
    },
    {
      title: "Política e mecanismos",
      color: "#d17a32",
      concepts: [
        {
          id: "policy-mechanism",
          name: "Política × mecanismo",
          definition: "Política define o que é permitido ou proibido. Mecanismos são os meios usados para implementar e fazer cumprir essa política.",
          exam: "Esse conceito conecta Segurança a Sistemas Operacionais: permissões, ACLs e isolamento são mecanismos para aplicar políticas.",
          example: "Política: apenas professores alteram notas. Mecanismos: autenticação, papéis e ACLs.",
          links: ["Autorização", "ACL", "SO"],
          question: "Dê um exemplo que diferencie política de segurança de mecanismo de segurança.",
          answer: "“Somente professores podem alterar notas” é uma política; autenticação, papéis e ACLs que aplicam essa regra são mecanismos."
        },
        {
          id: "security-not-crypto",
          name: "Segurança ≠ só criptografia",
          definition: "Criptografia é uma família importante de mecanismos, mas segurança também envolve políticas, controle de acesso, disponibilidade, atualizações, segurança física, monitoramento e recuperação.",
          exam: "Uma boa resposta discursiva deve mostrar que objetivos de segurança são mais amplos do que uma técnica específica.",
          example: "Um serviço pode usar criptografia forte e ainda ficar indisponível por DDoS ou permitir privilégios excessivos por erro de autorização.",
          links: ["CIA", "Política", "Controle de acesso"],
          question: "Por que é incorreto dizer que segurança computacional é sinônimo de criptografia?",
          answer: "Porque criptografia cobre apenas parte dos mecanismos necessários; segurança também inclui disponibilidade, autenticação, autorização, políticas, monitoramento, atualização, recuperação e outros controles."
        }
      ]
    }
  ]
};
