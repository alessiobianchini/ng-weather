import { Directive, ElementRef, HostBinding, Input, OnChanges, SimpleChanges } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";

@Directive({
    selector: "[highlight]"
})
export class HighlightDirective implements OnChanges {
    @Input("highlight") searchTerm: string;
    @Input() currentValue: string;

    @HostBinding("innerHtml")
    content: string;
    constructor(private el: ElementRef) { }

    ngOnChanges(changes: SimpleChanges) {
        if (this.el?.nativeElement) {
            if ("searchTerm" in changes) {
                if (!this.searchTerm || this.searchTerm === "") {
                    this.content = this.currentValue;
                } else {
                    const regex = new RegExp(this.searchTerm, "gi");
                    const newText = this.currentValue.replace(regex, (match: string) => {
                        return `<b>${match}</b>`;
                    });
                    this.content = newText;
                }
            }
        }
    }
}