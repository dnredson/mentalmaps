window.MENTAL_MAPS = window.MENTAL_MAPS || {};
window.MENTAL_MAPS.redes = {
  id: "redes",
  code: "MC832",
  title: "Redes de Computadores",
  center: "Rede de Computadores",
  centerNote: "Sistemas finais + enlaces + núcleo + protocolos",
  description: "Conceitos iniciais de redes que já estudamos no Kurose & Ross.",
  branches: [
    {
      title: "Organização da rede",
      color: "#db8a16",
      concepts: [
        {
          id: "edge-core",
          name: "Borda × núcleo",
          definition: "A borda reúne sistemas finais e redes de acesso; o núcleo interconecta redes e encaminha tráfego entre diferentes partes da Internet.",
          exam: "Pense em posição e função topológica, não em tamanho ou preço do equipamento.",
          example: "Um notebook está na borda; roteadores interligando grandes redes compõem o núcleo.",
          links: ["Hosts", "Roteadores", "Acesso"],
          question: "Qual é a diferença conceitual entre borda e núcleo da rede?",
          answer: "A borda é onde ficam sistemas finais e acessos; o núcleo fornece interconexão e encaminhamento entre redes."
        },
        {
          id: "edge-router",
          name: "Roteador de borda",
          definition: "Roteador posicionado na fronteira entre redes ou domínios, conectando uma rede a outra.",
          exam: "O termo borda descreve função/posição. Um roteador doméstico pode ser de borda no contexto da rede local.",
          example: "O roteador de casa conecta a LAN doméstica à rede do provedor.",
          links: ["Borda", "ISP", "Roteamento"],
          question: "Um roteador doméstico pode ser chamado de roteador de borda?",
          answer: "Sim. Dependendo do contexto, ele fica na fronteira entre a rede local e a rede do provedor; o termo descreve posição topológica."
        }
      ]
    },
    {
      title: "Multiplexação",
      color: "#4e9b8f",
      concepts: [
        {
          id: "tdm",
          name: "TDM",
          definition: "Time Division Multiplexing compartilha um canal dividindo o tempo em intervalos ou slots.",
          exam: "No TDM, o recurso separado entre usuários é o tempo. Treine cálculos de taxa efetiva e quantidade de slots.",
          example: "Um enlace de 12 Mb/s dividido igualmente entre 4 usuários por slots recorrentes entrega, em média, 3 Mb/s por usuário.",
          links: ["Slots", "Taxa", "FDM"],
          question: "Qual recurso é dividido no TDM?",
          answer: "O tempo de uso do canal, normalmente em slots atribuídos aos diferentes fluxos ou usuários."
        },
        {
          id: "fdm",
          name: "FDM",
          definition: "Frequency Division Multiplexing compartilha o meio separando-o em faixas de frequência distintas.",
          exam: "No FDM, transmissões podem ocorrer simultaneamente porque ocupam bandas diferentes.",
          example: "Estações de rádio transmitem simultaneamente em frequências diferentes dentro do espectro disponível.",
          links: ["Frequência", "Largura de banda", "TDM"],
          question: "Qual é a diferença essencial entre TDM e FDM?",
          answer: "TDM separa usuários no tempo; FDM separa usuários em faixas de frequência."
        }
      ]
    },
    {
      title: "Elementos básicos",
      color: "#7a62ad",
      concepts: [
        {
          id: "hosts",
          name: "Hosts / sistemas finais",
          definition: "Dispositivos que executam aplicações e participam da comunicação nas extremidades da rede.",
          exam: "Associe hosts à borda da rede e ao ponto onde aplicações realmente produzem e consomem dados.",
          example: "PCs, servidores, smartphones e dispositivos IoT são sistemas finais.",
          links: ["Borda", "Aplicações", "Protocolos"],
          question: "Por que sistemas finais são associados à borda da rede?",
          answer: "Porque é neles que aplicações executam e os dados são produzidos ou consumidos, enquanto a infraestrutura intermediária transporta o tráfego."
        },
        {
          id: "links",
          name: "Enlaces",
          definition: "Meios de comunicação que conectam nós e permitem transmissão de bits entre pontos da rede.",
          exam: "Diferencie capacidade do enlace, compartilhamento do meio e mecanismos de multiplexação.",
          example: "Fibra, cobre e enlaces sem fio podem transportar tráfego entre hosts e roteadores.",
          links: ["Taxa", "TDM", "FDM"],
          question: "Como multiplexação se relaciona com um enlace compartilhado?",
          answer: "Ela define como diferentes fluxos ou usuários compartilham os recursos disponíveis do enlace."
        }
      ]
    }
  ]
};
