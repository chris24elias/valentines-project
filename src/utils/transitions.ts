export const pageTransition = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    y: -20,
  },
};

export function addPageTransition() {
  document.documentElement.classList.add("page-transition");
  setTimeout(() => {
    document.documentElement.classList.remove("page-transition");
  }, 500);
}
