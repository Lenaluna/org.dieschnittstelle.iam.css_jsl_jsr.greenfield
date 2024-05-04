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
        this.prepareListitemSelection();
    }

    prepareViewSwitching() {
        const switchTrigger = this.root.getElementsByTagName("header")[0];
        console.log("switchTrigger: ", switchTrigger);
        switchTrigger.onclick = () => {
            this.root.classList.toggle("myapp-tiles");
        };
    }

    prepareFading(){
        const fadingTrigger = document.getElementById("myapp-fadingTrigger");
        const fadingTarget = this.root.getElementsByTagName("main")[0];
        fadingTrigger.onclick = () => {
            fadingTarget.classList.toggle('myapp-faded');
            const onTransitionend = () => {
                fadingTarget.classList.toggle("myapp-faded");
            }
            fadingTarget.addEventListener("transitionend", onTransitionend,{once: true});
            }
        }

    prepareListitemSelection() {
        const listitems = this.root.getElementsByTagName("li");
        const onclickListener = (evt) => {
            alert("selected: " +evt.target.closest("li").querySelector("h2").textContent);
        };
        const listRoot = this.root.querySelector("ul");
        listRoot.onclick = onclickListener;
        }

    prepareAddingNewListitems() {
        const addingTrigger = this.root.querySelector(".myapp-img-add");
        addingTrigger.onclick = (evt) => {
            evt.stopPropagation();
            alert("add!");
        }
    }
}

window.onload = () => {
    const vc = new ViewController();
    vc.root = document.body;
    vc.oncreate();
};
