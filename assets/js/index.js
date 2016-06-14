$(function() {
  var questions = [{
    question: "What is the name of Doug’s dog?",
    choices: ["Ribs", "Porkchop", "Bacon", "Kebab", "Poop"],
    correctAnswer: "Porkchop"
  }, {
    question: "While Stimpy is a Manx cat, Ren is a",
    choices: ["Terrier", "Chihuahua", "Poodle", "Shih Tzu"],
    correctAnswer: "Chihuahua"
  }, {
    question: "Which ‘All That’ castmember is the star of the sketch called “Ask Ashley”?",
    choices: ["Angelique Bates", "Alisa Reyes", "Lori Beth Denberg", "Amanda Bynes", "Brandon Cotes"],
    correctAnswer: "Amanda Bynes"
  }, {
    question: "Clarissa Explains it All: Clarissa’s best friend Sam usually enters her room through the __.",
    choices: ["door", "roof", "window", "closet"],
    correctAnswer: "window"
  }, {
    question: "Rocko’s Modern Life: One of Rocko’s friends, Filburt, is what type of animal?",
    choices: ["steer", "toad", "turtle", "chameleon", "goat"],
    correctAnswer: "turtle"
  }];
  
  var questionTable = 0; 
  var pickers = []; 
  var quiz = $('#quiz'); 
  

  displayNext();
  
  $('#next').on('click', function (e) {
    e.preventDefault();
    
    
    if(quiz.is(':animated')) {        
      return false;
    }
    choose();
    
    if (isNaN(pickers[questionTable])) {
      alert('Come On Pick One Buddy!');
    } else {
      questionTable++;
      displayNext();
    }
  });
  
  $('#prev').on('click', function (e) {
    e.preventDefault();
    
    if(quiz.is(':animated')) {
      return false;
    }
    choose();
    questionTable--;
    displayNext();
  });
 
  $('#start').on('click', function (e) {
    e.preventDefault();
    
    if(quiz.is(':animated')) {
      return false;
    }
    questionTable = 0;
    pickers = [];
    displayNext();
    $('#start').hide();
  });

  $('.button').on('mouseenter', function () {
    $(this).addClass('active');
  });
  $('.button').on('mouseleave', function () {
    $(this).removeClass('active');
  });
  
  // Creates and returns the div that contains the questions and 
  // the answer pickers
  function createQuestionElement(index) {
    var qElement = $('<div>', {
      id: 'question'
    });
    
    var header = $('<h2>Question ' + (index + 1) + ':</h2>');
    qElement.append(header);
    
    var question = $('<p>').append(questions[index].question);
    qElement.append(question);
    
    var radioButtons = createRadios(index);
    qElement.append(radioButtons);
    
    return qElement;
  }
  
  function createRadios(index) {
    var rList = $('<ul>');
    var item;
    var input = '';
    for (var i = 0; i < questions[index].choices.length; i++) {
      item = $('<li>');
      input = '<input type="radio" name="answer" value=' + i + ' />';
      input += questions[index].choices[i];
      item.append(input);
      rList.append(item);
    }
    return rList;
  }
  
 
  function choose() {
    pickers[questionTable] = +$('input[name="answer"]:checked').val();
  }
  
  // Displays next requested element
  function displayNext() {
    quiz.fadeOut(function() {
      $('#question').remove();
      
      if(questionTable < questions.length){
        var nextQuestion = createQuestionElement(questionTable);
        quiz.append(nextQuestion).fadeIn();
        if (!(isNaN(pickers[questionTable]))) {
          $('input[value='+pickers[questionTable]+']').prop('checked', true);
        }
        // la
        // Controls dispy of 'prev' button
        if(questionTable === 1){
          $('#prev').show();
        } else if(questionTable === 0){
          
          $('#prev').hide();
          $('#next').show();
        }
      }else {
        var scoreElem = displayScore();
        quiz.append(scoreElem).fadeIn();
        $('#next').hide();
        $('#prev').hide();
        $('#start').show();
      }
    });
  }
  
  
  function displayScore() {
    var score = $('<p>',{id: 'question'});
    
    var numCorrect = 0; 
    for (var i = 0; i < pickers.length; i++) {
      if (pickers[i] === questions[i].correctAnswer) {
        numCorrect++;
      }
    }
    
    score.append('You got ' + numCorrect + ' questions out of ' +
                 questions.length + ' right!!!');
    return score;
  }
})();