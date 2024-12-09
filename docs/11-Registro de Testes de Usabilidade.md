# Registro de Testes de Usabilidade

Após realizar os testes de usabilidade, obtém-se um relatório a partir das análises realizadas. O Registro de Testes de Usabilidade é um relatório que contém as evidências dos testes e relatos dos usuários participantes, baseado no Plano de Testes de Usabilidade desenvolvido para os casos de uso desta etapa.

As referências abaixo irão auxiliá-lo na geração do artefato “Registro de Testes de Usabilidade”.

## Tela Principal ( Home )

## Objetivo
- Ajustar fluxo usuario, ao clicar em um card, redirecinar o usuario para página de detalhes do livro clicado.  
![image](https://github.com/user-attachments/assets/80676603-7cca-4739-9133-405d7b20cf4d)
 

- Input de pesquisa para ajudar o usuario a encontrar o livro, ao pesquisar um titulo, os livros devem ser filtrados pelo texto pesquisado.  
![image](https://github.com/user-attachments/assets/73ba524d-661f-4e98-8851-20ca5060fcd1)  
![image](https://github.com/user-attachments/assets/8f27d37a-7a62-4341-a60a-b6a9b8efe82c)  

# Testes da Tela de Login (Usuário e Administrador)

## Objetivo do Teste
Avaliar a experiência do usuário na tela de Login, incluindo a navegação, a clareza das mensagens de erro e a correta distinção entre os tipos de usuário (usuário comum e administrador) durante o processo de login. Além disso, verificar se os redirecionamentos para as páginas iniciais dos dois tipos de usuário estão funcionando conforme esperado, incluindo o redirecionamento com o token de administrador.

## Resultados dos Casos de Teste

### 1. Verificação de Login de Usuário Comum

**Descrição do Teste**: Testar o login de um usuário comum e verificar se ele é redirecionado corretamente para a página inicial.

**Resultado**: O sistema exibiu a mensagem "Login bem-sucedido" e redirecionou o usuário para a tela inicial de usuário comum.

**Feedback do Usuário**: O processo de login foi considerado simples e rápido. O redirecionamento foi imediato e intuitivo.

---

### 2. Verificação de Login de Administrador

**Descrição do Teste**: Testar o login de um administrador e verificar se ele é redirecionado corretamente para a página inicial de administrador com o token de admin.

**Resultado**: O sistema exibiu a mensagem "Login bem-sucedido" e redirecionou o usuário para a página inicial do administrador, incluindo o token de autenticação para privilégios administrativos.

**Feedback do Usuário**: O redirecionamento para a tela de administração foi rápido e intuitivo. No entanto, foi sugerido que o sistema fornecesse um feedback visual adicional sobre os privilégios administrativos do usuário (ex: ícone de admin ou mensagem de boas-vindas).

---

### 3. Verificação de Campos Obrigatórios

**Descrição do Teste**: Testar a exibição de mensagem de erro ao tentar fazer login sem preencher todos os campos obrigatórios (e-mail ou senha).

**Resultado**: A mensagem "Todos os campos são obrigatórios" foi exibida corretamente.

**Feedback do Usuário**: A mensagem foi considerada clara, mas alguns usuários sugeriram destacar visualmente o campo vazio para melhorar a orientação do erro.

---

### 4. Verificação de E-mail ou Senha Incorretos

**Descrição do Teste**: Testar a exibição de erro ao inserir e-mail ou senha incorretos.

**Resultado**: A mensagem "Erro no login, tente novamente" foi exibida corretamente.

**Feedback do Usuário**: A mensagem foi útil, mas alguns usuários sugeriram adicionar um indicador visual para destacar os campos incorretos, como a mudança de cor nos campos de e-mail ou senha.

---

### 5. Validação de Login com Token de Administrador

**Descrição do Teste**: Testar se o token de administrador é enviado corretamente após o login de um administrador e garantir que ele tenha acesso a áreas restritas da aplicação.

**Resultado**: Após o login, o administrador recebeu um token de autenticação e foi redirecionado para a página inicial de administrador. O token foi armazenado corretamente e usado para validar a autenticidade do acesso a áreas restritas de administração.

**Feedback do Usuário**: O processo de autenticação e redirecionamento foi fluido, mas seria interessante exibir uma mensagem de confirmação sobre a autenticação de administrador, para aumentar a clareza do processo.

---

## Observações

### Ajustes Recomendados:
1. **Destaque Visual de Erros**: Melhorar a visibilidade dos campos vazios ou incorretos, utilizando indicadores visuais como bordas vermelhas ou ícones de erro ao lado dos campos de entrada.
   
2. **Feedback Visual de Carregamento**: Para casos em que o tempo de resposta do servidor é maior, sugerir a implementação de um indicador de carregamento, como um spinner ou barra de progresso, para melhorar a experiência do usuário.

3. **Mensagem de Boas-vindas para Administradores**: Incluir uma mensagem de boas-vindas personalizada para administradores, indicando que ele possui privilégios administrativos.

4. **Validação de Token de Administrador**: Garantir que o token de administrador seja validado corretamente em todas as páginas e funcionalidades restritas a administradores.

---

### Conclusão

Os testes de login, tanto para usuários comuns quanto para administradores, mostram que o processo de autenticação está funcionando corretamente, com redirecionamento adequado para a tela inicial ou para a área de administração. Pequenos ajustes no feedback visual e na validação de erros podem melhorar ainda mais a experiência do usuário. O sistema também cumpre o requisito funcional RF-10, diferenciando claramente os privilégios de acesso entre os usuários e administradores.



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

5. **Tela Detalhe Livro**
![image](https://github.com/user-attachments/assets/f449ddb7-ecd4-4c54-8092-cec4653b9752)

6. **Tela Lista Favoritos**
![image](https://github.com/user-attachments/assets/bc3ec7a2-2202-4beb-99ab-caf69fb42f65)

### Observações
- Sugerido destacar os campos das senhas ao mostrar mensagens de erro.
- Melhorar o feedback de carregamento durante o processo de cadastro, especialmente quando a rede está lenta.

---

## Conclusão

Os testes de usabilidade identificaram que as telas de Login e Cadastro possuem uma interface funcional e intuitiva, com mensagens de erro claras. Sugere-se implementar as seguintes melhorias para aprimorar a experiência do usuário:
- **Destaque Visual de Erros:** Destacar visualmente os campos de entrada com erro, especialmente os campos de senha.
- **Feedback de Carregamento:** Implementar um ícone de carregamento durante os processos de login e cadastro.
![image](https://github.com/user-attachments/assets/44d43efb-35ca-48a0-9e09-11011a7095b4)


## Tela de Cadastro de livros

### Objetivo do Teste
Testar a facilidade de uso da tela de Cadastro de livros, incluindo clareza das instruções, efetividade das mensagens de erro e responsividade da interface.

1. **Verificação de Campos Obrigatórios**
   - **Descrição do Teste:** Testar a exibição de mensagem de erro ao tentar se cadastrar um livro sem preencher todos os campos.
   - **Resultado:** A mensagem "Todos os campos são obrigatórios" foi exibida como esperado.
   - **Feedback do Usuário:** Usuários sugeriram que a mensagem de erro poderia ser exibida próxima ao campo que precisa ser preenchido.

## Conclusão

Os testes de usabilidade identificaram que as telas de Cadastro de livro possue uma interface funcional e intuitiva, com mensagens de erro claras.


> **Links Úteis**:
> - [Ferramentas de Testes de Usabilidade](https://www.usability.gov/how-to-and-tools/resources/templates.html)
