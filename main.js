// header observer
// header가 skills와 observ되는 순간 스타일을 변경한다.
const header = document.querySelector(".head");
const sections = document.querySelectorAll(".sections");
const navIds = [];
sections.forEach((section) => {
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
    console.log(entry);
    console.log(navIds);
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
  let y = window.scrollY;
  if (y === 0) {
    activeNavItem(navIds[0]);
  }
  if (y > 10) header.classList.add("head--scrolled");
  else header.classList.remove("head--scrolled");
});
