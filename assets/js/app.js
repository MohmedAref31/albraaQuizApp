// variables decleration

// end variables decleration
let showMark = document.getElementById("showMark")
let showMarkH = document.getElementById("showMarkHolder")
let quizTitle = document.getElementById("quizTitle");
let qNum = document.getElementById("qNum");
let qcontainer = document.getElementById("qContainer");
let bulletsC = document.getElementById("bulletsCont");
let nextBtn = document.getElementById("next");
let prevBtn = document.getElementById("prev");
let send = document.getElementById("submitBtn");
let reload = document.getElementById("reloadBtn");
let counter = 0;
let rightansC = 0;
// console.log(quizTitle,qNum,qTitle,qAnswers)

function getQuestions() {
  let request = new XMLHttpRequest();

  request.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      let qData = JSON.parse(this.responseText);
      let ques = qData.questions;

      console.log(ques);
      // set the title of the quiz
      quizTitle.textContent = qData.title;

      showAllData(ques);
      let allQ = document.querySelectorAll(".question");
      showQ(allQ);
      nextBtn.onclick = function () {
        if (counter < allQ.length - 1) {
          counter++;
          showQ(allQ);
          
        }
      };
      prevBtn.onclick = function () {
        if (counter > 0) {
          counter--;
          showQ(allQ);
        }
      };
      showBullets(ques);
      let allB = document.querySelectorAll(".bullet");
    //   console.log(allB)
        allB.forEach((b,i)=>{
            b.onclick = ()=>{
                counter=i
                console.log(counter)
                showQ(allQ)
            };
            
            
        })


        send.onclick = function(){
            this.style.display="none";
            reload.style.display="block"
            for(let i = 0 ; i < ques.length ; i++){
                let ans = document.getElementsByName(`ans${i}`);
                let checkedT = false;
                let checked = false;
                for(j = 0 ; j < ans.length ; j++){

                    if(ans[j].checked){
                        if(ans[j].dataset.ans == "true"){
                            rightansC++;
                            ans[j].parentElement.classList.add("right-ans")
                            checkedT=true;
                        }else{
                            ans[j].parentElement.classList.add("wrong-ans")
                        }
                        checked=true;
                    }
                }
                if(!checkedT){
                    for(k = 0 ; k < ans.length ; k++){

                        if(ans[k].dataset.ans == "true"){
                           ans[k].parentElement.classList.add("right-ans")
                        }
                    }
                }
                if(!checked){
                    allQ[i].classList.add("unsolved")
                }
               
            }
            
            showMarkH.innerHTML =`درجتك هى <br> ${rightansC} من ${allQ.length}`
            showMark.classList.add("shown")
            document.getElementById("over").style.display="block"
            closeMark()
    
        }

        reload.onclick=()=>{
            location.reload()
        }

    }

   

  };

  request.open("GET", "assets/api/ques.json", true);
  request.send();
}
getQuestions();

let showAllData = (arr) => {
  console.log(arr);

  for (let i = 0; i < arr.length; i++) {
    let quesC = document.createElement("div");
    quesC.className = "question";
    let qTitle = document.createElement("div");
    qTitle.className = "q-title";
    let qTitleText = document.createTextNode(arr[i].title);
    qTitle.appendChild(qTitleText);
    quesC.appendChild(qTitle);
    let qAnswers = document.createElement("div");
    qAnswers.className = "q-answers";
    quesC.appendChild(qAnswers);

    
    let ans = arr[i].answers;
    ans.sort(() => Math.random() - 0.5);
    for (let j = 0; j < 4; j++) {
      
      

      let ansC = document.createElement("div");
      ansC.className = "q-answer";
      let inp = document.createElement("input");
      inp.type = "radio";
      inp.name = `ans${i}`;
      inp.id = `ans${i}${j}`;
      inp.dataset.ans = ans[j].correct;
      let ansNum = document.createElement("div");
      ansNum.className = "q-answer-num";
      let ansNumT;
      if (j == 0) ansNumT = document.createTextNode("ا");
      else if (j == 1) ansNumT = document.createTextNode("ب");
      else if (j == 2) ansNumT = document.createTextNode("ج");
      else ansNumT = document.createTextNode("د");

      ansNum.appendChild(ansNumT);

      let label = document.createElement("label");
      label.htmlFor = `ans${i}${j}`;
      let labelT = document.createTextNode(ans[j].text);
      label.appendChild(labelT);

      ansC.appendChild(inp);
      ansC.appendChild(ansNum);
      ansC.appendChild(label);
      qAnswers.appendChild(ansC);
    //   console.log(ans);
    }

    qcontainer.appendChild(quesC);
  }
};

showQ = (arr) => {
    qNum.innerHTML = counter + 1
  arr.forEach((e) => {
    e.style.display = "none";
  });
  arr[counter].style.display = "block";
};

function showBullets(arr) {
  for (let i = 1; i <= arr.length; i++) {
    bulletsC.innerHTML += `
        <div class="bullet">${i}</div>
        `;
  }
}

function closeMark(){
    let close = document.getElementById("closeMark");
    console.log(close)
    close.addEventListener("click",()=>{
        showMark.classList.remove("shown")
    })
}

