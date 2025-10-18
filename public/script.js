function makeComponent(customTagName) {
  return class extends HTMLElement {
    constructor() {
      super();

      const template = document.getElementById(`template:${customTagName}`);
      const templateContent = template.content;
      const shadowRoot = this.attachShadow({ mode: "open" });
      const rootNode = templateContent.cloneNode(true);
      shadowRoot.appendChild(rootNode);

      const linkElem = document.createElement("link");
      linkElem.setAttribute("rel", "stylesheet");
      linkElem.setAttribute("href", "./build/output.css");
      shadowRoot.appendChild(linkElem);

      const styleElement = document.createElement("style");
      styleElement.textContent = `
        :host {
          display: block;
        }
      `;
      shadowRoot.appendChild(styleElement);

      if (this.hasAttribute("cn")) {
        shadowRoot
          .querySelector("[data-cn]")
          ?.classList.add(
            ...this.getAttribute("cn").split(" ").filter(Boolean),
          );
      }
    }

    static customTagName() {
      return customTagName;
    }
  };
}

const customComponents = [
  makeComponent("column-header"),
  makeComponent("task-item"),
];

customComponents.forEach((Component) =>
  customElements.define(Component.customTagName(), Component),
);
