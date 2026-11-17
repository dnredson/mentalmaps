window.MENTAL_MAPS = window.MENTAL_MAPS || {};
window.MENTAL_MAPS.so = {
  id: "so",
  code: "MC504",
  title: "Sistemas Operacionais",
  center: "Sistema Operacional",
  centerNote: "Gerência de recursos + abstrações + controle",
  description: "Mapa hierárquico pelo Silberschatz: capítulo 1 e seções 2.1–2.3 revisados; próximos capítulos entram conforme avançamos.",
  branches: [
    {
      title: "Fundamentos",
      color: "#3f7fc4",
      concepts: [
        {
          id: "so-role", name: "Papel do SO",
          definition: "Intermediário entre aplicações e hardware; aloca recursos e controla a execução.",
          exam: "Saiba explicar SO como alocador de recursos e como programa de controle.",
          example: "CPU, memória, armazenamento e E/S são recursos coordenados pelo SO.",
          links: ["Kernel", "Proteção", "Recursos"],
          question: "Quais são as duas formas clássicas de descrever o papel de um sistema operacional?",
          answer: "Como alocador de recursos e como programa de controle."
        },
        {
          id: "kernel", name: "Kernel",
          definition: "Parte central e privilegiada do sistema operacional.",
          exam: "Associe kernel a mediação, proteção e execução privilegiada.",
          example: "Uma aplicação solicita um serviço; o kernel valida e executa a operação protegida.",
          links: ["Syscall", "Modo privilegiado", "Interrupções"],
          question: "Por que aplicações comuns não acessam diretamente qualquer recurso de hardware?",
          answer: "Porque o kernel media o acesso para manter proteção, isolamento e controle dos recursos."
        },
        {
          id: "interrupt", name: "Interrupção × polling",
          definition: "Polling consulta repetidamente; interrupção permite que hardware/controlador avise a CPU.",
          exam: "Interrupção de hardware é tipicamente assíncrona em relação à instrução atual.",
          example: "Controlador do SSD gera interrupção quando uma leitura termina.",
          links: ["E/S", "Driver", "DMA"],
          question: "Qual é a diferença essencial entre polling e interrupção?",
          answer: "No polling a CPU consulta o estado repetidamente; com interrupção o dispositivo/controlador sinaliza quando há um evento."
        }
      ]
    },
    {
      title: "Chamadas de sistema",
      color: "#4e9b8f",
      concepts: [
        {
          id: "syscall", name: "Syscall",
          definition: "Solicitação deliberada de um serviço do kernel por um programa.",
          exam: "Não confunda syscall com interrupção de hardware ou exceção.",
          example: "read(), write(), open() e fork().",
          links: ["Kernel", "API", "Modo usuário/kernel"],
          question: "O que diferencia syscall, exceção e interrupção?",
          answer: "Syscall é uma solicitação deliberada do programa; exceção decorre da execução da instrução; interrupção é um evento assíncrono, geralmente de hardware."
        },
        {
          id: "api-syscall", name: "API × syscall",
          definition: "A aplicação frequentemente chama uma função de API/biblioteca, e o runtime faz a ponte para a interface de chamadas de sistema.",
          exam: "O programador normalmente não precisa conhecer a implementação interna da syscall.",
          example: "read(fd, buf, count) fornece uma interface ao serviço de leitura.",
          links: ["Biblioteca", "Runtime", "Kernel"],
          question: "Por que API e chamada de sistema não são necessariamente a mesma coisa?",
          answer: "Porque a API é a interface usada pelo programa; a biblioteca/runtime pode traduzir essa chamada para uma ou mais chamadas de sistema."
        }
      ]
    },
    {
      title: "Processos — antecipado",
      color: "#d17a32",
      concepts: [
        {
          id: "states", name: "Estados de processo",
          definition: "READY pode executar mas não tem CPU; RUNNING está na CPU; WAITING não pode continuar até um evento.",
          exam: "Diferencie estado observado em cada instante de uma transição efetiva de estado.",
          example: "E/S: RUNNING → WAITING → READY; depois scheduler pode levar READY → RUNNING.",
          links: ["Scheduler", "E/S", "Ready queue"],
          question: "Qual é a diferença essencial entre READY e WAITING?",
          answer: "READY está apto a executar e só espera CPU; WAITING não pode prosseguir até que ocorra o evento aguardado."
        },
        {
          id: "scheduler", name: "Scheduler",
          definition: "Escolhe entre processos READY qual receberá a CPU.",
          exam: "O scheduler não transfere dados do SSD nem executa a E/S.",
          example: "P1 bloqueia por E/S; scheduler pode escolher P2 para executar.",
          links: ["READY", "RUNNING", "Round Robin"],
          question: "Quando uma E/S termina, por que o processo normalmente vai para READY e não diretamente para RUNNING?",
          answer: "Porque ele voltou a estar apto, mas ainda precisa ser escolhido pelo scheduler para receber a CPU."
        },
        {
          id: "rr", name: "Round Robin",
          definition: "Escalonamento preemptivo com fila de prontos e quantum máximo por vez.",
          exam: "Se o processo termina antes do quantum, o próximo começa imediatamente.",
          example: "Quantum acabou sem término: RUNNING → READY e o processo volta ao fim da fila.",
          links: ["Quantum", "FIFO", "Preempção"],
          question: "O que acontece quando o quantum termina e o processo ainda tem CPU burst restante?",
          answer: "Ele é preemptado, volta ao estado READY e normalmente entra no fim da fila de prontos."
        },
        {
          id: "starvation-aging", name: "Starvation × aging",
          definition: "Starvation é adiamento indefinido; aging aumenta gradualmente prioridade de quem espera.",
          exam: "Aging é uma técnica clássica para mitigar starvation.",
          example: "Processo de baixa prioridade ganha prioridade enquanto espera.",
          links: ["Prioridade", "Justiça"],
          question: "Como aging ajuda a combater starvation?",
          answer: "Elevando progressivamente a prioridade de processos que aguardam por muito tempo."
        }
      ]
    },
    {
      title: "Memória — antecipado",
      color: "#7a62ad",
      concepts: [
        {
          id: "mmu", name: "MMU",
          definition: "Hardware que participa da tradução de endereços virtuais para físicos e da verificação de acesso.",
          exam: "A CPU trabalha com endereços virtuais; a MMU participa da tradução antes do acesso à RAM.",
          example: "Uma tradução não resolvida normalmente pode provocar uma exceção para tratamento do SO.",
          links: ["Page table", "Memória virtual", "Page fault"],
          question: "Qual é a função básica da MMU?",
          answer: "Participar da tradução de endereços virtuais para físicos e aplicar verificações associadas ao acesso à memória."
        },
        {
          id: "pagefault", name: "Page fault",
          definition: "Exceção de memória que exige tratamento do SO; pode ocorrer porque uma página válida não está presente na RAM.",
          exam: "Page fault não significa necessariamente erro.",
          example: "Kernel carrega a página, atualiza estruturas e a instrução pode ser repetida.",
          links: ["MMU", "Memória virtual", "Segmentation fault"],
          question: "Um page fault significa necessariamente erro no programa?",
          answer: "Não. Pode ser uma ocorrência normal de memória virtual quando uma página válida precisa ser trazida para a RAM."
        },
        {
          id: "segfault", name: "Segmentation fault",
          definition: "Consequência observável quando o SO considera um acesso de memória inválido e não pode resolvê-lo normalmente.",
          exam: "Não trate page fault e segmentation fault como sinônimos.",
          example: "Acesso a uma região sem permissão ou que não pertence ao espaço de endereçamento esperado.",
          links: ["Page fault", "Proteção"],
          question: "Qual é a diferença conceitual entre page fault e segmentation fault?",
          answer: "Page fault é a exceção/tratamento de memória; muitos são normais. Segmentation fault ocorre quando o acesso é considerado inválido e não pode ser atendido normalmente."
        }
      ]
    },
    {
      title: "E/S — antecipado",
      color: "#4e9b8f",
      concepts: [
        {
          id: "dma", name: "DMA",
          definition: "Direct Memory Access permite que controladores transfiram blocos entre dispositivo e RAM sem a CPU copiar byte a byte.",
          exam: "A CPU configura a operação e pode usar o tempo para outras tarefas.",
          example: "Controlador transfere dados do SSD para a RAM e sinaliza a conclusão.",
          links: ["Driver", "Controlador", "Interrupção"],
          question: "Por que DMA pode reduzir o trabalho da CPU em uma operação de E/S?",
          answer: "Porque o controlador pode transferir blocos diretamente entre dispositivo e memória, sem a CPU executar cada cópia individual."
        },
        {
          id: "read-flow", name: "Fluxo de read()",
          definition: "Syscall → kernel → autorização → filesystem/driver → WAITING → E/S → interrupção → READY → scheduler → RUNNING.",
          exam: "Saiba identificar quem faz cada papel: kernel, driver/controlador, hardware e scheduler.",
          example: "P1 bloqueia esperando SSD; P2 usa CPU; interrupção acorda P1 e o coloca na ready queue.",
          links: ["Syscall", "DMA", "Estados", "Scheduler"],
          question: "Quem muda um processo de WAITING para READY quando sua E/S termina?",
          answer: "O kernel, ao tratar a conclusão da E/S, acorda o processo e o recoloca na fila de prontos."
        }
      ]
    },
    {
      title: "Estruturas de dados",
      color: "#6a7fb0",
      concepts: [
        {
          id: "hash", name: "Tabela hash",
          definition: "Função hash transforma a chave em índice; a tabela usa esse índice para organizar e localizar entradas.",
          exam: "Busca média pode se aproximar de O(1), mas colisões precisam ser tratadas.",
          example: "PID → função hash → bucket; colisão pode usar encadeamento.",
          links: ["Colisão", "Bucket", "O(1) médio"],
          question: "Por que calcular um hash ainda pode ser melhor do que procurar elemento por elemento?",
          answer: "Porque um cálculo curto direciona a busca para uma pequena região da tabela, evitando uma varredura O(n) na média."
        }
      ]
    }
  ]
};
