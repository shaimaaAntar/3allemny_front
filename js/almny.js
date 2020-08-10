function Ask() {
    this.id = null;
    this.username = null;
    this.userImage = null;
    this.content = null;
    this.dateTime = null;
    this.askHTML = null;
}

Ask.prototype.getNewAskID = function () {
    var noOfAsks = document
        .querySelectorAll("#ask > div[id^='ask-']").length;
    this.id = noOfAsks + 1;
};

Ask.prototype.createAskHTML = function () {
    this.dateTime = new Date().toLocaleString();
    this.askHTML = '<div class="col-12 col-md-8 offset-md-2" id="ask-' + this.id + '">' +
        '<div class="card bg-light border-primary mt-2">' +
        '<div class="card-body">' +
        '<div class="media">' +
        '<img src="' + this.userImage + '" alt="Placeholder Image" ' +
        'class="mr-3 mt-1 rounded-circle" style="width:60px;">' +
        '<div class="media-body">' +
        '<button class="btn btn-danger float-right btn-sm" id="ask-' + this.id + '-delete">' +
        '<i class="fa fa-trash"></i></button>' +
        '<h4>' + this.username + '</h4><p class="font-italic text-muted m-0 p-0">' +
        '<small>equation on ' + this.dateTime + '</small>' +
        '</p><p class="text-justify">' + this.content + '</p>' +
        '<div id="ask-' + this.id + '-answers"></div>' +
        '<hr><form action="#" method="POST" id="ask-' + this.id + '-form" novalidate>' +
        '<div class="form-group">' +
        '<label for="ask" class="h5">Write Your answer</label>' +
        '<textarea name="ask" id="ask-' + this.id + '-textarea" class="form-control" ' +
        'rows="3" required></textarea></div>' +
        '<div class="float-right">' +
        '<input type="reset" class="btn btn-danger mr-1" value="Clear">' +
        '<input type="submit" id="ask-' + this.id +
        '-btn" class="btn btn-success" value="answer">' +
        '</div></form></div></div></div></div></div>';
};

Ask.prototype.addCommentsListeners = function () {
    var currentDelete = document.getElementById("ask-" + this.id + "-delete");
    currentDelete.addEventListener("click", function (e) {
        e.preventDefault();
        var result = confirm("Are you sure to delete this equation?");
        if (result === true) {
            var id = currentDelete.id.split('-')[1];
            var ask = document.getElementById("ask-" + id).remove();
        }
    });

    var currentBtn = document.getElementById("ask-" + this.id + "-btn");
    currentBtn.addEventListener("click", function (e) {
        e.preventDefault();
        var askID = currentBtn.id.split("-")[1];
        if (document
            .getElementById("ask-" + askID + "-textarea").value.length <= 0) {
            //alert("Sorry! This Comment is Empty!");
            return false;
        }

        var newAnswer = new Answer();
        newAnswer.askID = askID;
        newAnswer.username = "shaimaa Ahmed [New]";
        newAnswer.image = "images/download1.png";
        newAnswer.content = document
            .getElementById("ask-" + askID + "-textarea").value;
        document
            .getElementById("ask-" + askID + "-textarea").value = "";
        newAnswer.getNewAnswerID();
        newAnswer.createAnswerHTML();
        var answersContainer = document
            .getElementById("ask-" +askID + "-answers");
        answersContainer.insertAdjacentHTML(
            "beforeend", newAnswer.answerHTML);
    });
};

var askBtn = document.getElementById("askBtn");
askBtn.addEventListener("click", function (e) {
    e.preventDefault();
    if (document.getElementById("ask").value.length <= 0) {
        //alert("Sorry! This Post is Empty!");
        return false;
    }

    var newAsk = new Ask();
    newAsk.username = "Ali Ahmed";
    newAsk.userImage = "images/download1.png";
    newAsk.content = document.getElementById("ask").value;
    document.getElementById("ask").value = "";
    newAsk.getNewAskID();
    newAsk.createAskHTML();
    var asksContainer = document.getElementById("asks");
    asksContainer.insertAdjacentHTML("afterbegin", newAsk.askHTML);
    newAsk.addCommentsListeners();
});

function Answer() {
    this.id = null;
    this.askID;
    this.image = null;
    this.username = null;
    this.content = null;
    this.dateTime = null;
    this.answerHTML = null;

}
Answer.prototype.getNewAnswerID = function () {
    var x = "#ask" + this.askID + "answer";
    var noOfAnswers = document.querySelectorAll(x + ">div[id^='ask-'][id*='-answer']").length;
    this.id = noOfAnswers + 1;
};
Answer.prototype.createAnswerHTML = function () {
    this.dateTime = new Date().toLocaleString();
    this.answerHTML = '<div class="media ml-3" id="ask-' + this.askID + '-answer-' + this.id + '">' +
        '<img src="' + this.image + '" alt="user Image"' +
        'class="mr-3 mt-1 rounded-circle" style="width:50px;">' +
        '<div class="media-body">' +
        ' <h5>' + this.username + '</h5>' +
        '<p class="font-italic text-muted m-0 p-0">' +
        '<small>Answer on  ' + this.dateTime + '</small>' +
        '</p>' +
        '<p class="text-justify">' + this.content +
        '</p>' +
        '</div>' +
        '</div>';
};

var answerBtns = document.querySelectorAll("input[id^= 'ask-'][id$= '-btn']");
for (var i = 0; i < answerBtns.length; i++) {
    var answertBtn = answerBtns[i];
    answertBtn.addEventListener("click", function (e) {
        e.preventDefault();
        var askID = answertBtn.id.split("-")[1];
        if(document.getElementById("ask-" + askID + "-textarea").value.length <= 0){
            alert("sorry! answer is empty")
            return false;
        }
        var newAnswer = new Answer();
        newAnswer.askID = askID;
        newAnswer.username = "shaimaa";
        newAnswer.image = "images/download1.png";
        newAnswer.content = document.getElementById("ask-" + askID + "-textarea").value;
        newAnswer.getNewAnswerID();
        newAnswer.createAnswerHTML();
        var answerAdd = document.getElementById("ask-"+askID+"-answer");
        answerAdd.insertAdjacentHTML("beforeend", newAnswer.answerHTML);
    });
}
