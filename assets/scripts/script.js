const noteTitleInputEl = document.querySelector(".input");
const noteTextInputEl = document.querySelector(".text");
const addNoteBtnEl = document.querySelector(".btn");
const notesContainerEl = document.querySelector(".notes");
const modalContainerEl = document.querySelector(".modal-container");
const modalTitleEl = document.querySelector(".modal .row .title");
const modalTextEl = document.querySelector(".modal .note-text");
const modalCloaseBtnEl = document.querySelector(".modal .row .close-btn");
let allNotes;

const randomId = () => Math.floor(Math.random() * new Date().getTime());
const clearInputs = () => {
  noteTitleInputEl.value = "";
  noteTextInputEl.value = "";
  noteTitleInputEl.focus();
};

const appendNote = (note) => {
  notesContainerEl.appendChild(note);
};

const createNote = (title, text) => {
  // note title
  const h3 = document.createElement("h3");
  h3.classList.add("title");
  h3.textContent = title;
  // note text
  const p = document.createElement("p");
  p.textContent = text;
  // note container
  const div = document.createElement("div");
  div.classList.add("note");
  div.id = randomId();
  div.append(h3, p);

  return div;
};

const showNoteOnModal = (title, text) => {
  modalContainerEl.classList.add("active");
  modalTitleEl.textContent = title;
  modalTextEl.textContent = text;
};

const getNoteForModal = (e) => {
  const note = e.currentTarget;
  const title = note.children[0].textContent;
  const text = note.children[1].textContent;
  showNoteOnModal(title, text);
};

const setNotes = () => {
  allNotes = document.querySelectorAll(".note");
  allNotes.forEach((note) => note.addEventListener("click", getNoteForModal));
};

const getNote = () => {
  const title = noteTitleInputEl.value.trim();
  const text = noteTextInputEl.value.trim();
  if (title === "") return;
  if (text === "") return;

  const note = createNote(title, text);
  appendNote(note);
  clearInputs();
  setNotes();
};

addNoteBtnEl.addEventListener("click", getNote);
modalCloaseBtnEl.addEventListener("click", () => {
  modalContainerEl.classList.remove("active");
});
modalContainerEl.addEventListener("click", (e) => {
  if (e.target.classList.contains("active")) {
    modalContainerEl.classList.remove("active");
  }
});
