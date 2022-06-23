const header = document.querySelector(".head");
const sections = document.querySelectorAll(".sections");
const navbarList = document.querySelector(".navbar__list");
const navbarToggleBtn = document.querySelector(".navbar__toggle-btn");
const contactMeBtn = document.querySelector(".contact-me__btn");
const navIds = [];

//대상이 되는 section의 id를 navIds로 저장.
sections.forEach((section) => {
  navIds.push(section.id);
});
(section) => section.id;
let headerOptions = {
  rootMargin: "0px",
  threshold: 0.5,
};
let activeNav = undefined;

// 현재 view에서 벗어나는 section의 다음 /이전 section의 index를 저장
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

// header observer
// header가 skills와 observ되는 순간 스타일을 변경
window.addEventListener("scroll", (e) => {
  const WINDOW_HEIGHT = window.innerHeight;
  const DOC_TOTAL_HEIGHT = document.body.offsetHeight;

  let y = window.scrollY;
  if (y === 0) {
    activeNavItem(navIds[0]);
  } else if (y + WINDOW_HEIGHT >= DOC_TOTAL_HEIGHT - 5) {
    activeNavItem(navIds[navIds.length - 1]);
  }

  if (y > 10) header.classList.add("head--scrolled");
  else header.classList.remove("head--scrolled");
});

// scoll to section
navbarList.addEventListener("click", (e) => {
  if (e.target.tagName === "LI") {
    const selectedMenu = e.target.dataset.navId;
    scrollToSection(selectedMenu);
  }
});
// scoll to section
navbarList.addEventListener("click", (e) => {
  if (e.target.tagName === "LI") {
    const selectedMenu = e.target.dataset.navId;
    scrollToSection(selectedMenu);
  }
});
contactMeBtn.addEventListener("click", (e) => {
  scrollToSection("contact");
});
function scrollToSection(selectedMenu) {
  const selectedIdx = navIds.indexOf(selectedMenu);
  sections[selectedIdx]?.scrollIntoView({
    behavior: "smooth",
    block: "center",
  });
}
navbarToggleBtn.addEventListener("click", (e) => {
  navbarList.classList.toggle("spread");
});
