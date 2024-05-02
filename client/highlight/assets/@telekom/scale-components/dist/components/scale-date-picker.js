import { proxyCustomElement, createEvent, h, Host, HTMLElement as HTMLElement$1 } from '@stencil/core/internal/client';
import { s as statusNote } from './status-note.js';
import { c as classnames } from './index2.js';
import { g as generateUniqueId, e as emitEvent } from './utils.js';
import { d as defineCustomElement$a } from './duet-date-picker2.js';
import { d as defineCustomElement$9 } from './helper-text.js';
import { d as defineCustomElement$8 } from './action-success.js';
import { d as defineCustomElement$7 } from './alert-error.js';
import { d as defineCustomElement$6 } from './alert-information.js';
import { d as defineCustomElement$5 } from './content-calendar.js';
import { d as defineCustomElement$4 } from './navigation-collapse-down.js';
import { d as defineCustomElement$3 } from './navigation-left.js';
import { d as defineCustomElement$2 } from './navigation-right.js';

const ISO_DATE_FORMAT = /^(\d{4})-(\d{2})-(\d{2})$/;
var DaysOfWeek;
(function (DaysOfWeek) {
  DaysOfWeek[DaysOfWeek["Sunday"] = 0] = "Sunday";
  DaysOfWeek[DaysOfWeek["Monday"] = 1] = "Monday";
  DaysOfWeek[DaysOfWeek["Tuesday"] = 2] = "Tuesday";
  DaysOfWeek[DaysOfWeek["Wednesday"] = 3] = "Wednesday";
  DaysOfWeek[DaysOfWeek["Thursday"] = 4] = "Thursday";
  DaysOfWeek[DaysOfWeek["Friday"] = 5] = "Friday";
  DaysOfWeek[DaysOfWeek["Saturday"] = 6] = "Saturday";
})(DaysOfWeek || (DaysOfWeek = {}));
function createDate(year, month, day) {
  var dayInt = parseInt(day, 10);
  var monthInt = parseInt(month, 10);
  var yearInt = parseInt(year, 10);
  const isValid = Number.isInteger(yearInt) && // all parts should be integers
    Number.isInteger(monthInt) &&
    Number.isInteger(dayInt) &&
    monthInt > 0 && // month must be 1-12
    monthInt <= 12 &&
    dayInt > 0 && // day must be 1-31
    dayInt <= 31 &&
    yearInt > 0;
  if (isValid) {
    return new Date(yearInt, monthInt - 1, dayInt);
  }
}
/**
 * @param value date string in ISO format YYYY-MM-DD
 */
function parseISODate(value) {
  if (!value) {
    return;
  }
  const matches = value.match(ISO_DATE_FORMAT);
  if (matches) {
    return createDate(matches[1], matches[2], matches[3]);
  }
}
/**
 * print date in format YYYY-MM-DD
 * @param date
 */
function printISODate(date) {
  if (!date) {
    return "";
  }
  var d = date.getDate().toString(10);
  var m = (date.getMonth() + 1).toString(10);
  var y = date.getFullYear().toString(10);
  // days are not zero-indexed, so pad if less than 10
  if (date.getDate() < 10) {
    d = `0${d}`;
  }
  // months *are* zero-indexed, pad if less than 9!
  if (date.getMonth() < 9) {
    m = `0${m}`;
  }
  return `${y}-${m}-${d}`;
}
/**
 * Compare if two dates are equal in terms of day, month, and year
 */
function isEqual(a, b) {
  if (a == null || b == null) {
    return false;
  }
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}
function addDays(date, days) {
  var d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}
function startOfWeek(date, firstDayOfWeek = DaysOfWeek.Monday) {
  var d = new Date(date);
  var day = d.getDay();
  var diff = (day < firstDayOfWeek ? 7 : 0) + day - firstDayOfWeek;
  d.setDate(d.getDate() - diff);
  return d;
}
function endOfWeek(date, firstDayOfWeek = DaysOfWeek.Monday) {
  var d = new Date(date);
  var day = d.getDay();
  var diff = (day < firstDayOfWeek ? -7 : 0) + 6 - (day - firstDayOfWeek);
  d.setDate(d.getDate() + diff);
  return d;
}
function startOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}
function endOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}
function setMonth(date, month) {
  const d = new Date(date);
  d.setMonth(month);
  return d;
}
function setYear(date, year) {
  const d = new Date(date);
  d.setFullYear(year);
  return d;
}
/**
 * Check if date is within a min and max
 */
function inRange(date, min, max) {
  return clamp(date, min, max) === date;
}
/**
 * Ensures date is within range, returns min or max if out of bounds
 */
function clamp(date, min, max) {
  const time = date.getTime();
  if (min && min instanceof Date && time < min.getTime()) {
    return min;
  }
  if (max && max instanceof Date && time > max.getTime()) {
    return max;
  }
  return date;
}
/**
 * given start and end date, return an (inclusive) array of all dates in between
 * @param start
 * @param end
 */
function getDaysInRange(start, end) {
  const days = [];
  let current = start;
  while (!isEqual(current, end)) {
    days.push(current);
    current = addDays(current, 1);
  }
  days.push(current);
  return days;
}
/**
 * given a date, return an array of dates from a calendar perspective
 * @param date
 * @param firstDayOfWeek
 */
function getViewOfMonth(date, firstDayOfWeek = DaysOfWeek.Monday) {
  const start = startOfWeek(startOfMonth(date), firstDayOfWeek);
  const end = endOfWeek(endOfMonth(date), firstDayOfWeek);
  return getDaysInRange(start, end);
}
/**
 * Form random hash
 */
function chr4() {
  return Math.random()
    .toString(16)
    .slice(-4);
}
/**
 * Create random identifier with a prefix
 * @param prefix
 */
function createIdentifier(prefix) {
  return `${prefix}-${chr4()}${chr4()}-${chr4()}-${chr4()}-${chr4()}-${chr4()}${chr4()}${chr4()}`;
}

const DatePickerInput = ({ onClick, dateFormatter, localization, name, formattedValue, valueAsDate, value, identifier, disabled, required, role, buttonRef, inputRef, onInput, onBlur, onFocus, }) => {
  return (h("div", { class: "duet-date__input-wrapper" },
    h("input", { class: "duet-date__input", value: formattedValue, placeholder: localization.placeholder, id: identifier, disabled: disabled, role: role, required: required ? true : undefined, "aria-autocomplete": "none", onInput: onInput, onFocus: onFocus, onBlur: onBlur, autoComplete: "off", ref: inputRef }),
    h("input", { type: "hidden", name: name, value: value }),
    h("button", { class: "duet-date__toggle", onClick: onClick, disabled: disabled, ref: buttonRef, type: "button" },
      h("span", { class: "duet-date__toggle-icon" },
        h("svg", { "aria-hidden": "true", height: "24", viewBox: "0 0 21 21", width: "24", xmlns: "http://www.w3.org/2000/svg" },
          h("g", { fill: "none", "fill-rule": "evenodd", transform: "translate(2 2)" },
            h("path", { d: "m2.5.5h12c1.1045695 0 2 .8954305 2 2v12c0 1.1045695-.8954305 2-2 2h-12c-1.1045695 0-2-.8954305-2-2v-12c0-1.1045695.8954305-2 2-2z", stroke: "currentColor", "stroke-linecap": "round", "stroke-linejoin": "round" }),
            h("path", { d: "m.5 4.5h16", stroke: "currentColor", "stroke-linecap": "round", "stroke-linejoin": "round" }),
            h("g", { fill: "currentColor" },
              h("circle", { cx: "8.5", cy: "8.5", r: "1" }),
              h("circle", { cx: "4.5", cy: "8.5", r: "1" }),
              h("circle", { cx: "12.5", cy: "8.5", r: "1" }),
              h("circle", { cx: "8.5", cy: "12.5", r: "1" }),
              h("circle", { cx: "4.5", cy: "12.5", r: "1" }),
              h("circle", { cx: "12.5", cy: "12.5", r: "1" }))))),
      h("span", { class: "duet-date__vhidden" },
        localization.buttonLabel,
        valueAsDate && (h("span", null,
          ", ",
          localization.selectedDateMessage,
          " ",
          dateFormatter.format(valueAsDate)))))));
};

const DatePickerDay = ({ focusedDay, today, day, onDaySelect, onKeyboardNavigation, focusedDayRef, inRange, isSelected, dateFormatter, }) => {
  const isToday = isEqual(day, today);
  const isFocused = isEqual(day, focusedDay);
  const isDisabled = day.getMonth() !== focusedDay.getMonth();
  const isOutsideRange = !inRange;
  function handleClick(e) {
    onDaySelect(e, day);
  }
  return (h("button", { class: {
      "duet-date__day": true,
      "is-outside": isOutsideRange,
      "is-disabled": isDisabled,
      "is-today": isToday,
    }, tabIndex: isFocused ? 0 : -1, onClick: handleClick, onKeyDown: onKeyboardNavigation, disabled: isOutsideRange || isDisabled, type: "button", "aria-pressed": isSelected ? "true" : "false", ref: el => {
      if (isFocused && el && focusedDayRef) {
        focusedDayRef(el);
      }
    } },
    h("span", { "aria-hidden": "true" }, day.getDate()),
    h("span", { class: "duet-date__vhidden" }, dateFormatter.format(day))));
};

function chunk(array, chunkSize) {
  const result = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    result.push(array.slice(i, i + chunkSize));
  }
  return result;
}
function mapWithOffset(array, startingOffset, mapFn) {
  return array.map((_, i) => {
    const adjustedIndex = (i + startingOffset) % array.length;
    return mapFn(array[adjustedIndex]);
  });
}
const DatePickerMonth = ({ selectedDate, focusedDate, labelledById, localization, firstDayOfWeek, min, max, dateFormatter, onDateSelect, onKeyboardNavigation, focusedDayRef, }) => {
  const today = new Date();
  const days = getViewOfMonth(focusedDate, firstDayOfWeek);
  return (h("table", { class: "duet-date__table", "aria-labelledby": labelledById },
    h("thead", null,
      h("tr", null, mapWithOffset(localization.dayNames, firstDayOfWeek, dayName => (h("th", { class: "duet-date__table-header", scope: "col" },
        h("span", { "aria-hidden": "true" }, dayName.substr(0, 2)),
        h("span", { class: "duet-date__vhidden" }, dayName)))))),
    h("tbody", null, chunk(days, 7).map(week => (h("tr", { class: "duet-date__row" }, week.map(day => (h("td", { class: "duet-date__cell" },
      h(DatePickerDay, { day: day, today: today, focusedDay: focusedDate, isSelected: isEqual(day, selectedDate), inRange: inRange(day, min, max), onDaySelect: onDateSelect, dateFormatter: dateFormatter, onKeyboardNavigation: onKeyboardNavigation, focusedDayRef: focusedDayRef }))))))))));
};

const localization = {
  buttonLabel: "Choose date",
  placeholder: "YYYY-MM-DD",
  selectedDateMessage: "Selected date is",
  prevMonthLabel: "Previous month",
  nextMonthLabel: "Next month",
  monthSelectLabel: "Month",
  yearSelectLabel: "Year",
  closeLabel: "Close window",
  keyboardInstruction: "You can use arrow keys to navigate dates",
  calendarHeading: "Choose a date",
  dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  monthNames: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
  monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  locale: "en-GB",
};

const isoAdapter = { parse: parseISODate, format: printISODate };

const duetDatePickerCss = ".duet-date *,.duet-date *::before,.duet-date *::after{box-sizing:border-box;margin:0;width:auto}.duet-date{box-sizing:border-box;color:var(--duet-color-text);display:block;font-family:var(--duet-font);margin:0;position:relative;text-align:left;width:100%}.duet-date__input{-webkit-appearance:none;appearance:none;background:var(--duet-color-surface);border:1px solid var(--duet-color-text);border-radius:var(--duet-radius);color:var(--duet-color-text);float:none;font-family:var(--duet-font);font-size:100%;line-height:normal;padding:14px 60px 14px 14px;width:100%}.duet-date__input:focus{border-color:var(--duet-color-primary);box-shadow:0 0 0 1px var(--duet-color-primary);outline:0}.duet-date__input::-webkit-input-placeholder{color:var(--duet-color-placeholder);opacity:1}.duet-date__input:-moz-placeholder{color:var(--duet-color-placeholder);opacity:1}.duet-date__input:-ms-input-placeholder{color:var(--duet-color-placeholder)}.duet-date__input-wrapper{position:relative;width:100%}.duet-date__toggle{-moz-appearance:none;-webkit-appearance:none;-webkit-user-select:none;align-items:center;appearance:none;background:var(--duet-color-button);border:0;border-radius:0;border-bottom-right-radius:var(--duet-radius);border-top-right-radius:var(--duet-radius);box-shadow:inset 1px 0 0 rgba(0, 0, 0, 0.1);color:var(--duet-color-text);cursor:pointer;display:flex;height:calc(100% - 2px);justify-content:center;padding:0;position:absolute;right:1px;top:1px;user-select:none;width:48px;z-index:2}.duet-date__toggle:focus{box-shadow:0 0 0 2px var(--duet-color-primary);outline:0}.duet-date__toggle-icon{display:flex;flex-basis:100%;justify-content:center;align-items:center}.duet-date__dialog{display:flex;left:0;min-width:320px;opacity:0;position:absolute;top:100%;transform:scale(0.96) translateZ(0) translateY(-20px);transform-origin:top right;transition:transform 300ms ease, opacity 300ms ease, visibility 300ms ease;visibility:hidden;width:100%;will-change:transform, opacity, visibility;z-index:var(--duet-z-index)}@media (max-width: 35.9375em){.duet-date__dialog{background:var(--duet-color-overlay);bottom:0;position:fixed;right:0;top:0;transform:translateZ(0);transform-origin:bottom center}}.duet-date__dialog.is-left{left:auto;right:0;width:auto}.duet-date__dialog.is-active{opacity:1;transform:scale(1.0001) translateZ(0) translateY(0);visibility:visible}.duet-date__dialog-content{background:var(--duet-color-surface);border:1px solid rgba(0, 0, 0, 0.1);border-radius:var(--duet-radius);box-shadow:0 4px 10px 0 rgba(0, 0, 0, 0.1);margin-left:auto;margin-top:8px;max-width:310px;min-width:290px;padding:16px 16px 20px;position:relative;transform:none;width:100%;z-index:var(--duet-z-index)}@media (max-width: 35.9375em){.duet-date__dialog-content{border:0;border-radius:0;border-top-left-radius:var(--duet-radius);border-top-right-radius:var(--duet-radius);bottom:0;left:0;margin:0;max-width:none;min-height:26em;opacity:0;padding:0 8% 20px;position:absolute;transform:translateZ(0) translateY(100%);transition:transform 400ms ease, opacity 400ms ease, visibility 400ms ease;visibility:hidden;will-change:transform, opacity, visibility}.is-active .duet-date__dialog-content{opacity:1;transform:translateZ(0) translateY(0);visibility:visible}}.duet-date__table{border-collapse:collapse;border-spacing:0;color:var(--duet-color-text);font-size:1rem;font-weight:var(--duet-font-normal);line-height:1.25;text-align:center;width:100%}.duet-date__table-header{font-size:0.75rem;font-weight:var(--duet-font-bold);letter-spacing:1px;line-height:1.25;padding-bottom:8px;text-decoration:none;text-transform:uppercase}.duet-date__cell{text-align:center}.duet-date__day{-moz-appearance:none;-webkit-appearance:none;appearance:none;background:transparent;border:0;border-radius:50%;color:var(--duet-color-text);cursor:pointer;display:inline-block;font-family:var(--duet-font);font-size:0.875rem;font-variant-numeric:tabular-nums;font-weight:var(--duet-font-normal);height:36px;line-height:1.25;padding:0 0 1px;position:relative;text-align:center;vertical-align:middle;width:36px;z-index:1}.duet-date__day.is-today{box-shadow:0 0 0 1px var(--duet-color-primary);position:relative;z-index:200}.duet-date__day:hover::before,.duet-date__day.is-today::before{background:var(--duet-color-primary);border-radius:50%;bottom:0;content:\"\";left:0;opacity:0.06;position:absolute;right:0;top:0}.duet-date__day[aria-pressed=true],.duet-date__day:focus{background:var(--duet-color-primary);box-shadow:none;color:var(--duet-color-text-active);outline:0}.duet-date__day:active{background:var(--duet-color-primary);box-shadow:0 0 5px var(--duet-color-primary);color:var(--duet-color-text-active);z-index:200}.duet-date__day:focus{box-shadow:0 0 5px var(--duet-color-primary);z-index:200}.duet-date__day.is-disabled{background:transparent;box-shadow:none;color:var(--duet-color-text);cursor:default;opacity:0.5}.duet-date__day.is-disabled::before{display:none}.duet-date__day.is-outside{background:var(--duet-color-button);box-shadow:none;color:var(--duet-color-text);cursor:default;opacity:0.6;pointer-events:none}.duet-date__day.is-outside::before{display:none}.duet-date__header{align-items:center;display:flex;justify-content:space-between;margin-bottom:16px;width:100%}.duet-date__nav{white-space:nowrap}.duet-date__prev,.duet-date__next{-moz-appearance:none;-webkit-appearance:none;align-items:center;appearance:none;background:var(--duet-color-button);border:0;border-radius:50%;color:var(--duet-color-text);cursor:pointer;display:inline-flex;height:32px;justify-content:center;margin-left:8px;padding:0;transition:background-color 300ms ease;width:32px}@media (max-width: 35.9375em){.duet-date__prev,.duet-date__next{height:40px;width:40px}}.duet-date__prev:focus,.duet-date__next:focus{box-shadow:0 0 0 2px var(--duet-color-primary);outline:0}.duet-date__prev:active:focus,.duet-date__next:active:focus{box-shadow:none}.duet-date__prev:disabled,.duet-date__next:disabled{cursor:default;opacity:0.5}.duet-date__prev svg,.duet-date__next svg{margin:0 auto}.duet-date__select{display:inline-flex;margin-top:4px;position:relative}.duet-date__select span{margin-right:4px}.duet-date__select select{cursor:pointer;font-size:1rem;height:100%;left:0;opacity:0;position:absolute;top:0;width:100%;z-index:2}.duet-date__select select:focus+.duet-date__select-label{box-shadow:0 0 0 2px var(--duet-color-primary)}.duet-date__select-label{align-items:center;border-radius:var(--duet-radius);color:var(--duet-color-text);display:flex;font-size:1.25rem;font-weight:var(--duet-font-bold);line-height:1.25;padding:0 4px 0 8px;pointer-events:none;position:relative;width:100%;z-index:1}.duet-date__select-label svg{width:16px;height:16px}.duet-date__mobile{align-items:center;border-bottom:1px solid rgba(0, 0, 0, 0.12);display:flex;justify-content:space-between;margin-bottom:20px;margin-left:-10%;overflow:hidden;padding:12px 20px;position:relative;text-overflow:ellipsis;white-space:nowrap;width:120%}@media (min-width: 36em){.duet-date__mobile{border:0;margin:0;overflow:visible;padding:0;position:absolute;right:-8px;top:-8px;width:auto}}.duet-date__mobile-heading{display:inline-block;font-weight:var(--duet-font-bold);max-width:84%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}@media (min-width: 36em){.duet-date__mobile-heading{display:none}}.duet-date__close{-webkit-appearance:none;align-items:center;appearance:none;background:var(--duet-color-button);border:0;border-radius:50%;color:var(--duet-color-text);cursor:pointer;display:flex;height:24px;justify-content:center;padding:0;width:24px}@media (min-width: 36em){.duet-date__close{opacity:0}}.duet-date__close:focus{box-shadow:0 0 0 2px var(--duet-color-primary);outline:none}@media (min-width: 36em){.duet-date__close:focus{opacity:1}}.duet-date__close svg{margin:0 auto}.duet-date__vhidden{border:0;clip:rect(1px, 1px, 1px, 1px);height:1px;overflow:hidden;padding:0;position:absolute;top:0;width:1px}";

function range(from, to) {
  var result = [];
  for (var i = from; i <= to; i++) {
    result.push(i);
  }
  return result;
}
const keyCode = {
  TAB: 9,
  ESC: 27,
  SPACE: 32,
  PAGE_UP: 33,
  PAGE_DOWN: 34,
  END: 35,
  HOME: 36,
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,
};
const DISALLOWED_CHARACTERS = /[^0-9\.\/\-]+/g;
const TRANSITION_MS = 300;
const DuetDatePicker = class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.duetChange = createEvent(this, "duetChange", 7);
    this.duetBlur = createEvent(this, "duetBlur", 7);
    this.duetFocus = createEvent(this, "duetFocus", 7);
    /**
     * Own Properties
     */
    this.monthSelectId = createIdentifier("DuetDateMonth");
    this.yearSelectId = createIdentifier("DuetDateYear");
    this.dialogLabelId = createIdentifier("DuetDateLabel");
    this.initialTouchX = null;
    this.initialTouchY = null;
    /**
     * State() variables
     */
    this.activeFocus = false;
    this.focusedDay = new Date();
    this.open = false;
    /**
     * Public Property API
     */
    /**
     * Name of the date picker input.
     */
    this.name = "date";
    /**
     * Adds a unique identifier for the date picker input. Use this instead of html `id` attribute.
     */
    this.identifier = "";
    /**
     * Makes the date picker input component disabled. This prevents users from being able to
     * interact with the input, and conveys its inactive state to assistive technologies.
     */
    this.disabled = false;
    /**
     * Forces the opening direction of the calendar modal to be always left or right.
     * This setting can be useful when the input is smaller than the opening date picker
     * would be as by default the picker always opens towards right.
     */
    this.direction = "right";
    /**
     * Should the input be marked as required?
     */
    this.required = false;
    /**
     * Date value. Must be in IS0-8601 format: YYYY-MM-DD.
     */
    this.value = "";
    /**
     * Minimum date allowed to be picked. Must be in IS0-8601 format: YYYY-MM-DD.
     * This setting can be used alone or together with the max property.
     */
    this.min = "";
    /**
     * Maximum date allowed to be picked. Must be in IS0-8601 format: YYYY-MM-DD.
     * This setting can be used alone or together with the min property.
     */
    this.max = "";
    /**
     * Which day is considered first day of the week? `0` for Sunday, `1` for Monday, etc.
     * Default is Monday.
     */
    this.firstDayOfWeek = DaysOfWeek.Monday;
    /**
     * Button labels, day names, month names, etc, used for localization.
     * Default is English.
     */
    this.localization = localization;
    /**
     * Date adapter, for custom parsing/formatting.
     * Must be object with a `parse` function which accepts a `string` and returns a `Date`,
     * and a `format` function which accepts a `Date` and returns a `string`.
     * Default is IS0-8601 parsing and formatting.
     */
    this.dateAdapter = isoAdapter;
    /**
     * Local methods.
     */
    this.enableActiveFocus = () => {
      this.activeFocus = true;
    };
    this.disableActiveFocus = () => {
      this.activeFocus = false;
    };
    this.toggleOpen = (e) => {
      e.preventDefault();
      this.open ? this.hide(false) : this.show();
    };
    this.handleEscKey = (event) => {
      if (event.keyCode === keyCode.ESC) {
        this.hide();
      }
    };
    this.handleBlur = (event) => {
      event.stopPropagation();
      this.duetBlur.emit({
        component: "duet-date-picker",
      });
    };
    this.handleFocus = (event) => {
      event.stopPropagation();
      this.duetFocus.emit({
        component: "duet-date-picker",
      });
    };
    this.handleTouchStart = (event) => {
      const touch = event.changedTouches[0];
      this.initialTouchX = touch.pageX;
      this.initialTouchY = touch.pageY;
    };
    this.handleTouchMove = (event) => {
      event.preventDefault();
    };
    this.handleTouchEnd = (event) => {
      const touch = event.changedTouches[0];
      const distX = touch.pageX - this.initialTouchX; // get horizontal dist traveled
      const distY = touch.pageY - this.initialTouchY; // get vertical dist traveled
      const threshold = 70;
      const isHorizontalSwipe = Math.abs(distX) >= threshold && Math.abs(distY) <= threshold;
      const isDownwardsSwipe = Math.abs(distY) >= threshold && Math.abs(distX) <= threshold && distY > 0;
      if (isHorizontalSwipe) {
        this.addMonths(distX < 0 ? 1 : -1);
      }
      else if (isDownwardsSwipe) {
        this.hide(false);
        event.preventDefault();
      }
      this.initialTouchY = null;
      this.initialTouchX = null;
    };
    this.handleNextMonthClick = (event) => {
      event.preventDefault();
      this.addMonths(1);
    };
    this.handlePreviousMonthClick = (event) => {
      event.preventDefault();
      this.addMonths(-1);
    };
    this.handleFirstFocusableKeydown = (event) => {
      // this ensures focus is trapped inside the dialog
      if (event.keyCode === keyCode.TAB && event.shiftKey) {
        this.focusedDayNode.focus();
        event.preventDefault();
      }
    };
    this.handleKeyboardNavigation = (event) => {
      // handle tab separately, since it needs to be treated
      // differently to other keyboard interactions
      if (event.keyCode === keyCode.TAB && !event.shiftKey) {
        event.preventDefault();
        this.firstFocusableElement.focus();
        return;
      }
      var handled = true;
      switch (event.keyCode) {
        case keyCode.RIGHT:
          this.addDays(1);
          break;
        case keyCode.LEFT:
          this.addDays(-1);
          break;
        case keyCode.DOWN:
          this.addDays(7);
          break;
        case keyCode.UP:
          this.addDays(-7);
          break;
        case keyCode.PAGE_UP:
          if (event.shiftKey) {
            this.addYears(-1);
          }
          else {
            this.addMonths(-1);
          }
          break;
        case keyCode.PAGE_DOWN:
          if (event.shiftKey) {
            this.addYears(1);
          }
          else {
            this.addMonths(1);
          }
          break;
        case keyCode.HOME:
          this.startOfWeek();
          break;
        case keyCode.END:
          this.endOfWeek();
          break;
        default:
          handled = false;
      }
      if (handled) {
        event.preventDefault();
        this.enableActiveFocus();
      }
    };
    this.handleDaySelect = (_event, day) => {
      if (!inRange(day, parseISODate(this.min), parseISODate(this.max))) {
        return;
      }
      if (day.getMonth() === this.focusedDay.getMonth()) {
        this.setValue(day);
        this.hide();
      }
      else {
        this.setFocusedDay(day);
      }
    };
    this.handleMonthSelect = e => {
      this.setMonth(parseInt(e.target.value, 10));
    };
    this.handleYearSelect = e => {
      this.setYear(parseInt(e.target.value, 10));
    };
    this.handleInputChange = (e) => {
      const target = e.target;
      // clean up any invalid characters
      target.value = target.value.replace(DISALLOWED_CHARACTERS, "");
      const parsed = this.dateAdapter.parse(target.value, createDate);
      if (parsed || target.value === "") {
        this.setValue(parsed);
      }
    };
    this.processFocusedDayNode = (element) => {
      this.focusedDayNode = element;
      if (this.activeFocus && this.open) {
        setTimeout(() => element.focus(), 0);
      }
    };
  }
  connectedCallback() {
    this.createDateFormatters();
  }
  createDateFormatters() {
    this.dateFormatShort = new Intl.DateTimeFormat(this.localization.locale, { day: "numeric", month: "long" });
    this.dateFormatLong = new Intl.DateTimeFormat(this.localization.locale, {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }
  /**
   * Component event handling.
   */
  handleDocumentClick(e) {
    if (!this.open) {
      return;
    }
    const target = e.target;
    // TODO: stopPropagation only on open??
    // the dialog and the button aren't considered clicks outside.
    // dialog for obvious reasons, but the button needs to be skipped
    // so that two things are possible:
    //
    // a) clicking again on the button when dialog is open should close the modal.
    //    without skipping the button here, we would see a click outside
    //    _and_ a click on the button, so the `open` state goes
    //    open -> close (click outside) -> open (click button)
    //
    // b) clicking another date picker's button should close the current calendar
    //    and open the new one. this means we can't stopPropagation() on the button itself
    //
    // this was the only satisfactory combination of things to get the above to work
    if (this.dialogWrapperNode.contains(target) || this.datePickerButton.contains(target)) {
      return;
    }
    this.hide(false);
  }
  /**
   * Public methods API
   */
  /**
   * Sets focus on the date picker's input. Use this method instead of the global `focus()`.
   */
  async setFocus() {
    return this.datePickerInput.focus();
  }
  /**
   * Show the calendar modal, moving focus to the calendar inside.
   */
  async show() {
    this.open = true;
    this.setFocusedDay(parseISODate(this.value) || new Date());
    clearTimeout(this.focusTimeoutId);
    this.focusTimeoutId = setTimeout(() => this.monthSelectNode.focus(), TRANSITION_MS);
  }
  /**
   * Hide the calendar modal. Set `moveFocusToButton` to false to prevent focus
   * returning to the date picker's button. Default is true.
   */
  async hide(moveFocusToButton = true) {
    this.open = false;
    // in cases where calendar is quickly shown and hidden
    // we should avoid moving focus to the button
    clearTimeout(this.focusTimeoutId);
    if (moveFocusToButton) {
      // iOS VoiceOver needs to wait for all transitions to finish.
      setTimeout(() => this.datePickerButton.focus(), TRANSITION_MS + 200);
    }
  }
  addDays(days) {
    this.setFocusedDay(addDays(this.focusedDay, days));
  }
  addMonths(months) {
    this.setMonth(this.focusedDay.getMonth() + months);
  }
  addYears(years) {
    this.setYear(this.focusedDay.getFullYear() + years);
  }
  startOfWeek() {
    this.setFocusedDay(startOfWeek(this.focusedDay, this.firstDayOfWeek));
  }
  endOfWeek() {
    this.setFocusedDay(endOfWeek(this.focusedDay, this.firstDayOfWeek));
  }
  setMonth(month) {
    const min = setMonth(startOfMonth(this.focusedDay), month);
    const max = endOfMonth(min);
    const date = setMonth(this.focusedDay, month);
    this.setFocusedDay(clamp(date, min, max));
  }
  setYear(year) {
    const min = setYear(startOfMonth(this.focusedDay), year);
    const max = endOfMonth(min);
    const date = setYear(this.focusedDay, year);
    this.setFocusedDay(clamp(date, min, max));
  }
  setFocusedDay(day) {
    this.focusedDay = clamp(day, parseISODate(this.min), parseISODate(this.max));
  }
  setValue(date) {
    this.value = printISODate(date);
    this.duetChange.emit({
      component: "duet-date-picker",
      value: this.value,
      valueAsDate: date,
    });
  }
  /**
   * render() function
   * Always the last one in the class.
   */
  render() {
    const valueAsDate = parseISODate(this.value);
    const formattedDate = valueAsDate && this.dateAdapter.format(valueAsDate);
    const selectedYear = (valueAsDate || this.focusedDay).getFullYear();
    const focusedMonth = this.focusedDay.getMonth();
    const focusedYear = this.focusedDay.getFullYear();
    const minDate = parseISODate(this.min);
    const maxDate = parseISODate(this.max);
    const prevMonthDisabled = minDate != null && minDate.getMonth() === focusedMonth && minDate.getFullYear() === focusedYear;
    const nextMonthDisabled = maxDate != null && maxDate.getMonth() === focusedMonth && maxDate.getFullYear() === focusedYear;
    const minYear = minDate ? minDate.getFullYear() : selectedYear - 10;
    const maxYear = maxDate ? maxDate.getFullYear() : selectedYear + 10;
    return (h(Host, null, h("div", { class: "duet-date" }, h(DatePickerInput, { dateFormatter: this.dateFormatLong, value: this.value, valueAsDate: valueAsDate, formattedValue: formattedDate, onInput: this.handleInputChange, onBlur: this.handleBlur, onFocus: this.handleFocus, onClick: this.toggleOpen, name: this.name, disabled: this.disabled, role: this.role, required: this.required, identifier: this.identifier, localization: this.localization, buttonRef: element => (this.datePickerButton = element), inputRef: element => (this.datePickerInput = element) }), h("div", { class: {
        "duet-date__dialog": true,
        "is-left": this.direction === "left",
        "is-active": this.open,
      }, role: "dialog", "aria-modal": "true", "aria-hidden": this.open ? "false" : "true", "aria-labelledby": this.dialogLabelId, onTouchMove: this.handleTouchMove, onTouchStart: this.handleTouchStart, onTouchEnd: this.handleTouchEnd }, h("div", { class: "duet-date__dialog-content", onKeyDown: this.handleEscKey, ref: element => (this.dialogWrapperNode = element) }, h("div", { class: "duet-date__vhidden duet-date__instructions", "aria-live": "polite" }, this.localization.keyboardInstruction), h("div", { class: "duet-date__mobile", onFocusin: this.disableActiveFocus }, h("label", { class: "duet-date__mobile-heading" }, this.localization.calendarHeading), h("button", { class: "duet-date__close", ref: element => (this.firstFocusableElement = element), onKeyDown: this.handleFirstFocusableKeydown, onClick: () => this.hide(), type: "button" }, h("svg", { "aria-hidden": "true", fill: "currentColor", xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16", viewBox: "0 0 24 24" }, h("path", { d: "M0 0h24v24H0V0z", fill: "none" }), h("path", { d: "M18.3 5.71c-.39-.39-1.02-.39-1.41 0L12 10.59 7.11 5.7c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41L10.59 12 5.7 16.89c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L12 13.41l4.89 4.89c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z" })), h("span", { class: "duet-date__vhidden" }, this.localization.closeLabel))), h("div", { class: "duet-date__header", onFocusin: this.disableActiveFocus }, h("div", null, h("h2", { id: this.dialogLabelId, class: "duet-date__vhidden", "aria-live": "polite", "aria-atomic": "true" }, this.localization.monthNames[focusedMonth], " ", this.focusedDay.getFullYear()), h("label", { htmlFor: this.monthSelectId, class: "duet-date__vhidden" }, this.localization.monthSelectLabel), h("div", { class: "duet-date__select" }, h("select", { id: this.monthSelectId, class: "duet-date__select--month", ref: element => (this.monthSelectNode = element), onChange: this.handleMonthSelect }, this.localization.monthNames.map((month, i) => (h("option", { key: month, value: i, selected: i === focusedMonth }, month)))), h("div", { class: "duet-date__select-label", "aria-hidden": "true" }, h("span", null, this.localization.monthNamesShort[focusedMonth]), h("svg", { fill: "currentColor", xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16", viewBox: "0 0 24 24" }, h("path", { d: "M8.12 9.29L12 13.17l3.88-3.88c.39-.39 1.02-.39 1.41 0 .39.39.39 1.02 0 1.41l-4.59 4.59c-.39.39-1.02.39-1.41 0L6.7 10.7c-.39-.39-.39-1.02 0-1.41.39-.38 1.03-.39 1.42 0z" })))), h("label", { htmlFor: this.yearSelectId, class: "duet-date__vhidden" }, this.localization.yearSelectLabel), h("div", { class: "duet-date__select" }, h("select", { id: this.yearSelectId, class: "duet-date__select--year", onChange: this.handleYearSelect }, range(minYear, maxYear).map(year => (h("option", { key: year, selected: year === focusedYear }, year)))), h("div", { class: "duet-date__select-label", "aria-hidden": "true" }, h("span", null, this.focusedDay.getFullYear()), h("svg", { fill: "currentColor", xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16", viewBox: "0 0 24 24" }, h("path", { d: "M8.12 9.29L12 13.17l3.88-3.88c.39-.39 1.02-.39 1.41 0 .39.39.39 1.02 0 1.41l-4.59 4.59c-.39.39-1.02.39-1.41 0L6.7 10.7c-.39-.39-.39-1.02 0-1.41.39-.38 1.03-.39 1.42 0z" }))))), h("div", { class: "duet-date__nav" }, h("button", { class: "duet-date__prev", onClick: this.handlePreviousMonthClick, disabled: prevMonthDisabled, type: "button" }, h("svg", { "aria-hidden": "true", fill: "currentColor", xmlns: "http://www.w3.org/2000/svg", width: "21", height: "21", viewBox: "0 0 24 24" }, h("path", { d: "M14.71 15.88L10.83 12l3.88-3.88c.39-.39.39-1.02 0-1.41-.39-.39-1.02-.39-1.41 0L8.71 11.3c-.39.39-.39 1.02 0 1.41l4.59 4.59c.39.39 1.02.39 1.41 0 .38-.39.39-1.03 0-1.42z" })), h("span", { class: "duet-date__vhidden" }, this.localization.prevMonthLabel)), h("button", { class: "duet-date__next", onClick: this.handleNextMonthClick, disabled: nextMonthDisabled, type: "button" }, h("svg", { "aria-hidden": "true", fill: "currentColor", xmlns: "http://www.w3.org/2000/svg", width: "21", height: "21", viewBox: "0 0 24 24" }, h("path", { d: "M9.29 15.88L13.17 12 9.29 8.12c-.39-.39-.39-1.02 0-1.41.39-.39 1.02-.39 1.41 0l4.59 4.59c.39.39.39 1.02 0 1.41L10.7 17.3c-.39.39-1.02.39-1.41 0-.38-.39-.39-1.03 0-1.42z" })), h("span", { class: "duet-date__vhidden" }, this.localization.nextMonthLabel)))), h(DatePickerMonth, { dateFormatter: this.dateFormatShort, selectedDate: valueAsDate, focusedDate: this.focusedDay, onDateSelect: this.handleDaySelect, onKeyboardNavigation: this.handleKeyboardNavigation, labelledById: this.dialogLabelId, localization: this.localization, firstDayOfWeek: this.firstDayOfWeek, focusedDayRef: this.processFocusedDayNode, min: minDate, max: maxDate }))))));
  }
  get element() { return this; }
  static get watchers() { return {
    "localization": ["createDateFormatters"]
  }; }
  static get style() { return duetDatePickerCss; }
};

const DuetDatePicker$1 = /*@__PURE__*/proxyCustomElement(DuetDatePicker, [0,"duet-date-picker",{"name":[1],"identifier":[1],"disabled":[516],"role":[1],"direction":[1],"required":[4],"value":[513],"min":[1],"max":[1],"firstDayOfWeek":[2,"first-day-of-week"],"localization":[16],"dateAdapter":[16],"activeFocus":[32],"focusedDay":[32],"open":[32]},[[6,"click","handleDocumentClick"]]]);

const datePickerCss = "duet-date-picker{--duet-color-primary:var(--telekom-color-primary-standard);--duet-color-text:var(--telekom-color-text-and-icon-standard);--duet-color-overlay:var(--telekom-color-background-surface);--duet-font:var(--telekom-typography-font-family-sans);--duet-font-normal:var(--telekom-typography-font-weight-regular);--duet-font-bold:var(--telekom-typography-font-weight-medium);--duet-color-placeholder:var(--telekom-color-ui-regular);--duet-radius:var(--telekom-radius-standard);--duet-radius-toggle-focus:6px;--duet-color-text-active:var(--telekom-color-text-and-icon-white-standard);--duet-color-button:var(--telekom-color-background-surface);--duet-color-surface:var(--telekom-color-background-surface);--duet-z-index:600;--duet-z-index-toggle:2;--spacing-x:var(--telekom-spacing-composition-space-05);--spacing-heading:0 0 var(--telekom-spacing-composition-space-06) 0;--font-size-heading:var(--telekom-typography-font-size-body);--radius-day:var(--telekom-radius-standard);--font-size-day:var(--telekom-typography-font-size-body);--font-size-table-header:var(--telekom-typography-font-size-caption);--font-weight-table-header:var(--telekom-typography-font-weight-extra-bold);--focus-outline:var(--telekom-line-weight-highlight) solid\n    var(--telekom-color-functional-focus-standard);--z-index-label:10}duet-date-picker .duet-date__input{border:var(--telekom-line-weight-standard) solid\n    var(--telekom-color-ui-border-standard);background-color:var(--telekom-color-ui-state-fill-standard);padding:1.125rem calc(2rem - var(--telekom-spacing-composition-space-01))\n    0.25rem calc(var(--spacing-x) - var(--telekom-spacing-composition-space-01));height:var(--telekom-spacing-composition-space-13);font:var(--telekom-text-style-body)}duet-date-picker .duet-date__input:hover{border:var(--telekom-spacing-composition-space-01) solid\n    var(--telekom-color-ui-border-hovered);background-color:var(--telekom-color-ui-state-fill-hovered)}duet-date-picker .duet-date__input:focus{border:var(--telekom-line-weight-standard) solid\n    var(--telekom-color-ui-border-pressed);outline:var(--focus-outline);box-shadow:none;outline-offset:1px}duet-date-picker .duet-date__toggle{border-radius:0 var(--duet-radius-toggle-focus)\n    var(--duet-radius-toggle-focus) 0;background:transparent;z-index:var(--duet-z-index-toggle);box-shadow:inset 1px 0 0 var(--telekom-color-ui-faint);width:var(--telekom-spacing-composition-space-13)}duet-date-picker .duet-date__toggle:focus{outline:var(--focus-outline);outline-offset:2px;box-shadow:none}.scale-date-picker:not(.scale-date-picker--disabled) duet-date-picker .duet-date__toggle:hover{background-color:var(--telekom-color-ui-state-fill-hovered)}.scale-date-picker:not(.scale-date-picker--disabled) duet-date-picker .duet-date__toggle:active{background-color:var(--telekom-color-ui-state-fill-pressed)}duet-date-picker .duet-date__toggle:hover scale-icon-content-calendar{color:var(--telekom-color-text-and-icon-standard)}duet-date-picker .duet-date__toggle:active scale-icon-content-calendar{color:var(--telekom-color-text-and-icon-standard)}@media screen and (forced-colors: active), (-ms-high-contrast: active){duet-date-picker .duet-date__toggle scale-icon-content-calendar,duet-date-picker .duet-date__header .duet-date__select-label,duet-date-picker .duet-date__header .duet-date__nav svg{color:var(--telekom-color-text-and-icon-inverted-standard)}duet-date-picker .duet-date__day[aria-pressed='true']{border:1px solid transparent}duet-date-picker .duet-date__day.is-today::before{border:2px solid transparent}}.scale-date-picker{position:relative}.scale-date-picker .date-picker__helper-text{font-weight:var(--telekom-typography-font-weight-bold);transition:all var(--telekom-motion-duration-transition)\n    var(--telekom-motion-easing-standard);padding-left:var(--telekom-spacing-composition-space-05);font-size:var(--telekom-typography-font-size-small);line-height:var(--telekom-typography-line-spacing-standard);color:var(--telekom-color-text-and-icon-functional-informational)}.scale-date-picker .date-picker__label{top:0;left:0;color:var(--telekom-color-text-and-icon-additional);display:flex;z-index:var(--z-index-label);position:absolute;transition:all var(--telekom-motion-duration-transition)\n    var(--telekom-motion-easing-standard);pointer-events:none;font:var(--telekom-text-style-ui);transform:translate(var(--telekom-spacing-composition-space-05), 0.875rem)}duet-date-picker .duet-date__input::placeholder{visibility:hidden;color:transparent;transition:all var(--telekom-motion-duration-transition)\n    var(--telekom-motion-easing-standard)}duet-date-picker .duet-date__header{margin-top:var(--telekom-spacing-composition-space-04);margin-bottom:var(--telekom-spacing-composition-space-04);font:var(--telekom-text-style-ui)}duet-date-picker .duet-date__select{height:var(--telekom-spacing-composition-space-10)}duet-date-picker .duet-date__prev,duet-date-picker .duet-date__next{width:var(--telekom-spacing-composition-space-10);height:var(--telekom-spacing-composition-space-10)}duet-date-picker .duet-date__day{width:var(--telekom-spacing-composition-space-13);height:var(--telekom-spacing-composition-space-13)}.scale-date-picker.scale-date-picker--focus .date-picker__label,.scale-date-picker.animated .date-picker__label{color:var(--telekom-color-text-and-icon-additional);transition:all var(--telekom-motion-duration-transition)\n    var(--telekom-motion-easing-standard);font:var(--telekom-text-style-small-bold);transform:translate(\n    0.75rem,\n    calc(0.25rem + var(--telekom-spacing-composition-space-01))\n  )}.scale-date-picker.animated .duet-date__input::placeholder,duet-date-picker .duet-date__input:focus::placeholder{visibility:initial;color:var(--telekom-color-text-and-icon-standard);transition:all var(--telekom-motion-duration-transition)\n    var(--telekom-motion-easing-standard)}duet-date-picker .duet-date__table{margin-top:var(--telekom-spacing-composition-space-04)}.scale-date-picker--status-error duet-date-picker .duet-date__input{margin-top:-1px;margin-bottom:-1px;border:var(--telekom-line-weight-highlight) solid\n    var(--telekom-color-functional-danger-standard)}.scale-date-picker--status-error duet-date-picker .duet-date__input:hover{border:var(--telekom-line-weight-highlight) solid\n    var(--telekom-color-functional-danger-hovered)}.scale-date-picker--status-error duet-date-picker .duet-date__input:focus{outline:var(--focus-outline);outline-offset:1px;box-shadow:none}.scale-date-picker--status-error .duet-date__toggle{width:47px}.scale-date-picker.scale-date-picker--disabled input,.scale-date-picker.scale-date-picker--disabled .duet-date__toggle{cursor:not-allowed}.scale-date-picker.scale-date-picker--disabled input,.scale-date-picker.scale-date-picker--disabled input:hover{color:var(--telekom-color-text-and-icon-disabled);border-color:var(--telekom-color-ui-border-disabled);background:none}.scale-date-picker.scale-date-picker--disabled .duet-date__toggle{color:var(--telekom-color-text-and-icon-disabled);box-shadow:inset 1px 0 0 var(--telekom-color-ui-border-disabled)}.scale-date-picker.scale-date-picker--disabled .duet-date__toggle:hover,.scale-date-picker.scale-date-picker--disabled .duet-date__toggle:hover scale-icon-content-calendar{color:var(--telekom-color-text-and-icon-disabled)}.scale-date-picker.scale-date-picker--disabled .date-picker__label{color:var(--telekom-color-text-and-icon-disabled)}.scale-date-picker__popup-heading{text-align:center;padding:var(--spacing-heading);font-size:var(--font-size-heading);font:var(--telekom-text-style-heading-6);color:var(--telekom-color-text-and-icon-standard) !important}duet-date-picker .duet-date__dialog-content{border:none;box-shadow:var(--telekom-shadow-raised-standard);max-width:324px;padding:var(--telekom-spacing-composition-space-06)\n    var(--telekom-spacing-composition-space-04)\n    var(--telekom-spacing-composition-space-04)\n    var(--telekom-spacing-composition-space-04);margin-top:var(--telekom-spacing-composition-space-03)}duet-date-picker .duet-date__cell{padding:0}duet-date-picker .duet-date__mobile{margin-left:0;padding:var(--telekom-spacing-composition-space-03) 0\n    var(--telekom-spacing-composition-space-05) 0}duet-date-picker .duet-date__select{margin-top:0}duet-date-picker .duet-date__select:nth-of-type(1){margin-right:var(--telekom-spacing-composition-space-04)}duet-date-picker .duet-date__select-label{font:var(--telekom-text-style-ui)}duet-date-picker .duet-date__select-label svg{width:16px;height:16px;margin-left:var(--telekom-spacing-composition-space-04)}duet-date-picker .duet-date__select select:focus+.duet-date__select-label{outline:var(--focus-outline)}duet-date-picker .duet-date__select select:hover+.duet-date__select-label{background:var(--telekom-color-primary-hovered);color:var(--telekom-color-text-and-icon-white-standard)}duet-date-picker .duet-date__select select:active+.duet-date__select-label{box-shadow:none;background:var(--telekom-color-primary-pressed);color:var(--telekom-color-text-and-icon-white-standard)}duet-date-picker .duet-date__prev,duet-date-picker .duet-date__next{border-radius:var(--duet-radius);margin-left:var(--telekom-spacing-composition-space-02)}duet-date-picker .duet-date__prev:hover,duet-date-picker .duet-date__next:hover{background:var(--telekom-color-primary-hovered);color:var(--telekom-color-text-and-icon-white-standard)}duet-date-picker .duet-date__prev:active,duet-date-picker .duet-date__next:active{background:var(--telekom-color-primary-pressed);color:var(--telekom-color-text-and-icon-white-standard)}duet-date-picker .duet-date__prev:focus,duet-date-picker .duet-date__next:focus{outline:var(--focus-outline)}duet-date-picker .duet-date__close{border-radius:var(--duet-radius)}duet-date-picker .duet-date__close:focus{outline:var(--focus-outline)}duet-date-picker .duet-date__table-header{height:var(--telekom-spacing-composition-space-14);padding:0;font-size:var(--font-size-table-header);font-weight:var(--font-weight-table-header)}duet-date-picker .duet-date__day{padding:0;border-radius:var(--radius-day);font-size:var(--font-size-day);color:var(--telekom-color-text-and-icon-standard)}duet-date-picker .duet-date__day.is-today{box-shadow:none}duet-date-picker .duet-date__day.is-disabled{opacity:1;color:var(--telekom-color-text-and-icon-disabled);pointer-events:none}duet-date-picker .duet-date__day.is-today::before{content:'';display:inline-block;width:var(--telekom-spacing-composition-space-03);height:var(--telekom-spacing-composition-space-03);border-radius:var(--telekom-radius-standard);background-color:var(--telekom-color-primary-standard);opacity:1;left:var(--telekom-spacing-composition-space-07);top:var(--telekom-spacing-composition-space-10)}duet-date-picker [aria-selected='true'] .duet-date__day.is-today::before,duet-date-picker .duet-date__day.is-today:hover::before{background-color:var(--telekom-color-background-surface)}duet-date-picker .duet-date__day.is-today.is-disabled::before{background-color:var(--telekom-radius-standard)}duet-date-picker .duet-date__day:focus{background:var(--telekom-color-background-surface);color:var(--telekom-color-text-and-icon-standard);outline:var(--focus-outline);box-shadow:none}duet-date-picker .duet-date__day:hover{background:var(--telekom-color-primary-hovered);color:var(--telekom-color-text-and-icon-white-standard)}duet-date-picker .duet-date__day:active{box-shadow:none;background:var(--telekom-color-primary-pressed);color:var(--telekom-color-text-and-icon-white-standard)}duet-date-picker .duet-date__day:hover::before{border-radius:var(--duet-radius);opacity:1;background:transparent;color:var(--telekom-color-text-and-icon-white-standard)}duet-date-picker .scale-date-picker__popup-heading{padding:var(--telekom-spacing-composition-space-04)}scale-date-picker .has-helper-text scale-helper-text{display:block;margin-top:var(--telekom-spacing-composition-space-03)}@media (max-width: 35.9375em) and (orientation: landscape){duet-date-picker .duet-date__dialog-content{zoom:70%}}@media (max-width: 35.9375em){duet-date-picker .scale-date-picker__popup-heading{display:none}duet-date-picker .duet-date__dialog-content{max-width:none}}";

if (typeof window !== 'undefined' &&
  typeof window.Audio !== 'undefined' &&
  !customElements.get('duet-date-picker')) {
  customElements.define('duet-date-picker', DuetDatePicker$1);
}
const DEFAULT_ICON_SIZE = 20;
const DatePicker = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement$1 {
  constructor() {
    super();
    this.__registerHost();
    this.scaleChange = createEvent(this, "scale-change", 7);
    this.scaleChangeLegacy = createEvent(this, "scaleChange", 7);
    this.scaleBlur = createEvent(this, "scale-blur", 7);
    this.scaleBlurLegacy = createEvent(this, "scaleBlur", 7);
    this.scaleFocus = createEvent(this, "scale-focus", 7);
    this.scaleFocusLegacy = createEvent(this, "scaleFocus", 7);
    /**
     * Name of the date picker input.
     */
    this.name = 'date';
    /** @deprecated in v3 in favor of localization.calendarHeading */
    this.popupTitle = 'Pick a date';
    /**
     * Makes the date picker input component disabled. This prevents users from being able to
     * interact with the input, and conveys its inactive state to assistive technologies.
     */
    this.disabled = false;
    /**
     * Forces the opening direction of the calendar modal to be always left or right.
     * This setting can be useful when the input is smaller than the opening date picker
     * would be as by default the picker always opens towards right.
     */
    this.direction = 'right';
    /**
     * Should the input be marked as required?
     */
    this.required = false;
    /**
     * Date value. Must be in IS0-8601 format: YYYY-MM-DD.
     */
    this.value = '';
    /**
     * Minimum date allowed to be picked. Must be in IS0-8601 format: YYYY-MM-DD.
     * This setting can be used alone or together with the max property.
     */
    this.min = '';
    /**
     * Maximum date allowed to be picked. Must be in IS0-8601 format: YYYY-MM-DD.
     * This setting can be used alone or together with the min property.
     */
    this.max = '';
    /** (optional) Helper text */
    this.helperText = '';
    /** @deprecated - invalid should replace status */
    this.status = '';
    /** (optional) Label */
    this.label = '';
    /** (optional) Input place holder */
    this.placeholder = '';
    this.variant = 'informational';
    /** Whether the input element has focus */
    this.hasFocus = false;
    /** Whether the input element has value */
    this.hasValue = this.value != null && this.value !== '';
    this.internalId = generateUniqueId();
    /**
     * Fix JAWS reading the day twice, e.g. "19 19. August"
     * It'd probably make sense to open a PR in duetds/date-picker
     * https://github.com/duetds/date-picker/blob/master/src/components/duet-date-picker/date-picker-day.tsx#L61
     */
    this.adjustButtonsLabelsForA11y = () => {
      const table = this.hostElement.querySelector('.duet-date__table');
      if (!table) {
        // The node we need does not exist yet. Wait and try again.
        setTimeout(this.adjustButtonsLabelsForA11y);
        return;
      }
      const options = { subtree: true, childList: true, attributes: true };
      const callback = () => {
        this.mo.disconnect(); // avoid a feedback loop
        const buttons = Array.from(this.hostElement.querySelectorAll('.duet-date__day'));
        buttons.forEach((button) => {
          const span = button.querySelector('.duet-date__vhidden');
          const text = span.textContent;
          button.setAttribute('aria-label', text);
          span.setAttribute('hidden', 'hidden');
        });
        this.mo.observe(table, options);
      };
      this.mo = new MutationObserver(callback);
      callback();
    };
  }
  /**
   * Public methods API
   */
  /**
   * Sets focus on the date picker's input. Use this method instead of the global `focus()`.
   */
  async setFocus() {
    return this.duetInput.setFocus();
  }
  /**
   * Show the calendar modal, moving focus to the calendar inside.
   */
  async show() {
    return this.duetInput.show();
  }
  /**
   * Hide the calendar modal. Set `moveFocusToButton` to false to prevent focus
   * returning to the date picker's button. Default is true.
   */
  async hide(moveFocusToButton = true) {
    return this.duetInput.hide(moveFocusToButton);
  }
  /**
   * Watch `value` property for changes and update `hasValue` based on that.
   */
  onValueChange() {
    this.hasValue = this.value != null && this.value !== '';
    // @ts-ignore
    this.duetInput.querySelector('.duet-date__input').value = this.value;
  }
  /**
   * Watch `placeholder` property for changes and update `placeholder` based on that.
   */
  onPlaceholderChange(newValue) {
    const input = this.duetInput.querySelector('.duet-date__input');
    if (input && this.placeholder) {
      input.setAttribute('placeholder', newValue);
    }
  }
  componentWillLoad() {
    if (this.popupTitle !== 'Pick a date') {
      statusNote({
        tag: 'deprecated',
        message: 'Property "popupTitle" is deprecate in favor of localization.calendarHeading.',
        type: 'warn',
        source: this.hostElement,
      });
    }
    this.handleKeyPress = this.handleKeyPress.bind(this);
    if (this.identifier == null) {
      this.identifier = 'scale-date-picker-' + this.internalId;
    }
  }
  componentDidLoad() {
    var _a, _b;
    const calendarIcon = this.duetInput.querySelector('.duet-date__toggle-icon');
    if (calendarIcon) {
      const icon = document.createElement('scale-icon-content-calendar');
      icon.size = DEFAULT_ICON_SIZE;
      calendarIcon.replaceWith(icon);
    }
    const navLeftIcon = this.duetInput.querySelector('.duet-date__prev svg');
    if (navLeftIcon) {
      const scaleNavLeftIcon = document.createElement('scale-icon-navigation-left');
      scaleNavLeftIcon.size = 16;
      navLeftIcon.replaceWith(scaleNavLeftIcon);
    }
    const navRightIcon = this.duetInput.querySelector('.duet-date__next svg');
    if (navRightIcon) {
      const scaleNavRightIcon = document.createElement('scale-icon-navigation-right');
      scaleNavRightIcon.size = 16;
      navRightIcon.replaceWith(scaleNavRightIcon);
    }
    const selectIcon = this.duetInput.querySelectorAll('.duet-date__select-label svg');
    if (selectIcon) {
      Array.from(selectIcon).forEach((icon) => icon.replaceWith(document.createElement('scale-icon-navigation-collapse-down')));
    }
    const input = this.duetInput.querySelector('.duet-date__input');
    if (input) {
      input.addEventListener('keyup', this.handleKeyPress);
    }
    if (input && this.helperText) {
      input.setAttribute('aria-describedby', `helper-message-${this.internalId}`);
    }
    if (input && this.placeholder) {
      input.setAttribute('placeholder', this.placeholder);
    }
    if (input && (this.status === 'error' || this.invalid)) {
      input.setAttribute('aria-invalid', 'true');
    }
    // Remove existing <h2> with `{Month} {Year}` text
    const dialog = this.hostElement.querySelector('.duet-date__dialog');
    let duetHeadingId = '';
    if (dialog) {
      duetHeadingId = dialog.getAttribute('aria-labelledby');
      if (duetHeadingId) {
        const duetHeading = this.hostElement.querySelector(`#${duetHeadingId}`);
        if (duetHeading) {
          duetHeading.parentElement.removeChild(duetHeading);
        }
      }
    }
    // Add custom <h2> heading
    const dialogContent = this.hostElement.querySelector('.duet-date__dialog-content');
    if (dialogContent) {
      const calendarHeading = ((_a = this.localization) === null || _a === void 0 ? void 0 : _a.calendarHeading) || this.popupTitle || 'Pick a date';
      const heading = document.createElement('h2');
      heading.id = duetHeadingId; // link to .duet-date__dialog[aria-labelledby]
      heading.className = 'scale-date-picker__popup-heading';
      heading.innerHTML = calendarHeading;
      dialogContent.insertBefore(heading, dialogContent.firstChild);
    }
    // truncate table headings to a single character
    const tableHeadings = this.hostElement.querySelectorAll('.duet-date__table-header span[aria-hidden="true"]');
    if (tableHeadings) {
      Array.from(tableHeadings).forEach((item) => (item.innerHTML = item.innerHTML[0]));
    }
    const today = this.hostElement.querySelector('.duet-date__day.is-today span.duet-date__vhidden');
    if (today) {
      today.innerHTML = `${today.innerHTML}, ${((_b = this.localization) === null || _b === void 0 ? void 0 : _b.today) || 'today'}`;
    }
    this.adjustButtonsLabelsForA11y();
  }
  componentDidRender() {
    if (this.status !== '') {
      statusNote({
        tag: 'deprecated',
        message: 'Property "status" is deprecated. Please use the "invalid" property!',
        type: 'warn',
        source: this.hostElement,
      });
    }
    if (this.size) {
      statusNote({
        tag: 'deprecated',
        message: 'Property "size" is deprecated. Please use css overwrite!',
        type: 'warn',
        source: this.hostElement,
      });
    }
  }
  disconnectedCallback() {
    if (this.duetInput) {
      const input = this.duetInput.querySelector('.duet-date__input');
      if (input) {
        input.removeEventListener('keyup', this.handleKeyPress);
      }
    }
    if (this.mo) {
      this.mo.disconnect();
    }
  }
  handleKeyPress(e) {
    this.hasValue = e.target.value != null && e.target.value !== '';
  }
  render() {
    return (h(Host, null, this.styles && h("style", null, this.styles), h("div", { class: classnames('scale-date-picker', this.status && `scale-date-picker--status-${this.status}`, this.invalid && `scale-date-picker--status-error`, this.hasFocus && 'scale-date-picker--focus', this.disabled && 'scale-date-picker--disabled', this.hasValue && 'animated', this.helperText && 'has-helper-text') }, h("label", { class: "date-picker__label", htmlFor: this.identifier }, this.label), h("duet-date-picker", { onDuetChange: (e) => {
        emitEvent(this, 'scaleChange', e.detail);
        this.handleKeyPress(e);
      }, onDuetFocus: (e) => {
        emitEvent(this, 'scaleFocus', e.detail);
        this.hasFocus = true;
      }, onDuetBlur: (e) => {
        emitEvent(this, 'scaleBlur', e.detail);
        this.hasFocus = false;
      }, name: this.name, identifier: this.identifier, role: this.innerRole, direction: this.direction, required: this.required, min: this.min, max: this.max, firstDayOfWeek: this.firstDayOfWeek, localization: this.localization, dateAdapter: this.dateAdapter, disabled: this.disabled, value: this.value, ref: (element) => (this.duetInput = element) }), this.helperText && (h("scale-helper-text", { helperText: this.helperText, variant: this.invalid ? 'danger' : this.variant })))));
  }
  get hostElement() { return this; }
  static get watchers() { return {
    "value": ["onValueChange"],
    "placeholder": ["onPlaceholderChange"]
  }; }
  static get style() { return datePickerCss; }
}, [0, "scale-date-picker", {
    "name": [1],
    "popupTitle": [1, "popup-title"],
    "identifier": [1025],
    "disabled": [516],
    "innerRole": [1, "inner-role"],
    "direction": [1],
    "required": [4],
    "value": [1537],
    "min": [1],
    "max": [1],
    "firstDayOfWeek": [8, "first-day-of-week"],
    "localization": [16],
    "dateAdapter": [8, "date-adapter"],
    "helperText": [1, "helper-text"],
    "status": [1],
    "invalid": [4],
    "label": [1],
    "styles": [1],
    "placeholder": [1],
    "size": [1],
    "variant": [1],
    "hasFocus": [32],
    "hasValue": [32],
    "setFocus": [64],
    "show": [64],
    "hide": [64]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["scale-date-picker", "duet-date-picker", "scale-helper-text", "scale-icon-action-success", "scale-icon-alert-error", "scale-icon-alert-information", "scale-icon-content-calendar", "scale-icon-navigation-collapse-down", "scale-icon-navigation-left", "scale-icon-navigation-right"];
  components.forEach(tagName => { switch (tagName) {
    case "scale-date-picker":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, DatePicker);
      }
      break;
    case "duet-date-picker":
      if (!customElements.get(tagName)) {
        defineCustomElement$a();
      }
      break;
    case "scale-helper-text":
      if (!customElements.get(tagName)) {
        defineCustomElement$9();
      }
      break;
    case "scale-icon-action-success":
      if (!customElements.get(tagName)) {
        defineCustomElement$8();
      }
      break;
    case "scale-icon-alert-error":
      if (!customElements.get(tagName)) {
        defineCustomElement$7();
      }
      break;
    case "scale-icon-alert-information":
      if (!customElements.get(tagName)) {
        defineCustomElement$6();
      }
      break;
    case "scale-icon-content-calendar":
      if (!customElements.get(tagName)) {
        defineCustomElement$5();
      }
      break;
    case "scale-icon-navigation-collapse-down":
      if (!customElements.get(tagName)) {
        defineCustomElement$4();
      }
      break;
    case "scale-icon-navigation-left":
      if (!customElements.get(tagName)) {
        defineCustomElement$3();
      }
      break;
    case "scale-icon-navigation-right":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
  } });
}

const ScaleDatePicker = DatePicker;
const defineCustomElement = defineCustomElement$1;

export { ScaleDatePicker, defineCustomElement };
