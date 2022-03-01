const questions = [
    {
        title: "Türkiye Cumhuriyeti kurucusu kimdir ?",
        a: "İsmet İnönü",
        b: "Rauf Denktaş",
        c: "Enver Paşa",
        d: "Mustafa Kemal Atatürk",
        correct: "d"
    },

    {
        title: "Türkiye'nin başkenti hangisidir?",
        a: "İstanbul",
        b: "Bursa",
        c: "Ankara",
        d: "Edirne",
        correct: "c"
    },

    {
        title: "Türkiye'nin en yüksek dağı hangisidir?",
        a: "Ağrı Dağı",
        b: "Palandöken",
        c: "Sarıkamış",
        d: "Uludağ",
        correct: "a"
    },

    {
        title: "Hangisi Türkiye ile sınır komşusu değildir",
        a: "Suriye",
        b: "Gürcistan",
        c: "İran",
        d: "Brezilya",
        correct: "d"
    },

    {
        title: "Türkiye'nin kaç bölgesi vardır ?",
        a: "6",
        b: "7",
        c: "9",
        d: "12",
        correct: "b"
    },


]


const quizEl = document.querySelector(".quiz");
const questionTitle = document.querySelector(".question-title");
const a_text = document.getElementById("a_text");
const b_text = document.getElementById("b_text");
const c_text = document.getElementById("c_text");
const d_text = document.getElementById("d_text");

const submitBtn = document.querySelector(".submit-btn")
const radios = document.querySelectorAll(".answer")

submitBtn.addEventListener("click", submitAnswer)

let answer = undefined;
let currentQuestion = 0;
let score = 0;


function loadQuestions(){

    const currentData = questions[currentQuestion]
    console.log(currentData);
    
    questionTitle.innerText = currentData.title

    a_text.innerText = currentData.a;
    b_text.innerText = currentData.b;
    c_text.innerText = currentData.c;
    d_text.innerText = currentData.d;

}

function submitAnswer() {

    const answer = getAnswer();
    console.log(answer);
    

    if(answer){
        if(answer === questions[currentQuestion].correct){
            score++;
        }
        
        currentQuestion++;
        if(currentQuestion < questions.length ){
            loadQuestions()
        }else{
            quizEl.innerHTML = `
                <h2 class="result">Bitirdin. ${questions.length} soruda ${score} doğru ${questions.length - score} yalnış yaptın.</h2>
            `
          
        }
    }

    radios.forEach(radio => radio.checked = false)

}

function getAnswer() {
   
    radios.forEach(radio => {

        if(radio.checked){
            answer = radio.id
        }
    })

    return answer;
}

window.addEventListener("load", loadQuestions)