import React, { Component } from "react";

export default class Dropdown extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    document.addEventListener("click", this.handleClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.handleClick, false);
  }

  handleClick = (e) => {
    if (this.dropdown.contains(e.target)) return;
    this.handleClickOutside();
  };

  handleClickOutside() {
    this.dropdown.removeAttribute("open");
  }

  handleSelect(e) {
    this.setState({
      value: e.currentTarget.innerText,
    });
    this.handleClickOutside();
  }

  render() {
    const options = [""];
    return (
      <div className="relative cursor-pointer">
        <details ref={(dropdown) => (this.dropdown = dropdown)}>
          <summary className="hover:bg-gray-700 text-gray-500 px-3 py-2 group rounded-md inline-flex items-center text-base font-medium hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <span
              className="text-gray-300 rounded-md inline-flex items-center text-sm font-medium group-hover:text-white-900 "
              aria-expanded="false"
            >
              {this.props.name}
            </span>
            <svg
              className="text-gray-500 ml-2 h-5 w-5 group-hover:text-gray-900"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            </svg>
          </summary>
          {options.map((option) => {
            return (
              <div onClick={(e) => this.handleSelect(e)}>
                {this.props.children}
              </div>
            );
          })}
        </details>
      </div>
    );
  }
}
