let position =1;
let word_length=0;
let ans_array =[];
let tile='';
let answer_word = "right";
let position_checker ;
let letter = document.querySelectorAll('.key');
let letterType ;
let corrects=0;
let won = false;
let boardState =[];
let StateLocalStorage =[];
let attempts =0;
// localStorage.clear();
function fillBoard()
{
  position_checker = position-5;
  for(let i =0;i<5;i++)
  {
    tile += ans_array[i];
    letter.forEach(function(element){ 
      if(element.dataset.key == ans_array[i] )
      {
        letterType  = element;
        
      }
    })
    if(ans_array[i] == answer_word[i])
    {
      push_letter = document.getElementById(`${position_checker}`);
      push_letter.innerHTML = ans_array[i];
      push_letter.style.backgroundColor = "#6aaa64";
      letterType.style.backgroundColor = "#6aaa64";
      push_letter.style.color = "white";
      letterType.style.color = "white";
      corrects++;
    }
    else if(answer_word.includes(ans_array[i]))
    {
      push_letter = document.getElementById(`${position_checker}`);
      push_letter.innerHTML = ans_array[i];
      push_letter.style.backgroundColor = "#c9b458";
      letterType.style.backgroundColor = "#c9b458";
      push_letter.style.color = "#ffffff";
      letterType.style.color = "#ffffff";
    }
    else{
      push_letter = document.getElementById(`${position_checker}`);
      push_letter.innerHTML = ans_array[i];
      push_letter.style.backgroundColor = "#787c7e";
      push_letter.style.color = "#ffffff";
      letterType.style.color = "#ffffff";
      letterType.style.backgroundColor = "#787c7e";
      
    }
    position_checker++;
  }
  tile ='';
  if(corrects == 5)
  {
    won = true;
    console.log("game over");
  }
  corrects =0;
}
function settingLocalStograge()
{
  localStorage.setItem("answer",answer_word);
  if(localStorage.getItem("attempts") == null || localStorage.getItem("attempts") == undefined)
    localStorage.setItem("attempts",0);
  StateLocalStorage = JSON.parse(localStorage.getItem('boardState'));
 
  
  position=1;
  if(StateLocalStorage != null && StateLocalStorage != undefined){
    console.log(StateLocalStorage);
    console.log(StateLocalStorage.length);
    boardState = StateLocalStorage;
    attempts = JSON.parse(localStorage.getItem('attempts'));
    for(let i=0;i<StateLocalStorage.length;i++)
    {
      for(let j=0;j<5;j++)
      {
        ans_array[j] = StateLocalStorage[i][j];
      }
      position = position+5;
      fillBoard();
    }
  }

}
settingLocalStograge();
function updateLocalStorage()
{
  // console.log(boardState);
  localStorage.setItem("boardState",JSON.stringify(boardState));
  // StateLocalStorage = JSON.parse(localStorage.getItem('boardState'));
  console.log(attempts);
  localStorage.setItem("attempts",attempts);
  // console.log(StateLocalStorage);
  // console.log(boardState);
}
function checkAnswer()
{
  //console.log(ans_array);
  position_checker = position-5;
  for(let i =0;i<5;i++)
  {
    tile += ans_array[i];
    letter.forEach(function(element){ 
      if(element.dataset.key == ans_array[i] )
      {
        letterType  = element;
        
      }
    })
    if(ans_array[i] == answer_word[i])
    {
      push_letter = document.getElementById(`${position_checker}`);
      push_letter.style.backgroundColor = "#6aaa64";
      letterType.style.backgroundColor = "#6aaa64";
      push_letter.style.color = "#ffffff";
      letterType.style.color = "#ffffff";
      corrects++;
    }
    else if(answer_word.includes(ans_array[i]))
    {
      push_letter = document.getElementById(`${position_checker}`);
      push_letter.style.backgroundColor = "#c9b458";
      letterType.style.backgroundColor = "#c9b458";
      push_letter.style.color = "#ffffff";
      letterType.style.color = "#ffffff";
    }
    else{
      push_letter = document.getElementById(`${position_checker}`);
      push_letter.style.backgroundColor = "#787c7e";
      push_letter.style.color = "white";
      letterType.style.color = "white";
      letterType.style.backgroundColor = "#787c7e";
      
    }
    position_checker++;
  }
  // console.log(tile);
  // localStorage.setItem("attempts",attempts);
  attempts = JSON.parse(localStorage.getItem("attempts"));
  // console.log(attempts);
  // console.log(boardState);
  console.log(boardState);
  boardState[attempts] = tile;
  console.log(boardState);
  StateLocalStorage = boardState;
  attempts++;
  updateLocalStorage();
  tile ='';
  
  if(corrects == 5)
  {
    won = true;
    console.log("game over");
  }
  corrects =0;
 

}

window.addEventListener('keydown', function(e){
  let l = e.key;
  if(l == "Enter")
  {
    if(position%5 == 1)
    {
      for(let i = position-5,j=0;i<position;i++,j++)
      {
        push_letter = document.getElementById(`${i}`);
        ans_array[j] = push_letter.innerHTML;
      }
      checkAnswer();
      word_length =0;

    }
      
  }
  else if(l == "Backspace")
  {
   // console.log(position);
    if(word_length){
      position--;
      push_letter = document.getElementById(`${position}`);
     // console.log(push_letter);
      push_letter.innerHTML = "";
      word_length--;
    }
    
  }
  else{
    if(word_length != 5 && !won){
     // console.log(l);
      push_letter = document.getElementById(`${position}`);
      push_letter.innerHTML = l;
      position++;
      word_length++;
    }
   
  }

})
letter.forEach(function(element){
  element.addEventListener('click',function(){
    let l = element.dataset.key;
    if(l == "Enter")
    {
      if(position%5 == 1)
      {
        for(let i = position-5,j=0;i<position;i++,j++)
        {
          push_letter = document.getElementById(`${i}`);
          ans_array[j] = push_letter.innerHTML;
        }
        checkAnswer();
        word_length =0;
      }
    }
    else if(l == "Backspace")
    {
      if(word_length){
        position--;
        push_letter = document.getElementById(`${position}`);
        //console.log(push_letter);
        push_letter.innerHTML = "";
        word_length--;
      }
      
    }
    else{
      if(word_length != 5 && !won){
        //console.log(l);
        push_letter = document.getElementById(`${position}`);
        push_letter.innerHTML = l;
        position++;
        word_length++;
      }
    }

  })
})
function instructions(){
  document.getElementById("container").style.display = "None";
  document.getElementById("game-box").style.display = "Block";
}
function remove(){
  document.getElementById("game-box").style.display = "None";
  document.getElementById("container").style.display = "Block";
}