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
