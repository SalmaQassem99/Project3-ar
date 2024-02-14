const playButton = document.querySelector(".play");
const volumeButtons = document.querySelectorAll(
  ".controls .coltrolIcons .control.volume"
);
const homePage = document.querySelector(".home");
const storiesPage = document.querySelector(".story");
const storyCards = document.querySelectorAll(".story-card");
const story = document.querySelector(".story-page");
const boardItems = document.querySelectorAll(".board-item .card-number");
const cardItems = document.querySelectorAll(
  ".cards-wrapper .cards .card .card-item"
);
const scoreWrapper = document.querySelector(".scoreWrapper");
const score = document.querySelector(".scoreWrapper .score");
const successModal = document.querySelector(".success-card");
const closeButton = document.querySelector(".closeModal");
const overlay = document.querySelector(".overlay");
let counter = 0;
let soundOn = true;
playButton.addEventListener("click", () => {
  document.querySelector("#start-audio").play();
  homePage.classList.add("hide");
  homePage.addEventListener("animationend", () => {
    homePage.classList.remove("hide");
    homePage.style.visibility = "hidden";
    storiesPage.style.visibility = "visible";
  });
});
storyCards.forEach((card) => {
  card.addEventListener("click", () => {
    storiesPage.classList.add("hide");
    storiesPage.addEventListener("animationend", () => {
      storiesPage.classList.remove("hide");
      storiesPage.style.visibility = "hidden";
      story.style.visibility = "visible";
    });
  });
});
cardItems.forEach((cardItem) => {
  cardItem.addEventListener("dragstart", (event) => {
    event.dataTransfer.setData("id", event.target.dataset.index);
    document.querySelector(`audio[id="${event.target.dataset.index}"]`).play();
  });
});
boardItems.forEach((boardItem) => {
  boardItem.addEventListener("dragover", (event) => {
    event.preventDefault();
  });
  boardItem.addEventListener("drop", (event) => {
    event.preventDefault();
    const index = event.target.dataset.index;
    const imgId = event.dataTransfer.getData("id");
    const img = document.querySelector(
      `.cards-wrapper .cards .card .card-item[data-index="${imgId}"]`
    );
    if (index === imgId) {
      document.querySelector("#correct-audio").play();
      const imgSrc = img.src;
      counter += 1;
      score.textContent = `${counter}/${boardItems.length}`;
      boardItem.textContent = "";
      boardItem.style.backgroundImage = `url(${imgSrc})`;
      boardItem.classList.add("animate");
      boardItem.addEventListener("animationend", () => {
        boardItem.classList.remove("animate");
      });
      img.parentElement.parentElement.style.visibility = "hidden";
      document
        .querySelector(":root")
        .style.setProperty(
          "--width",
          `${(100 / boardItems.length) * counter}%`
        );
      if (counter === boardItems.length) {
        const success = document.querySelector(".success-card");
        const text = document.querySelector(".text-card .score-text");
        text.textContent = `${counter}/${boardItems.length}`;
        success.classList.add("show");
        document.querySelector(".overlay").classList.add("show");
      }
    } else {
      document.querySelector("#wrong-audio").play();
      img.parentElement.parentElement.classList.add("vibrate");
      img.parentElement.parentElement.addEventListener("animationend", () => {
        img.parentElement.parentElement.classList.remove("vibrate");
      });
    }
  });
});
closeButton.addEventListener("click", () => {
  successModal.classList.remove("show");
  setTimeout(() => {
    overlay.classList.remove("show");
  }, 400);
});
document.addEventListener("click", function (event) {
  const isVisible =
    window.getComputedStyle(successModal).visibility === "visible";
  var isClickInside =
    successModal.contains(event.target) || event.target === closeButton;
  if (!isClickInside && isVisible) {
    successModal.classList.remove("show");
    setTimeout(() => {
      overlay.classList.remove("show");
    }, 400);
  }
});
volumeButtons.forEach((volumeButton) => {
  volumeButton.addEventListener("click", () => {
    const onIcon = document.querySelectorAll(".fa-solid:not(.off)");
    const offIcon = document.querySelectorAll(".off");
    onIcon.forEach((icon) => {
      icon.classList.add("off");
    });
    offIcon.forEach((icon) => {
      icon.classList.remove("off");
    });
    if (soundOn) {
      soundOn = false;
      document.querySelectorAll("audio").forEach((audio) => {
        audio.muted = true;
      });
    } else {
      soundOn = true;
      document.querySelectorAll("audio").forEach((audio) => {
        audio.muted = false;
      });
    }
  });
});

window.addEventListener("load", () => {
  score.textContent = `0/${boardItems.length}`;
});
