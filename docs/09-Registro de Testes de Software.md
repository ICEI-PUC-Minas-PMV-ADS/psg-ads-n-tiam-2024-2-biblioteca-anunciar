# Registro de Testes de Software

<span style="color:red">Pré-requisitos: <a href="3-Projeto de Interface.md"> Projeto de Interface</a></span>, <a href="8-Plano de Testes de Software.md"> Plano de Testes de Software</a>

Relatório com as evidências dos testes de software realizados no sistema pela equipe, baseado em um plano de testes pré-definido.
<br>
<br>


Cenário: Ao clicar em um livro no catálogo de livros o usuário deve ser direcionado para a tela detalhe de livro
Caso o livro esteja disponível: deve aparecer a mensagem 'Disponível para empréstimo'
e o botão empréstimo habilitado
Caso o livro esteja indisponível: deve aparecer a mensagem 'NÃO Disponível para empréstimo' e o botão empréstimo desabilitado

![pag disponivel](https://github.com/user-attachments/assets/0833f943-5000-4de9-8c75-39efd5ae99c3) <br>
Resultado: Mostra a mensagem de disponível e botão habilitado.

![pag indisponivel](https://github.com/user-attachments/assets/72be7d68-f2cd-40d1-8536-53ed32337222)<br>
Resultado: Mostra a mensagem de indisponivel e botão desabilitado.

Tela de Cadastro de Livros

Todos os campos de entrada (Título, Categoria, Resumo, Autor) estão visíveis e o botão de cadastrar livro habilitado

![abf9b33d-70bb-407a-88ae-034f64c73067](https://github.com/user-attachments/assets/50bf3d8d-3790-4f28-9ece-0c9fce951d1f)

Caso o usuario tente cadastrar um livro sem preencher todos os campos, uma mensagem deve ser exibida e o cadastro tem que ser interrompido

![7162a2b0-9aa6-4748-a28a-6c0409c04988](https://github.com/user-attachments/assets/bdfa2d77-8c31-494f-93dd-ac708b6b3558)

Se o usuario seguiu os passos certo e preencheu todos os campos, apos clicar no botão de cadastrar livro uma mensagem tem que ser exibida informando que o livro foi cadastrado. <br>
![8330e0cf-4dd4-4333-a429-edb01f44fc0a](https://github.com/user-attachments/assets/76a01bb2-08ee-401e-9c02-ac4104862778)


## Avaliação

Discorra sobre os resultados do teste. Ressaltando pontos fortes e fracos identificados na solução. Comente como o grupo pretende atacar esses pontos nas próximas iterações. Apresente as falhas detectadas e as melhorias geradas a partir dos resultados obtidos nos testes.

> **Links Úteis**:
> - [Ferramentas de Test para Java Script](https://geekflare.com/javascript-unit-testing/)
