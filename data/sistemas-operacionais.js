window.MENTAL_MAPS = window.MENTAL_MAPS || {};
window.MENTAL_MAPS.so = {
  id: "so",
  code: "MC504",
  title: "Sistemas Operacionais",
  center: "Sistema Operacional",
  centerNote: "Gerência de recursos + abstrações + controle",
  description: "Fundamentos, estruturas internas e escalonamento que já estudamos no Silberschatz.",
  branches: [
    {
      title: "Fundamentos",
      color: "#3f7fc4",
      concepts: [
        {
          id: "so-role",
          name: "Papel do SO",
          definition: "O sistema operacional atua como intermediário entre aplicações e hardware, gerenciando recursos e oferecendo abstrações para execução dos programas.",
          exam: "Saiba apresentar as duas visões clássicas: SO como alocador de recursos e como programa de controle.",
          example: "CPU, memória, armazenamento e dispositivos de E/S são recursos compartilhados cuja utilização é coordenada pelo SO.",
          links: ["Kernel", "Proteção", "Gerência de recursos"],
          question: "Quais são as duas formas clássicas de descrever o papel de um sistema operacional?",
          answer: "Como alocador de recursos, distribuindo CPU, memória, armazenamento e dispositivos; e como programa de controle, supervisionando a execução e evitando usos incorretos do sistema."
        },
        {
          id: "kernel",
          name: "Kernel",
          definition: "Parte central e privilegiada do sistema operacional, responsável por mecanismos fundamentais de gerência e proteção.",
          exam: "Diferencie kernel de aplicações e associe o kernel à execução privilegiada e à mediação de recursos.",
          example: "Uma aplicação solicita acesso a um arquivo por uma chamada de sistema; o kernel valida e realiza a operação.",
          links: ["Chamadas de sistema", "Modo usuário/kernel", "Interrupções"],
          question: "Por que aplicações comuns não deveriam acessar diretamente todos os recursos de hardware?",
          answer: "Porque o kernel precisa mediar o acesso para manter proteção, isolamento, consistência e compartilhamento seguro dos recursos."
        },
        {
          id: "bootstrap",
          name: "Bootstrap",
          definition: "Processo inicial que prepara o hardware e carrega o núcleo do sistema operacional para a memória.",
          exam: "Lembre que o computador precisa de um código inicial fora do SO completo para conseguir localizar e iniciar o kernel.",
          example: "Firmware executa após a energização e transfere o controle para o carregador responsável por iniciar o sistema operacional.",
          links: ["Firmware", "Kernel", "Inicialização"],
          question: "Qual é a função do bootstrap no início de um computador?",
          answer: "Inicializar componentes essenciais e carregar o sistema operacional, transferindo depois o controle para o kernel."
        }
      ]
    },
    {
      title: "Eventos e interface com o kernel",
      color: "#4e9b8f",
      concepts: [
        {
          id: "interrupt",
          name: "Interrupções",
          definition: "Mecanismo pelo qual a CPU desvia temporariamente a execução para tratar um evento.",
          exam: "Entenda a vantagem sobre polling contínuo e a relação com E/S, temporizadores e escalonamento.",
          example: "Uma placa de rede sinaliza a chegada de dados e a CPU executa uma rotina de tratamento.",
          links: ["E/S", "Kernel", "Escalonamento"],
          question: "Por que interrupções são úteis em comparação com polling contínuo?",
          answer: "Porque permitem que a CPU execute outras tarefas e seja notificada quando um evento exige atenção, evitando consultas contínuas ao dispositivo."
        },
        {
          id: "syscall",
          name: "Chamadas de sistema",
          definition: "Interface controlada usada por programas para solicitar serviços ao sistema operacional.",
          exam: "Associe chamadas de sistema à transição controlada entre aplicação e serviços privilegiados.",
          example: "Abrir um arquivo, criar um processo ou enviar dados por um socket exige serviços fornecidos pelo kernel.",
          links: ["Kernel", "Proteção", "Modo usuário/kernel"],
          question: "O que diferencia uma chamada de sistema de uma chamada de função comum?",
          answer: "A chamada de sistema solicita um serviço privilegiado do kernel e envolve uma interface controlada entre o programa e o sistema operacional."
        }
      ]
    },
    {
      title: "Estruturas de dados",
      color: "#7a62ad",
      concepts: [
        {
          id: "hash",
          name: "Hash / tabela hash",
          definition: "Uma função hash transforma uma chave em um valor ou índice; uma tabela hash usa esse resultado para organizar e localizar elementos.",
          exam: "Não confunda função hash com estrutura de dados. Saiba explicar colisões e o ganho médio de busca.",
          example: "Uma tabela pode localizar uma entrada por identificador sem percorrer sequencialmente todos os elementos.",
          links: ["Colisão", "Busca", "Estruturas do kernel"],
          question: "Qual é a diferença entre uma função hash e uma tabela hash?",
          answer: "A função hash calcula um valor a partir da chave; a tabela hash é a estrutura que usa esse valor para armazenar e localizar elementos."
        },
        {
          id: "kernel-structures",
          name: "Listas, FIFO e árvores",
          definition: "Kernels usam estruturas como listas encadeadas, filas FIFO e árvores balanceadas para organizar objetos e operações internas.",
          exam: "O ponto importante é entender por que diferentes estruturas são escolhidas conforme o padrão de acesso e custo desejado.",
          example: "O Linux oferece listas encadeadas em list.h, filas kfifo e árvores rubro-negras em rbtree.h.",
          links: ["Complexidade", "Kernel Linux", "Hash"],
          question: "Por que um kernel utiliza diferentes estruturas de dados em vez de uma única estrutura genérica?",
          answer: "Porque operações distintas exigem diferentes compromissos de custo, ordenação, inserção, remoção e busca."
        }
      ]
    },
    {
      title: "Escalonamento",
      color: "#d17a32",
      concepts: [
        {
          id: "rr",
          name: "Round Robin",
          definition: "Algoritmo preemptivo em que processos prontos recebem uma fatia de CPU chamada quantum e retornam ao fim da fila se não terminarem.",
          exam: "Treine a linha do tempo. O detalhe decisivo é saber quando um processo chega, quando o quantum termina e como a fila é reorganizada.",
          example: "Com quantum de 3 ms, um processo com burst de 8 ms usa 3 ms, volta à fila e aguarda nova vez.",
          links: ["Quantum", "Preempção", "Fila de prontos"],
          question: "O que acontece com o comportamento do Round Robin quando o quantum fica muito grande?",
          answer: "Ele se aproxima do FCFS: há menos trocas de contexto, mas tende a piorar a responsividade."
        },
        {
          id: "priority",
          name: "Prioridade",
          definition: "O escalonador pode selecionar processos segundo níveis de prioridade, de forma preemptiva ou não preemptiva.",
          exam: "Considere sempre o risco de processos de baixa prioridade esperarem indefinidamente.",
          example: "Se tarefas de alta prioridade chegam continuamente, uma tarefa de baixa prioridade pode nunca receber CPU.",
          links: ["Starvation", "Aging", "Escalonamento"],
          question: "Qual problema pode surgir em escalonamento estrito por prioridade?",
          answer: "Starvation: processos de baixa prioridade podem ficar esperando indefinidamente."
        },
        {
          id: "starvation-aging",
          name: "Starvation e aging",
          definition: "Starvation é espera potencialmente indefinida. Aging aumenta gradualmente a prioridade de processos que esperam muito tempo.",
          exam: "A associação starvation → aging é uma relação clássica de causa/problema e técnica de mitigação.",
          example: "Um processo inicialmente pouco prioritário sobe gradualmente até conseguir ser escolhido.",
          links: ["Prioridade", "Justiça", "Escalonamento"],
          question: "Como aging combate starvation?",
          answer: "Elevando gradualmente a prioridade de quem espera, reduzindo a chance de adiamento indefinido."
        }
      ]
    }
  ]
};
