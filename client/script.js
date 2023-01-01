import { SERVER_URL, LOCAL_SERVER_URL, generateUID } from "./utils";
import { postData } from "./ajax";
import userIcon from "./assets/images/user.png";
import botIcon from "./assets/images/bot.png";

let loadBotInterval;
let screenWidth;
let limitChatHeight = 57;

$(window).on("load", function () {
  screenWidth = window.innerWidth;

  const URL = LOCAL_SERVER_URL;
  const form = document.getElementById("formBox");

  function botLoader(element) {
    element.text("");

    loadBotInterval = setInterval(() => {
      element.append(".");

      if (element.text() === "....") {
        element.text("");
      }
    }, 300);
  }

  function typeTextEffect(element, text, botUniqueID = null) {
    let index = 0;

    let interval = setInterval(() => {
      if (index < text.length) {
        $("#chatListBox").scrollTop($("#chatListBox").prop("scrollHeight"));
        const botChatListHeight = $(`#${botUniqueID} #infoBox`).height();
        if (botChatListHeight > limitChatHeight) {
          $(`#${botUniqueID} #listBox`).addClass("chg-flex-top");
        }

        element.append(text.charAt(index));
        index++;
      } else {
        clearInterval(interval);
        $("#inputBox").removeAttr("disabled");
      }
    }, 20);
  }

  function chatListHTML(isBot, value, uniqueID) {
    return `
    <div class="list-wrapper ${
      isBot ? "bot-list" : "user-list"
    }" id="${uniqueID}">
      <div class="list flex-css-row-start gap-container" id="listBox">
        <div class="profile-box">
          <img src="${
            isBot ? botIcon : userIcon
          }" alt="${isBot ? "botIcon" : "userIcon"}" />
        </div>
      <div class="info-box" id="infoBox">
        <p id="messageText">${value}</p>
      </div>
      </div>
    </div>
    `;
  }

  const prompt_data = {
    prompt: "",
  };

  function getAnswers(botUniqueID) {
    postData(URL, JSON.stringify(prompt_data), function (response) {
      prompt_data.prompt = "";
      if (response) {
        console.log(response);
        clearInterval(loadBotInterval);
        $(`#${botUniqueID} #messageText`).text("");
        typeTextEffect(
          $(`#${botUniqueID} #messageText`),
          response.bot.trim(),
          botUniqueID
        );
      } else {
        typeTextEffect(
          $(`#${botUniqueID} #messageText`),
          "Something went wrong!",
          null
        );
      }
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    const data = new FormData(form);
    const userText = data.get("prompt");

    if (userText.trim() === "") {
      return false;
    }

    // user chat box
    const userUniqueID = `user${generateUID()}`;
    $("#chatListBox").append(chatListHTML(false, userText, userUniqueID));
    const userChatListHeight = $(`#${userUniqueID} #infoBox`).height();
    if (userChatListHeight > limitChatHeight) {
      $(`#${userUniqueID} #listBox`).addClass("chg-flex-top");
    }

    prompt_data.prompt = userText;
    form.reset();
    $("#inputBox").attr("disabled", "disabled");

    // bot chat box
    const botUniqueID = `bot${generateUID()}`;
    $("#chatListBox").append(chatListHTML(true, "", botUniqueID));

    $("#chatListBox").scrollTop($("#chatListBox").prop("scrollHeight"));

    botLoader($(`#${botUniqueID} #messageText`));

    // get data
    getAnswers(botUniqueID);
  }

  $("#formBox").on("submit", handleSubmit);
  $("#formBox").on("keyup", function (e) {
    if (e.keyCode === 13) {
      handleSubmit(e);
    }
  });
});

$(window).on("resize", function () {
  screenWidth = window.innerWidth;
  $("#chatListBox").scrollTop($("#chatListBox").prop("scrollHeight"));
});
