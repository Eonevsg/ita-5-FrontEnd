import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    addEventListener("click", this.closeMenu);
  }

  closeMenu() {
    var element = document.getElementById("navbarSupportedContent");
    if (element.classList.contains("show")) {
      element.classList.remove("show");
    }
  }
}
