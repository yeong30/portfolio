// header observer
// header가 skills와 observ되는 순간 스타일을 변경한다.
const header = document.querySelector(".head");
const sections = document.querySelectorAll(".sections");
const navbarList = document.querySelector(".navbar__list");
const navbarToggleBtn = document.querySelector(".navbar__toggle-btn");
const navIds = [];
sections.forEach((section) => {
  console.log(section.id);
  navIds.push(section.id);
});
(section) => section.id;
let headerOptions = {
  rootMargin: "0px",
  threshold: 0.6,
};
let activeNav = undefined;
const observer = new IntersectionObserver((entries) => {
  if (entries.length === navIds.length) {
    activeNavItem(navIds[0]);
    return;
  }
  entries.forEach((entry) => {
    if (!entry.isIntersecting && entry.intersectionRatio > 0) {
      let targetIdx = navIds.indexOf(entry.target.id);
      if (entry.boundingClientRect.y > 0) {
        //up state
        activeNavItem(navIds[targetIdx - 1]);
      } else {
        //down state
        activeNavItem(navIds[targetIdx + 1]);
      }
    }
  });
}, headerOptions);
sections.forEach((section) => {
  observer.observe(section);
});

// nav Item 활성화
function activeNavItem(target) {
  activeNav?.classList.remove("active");
  let navItem = document.querySelector(`[data-nav-id="${target}"]`);
  if (!navItem) return;
  navItem.classList.add("active");
  activeNav = navItem;
}

// 상단에 닿으면 Home 활성화 + nav메뉴 스타일 변경
// let flagH =
//   sections[0].getBoundingClientRect().height -
//   header.getBoundingClientRect().height;

window.addEventListener("scroll", (e) => {
  const WINDOW_HEIGHT = window.innerHeight;
  const DOC_TOTAL_HEIGHT = document.body.offsetHeight;

  let y = window.scrollY;
  if (y === 0) {
    activeNavItem(navIds[0]);
  } else if (y + WINDOW_HEIGHT >= DOC_TOTAL_HEIGHT) {
    activeNavItem(navIds[navIds.length - 1]);
  }

  if (y > 10) header.classList.add("head--scrolled");
  else header.classList.remove("head--scrolled");
});

// scoll to section
navbarList.addEventListener("click", (e) => {
  if (e.target.tagName === "LI") {
    const selectedMenu = e.target.dataset.navId;
    const selectedIdx = navIds.indexOf(selectedMenu);
    sections[selectedIdx]?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }
});
navbarToggleBtn.addEventListener("click", (e) => {
  navbarList.classList.toggle("spread");
});
