const quizData = [
    { question: "O que caracteriza uma cultura particularista?", options: ["Foco na regra, independentemente do relacionamento.", "Foco no relacionamento, avaliando cada caso individualmente.", "Separação rígida entre vida pessoal e profissional.", "Preferência por planejamento sequencial."], correct: 1 },
    { question: "Em uma cultura difusa, como são tratadas as relações pessoais e profissionais?", options: ["São mantidas separadas.", "São interconectadas e fluem entre si.", "As emoções não são compartilhadas.", "O status é conquistado com base em habilidades."], correct: 1 },
    { question: "Qual das opções caracteriza uma cultura de realização?", options: ["O status é herdado com base em quem a pessoa é.", "O status é conquistado com base em conhecimento ou habilidade.", "A autoridade é mais importante que a lógica.", "O tempo é visto como flexível e entrelaçado."], correct: 1 },
    { question: "Qual das opções descreve culturas femininas?", options: ["Valorizam a competição e o sucesso material.", "Priorizam a qualidade de vida e o bem-estar social.", "Apresentam maior distância hierárquica.", "Toleram menos situações de risco."], correct: 1 },
    { question: "O que caracteriza culturas de alta distância hierárquica?", options: ["Relações horizontais e comunicação direta.", "Menor desigualdade entre superiores e subordinados.", "Clareza na distinção de status e papéis.", "Maior tolerância ao risco e à mudança."], correct: 2 },
    { question: "Na analogia do iceberg, quais atributos estão na 'visão escondida'?", options: ["Regras, normas e comportamentos.", "Valores, atitudes e crenças.", "Vestimenta, etiqueta e hierarquia.", "Comida, linguagem e rituais."], correct: 1 },
    { question: "Quais elementos compõem o paradigma cultural de uma organização?", options: ["Símbolos, rituais, histórias, sistemas de controle e liderança.", "Hierarquia, normas e regras.", "Valores pessoais, emoções e crenças religiosas.", "Planos de carreira e objetivos pessoais."], correct: 0 },
    { question: "Em culturas com baixo controle da incerteza, as pessoas tendem a:", options: ["Evitar situações desconhecidas.", "Ser mais tolerantes ao risco e à mudança.", "Valorizar a assertividade e o sucesso material.", "Priorizar o bem-estar social."], correct: 1 },
    { question: "O que representa a camada mais interna do modelo da cebola organizacional?", options: ["Estruturas formais e normas.", "Valores e suposições básicas.", "Rotinas e rituais diários.", "Sistemas de controle."], correct: 1 },
    { question: "Culturas que priorizam a independência e os objetivos individuais são:", options: ["Coletivistas.", "Individualistas.", "Femininas.", "Particularistas."], correct: 1 },
    { question: "Em culturas de direção interna, as pessoas acreditam que:", options: ["Devem trabalhar com o ambiente para atingir objetivos.", "Relacionamentos são mais importantes que resultados.", "Podem controlar o ambiente para alcançar seus objetivos.", "Passado, presente e futuro são entrelaçados."], correct: 2 },
    { question: "Uma cultura que valoriza planos e prazos rígidos, priorizando a conclusão de etapas a tempo, é exemplo de:", options: ["Tempo síncrono.", "Tempo sequencial.", "Direção externa.", "Difuso."], correct: 1 },
  ];
  
  let shuffledQuestions, currentQuestionIndex, score;
  
  const startBtn = document.getElementById("start-quiz");
  const quiz = document.getElementById("quiz");
  const submitBtn = document.getElementById("submit");
  const result = document.getElementById("result");
  const feedback = document.getElementById("feedback");
  
  startBtn.addEventListener("click", startQuiz);
  submitBtn.addEventListener("click", handleSubmit);
  
  function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
  }
  
  function startQuiz() {
    shuffledQuestions = shuffleArray(quizData.map(q => ({
      question: q.question,
      options: shuffleArray(q.options),
      correct: q.correct
    })));
    currentQuestionIndex = 0;
    score = 0;
  
    startBtn.style.display = "none";
    quiz.style.display = "block";
    submitBtn.style.display = "block";
    feedback.innerHTML = "";
    result.innerHTML = "";
  
    loadQuestion();
  }
  
  function loadQuestion() {
    const currentQuizData = shuffledQuestions[currentQuestionIndex];
    quiz.innerHTML = `
      <h2>${currentQuizData.question}</h2>
      <ul>
        ${currentQuizData.options
          .map(
            (option, index) => `
          <li>
            <input type="radio" name="answer" id="option${index}" value="${index}">
            <label for="option${index}">${option}</label>
          </li>
        `
          )
          .join("")}
      </ul>
    `;
  }
  
  function getSelected() {
    const answers = document.querySelectorAll("input[name='answer']");
    let selectedAnswer;
    answers.forEach((answer) => {
      if (answer.checked) {
        selectedAnswer = parseInt(answer.value);
      }
    });
    return selectedAnswer;
  }
  
  function handleSubmit() {
    const selectedAnswer = getSelected();
    if (selectedAnswer === undefined) {
      alert("Por favor, selecione uma resposta.");
      return;
    }
  
    const currentQuizData = shuffledQuestions[currentQuestionIndex];
    if (selectedAnswer === currentQuizData.correct) {
      score++;
      feedback.innerHTML = `<p style="color: green;">Você acertou!</p>`;
    } else {
      feedback.innerHTML = `<p style="color: red;">Você errou! A resposta correta era: "${currentQuizData.options[currentQuizData.correct]}".</p>`;
    }
  
    currentQuestionIndex++;
    if (currentQuestionIndex < shuffledQuestions.length) {
      setTimeout(() => {
        feedback.innerHTML = "";
        loadQuestion();
      }, 2500);
    } else {
      quiz.style.display = "none";
      submitBtn.style.display = "none";
      result.innerHTML = `Você acertou ${score} de ${shuffledQuestions.length} questões!`;
      startBtn.style.display = "block";
    }
  }
  