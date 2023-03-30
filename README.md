<p align="center">
	<h1 align="center">Mentor Cycle</h1>
</p>

<div align="center">
	<img src="https://avatars.githubusercontent.com/u/119057667?s=400&u=d07b20f910f60bd625942f0b963e09c92cefc3a2&v=4" />
</div>

<br>

## 💻 O Projeto

O Mentor Cycle é uma iniciativa open-source que tem como objetivo conectar pessoas na área de T.I que estão buscando aprendizado com profissionais experientes do mercado. A plataforma realiza o match entre aprendiz e mentor, proporcionando ao iniciante um guia que já vivenciou e superou os desafios que o mesmo está enfrentando, tornando a jornada de estudos mais produtiva e eficiente.

Para entender melhor o projeto, você pode assistir esse vídeo que mostra uma visão macro da plataforma:

- [Conheça o Projeto](https://youtu.be/mIt9n-BdLYY)<br>
- [Guia para a primeira contribuição](https://www.youtube.com/watch?v=hZ-0QYmpjHg)

## Como contribuir ❓
Antes de tudo precisamos ter as seguintes ferramentas instaladas na sua máquina:
- [Node.js](https://nodejs.org/en/)
- [Git](https://git-scm.com/)
- [Visual Studio Code](https://code.visualstudio.com/) ou similar
<br>

1. Para encontrar uma tarefa disponível para contribuir, acesse o [Trello](https://trello.com/invite/b/BJtM6SNZ/ATTI639cccf0290c7a457af0081bdf76db2663ADCDA3/tarefas) e localize a coluna "A Fazer". Clique em um card que lhe interesse e selecione "Ingressar" para indicar que você irá trabalhar nesta tarefa. Em seguida, arraste o card para a coluna "Em andamento". A partir deste momento, você será responsável pela entrega da tarefa selecionada.<br>
_*obs:* Lembre-se de que o Trello é uma ferramenta de gerenciamento de projetos baseada em cartões. Certifique-se de verificar as descrições e comentários da tarefa para entender completamente os requisitos e as expectativas de entrega._
<br>

<p align="center">
  <img width="600" src="https://user-images.githubusercontent.com/57500163/216627716-657789cd-e68f-4f1a-9564-7382bfd3f061.png">
</p>

2. Agora vá até a coluna **"Referências"** no [Trello](https://trello.com/invite/b/BJtM6SNZ/ATTI639cccf0290c7a457af0081bdf76db2663ADCDA3/tarefas) e escolha o repositório **Front-end**,  baseado na tarefa que você escolheu você irá fazer um **"Fork"** da aplicação, para isso você precisa abrir o repositório no [GitHub](https://github.com/Mentor-Cycle/mentor-cycle-fe) e clicar em **"fork"**, do lado superior direito conforme na imagem:<br>
 _*obs:* É importante que você faça o "fork" do projeto e não um "clone", se estiver com dúvidas sobre fork [leia aqui](https://docs.github.com/pt/get-started/quickstart/fork-a-repo)._<br>
 <br>
 <p align="center">
  <img width="600" src="https://user-images.githubusercontent.com/57500163/216629255-034809cf-1041-4ee7-9a60-63722b4ab08d.png">
</p>
<br>
O objetivo do Fork é criar uma cópia do repositório na sua conta do GitHub, permitindo que você trabalhe nele sem afetar o projeto principal. É importante lembrar que você nunca deve enviar Pull Requests diretamente para o repositório principal do projeto, pois isso não é permitido pelo sistema. Após o Fork, você terá um repositório com o seguinte nome: `seu_nome_de_usuario/mentor-cycle-fe`, como mostrado abaixo:<br>
<br>
<p align="center">
  <img width="600" src="https://user-images.githubusercontent.com/57500163/216630241-9e83c4cc-082b-441c-949e-cd0f3daf7312.png">
</p>

</br>
3. Agora que você fez o fork do repositório, é hora de cloná-lo para sua máquina local. Para fazer isso, vá para o seu repositório recém-criado na sua conta GitHub (lembre-se de que ele deve ter o nome seu_nome_de_usuario/mentor-cycle-fe). Em seguida, clique no botão "Code" e copie o link do repositório usando o botão "Copy" ao lado.<br>
<br>

> Clonar um repositório significa baixa-lo para a sua máquina mantendo uma conexão com o GitHub<br>

```git clone https://github.com/seu_nome_de_usuario/mentor-cycle-fe.git```<br>


4 Com repositório na sua máquina, basta você abri-lo com seu editor de código favorito, em seguida executar o comando:<br>
```bash
yarn install
```
Isso fará com que o gerenciador de pacotes do node, baixe todas as dependências necessárias para rodar, finalizado a instalação rode o comando:<br>
```bash
yarn run dev
```

5. Agora com tudo instalado e rodando, basta você criar a sua branch, executar a sua tarefa e após finalizado lembrar-se de adicionar ao stage com os seguintes comandos:

Criar branch:
```bash
git checkout -b nome_da_branch
```
Adicionando arquivos:
```bash
git add .
```
Adicione uma mensagem de commit com o comando: 
```bash
git commit -m "sua_mensagem_aqui"
```
> Neste passo lembre-se de utilizar uma mensagem em inglês e também descrevendo o que você fez com poucas palavras e o padrão de commits, por exemplo "feat: create user endpoint"

e em seguida suba as alterações para o seu repositório fork com o comando:
```bash
git push
```
6. Hora do pull request, após dar o `git push`, ao abrir o seu repositório fork na página do GitHub, você notará que existe uma mensagem logo no topo assim como essa:  
<br>
<p align="center">
  <img width="600" src="https://user-images.githubusercontent.com/57500163/216635436-f2bfba76-a084-45b7-9b42-d8abe97a7062.png">
</p>

Vendo isso, clique no botão **"Compare & pull request"**, isso começara o processo de abertura de uma **PR(Pull Request**) e lembre se de apontar sempre para a branch `dev` do projeto Mentor Cycle . Esse passo é muito importante, pois existem pessoas responsáveis nas Reviews, que irão validar o que você fez e caso tenha algo errado ou que possa ser melhorado elas irão comentar. Isso ajudará muito na sua evolução.

Lembre se de colocar o título conforme o tipo da tarefa, uma mensagem que descreva o que você fez, se possível anexar uma captura de tela e colocar o Link do card da tarefa do Trello que você pegou, pode seguir este modelo ficando mais ou menos assim: 

![image](https://user-images.githubusercontent.com/57500163/216638205-a473736a-6dbb-453c-948f-2b7712df7d4a.png)


**Pronto, feito isso, é só aguardar a análise da sua PR, você será notificado caso seja aprovada ou o revisor solicite alguma alteração, BORA PRA CIMA!!!! 🚀🚀🚀**

## Nossas redes sociais

<p align="center">
  <a href="https://discord.gg/tuBshbtPNU">
  	<img  src="https://img.shields.io/badge/Discord-%237289DA.svg?style=for-the-badge&logo=discord&logoColor=white" alt="Discord">
  </a>
  <a href="https://www.linkedin.com/company/mentor-cycle/">
  	<img  src="https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white" alt="Linkedin"> 
  </a>
  <a href="https://chat.whatsapp.com/Li9mljuXiPG6Rr2uU9VTsi">
  	<img  src="https://img.shields.io/badge/WhatsApp-25D366?style=for-the-badge&logo=whatsapp&logoColor=white" alt="Whatsapp"> 
  </a>
  <a href="https://www.figma.com/file/KnsardnDQ2lDKUYo58G8Pf/Mentor-Cycle?node-id=11%3A6&t=JbtjqQL0XQJ1x054-1">
  	<img src="https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white" alt="Figma"> 
  </a>
  <a href="https://trello.com/invite/b/BJtM6SNZ/ATTI17cc38fcef42713d12a1f57d1d7130e4F920225C/tarefas">
  	<img src="https://img.shields.io/badge/Trello-0052CC?style=for-the-badge&logo=trello&logoColor=white" alt="Trello"> 
  </a>
</p>

