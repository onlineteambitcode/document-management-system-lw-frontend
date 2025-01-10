import { Directive, ElementRef, Input, Renderer2, OnInit } from '@angular/core';
import { RandomColor } from '../common/utils/random-lolor.util';
@Directive({
    selector: '[appSetBackground]',  // This is the selector to use in the template
    standalone: true  // Mark the directive as standalone
})
export class SetBackgroundDirective implements OnInit {
    constructor(private el: ElementRef, private renderer: Renderer2) { }

    // Initialize the background color when the directive is applied
    ngOnInit(): void {
        // Check if the background color is already set
        // Use getComputedStyle to check the current background color of the element
    const computedStyles = window.getComputedStyle(this.el.nativeElement);
    const existingColor = computedStyles.backgroundColor;
        console.log("existingColor");
        console.log(existingColor);
        console.log("existingColor");
        if (existingColor) {
            return;
        }
        const randomColor = this.getBackgroundColor();
        // Set default background color if none is provided

        this.renderer.setStyle(this.el.nativeElement, 'background-color', randomColor);
    }

    // Get background color for initials
    getBackgroundColor(): string {
        return RandomColor.getRandomColor();
    }
}
