function snackBarInit() {
  //data-snack-bar="1" for identity
  //data-snack="click" for event that will trigger
  //data-snack-txt="1" for connection between click button and bar
  //data-snack-transition="5000" bar transition
  //data-snack-close bar close trigger
  //------------------------------------------------
  const qs_a = (sl) => document.querySelectorAll(sl);
  const on = (sl, e, f) => sl.addEventListener(e, f);
  const add = (el, str) => el.classList.add(str);
  const remove = (el, str) => el.classList.remove(str);
  const css = (el, obj) => Object.assign(el.style, obj);
  const mk_arr = (arr) => Array.from(arr);
  const mk = (el) => document.createElement(el);
  const append = (el, cl) => el.appendChild(cl);

  //add styles
  let style_ = mk("style");
  style_.innerHTML = `    
    .show {
      visibility: visible;
      animation-name: fadein;
      animation-timing-function: ease;
      animation-iteration-count: 1;
      animation-fill-mode: forwards;
    }
    
    @keyframes fadein {
      from {
        transform: translate(0%, 0%);
        opacity: 0;
      }
      to {
        transform: translate(0%, -100%);
        opacity: 1;
      }
    }
  `;
  append(document.head, style_);

  mk_arr(qs_a("[data-snack-bar]")).forEach((el, i) => {
    let ev = el.dataset.snack;
    let mtch = el.dataset.snackBar;
    let temp_tx_elm = qs_a(`[data-snack-txt="${mtch}"]`)[0];

    on(el, ev, () => {
      let transition_ = qs_a(`[data-snack-transition]`)[i].dataset
        .snackTransition;
      let timeOut = Number(transition_);

      //customise styles with js
      css(temp_tx_elm, { "animation-duration": `${timeOut}ms` });
      add(temp_tx_elm, "show");
    });
    css(temp_tx_elm.querySelector("[data-snack-close]"), { cursor: "pointer" });
    on(temp_tx_elm.querySelector("[data-snack-close]"), "click", () => {
      remove(temp_tx_elm, "show");
    });
    on(temp_tx_elm, "animationend", () => {
      remove(temp_tx_elm, "show");
    });
  });
}

//snackBarInit();
