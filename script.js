// 태그 가져오기
const $computer = document.querySelector("#computer"); // 컴퓨터 이미지
const $score = document.querySelector("#score"); // 점수 태그
const $rock = document.querySelector("#scissors"); // 가위 버튼
const $scissors = document.querySelector("#rock"); // 바위 버튼
const $paper = document.querySelector("#paper"); // 보 버튼

// 이미지 배열
let img_url = ["Images/rock.png", "Images/scissors.png", "Images/paper.png"];
$computer.src = `${img_url[0]}`;

// 컴퓨터의 선택 (0:rock, 1:scissors, 2:paper)
let computerChoice = 0;

// 컴퓨터 이미지 모양 바꾸기
function changeComputerHand() {
    computerChoice++;
    if(computerChoice > 2) computerChoice = 0;
    $computer.src = `${img_url[computerChoice]}`;
}

let computerInterval = setInterval(changeComputerHand, 50); // (실행할 함수, 주기)

let clickable = true;
let score = 0;

// 사용자가 버튼 눌렀을 때 실행될 함수
function clickButton(event) {
    if (clickable) { // 다중 클릭 방지
        clickable = false;
        clearInterval(computerInterval);
        // console.log(event.target.innerText);
        const myChoise = event.target.innerText;
        let resultMsg; // 결과 메시지
        if(myChoise === "Scissors") {
            if(computerChoice === 0) resultMsg = "you lose";
            else if(computerChoice === 1) resultMsg = "A draw";
            else resultMsg = "you win";
        }else if(myChoise === "Rock") {
            if(computerChoice === 0) resultMsg = "A draw";
            else if(computerChoice === 1) resultMsg = "you win";
            else resultMsg = "you lose";
        } else { "Paper"
            if(computerChoice === 0) resultMsg = "you win";
            else if(computerChoice === 1) resultMsg = "you lose";
            else resultMsg = "A draw";
        }

        // 점수 처리
        if(resultMsg === "you win") score++;
        else if(resultMsg === "you lose") score--;
        else score = score;

        // 점수, 결과 출력
        $score.innerText = `${resultMsg}, Score : ${score}`;

        // 다음번 실행은 2.5초후
        setTimeout(() => {
            clickable = true;
            computerInterval = setInterval(changeComputerHand, 50); // 다시 이미지 변경 실행
            $score.innerText = `Score : ${score}`;
        }, 2500); // 단위 = ms

    }
}

// 3개의 버튼 태그에 이벤트 리스너 설정
$rock.addEventListener("click", clickButton);
$scissors.addEventListener("click", clickButton);
$paper.addEventListener("click", clickButton);