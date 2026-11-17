---
markmap:
  theme: cards
  layout: two-sided
  colorScheme: auto
  foldLevel: 3
---

# MC504 — Sistemas Operacionais

## 📍 Progresso
- ✅ **Capítulo 1 — Introdução:** revisado
- ✅ **Capítulo 2.1–2.3:** revisado
- ▶️ **Próximo:** 2.4 — Tipos de Chamadas de Sistema
- 🟡 **Conceitos antecipados:** processos, escalonamento, memória virtual e E/S
  - Já apareceram nas nossas revisões
  - Serão aprofundados nos capítulos correspondentes

## ✅ Capítulo 1 — Introdução

### 1.1 O que Fazem os Sistemas Operacionais
- **Sistema operacional**
  - Intermediário entre aplicações/usuários e hardware
  - Fornece ambiente para execução de programas
- **Visão do usuário**
  - Conveniência
  - Responsividade
  - Experiência de uso
  - Pode variar conforme PC, servidor, móvel ou sistema compartilhado
- **Visão do sistema**
  - **Alocador de recursos**
    - CPU
    - memória
    - armazenamento
    - dispositivos de E/S
  - **Programa de controle**
    - supervisiona execução
    - evita uso impróprio dos recursos
- **Kernel**
  - Núcleo privilegiado do SO
  - Media acesso a hardware e recursos protegidos
  - Aplicações normalmente executam com menos privilégios

### 1.2 Organização do Sistema de Computação
- **CPU + memória + controladores de dispositivos**
- **Interrupções**
  - Hardware avisa a CPU sobre eventos
  - Ex.: controlador do SSD concluiu E/S
  - Ex.: pacote chegou à interface de rede
  - Ex.: timer
- **Polling**
  - CPU consulta repetidamente o estado do dispositivo
  - Pode desperdiçar ciclos de CPU
- **Interrupção × polling**
  - Polling: CPU pergunta
  - Interrupção: dispositivo/controlador avisa
- **Armazenamento**
  - memória principal
  - armazenamento secundário
  - hierarquia de armazenamento
- **DMA — Direct Memory Access**
  - Controlador pode transferir blocos entre dispositivo e RAM
  - Evita que a CPU copie cada byte individualmente
  - CPU configura a operação e pode executar outro trabalho

### 1.3 Arquitetura dos Sistemas de Computação
- **Sistema de processador único**
- **Multiprocessadores**
  - múltiplas CPUs/processadores
  - maior throughput
  - compartilhamento de recursos
- **Multicore**
  - múltiplos núcleos de processamento no mesmo sistema
- **Clusters**
  - múltiplos sistemas cooperando
  - disponibilidade e/ou desempenho

### 1.4 Estrutura do Sistema Operacional
- **Multiprogramação**
  - mantém múltiplos jobs/processos disponíveis
  - objetivo: evitar CPU ociosa quando há trabalho possível
- **Multitarefa / time sharing**
  - alternância rápida da CPU entre tarefas
  - favorece interação e responsividade
- **Processo**
  - programa em execução
  - possui estado e recursos associados

### 1.5 Operações do Sistema Operacional
- **Modo usuário**
  - aplicações executam com privilégios restritos
- **Modo kernel / privilegiado**
  - permite operações protegidas
  - kernel controla acesso aos recursos
- **Dual mode**
  - proteção entre código de usuário e código do SO
- **Timer**
  - impede que um processo monopolize indefinidamente a CPU
- **Entrada controlada no kernel**
  - syscall
  - exceção/trap
  - interrupção

### 1.6 Gerenciamento de Processos
- **Processo = unidade de trabalho em execução**
- SO precisa gerenciar
  - criação e remoção
  - suspensão e retomada
  - sincronização
  - comunicação
  - tratamento de deadlocks
- **Estados — antecipação do Cap. 3**
  - NEW
  - READY
    - pode executar, mas ainda não possui CPU
  - RUNNING
    - está executando na CPU
  - WAITING / BLOCKED
    - não pode continuar até ocorrer um evento
  - TERMINATED
- **Distinção essencial**
  - quantum acabou: RUNNING → READY
  - esperando E/S: RUNNING → WAITING
  - E/S terminou: WAITING → READY

### 1.7 Gerenciamento da Memória
- SO acompanha
  - quais partes da memória estão em uso
  - quem está usando
  - alocação/liberação
- Decide
  - o que permanece na memória
  - quando carregar/remover conteúdo
- **MMU — antecipação dos Caps. 8–9**
  - Memory Management Unit
  - hardware que participa da tradução endereço virtual → endereço físico
  - verifica condições de acesso/tradução
- **Page fault — antecipação do Cap. 9**
  - exceção gerada quando um acesso à página precisa de tratamento do SO
  - página válida pode simplesmente não estar na RAM
  - kernel pode carregá-la e repetir a instrução
- **Segmentation fault**
  - resultado de um acesso considerado inválido pelo SO
  - não é sinônimo de page fault

### 1.8 Gerenciamento do Armazenamento
- **Sistema de arquivos**
  - arquivos
  - diretórios
  - organização e acesso persistente
- **Armazenamento em massa**
  - SSD/HDD e outros dispositivos persistentes
- SO coordena
  - espaço livre
  - alocação
  - acesso
  - E/S

### 1.9 Proteção e Segurança
- **Proteção**
  - controla como processos/usuários acessam recursos
- **Segurança**
  - defesa contra acessos e ações indevidas
- **Autenticação × autorização**
  - autenticação: quem é você?
  - autorização: o que você pode fazer?
- **Credenciais do processo**
  - kernel já possui contexto de identidade
  - usa essas credenciais para verificar permissões
- Exemplo
  - programa solicita leitura
  - kernel verifica se o processo está autorizado
  - se autorizado, a operação prossegue

### 1.10 Estruturas de Dados do Kernel
- **Listas encadeadas**
  - estruturas flexíveis para organizar elementos
  - Linux: `include/linux/list.h`
- **Filas**
  - FIFO
  - Linux: `kfifo`
- **Árvores balanceadas**
  - busca/ordenação eficiente
  - árvores rubro-negras
  - Linux: `include/linux/rbtree.h`
- **Hash**
  - chave → função hash → índice/bucket
  - tabela hash usa o índice para localizar entradas
  - busca média pode se aproximar de O(1)
- **Colisão**
  - duas chaves diferentes chegam ao mesmo índice
  - precisa de estratégia de tratamento
  - ex.: encadeamento no bucket
- **Por que hash pode ser rápido?**
  - cálculo curto direciona a busca
  - evita varrer N elementos um a um
  - mesmo com colisões, normalmente compara poucos candidatos

### 1.11 Ambientes de Computação
- **Computação tradicional**
- **Computação móvel**
- **Cliente-servidor**
- **Peer-to-peer**
- **Virtualização**
- **Computação em nuvem**
- **Sistemas de tempo real**
- Ideia central
  - o SO adapta mecanismos e objetivos ao ambiente de execução

### 1.12 Sistemas Operacionais de Código-Fonte Aberto
- **Código-fonte disponível**
- Permite
  - estudo
  - modificação
  - auditoria
  - experimentação
- Exemplos
  - Linux
  - BSD
- Relevância para SO
  - permite observar implementações reais de conceitos do livro

### 1.13 Fechamento do capítulo
- **SO fornece abstrações**
- **SO gerencia recursos**
- **SO protege e controla**
- **Hardware e SO cooperam**
  - interrupções
  - modos de execução
  - timers
  - controladores

## ✅ Capítulo 2 — Estruturas do Sistema Operacional

### 2.1 Serviços do Sistema Operacional
- Serviços voltados ao usuário/programador
  - **Interface do usuário**
  - **Execução de programas**
  - **Operações de E/S**
  - **Manipulação do sistema de arquivos**
  - **Comunicações**
  - **Detecção de erros**
- Serviços voltados à operação eficiente do sistema
  - **Alocação de recursos**
  - **Contabilização/accounting**
  - **Proteção e segurança**
- **Comunicação entre processos**
  - memória compartilhada
  - troca de mensagens

### 2.2 Interface entre o Usuário e o Sistema Operacional
- **CLI — Command-Line Interface**
  - shell / interpretador de comandos
  - comandos podem ser reunidos em scripts
- **GUI — Graphical User Interface**
  - interação gráfica
  - janelas, menus, ícones
- **Interfaces móveis/touch**
- Ideia importante
  - interface de usuário não é o kernel
  - UI pode mudar sem alterar os mecanismos fundamentais do SO

### 2.3 Chamadas de Sistema
- **Definição**
  - interface para solicitar serviços fornecidos pelo SO
- Fluxo conceitual
  - aplicação
  - API / biblioteca
  - interface de chamadas de sistema
  - kernel
  - serviço solicitado
- **Exemplos**
  - `read()`
    - lê dados de arquivo/dispositivo para um buffer
  - `write()`
    - escreve dados
  - `open()`
    - abre/referencia um arquivo
  - `fork()`
    - cria novo processo em sistemas Unix-like
- **API × syscall**
  - programa normalmente usa uma API
  - biblioteca/runtime faz a ponte até a chamada de sistema
- **Passagem de parâmetros**
  - registradores
  - bloco/tabela em memória
  - pilha
- **Syscall × exceção × interrupção**
  - **Syscall**
    - processo solicita deliberadamente um serviço ao kernel
  - **Exceção**
    - surge da execução da instrução atual
    - divisão por zero
    - page fault
    - instrução inválida
  - **Interrupção**
    - evento assíncrono, geralmente de hardware
    - conclusão de E/S
    - pacote recebido
    - timer

### Fluxo integrado — `read(fd, buffer, 4096)`
- P1 está **RUNNING**
- chama `read()`
- syscall transfere controle ao kernel
- kernel verifica descritor + autorização
- filesystem/subsistema de E/S encaminha solicitação
- driver configura operação no dispositivo/controlador
- se P1 precisa aguardar
  - RUNNING → WAITING
- **scheduler**
  - escolhe outro processo READY
  - P2 pode passar a RUNNING
- dispositivo/controlador conclui a E/S
  - pode usar DMA para transferir dados para RAM
  - gera interrupção de hardware
- kernel/driver trata a conclusão
  - acorda P1
  - WAITING → READY
  - coloca P1 na ready queue
- scheduler eventualmente escolhe P1
  - READY → RUNNING
- `read()` retorna e P1 continua

## ▶️ 2.4 Tipos de Chamadas de Sistema — PRÓXIMO
- **Controle de processos**
- **Manipulação de arquivos**
- **Manipulação de dispositivos**
- **Manutenção de informações**
- **Comunicações**
- **Proteção**

## ⏭️ Restante do Capítulo 2
- 2.5 Programas de Sistema
- 2.6 Projeto e Implementação do Sistema Operacional
- 2.7 Estrutura do Sistema Operacional
- 2.8 Depuração do Sistema Operacional
- 2.9 Geração do Sistema Operacional
- 2.10 Inicialização do Sistema
- 2.11 Resumo

## 🟡 Capítulo 3 — Processos
- **Ainda não lido sistematicamente**
- Conceitos já antecipados
  - estados de processo
    - NEW
    - READY
    - RUNNING
    - WAITING/BLOCKED
    - TERMINATED
  - **scheduler**
    - escolhe entre processos READY quem receberá CPU
  - **ready queue**
  - bloqueio por E/S
  - wakeup: WAITING → READY

## ⏭️ Capítulo 4 — Threads
- Visão geral
- Multicore
- Modelos de multithreading
- Bibliotecas de threads

## ⏭️ Capítulo 5 — Sincronização de Processos
- Seção crítica
- Locks
- Mutex
- Semáforos
- Monitores

## 🟡 Capítulo 6 — Scheduling da CPU
- **Ainda não lido sistematicamente**
- Conceitos já antecipados
  - **Round Robin**
    - ready queue em comportamento FIFO/circular
    - quantum = tempo máximo por vez
    - se terminar antes, não desperdiça o restante do quantum
    - quantum termina: RUNNING → READY
  - **Prioridade**
  - **Starvation**
    - espera potencialmente indefinida
  - **Aging**
    - aumenta gradualmente prioridade de quem espera
    - ajuda a combater starvation

## ⏭️ Capítulo 7 — Deadlocks
- Deadlock
- condições
- prevenção/evitação/detecção

## 🟡 Capítulo 8 — Memória Principal
- **Conceito antecipado**
  - MMU
  - endereço virtual → endereço físico
  - proteção e tradução de memória

## 🟡 Capítulo 9 — Memória Virtual
- **Conceitos antecipados**
  - page fault
  - página válida ausente da RAM
  - kernel carrega página
  - processo pode bloquear
  - instrução é repetida
  - page fault ≠ necessariamente erro
  - acesso inválido pode levar a segmentation fault

## ⏭️ Capítulo 10 — Estrutura de Armazenamento de Massa
- HDD/SSD
- scheduling e gerenciamento de armazenamento

## ⏭️ Capítulo 11 — Interface do Sistema de Arquivos
- arquivos
- diretórios
- acesso e proteção

## ⏭️ Capítulo 12 — Implementação do Sistema de Arquivos
- estruturas internas
- alocação
- espaço livre

## 🟡 Capítulo 13 — I/O
- **Conceitos antecipados**
  - drivers
  - controladores
  - polling
  - interrupções
  - DMA
  - E/S bloqueante
- Fluxo mental
  - processo solicita
  - kernel/driver configura
  - processo pode bloquear
  - hardware trabalha
  - interrupção indica conclusão
  - kernel acorda processo

## ⏭️ Capítulo 14 — Proteção
- domínios
- controle de acesso
- direitos e mecanismos de proteção

## ⏭️ Capítulo 15 — Segurança
- ameaças
- autenticação
- mecanismos de segurança
- conexão direta com MC942/MO639

## ⏭️ Capítulos 16–20 — Tópicos e estudos de caso
- 16 Máquinas Virtuais
- 17 Sistemas Distribuídos
- 18 O Sistema Linux
- 19 Windows 7
- 20 Sistemas Operacionais Influentes
