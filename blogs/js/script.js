'use strict';


// element toggle function
const elementToggleFunc = function (elem) {
    elem.classList.toggle("active");
}

document.addEventListener("DOMContentLoaded", function () {
    // Fetch the JSON data
    fetch('https://raw.githubusercontent.com/Abhisek-Pandey/public/master/blogs/js/BlogPostData.JSON')
        .then(response => response.json())
        .then(data => {
            const url = new URL(window.location.href);
            const isTechnical = url.pathname.match(/\/technical\//);
            const anchors = data[isTechnical ? "technical" : "events"] || []; // Use ternary operator

            if (anchors && anchors.length > 0) {
                anchors.forEach(anchor => {
                    const element = document.getElementById(anchor.id);
                    if (element) {
                        // Update href attribute of <a> tag
                        element.href = anchor.href;

                        // Update text content of <p> tag inside <a>
                        const titleElement = element.querySelector('.title');
                        if (titleElement) {
                            titleElement.textContent = anchor.text;
                        }
                    }
                });
            }
        })
        .catch(error => console.error('Error fetching anchor data:', error));
});

// navigation variables
const navigation = document.querySelector("[data-navigation]");
const navigationBtn = document.querySelector("[data-navigation-btn]");

// navigation toggle functionality for mobile
navigationBtn.addEventListener("click", function () {
    elementToggleFunc(navigation);
});


if (localStorage.getItem("theme") === null) {
    localStorage.setItem("theme", "light_theme"); // or "dark_theme" based on default
}


const themeToggleBtn = document.querySelector("[data-theme-button]");

themeToggleBtn.addEventListener("click", function () {

    elementToggleFunc(themeToggleBtn);

    if (themeToggleBtn.classList.contains("active")) {
        document.body.classList.remove("dark_theme");
        document.body.classList.add("light_theme");
        document.getElementById("icon").setAttribute("name", "sunny");
        localStorage.setItem("theme", "light_theme");
    } else {
        document.body.classList.add("dark_theme");
        document.body.classList.remove("light_theme");
        document.getElementById("icon").setAttribute("name", "moon");
        localStorage.setItem("theme", "dark_theme");
    }

});

/**
 * check & apply last time selected theme from localStorage
 */
if (localStorage.getItem("theme") === "light_theme") {
    themeToggleBtn.classList.add("active");
    document.body.classList.remove("dark_theme");
    document.getElementById("icon").setAttribute("name", "sunny");
    document.body.classList.add("light_theme");
} else {
    themeToggleBtn.classList.remove("active");
    document.body.classList.remove("light_theme");
    document.getElementById("icon").setAttribute("name", "moon");
    document.body.classList.add("dark_theme");
}

let ascending = false;

function sortPosts() {
    const list = document.querySelector('.blog-posts-list');
    const items = Array.from(list.querySelectorAll('.blog-post-item'));

    items.sort((a, b) => {
        const dateA = new Date(a.querySelector('time').getAttribute('datetime'));
        const dateB = new Date(b.querySelector('time').getAttribute('datetime'));

        return ascending ? dateB - dateA : dateA - dateB;
    });

    ascending = !ascending;

    items.forEach(item => list.appendChild(item));
}

