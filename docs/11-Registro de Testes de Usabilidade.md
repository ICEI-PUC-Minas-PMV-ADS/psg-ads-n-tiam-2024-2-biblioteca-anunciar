# Registro de Testes de Usabilidade

Após realizar os testes de usabilidade, obtém-se um relatório a partir das análises realizadas. O Registro de Testes de Usabilidade é um relatório que contém as evidências dos testes e relatos dos usuários participantes, baseado no Plano de Testes de Usabilidade desenvolvido para os casos de uso desta etapa.

As referências abaixo irão auxiliá-lo na geração do artefato “Registro de Testes de Usabilidade”.

## Tela de Login

### Objetivo do Teste
Avaliar a experiência do usuário na tela de Login, incluindo facilidade de navegação, clareza das mensagens de erro e responsividade dos elementos da interface.

### Resultados dos Casos de Teste

1. **Verificação de Campos Obrigatórios**
   - **Descrição do Teste:** Testar a exibição de mensagem de erro ao tentar fazer login sem preencher todos os campos.
   - **Resultado:** A mensagem "Todos os campos são obrigatórios" foi exibida corretamente.
   - **Feedback do Usuário:** Os participantes acharam a mensagem clara e direta. No entanto, sugeriram destacar o campo vazio para melhor orientação.

2. **Verificação de E-mail ou Senha Incorretos**
   - **Descrição do Teste:** Testar a exibição de erro ao inserir e-mail ou senha incorretos.
   - **Resultado:** A mensagem "Erro no login, tente novamente" foi exibida corretamente.
   - **Feedback do Usuário:** A mensagem foi considerada útil, mas alguns usuários sugeriram adicionar um indicador visual para campos incorretos.

3. **Confirmação de Login Bem-sucedido**
   - **Descrição do Teste:** Verificar o redirecionamento após um login bem-sucedido.
   - **Resultado:** O sistema exibiu a mensagem "Confirmação de login" e redirecionou corretamente para a tela inicial.
   - **Feedback do Usuário:** Os usuários relataram que o redirecionamento foi rápido e intuitivo.

### Observações
- Ajuste recomendado para destacar visualmente campos com erro.
- Sugestão de feedback visual (carregamento) para situações em que a resposta do servidor demora.

---

## Tela de Cadastro

### Objetivo do Teste
Testar a facilidade de uso da tela de Cadastro, incluindo clareza das instruções, efetividade das mensagens de erro e responsividade da interface.

### Resultados dos Casos de Teste

1. **Verificação de Campos Obrigatórios**
   - **Descrição do Teste:** Testar a exibição de mensagem de erro ao tentar se cadastrar sem preencher todos os campos.
   - **Resultado:** A mensagem "Todos os campos são obrigatórios" foi exibida como esperado.
   - **Feedback do Usuário:** Usuários sugeriram que a mensagem de erro poderia ser exibida próxima ao campo que precisa ser preenchido.

2. **Verificação de Senhas Diferentes**
   - **Descrição do Teste:** Testar a exibição de erro ao inserir senhas que não coincidem.
   - **Resultado:** A mensagem "As senhas não coincidem" foi exibida corretamente.
   - **Feedback do Usuário:** A mensagem foi considerada clara, mas foi sugerido destacar visualmente os campos das senhas.

3. **Tentativa de Cadastro com E-mail já Usado**
   - **Descrição do Teste:** Testar a mensagem de erro ao tentar cadastrar com um e-mail já existente.
   - **Resultado:** A mensagem "Este e-mail já está em uso" foi exibida como esperado.
   - **Feedback do Usuário:** Os usuários acharam a mensagem clara e útil.

4. **Cadastro Bem-sucedido**
   - **Descrição do Teste:** Confirmar que a mensagem de sucesso é exibida e o usuário é redirecionado para a tela de Login.
   - **Resultado:** A mensagem "Usuário cadastrado com sucesso" foi exibida, e o redirecionamento funcionou conforme esperado.
   - **Feedback do Usuário:** Os participantes apreciaram a mensagem de confirmação e o redirecionamento automático.

### Observações
- Sugerido destacar os campos das senhas ao mostrar mensagens de erro.
- Melhorar o feedback de carregamento durante o processo de cadastro, especialmente quando a rede está lenta.

---

## Conclusão

Os testes de usabilidade identificaram que as telas de Login e Cadastro possuem uma interface funcional e intuitiva, com mensagens de erro claras. Sugere-se implementar as seguintes melhorias para aprimorar a experiência do usuário:
- **Destaque Visual de Erros:** Destacar visualmente os campos de entrada com erro, especialmente os campos de senha.
- **Feedback de Carregamento:** Implementar um ícone de carregamento durante os processos de login e cadastro.

> **Links Úteis**:
> - [Ferramentas de Testes de Usabilidade](https://www.usability.gov/how-to-and-tools/resources/templates.html)
