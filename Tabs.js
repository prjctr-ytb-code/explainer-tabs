export class Tabs {
    #tabs;
    #content;
    #hashes;
    #data;
    #tabId;

    constructor() {
        this.#tabs = document.querySelector(".tabs");
        if (!this.#tabs) {
            throw new Error('Tabs element are not exist in DOM.');
        }

        this.#content = this.#tabs.querySelector(".tabs__content");
        if (!this.#content) {
            throw new Error('Content element are not exist in Tabs.');
        }

        // store the relationship between hash & tab id
        this.#hashes = new Map([
            ["#react", "tab1"],
            ["#vue", "tab2"],
            ["#angular", "tab3"],
        ]);

        // store the relationship between tab id and contents
        this.#data = new Map([
            [
                "tab1",
                {
                    url: "#react",
                    content: "React — це JavaScript бібліотека для створення інтерфейсів.",
                },
            ],
            [
                "tab2",
                {
                    url: "#vue",
                    content: "Vue — це прогресивний JavaScript фреймворк.",
                },
            ],
            [
                "tab3",
                {
                    url: "#angular",
                    content: "Angular — це платформа для створення мобільних і десктопних веб-додатків.",
                },
            ],
        ]);

        // get tab id from the hash
        this.#tabId = this.#hashes.get(window.location.hash);

        // update the tab
        if (this.#tabId) {
            this.#update(this.#tabId);
        }

        this.#tabs.addEventListener("click", this.#onTabClick);
    }

    #onTabClick = (event) => {
        if (!event.target.id) {
            return;
        }

        this.#update(event.target.id);
    }

    #update = (tabId) => {
        // remove the active class of the previously selected tab
        const currentTab = this.#tabs.querySelector(".tabs__tab_active");

        if (currentTab.id !== tabId) {
            currentTab.classList.remove("tabs__tab_active");
        }
        // add active class to the selected tab
        const selectedTab = document.getElementById(tabId);
        selectedTab.classList.add("tabs__tab_active");

        const entry = this.#data.get(tabId);

        if (entry !== undefined) {
            // update the URL
            history.pushState(null, "", entry.url);
            // change the content
            this.#content.innerHTML = entry.content;
        }
    };
}
