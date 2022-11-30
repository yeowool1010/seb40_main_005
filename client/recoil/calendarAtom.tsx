import { atom } from "recoil";

const modalOpenState = atom({
  key: "modalOpenState",
  default: false,
});

const selectYearState = atom({
  key: "selectYearState",
  default : "1234"
});

const selectMonthState = atom({
  key: "selectMonthState",
  default : "5"
});

const selectDayState = atom({
  key: "selectDayState",
  default : "6"
});

const pickDayState = atom({
  key : "pickDayState",
  default : ""
})

export {modalOpenState, selectYearState, selectMonthState, selectDayState, pickDayState};