class ViewController {
    root;

    constructor() {
        console.log("constructor(): has been called");
    }

    oncreate() {
        console.log("oncreate(): root is ", this.root);
        this.prepareViewSwitching();
        this.prepareFading();
        this.prepareListitemSelection();
        this.prepareAddingNewListitems();
        this.loadAndDisplayListitems();
        this.setupScrollListener();
      //  this.setupRandomDate();
    }

    prepareViewSwitching() {
        const switchTrigger = this.root.getElementsByTagName("header")[0];
        console.log("switchTrigger: ", switchTrigger);
        switchTrigger.onclick = () => {
            this.root.classList.toggle("myapp-tiles");
        };
    }

    prepareFading() {
        const fadingTrigger = document.getElementById("myapp-fadingTrigger");
        const fadingTarget = this.root.getElementsByTagName("main")[0];
        fadingTrigger.onclick = () => {
            fadingTarget.classList.toggle('myapp-faded');
            const onTransitionend = () => {
                fadingTarget.classList.toggle("myapp-faded");
            }
            fadingTarget.addEventListener("transitionend", onTransitionend, {once: true});
        }
    }

    prepareListitemSelection() {
        const onclickListener = (evt) => {
            console.log("evt: ", evt);
            alert("selected: " + evt.target.closest("li").querySelector("h2").textContent);
        };
        const listRoot = this.root.querySelector("ul");
        listRoot.onclick = onclickListener;
    }

    prepareAddingNewListitems() {
        let index = 0;

        const addingTrigger = this.root.querySelector(".myapp-img-add");
        this.listRoot = this.root.querySelector("ul");

        this.cloneListelement = this.listRoot.querySelector("li");
        console.log("this.cloneListelement: ", this.cloneListelement);
        this.cloneListelement.parentNode.removeChild(this.cloneListelement);
        this.cloneListelement.classList.remove("myapp-template");

        addingTrigger.onclick = (evt) => {
            evt.stopPropagation();
            const scroptions = ["100_100.jpeg", "100_200.jpeg", "300_100.jpeg"];
            const titleoptions = ["M1", "M2", "M3", "M4", "M5", "M6"]

            const selectedSrc = scroptions[Date.now() % scroptions.length];
            const selectedTitle = titleoptions[index % titleoptions.length];

            const getRandomDate = (start, end) => {
                return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
            }

           // let randomDate = getRandomDate(new Date(2024, 0, 1), new Date());

          //  let dateString = randomDate.toDateString();

            this.addNewListitem({src: "./data/img/" + selectedSrc, title: selectedTitle});
            index++;
        }
    }

    addNewListitem(obj) {

        /*1.Version: InnerHTML SoC violated, inefficient, transparent, (improvable by js string templates */
        //this.listRoot.innerHTML += "<li><img class=\"myapp-align-left\" src=\"" + src + "\" ><h2 class=\"myapp-align-left\"> "+ title +" </h2><button class=\"myapp-imgbutton myapp-img-edit myapp-align-right\">edit</button></li>";

        /*2.Version: dom element creation, SoC violated, efficient, intransparent code*/
        /* const li = document.createElement("li");
           const img = document.createElement("img");
           li.appendChild(img);
           const h2 = document.createElement("h2");
           li.appendChild(h2);
           const button = document.createElement("button");
           li.appendChild(button);
           img.src = obj.src;
           img.classList.add("myapp-align-left");
           h2.textContent = obj.title;
           h2.classList.add("myapp-align-left");
           button.setAttribute("class", "myapp-imgbutton myapp-align-right myapp-img-edit");

           this.listRoot.appendChild(li);
         */

        // C) cloning: SoC preserved ( much more than in A and B), efficient, transparent
        const li = this.cloneListelement.cloneNode(true);

        // setze das src Attribut des img Elements in li auf den Wert obj.src
        const img = li.querySelector("img");
        img.src = obj.src;
        // setze den Text innerhalb des h2 Elements in li auf den Wert obj.title
        const h2 = li.querySelector("h2");
        h2.textContent = obj.title;

       // document.getElementById('dateRandom').innerHTML = obj.date;
       // document.getElementById('dateRandom').innerHTML = randomDate.toDateString();

        /*
        // D) html templates: SoC preserved (as in C), efficient, transparent (slightly less than C), standard
        console. log("cloning template content: ", this.cloneListelenent.content);
        const li = document.importNode(this.cloneListelement.content, true).querySelector ("li");
        console.log("cloned li element: ", li);
        li.querySelector ("img").src = obj.src;
        li.querySelector ("h2"). textContent = obj.title;
        */
        this.listRoot.appendChild(li);
    }

    loadAndDisplayListitems() {
        const request = new XMLHttpRequest();
        request.open("GET", "data/listitems.json");
        request.send();
        request.onload = () => {
            console.log("response status: ", request.status, request.statusText);
            if (request.status === 200) {
                const responseText = request.responseText;
                console.log("responseText: ", responseText);
                const responseItems = JSON.parse(responseText);
                console.log("responseItems: ", responseItems);
                responseItems.forEach(item => this.addNewListitem(item));
            } else {
                alert("got Error status: " + request.status + " " + request.statusText);
            }
        }
        console.log("request has been send to server");
    }

    /* 4.(a) spacer is moved out of the visible area when the view is scrolled */
    setupScrollListener() {
        var header = document.querySelector('header');
        var main = document.querySelector('main');
        var div = document.querySelector('div');
        main.onscroll = function () {
            if (main.scrollTop >= div.offsetHeight) {
                div.classList.add('hide');
                main.classList.add('mainScrollHeight');
            }
        };
    }
    setupRandomDate() {
        const getRandomDate = (start, end) => {
            return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
        }

        let randomDate = getRandomDate(new Date(2024, 0, 1), new Date());
        document.getElementById('dateRandom').innerText = randomDate.toDateString();
    }
}

window.onload = () => {
    const vc = new ViewController();
    vc.root = document.body;
    vc.oncreate();
};
