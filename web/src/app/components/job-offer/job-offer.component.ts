import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-job-offer',
  templateUrl: './job-offer.component.html',
  styleUrls: ['./job-offer.component.scss']
})
export class JobOfferComponent {
  @Input() company!: string;
  @Input() title!: string;
  @Input() location!: string;
  @Input() contractType!: string;
  @Input() salary!: string;
  @Input() timeAgo!: string;
  @Input() description!: string;
  @Input() experience!: string; // Dodano pole doświadczenia
  @Input() technologies!: string; // Dodano pole technologii
}
