class Component {
  protected container: HTMLElement;

  constructor(tagName: string, className: string) {
    this.container = document.createElement(tagName);
    this.container.className = className;
  }
  appendContent(content: HTMLElement) {
    this.container.append(content);
  }
  render() {
    return this.container;
  }
}

export default Component;
