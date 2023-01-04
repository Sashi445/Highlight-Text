function getSelectedText() {
  const selection = document.getSelection();
  return selection.toString();
}

function generateUrl(fragment) {
    console.log(fragment);
  const fragmentStr = generateFragmentString(fragment);

  const fragmentDelimiter = "#:~:text=";

  const finalURL = document.URL + fragmentDelimiter + fragmentStr;

  return finalURL;
}

function generateFragmentString({ prefix, textStart, textEnd, suffix }) {
  // prefix and suffix exist
  if (prefix && suffix)
    return (
      encodeURIComponent(prefix) +
      "-," +
      encodeURIComponent(textStart) +
      ",-" +
      encodeURIComponent(suffix)
    );

  // prefix
  if (prefix)
    return encodeURIComponent(prefix) + "-," + encodeURIComponent(textStart);

  // suffix
  if (suffix)
    return encodeURIComponent(textStart) + ",-" + encodeURIComponent(suffix);

  // textStart and textEnd
  if (textStart && textEnd)
    return encodeURIComponent(textStart) + "," + encodeURIComponent(textEnd);

  return encodeURIComponent(textStart);
}

function createOpenLinkAnchor(highlightedUrl) {
  const anchor = document.createElement("a");
  if (highlightedUrl === "") return null;
  anchor.href = highlightedUrl;
  anchor.className = "openLink";
  anchor.setAttribute("target", "_blank");
  return anchor;
}

function createSsupButton(a) {
  const button = document.createElement("button");
  button.textContent = "Create Ssup Link!";
  button.onclick = a;
  return button;
}

function createPopup(top, left) {
  const popup = document.getElementById("ssupPopupItem");
  console.log(popup, "I exist");
  popup.textContent = "popup";
  popup.style.top = top;
  popup.style.left = left;
}

function createNoteForm() {
    // const noteForm = document.createElement("form");
    // const noteInput = document.createElement("input");    
    // const submitBtn = document.cre

    return `
        <form id="ssupNoteForm">
            <input name="comment" type="text" />
            <button type="submit">Create</button>
        </form>
    `
}

function generateHighlightData(selection) {
    const res = generateFragment(selection);
    console.log(res);
    if (!res.fragment) return { highlightedText : selection.toString(), url: "" };
    const url = generateUrl(res.fragment);
    const highlightData = {
        highlightedText: selection.toString(),
        url
    }
    return highlightData
}

document.onmouseup = () => {
  const selection = document.getSelection();
  if (!selection) return;
  
  const highlightData = generateHighlightData(selection);
  
  const range = selection.getRangeAt(0);

  const boundingRect = range.getBoundingClientRect();

  // to get to middle of the bounding rect
  const top = `${Math.round(boundingRect.top)}`;
  const left = boundingRect.left + boundingRect.width / 2;

  console.log(top, left);

  const popup = document.getElementById("ssupPopupItem");
  popup.style.display = "block";
  popup.style.top = `${top}px`;
  popup.style.left = `${left}px`;

  document.addEventListener('selectionchange', (e) => {
    e.preventDefault();
    console.log("Event is ignored!!");
  })

  return (function(){
    document.removeEventListener('selectstart', () => {console.log("Eventlistener removed!!")})
  })()

 
};

// document.addEventListener("selectionchange", (e) => {
//   const selection = document.getSelection();

//   if (!selection) return;

//   if (!mouseDown) {
//     const range = selection.getRangeAt(0);

//     const boundingRect = range.getBoundingClientRect();

//     // to get to middle of the bounding rect
//     const top = boundingRect.top;
//     const left = boundingRect.left + boundingRect.width / 2;

//     // const res = generateFragment(selection);
//     // const url = generateUrl(res.fragment);
//     // const highlightData = {
//     //     highlightedText: selection.toString(),
//     //     url
//     // }

//     const popup = createPopup(top, left);

//     document.body.appendChild(popup);
//     console.log("I work now");
//   }

//   return (function () {
//     console.log(mouseDown);
//   })();
// });

function insertPopupItem() {
    const popupItem = document.createElement('div');
    popupItem.id = 'ssupPopupItem';
    const copyBtn = document.createElement("button");
    copyBtn.textContent = "ssup"
    popupItem.appendChild(copyBtn);
    copyBtn.onclick = (e) => {
        e.stopPropagation()
      popupItem.innerHTML = createNoteForm();
      document.getElementById("ssupNoteForm").onsubmit = (e) => {
          e.preventDefault();
          console.log(e);
      }
    }
    document.body.appendChild(popupItem);
}

window.onload = insertPopupItem;

