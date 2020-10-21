import {
  Component,
  OnInit,
  ElementRef,
  Output,
  EventEmitter,
} from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit {
  @Output() dismiss = new EventEmitter(); // emit a dismiss event to close modal

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    // append modal directly under body element
    document.body.appendChild(this.el.nativeElement);
  }

  ngOnDestroy() {
    this.el.nativeElement.remove();
  }

  onDismissClick() {
    this.dismiss.emit(); // emit "dismiss" event
  }
}
