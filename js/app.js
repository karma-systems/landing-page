/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/
///////////////////Setting the section initial number/////////////
let sectionCounter = 4;
//////////////////////////////////////////////////////////////////////
/**
 * End Global Variables
 * Start Helper Functions
 * 
*/
/////////////////////Scroll up to the page Top/////////////////////
function backToHome(){
    const homebackButton = document.querySelector('.homeback');
    homebackButton.addEventListener('click', function(){
        window.scrollTo({
            top:0,
        });
    });
 }
////////////////Check if section in viewport//////////
function sectionIsInViewport(section) {
    const rect = section.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}
/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/
//////////////Reset both navbar and section selections//////////////
function clearSelections(){
    document.querySelector('.your-active-class').classList.remove('your-active-class');
    document.querySelector('.active_menu_link').classList.remove('active_menu_link');
}
//////////////Reselect both navbar item and Active section ///////////
function resetSelection(){
    const pageSections = document.querySelectorAll('section');
    for(const section of pageSections){
        const sectionId = section.getAttribute('id');
        const menuItemId = `item${sectionId}`;
        const currentNavItem = document.getElementById(menuItemId);
        if(sectionIsInViewport(section)){
            clearSelections();
            section.classList.add('your-active-class');
            currentNavItem.classList.remove('menu_link');
            currentNavItem.classList.add('active_menu_link');
        }
    }
}
// build the nav
////////////////Create navbar upon page sections number and name////
function buildNavBar(){
    const pageSections = document.querySelectorAll('section');
    const navigationBar = document.querySelector('#navbar__list');
    for(section of pageSections){
        liLable = section.getAttribute('data-nav');
        liId = section.getAttribute('id');
        navItem = `<li  ><a id="item${liId}" class = "menu__link" href = "#${liId}"> ${liLable} </li>`;
        navigationBar.insertAdjacentHTML('beforeend', navItem);
    }
    document.querySelector('#itemSection1').classList.add('active_menu_link'); //Select First Item
}
// Add class 'active' to section when near top of viewport
////////////////////////Clear Navigation Bar///////////////////////////
function clearNavigationBar(){
    const itemList = document.querySelector('ul');
    itemList.setAttribute('class', 'hidden');
    const listItem = document.querySelectorAll('li');
    for(let item of listItem){
        itemList.removeChild(item);
    }
}
//////////////////////////////////////Add New Section//////////////
function addNewSection(){
    sectionCounter +=1;
    const mainDiv = document.querySelector('main');
    const newSectionContent = `<section id="section${sectionCounter}" data-nav="Section ${sectionCounter}" >
    <div class="landing__container">
      <h2>Section ${sectionCounter}</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi fermentum metus faucibus lectus pharetra dapibus. Suspendisse potenti. Aenean aliquam elementum mi, ac euismod augue. Donec eget lacinia ex. Phasellus imperdiet porta orci eget mollis. Sed convallis sollicitudin mauris ac tincidunt. Donec bibendum, nulla eget bibendum consectetur, sem nisi aliquam leo, ut pulvinar quam nunc eu augue. Pellentesque maximus imperdiet elit a pharetra. Duis lectus mi, aliquam in mi quis, aliquam porttitor lacus. Morbi a tincidunt felis. Sed leo nunc, pharetra et elementum non, faucibus vitae elit. Integer nec libero venenatis libero ultricies molestie semper in tellus. Sed congue et odio sed euismod.</p>

      <p>Aliquam a convallis justo. Vivamus venenatis, erat eget pulvinar gravida, ipsum lacus aliquet velit, vel luctus diam ipsum a diam. Cras eu tincidunt arcu, vitae rhoncus purus. Vestibulum fermentum consectetur porttitor. Suspendisse imperdiet porttitor tortor, eget elementum tortor mollis non.</p>
        </div>
     </section>`
    mainDiv.insertAdjacentHTML('beforeend', newSectionContent);
    resetSelection(); //Adjust new active Section.
    clearNavigationBar(); //Reset navigation bar.
    buildNavBar(); //Build new navigation bar with sutable section number.
}
////////////////////////////Remove Last Section////////////////////
function removeSection(){
    const mainDiv = document.querySelector('main');
    if(sectionCounter > 4){
        sectionCounter -=1;
        mainDiv.removeChild(mainDiv.lastElementChild);
    resetSelection();//Adjust new active Section.
    clearNavigationBar();//Reset navigation bar.
    buildNavBar();//Build new navigation bar with sutable section number.
    }
}
// Scroll to anchor ID using scrollTO event
/**
 * End Main Functions
 * Begin Events
 * 
*/
//////////////// Activate Current Section//////////
function activateViewableSection() {
    document.addEventListener('scroll', resetSelection);
}
//////////////////Append New Section//////////////
function appendNewSection(){
    const addBtn = document.getElementById('addSection');
    addBtn.addEventListener('click', addNewSection);
}
//////////////////Remove Last Section//////////////
function removeLastSection(){
    const addBtn = document.getElementById('removeSection');
    addBtn.addEventListener('click', removeSection);
}
////////Show scroll home button upon document scroll action///////
function showHomeButton() {
    document.addEventListener('scroll', ()=>{
        let positionRatio = ((window.innerHeight + window.scrollY)/document.body.offsetHeight)*100;
        positionRatio > 30 ? document.querySelector('.homeback').setAttribute('style', 'display: block;')
                           : document.querySelector('.homeback').setAttribute('style', 'display: none;');
        resetSelection();//Adjust new active Section.
    });
}
// Build menu 
buildNavBar();
showHomeButton();
appendNewSection();
removeLastSection();
backToHome();
// Scroll to section on link click

// Set sections as active


