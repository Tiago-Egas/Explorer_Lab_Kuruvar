import "./css/index.css";
import IMask from "imask";

const ccBgColor01 = document.getElementById("cc-bg-path-1");
const ccBgColor02 = document.getElementById("cc-bg-path-2");
const ccLogo = document.querySelector(".cc-logo > span span:nth-child(2) img");

function setCardType(type) {
  const colors = {
    default: ["black", "gray"],
    visa: ["#192061", "#1336CC"],
    mastercard: ["#EB001B", "#FF5F00"],
    amex: ["#016FD0", "#1D8ECE"],
    discover: ["#FF5F00", "#F9A021"],
    elo: ["#000000", "#ffd033"],
    hipercard: ["#cc0000", "#ffffff"],
    diners: ["#0079BE", "#ffffff"],
  };

  const selectedColor = colors[type] || colors.default;

  ccBgColor01.setAttribute("fill", selectedColor[0]);
  ccBgColor02.setAttribute("fill", selectedColor[1]);
  ccLogo.setAttribute("src", `./public/cc-${type || "default"}.svg`);
}

// globalThis.setCardType = setCardType;

const securityCode = document.getElementById("security-code");
const securityCodePattern = {
  mask: "000",
};

const securityCodeMasked = IMask(securityCode, securityCodePattern);

const expirationDate = document.getElementById("expiration-date");
const expirationDatePattern = {
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

const expirationDateMasked = IMask(expirationDate, expirationDatePattern);

const cardNumber = document.getElementById("card-number");
const cardNumberPattern = {
  mask: [
    {
      mask: "0000 0000 0000 0000",
      regex: /^4\d{0,15}/,
      cctype: "visa",
    },
    {
      mask: "0000 0000 0000 0000",
      regex: /^(5[1-5]\d{0,2}|22[2-9]\d{0,1}|2[3-7]\d{0,2})\d{0,12}/,
      cctype: "mastercard",
    },
    {
      mask: "0000 000000 00000",
      regex: /^3[47]\d{0,13}/,
      cctype: "amex",
    },
    {
      mask: "0000 0000 0000 0000",
      regex: /^6(?:011|5[0-9]{2})[0-9]{0,12}/,
      cctype: "discover",
    },
    {
      mask: "0000 0000 0000 0000",
      regex: /^(506699|5067|509|627780|401178|431274|636368)\d{0,10}/,
      cctype: "elo",
    },
    {
      mask: "0000 0000 0000 0000",
      regex: /^(606282|3841)\d{0,12}/,
      cctype: "hipercard",
    },
    {
      mask: "0000 000000 0000",
      regex: /^(30[0-5]|36|38|39)\d{0,11}/,
      cctype: "diners",
    },
    {
      mask: "0000 0000 0000 0000",
      regex: /.*/,
      cctype: "default",
    },
  ],
  dispatch: function (appended, dynamicMasked) {
    const number = (dynamicMasked.value + appended).replace(/\D/g, "");
    const foundMask = dynamicMasked.compiledMasks.find(function (item) {
      return number.match(item.regex);
    });
    return foundMask;
  },
};

const cardNumberMasked = IMask(cardNumber, cardNumberPattern);

const addButton = document.getElementById("addCard");
addButton.addEventListener("click", () => {
  alert("Card Added!");
});

document.querySelector(".form").addEventListener("submit", (event) => {
  event.preventDefault();
});

const cardHolder = document.getElementById("card-holder");
cardHolder.addEventListener("input", () => {
  const ccHolder = document.querySelector(".cc-holder .value");
  // console.log(cardHolder.value.length);
  ccHolder.innerHTML =
    cardHolder.value.length === 0 ? "JOHN DOE" : cardHolder.value;
});

securityCodeMasked.on("accept", () => {
  updateSecurityCode(securityCodeMasked.value);
});

function updateSecurityCode(cvc) {
  const ccSecurity = document.querySelector(".cc-security .value");
  ccSecurity.innerHTML = cvc.length === 0 ? "123" : cvc;
}

cardNumberMasked.on("accept", () => {
  const cardType = cardNumberMasked.masked.currentMask.cctype;
  setCardType(cardType);
  updateCardNumber(cardNumberMasked.value);
});

function updateCardNumber(number) {
  const ccNumber = document.querySelector(".cc-number");
  // console.log(number);
  ccNumber.innerHTML = number.length === 0 ? "1234 5678 9012 3456" : number;
}

expirationDateMasked.on("accept", () => {
  updateExpirationDate(expirationDateMasked.value);
});

function updateExpirationDate(date) {
  const ccExpiration = document.querySelector(".cc-expiration .value");
  ccExpiration.innerHTML = date.length === 0 ? "MM/YY" : date;
}
