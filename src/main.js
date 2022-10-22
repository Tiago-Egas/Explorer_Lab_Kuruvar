import "./css/index.css";
import IMask from "imask";

const ccBgColor01 = document.querySelector(".cc-bg svg g:nth-child(1) path");
const ccBgColor02 = document.querySelector(".cc-bg svg g:nth-child(2) path");
const ccLogoCard = document.querySelector(".cc-logo span:nth-child(2) img");

function setCardType(type) {
  const colors = {
    default: ["gray", "black"],
    mastercard: ["#DF629", "#C69347"],
    visa: ["#436S99", "#2D57F2"],
    googlepay: ["#FFFFFF", "#34A853"],
    paypal: ["#222D65", "#179BD7"],
  };

  ccBgColor01.setAttribute("fill", colors[type][0]);
  ccBgColor02.setAttribute("fill", colors[type][1]);
  ccLogoCard.setAttribute("src", `cc-${type}.svg`);
}

globalThis.setCardType = setCardType;

const securityCode = document.querySelector("#security-code");
const securityCodePatttern = {
  mask: "0000",
};

const securityCodeMasked = IMask(securityCode, securityCodePatttern);

const expirationDate = document.querySelector("#expiration-date");
const expirationDatePatttern = {
  mask: "MM{/}YY",
  blocks: {
    MM: {
      mask: IMask.MaskedRange,
      from: 1,
      to: 12,
    },
    YY: {
      mask: IMask.MaskedRange,
      from: String(new Date().getFullYear()).slice(2),
      to: String(new Date().getFullYear() + 10).slice(2),
    },
  },
};

const expirationDateMasked = IMask(expirationDate, expirationDatePatttern);

const cardNumber = document.querySelector("#card-number");
const cardNumberPatttern = {
  mask: [
    {
      mask: "0000 0000 0000 0000",
      regex: /^4\d{0,15}/,
      cardtype: "visa",
    },
    {
      mask: "0000 0000 0000 0000",
      regex: /(^5[1-5]\d{0,2}|^22[2-9]\d|^2[3-7]\d{0,2})\d{0,12}/,
      cardtype: "mastercard",
    },
    {
      mask: "0000 0000 0000 0000",
      regex: /(^3456)\d{0,12}/,
      cardtype: "paypal",
    },
    {
      mask: "0000 0000 0000 0000",
      regex: /(^5678)\d{0,12}/,
      cardtype: "googlepay",
    },
    {
      mask: "0000 0000 0000 0000",
      regex: /(^1234)\d{0,12}/,
      cardtype: "default",
    },
  ],
  dispach: function (appended, dynamicMasked) {
    const number = (dynamicMasked.value + appended).replace(/\D/g, "");
    const foundMask = dynamicMasked.compiledMasks.find(function (item) {
      return number.match(item.regex);
    });
    return foundMask;
  },
};

const cardNumberMasked = IMask(cardNumber, cardNumberPatttern);

const addButton = document.querySelector("#addCard");
addButton.addEventListener("click", () => {
  alert("Card Added!");
});

document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault();
});

const cardHolder = document.querySelector("#card-holder");
cardHolder.addEventListener("input", () => {
  const ccHolder = document.querySelector(".cc-holder .value");
  // console.log(cardHolder.value.length);
  ccHolder.innerText =
    cardHolder.value.length === 0 ? "JOHN DOE" : cardHolder.value;
});

securityCodeMasked.on("accept", () => {
  updateSecurityCode(securityCodeMasked.value);
});

function updateSecurityCode(cvc) {
  const ccSecurity = document.querySelector(".cc-security .value");
  ccSecurity.innerText = cvc.length === 0 ? "1234" : cvc;
}
